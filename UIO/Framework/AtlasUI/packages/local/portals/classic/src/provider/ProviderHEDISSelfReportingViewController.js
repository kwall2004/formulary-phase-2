/**
 * Created by b6636 on 12/2/2016.
 */
Ext.define('Atlas.portals.provider.ProviderHEDISSelfReportingViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsProviderHEDISSelfReporting',

    listen: {
        controller: {
            '*': {
                providerDetailsSet: 'onProviderDetailsSet',
                pocApproval: 'onProviderDetailsSet'
            }
        }
    },

    getConfigValues: function(){
        var vm = this.getViewModel();

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'provider/hp/ctlsystembyfield/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pSessionID: Atlas.user.sessionId,
                pFieldList: 'currentPeriod,reportyear',
                userState: Atlas.user.providerStateSelected
            }),
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj.metadata.pFieldValues) { //obj.success
                    var values = obj.metadata.pFieldValues.split('|');
                    vm.set('vFileDate', values[0]);
                    vm.set('vReportYr', values[1]);
                }
            }
        });
    },

    init: function(){
        var vm = this.getViewModel(),
            currentDate = new Date(),
            thisYear = currentDate.getFullYear(),
            thisMonth = currentDate.getMonth(),
            lastYear;

        if (thisMonth <= 4) {
            lastYear = thisYear - 1;
        }
        else {
            lastYear = thisYear;
        }

        if (lastYear == thisYear) {
            vm.set('lastYearFlag', false);
        }
        else {
            vm.set('lastYearFlag', true);
        }

        this.getConfigValues();

        vm.set('hasP4PReport', Atlas.user.portalStateSelected == 'IL');
    },

    onProviderDetailsSet: function(providerDetails) {
        this.getView().getViewModel().set('providerDetails', providerDetails);
        this.loadEnrollments();
    },

    loadEnrollments: function() {
        var me = this,
            vm = me.getViewModel(),
            lastYearFlag = vm.get('lastYearFlag'),
            provider = this.getView().getViewModel().get('providerDetails'),
            enrollmentStore = this.getView().getViewModel().getStore('hedisEnrollments'),
            locationId = 0,
            searchText = this.lookupReference('searchText').value;

        enrollmentStore.getProxy().setExtraParam('pProvID', provider.provID);
        enrollmentStore.getProxy().setExtraParam('pLocationID', locationId);
        enrollmentStore.getProxy().setExtraParam('pSearch', searchText + '||' + lastYearFlag + '|true|1|||');

        enrollmentStore.load();
    },

    handlePrintHedis: function() {
        var me = this,
            vm = me.getViewModel();

        vm.set('p4pRpt', false);
        me.showHedisPrintDialog();
    },

    handlePrintP4P: function(){
        var me = this,
            vm = me.getViewModel();

        vm.set('p4pRpt', true);
        me.showHedisPrintDialog();
    },

    showHedisPrintDialog: function(){
        Ext.create('Atlas.portals.view.provider.ProviderHEDISSelfReportingPrintWindow', {}).show();
    },

    onPocStatusClick: function(record) {
        var provider = this.getView().getViewModel().get('providerDetails');

        //if (!record.get('pocStatus')) { return; }
        Ext.create('Ext.window.Window', {
            title: 'Plan of Care Decision',
            modal: true,
            reference: 'pocWindow',
            items: {
                xtype: 'portalsproviderpocwindow',
                viewModel: {
                    data: {
                        provider: provider,
                        record: record
                    }
                }
            }
        }).show();
    },

    onRowDblClick: function(grid, record) {
        this.fireEvent('openView', 'hpprovider', 'portals', 'provider_MemberMain', {
            memberId: record.get('dispMemberID'),
            atlasId: record.get('dispMemberID') + '-Demographics',
            activeTab: 'Demographics'
        });
    },

    onMemberIdClick: function(grid) {
        var record = grid.getWidgetRecord();

        this.fireEvent('openView', 'hpprovider', 'portals', 'provider_MemberMain', {
            memberId: record.get('dispMemberID'),
            atlasId: record.get('dispMemberID') + '-Demographics',
            activeTab: 'Demographics'
        });
    },

    goToHedis: function(record) {
        this.fireEvent('openView', 'hpprovider', 'portals', 'provider_MemberMain', {
            memberId: record.get('dispMemberID'),
            atlasId: record.get('dispMemberID') + '-HEDIS',
            activeTab: 'HEDIS'
        });
    },

    goToDetails: function(grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex);

        this.fireEvent('openView', 'hpprovider', 'portals', 'provider_MemberMain', {
            memberId: record.get('dispMemberID'),
            atlasId: record.get('dispMemberID') + '-Demographics',
            activeTab: 'Demographics'
        });
    },

    goToDocs: function(grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex);

        this.fireEvent('openView', 'hpprovider', 'portals', 'provider_MemberMain', {
            memberId: record.get('dispMemberID'),
            atlasId: record.get('dispMemberID') + '-Documents',
            activeTab: 'Documents'
        });
    },

    onHedisPrintOK: function(){
        var me = this,
            vm = me.getViewModel(),
            user = Atlas.user,
            requestModel = Ext.create('Atlas.portals.hpmember.model.RunReport64', {}),
            pLobId = me.lookupReference('lobCombo').getValue(),
            inputId = vm.get('inputId'),
            grpIndicator = vm.get('grpIndicator'),
            vFileDate =  vm.get('vFileDate'),
            vReportYr = vm.get('vReportYr'),
            p4pRpt = vm.get('p4pRpt'), // this should be for the P4P print button - IL only
            input = Ext.String.format('{0}|{0}|{1}|{2}|2|0,1,2,3,4,5,10,15,16,17,19,23||{3}|No', inputId, grpIndicator, vFileDate, vReportYr),
            win = me.lookupReference('printHedisDialog');

        if (pLobId == 'ALL') {
            pLobId = '';
        }

        if (p4pRpt) {
            input = input + "|No|" + user.un + "|" + pLobId + "|" + "||P4P";  //13th entry needed for HIPAA filtering, 14th and 15th Parms are new for P4P IL Rpt
        }
        else {
            input = input + "||" + user.un + "|" + pLobId + "|"+ user.userPreferences.providerGroupId+"||";  //13th entry needed for HIPAA filtering, 14th and 15th Parms are new for P4P IL Rpt
        }

        requestModel.phantom = false;
        requestModel.getProxy().url = 'eligibility/hp/runreport64';
        requestModel.getProxy().setExtraParam('pReportName', 'provhedislist.p');
        requestModel.getProxy().setExtraParam('pParameters', input);
        requestModel.getProxy().setExtraParam('pRegenReport', 2);
        requestModel.getProxy().setExtraParam('pOutputType', 'pdf');
        requestModel.getProxy().setExtraParam('pJobNum', 0);
        requestModel.save({
            success: function (response, operation) {
                var obj = Ext.JSON.decode(operation._response.responseText),
                    base64EncodedPDF = obj.data;
                if (base64EncodedPDF == "" || base64EncodedPDF == null) {
                    if (obj.metadata.pStatus != ''){
                        Ext.Msg.alert('Error',obj.metadata.pStatus);
                    } else {
                        Ext.MessageBox.alert(
                            'Error',
                            'We are working on creating your report. Please check back in a few minutes. If the problem continues please call Provider/Member Services.',
                            function () {}
                        );
                    }
                } else {
                    Atlas.common.utility.Utilities.displayDocument('pdf', base64EncodedPDF);
                }
            }
        });

        win.hide();
    },

    onHedisPrintCancel: function(){
        var me = this,
            win = me.lookupReference('printHedisDialog');

        win.hide();
    }
});