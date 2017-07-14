/**
 * Created by c4539 on 11/30/2016.
 */
Ext.define('Atlas.portals.provider.ProviderEnrollmentViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsProviderEnrollment',

    listen: {
        controller: {
            '*': {
                providerDetailsSet: 'onProviderDetailsSet',
                pocApproval: 'onProviderDetailsSet'
            }
        }
    },

    onProviderDetailsSet: function(providerDetails) {
        this.getView().getViewModel().set('providerDetails', providerDetails);
        this.loadEnrollments(false);
    },

    loadEnrollments: function(hasNewLocations) {
        var provider = this.getView().getViewModel().get('providerDetails'),
            user = Ext.first('viewport').getViewModel().get('user'),
            enrollmentStore = this.getView().getViewModel().getStore('enrollments'),
            locationId = this.lookupReference('locationCombo').value,
            lobId = '',
            searchText = this.lookupReference('searchText').value;

        if (!locationId || !hasNewLocations) { this.loadLocations(); return; }
        lobId = this.lookupReference('locationCombo').getSelection().get('lobID');
        this.lookupReference('enrollmentGrid').dockedItems.items[3].moveFirst();
        enrollmentStore.getProxy().setExtraParam('pProvID', provider.provID);
        enrollmentStore.getProxy().setExtraParam('pLocationID', locationId);
        enrollmentStore.getProxy().setExtraParam('pSearch', searchText + '||||' + '1|||' + lobId);
        enrollmentStore.getProxy().setExtraParam('userState', user.providerStateSelected);
        enrollmentStore.getProxy().setExtraParam('pSessionID', user.sessionId);
        enrollmentStore.load();
    },

    loadLocations: function() {
        var provider = this.getView().getViewModel().get('providerDetails'),
            locationStore = this.getView().getViewModel().getStore('locations'),
            locationCombo = this.lookupReference('locationCombo'),
            user = Ext.first('viewport').getViewModel().get('user'),
            me = this;

        locationStore.getProxy().setExtraParam('pProvGroupID', user.userPreferences.providerGroupId);
        locationStore.getProxy().setExtraParam('pProvID', provider.provID);
        locationStore.load({
            callback: function(records) {
                var allLocation = Ext.create('Atlas.portals.provider.model.GroupLocMaster', { locationID: 0 });

                if (!records || !records.length) { return; }
                this.insert(0, allLocation);
                locationCombo.select(allLocation);
                me.loadEnrollments(true);
            }
        });
    },

    handlePrint: function() {
        var provider = this.getView().getViewModel().get('providerDetails'),
            user = Ext.first('viewport').getViewModel().get('user'),
            requestModel = Ext.create('Atlas.portals.hpmember.model.RunReport64', {}),
            locationId = this.lookupReference('locationCombo').value,
            input = provider.provID + '||' + locationId + '||' + user.userPreferences.providerGroupId;

        requestModel.phantom = false;
        requestModel.getProxy().url = 'eligibility/hp/runreport64';
        requestModel.getProxy().setExtraParam('pReportName', 'enrollrpt.p');
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
    },

    handlePrintAll: function() {
        var input = '',
            provider = this.getView().getViewModel().get('providerDetails'),
            locationId = this.lookupReference('locationCombo').value,
            provGroupModel = Ext.create('Atlas.portals.provider.model.ProvGroupListGraph', {}),
            me = this;

        input = '|' + locationId;
        provGroupModel.getProxy().setExtraParam('pUserName', Atlas.user.un);
        provGroupModel.getProxy().setExtraParam('pLobID', '');
        provGroupModel.load( {
            callback: function(record, operation) {
                var response = {},
                    providerList = [],
                    provGroupStore = {},
                    groups = [],
                    tempGroup = [];

                if (!operation) {
                    Ext.Msg.alert('Error', 'Request Failed.');
                    return;
                }

                response = Ext.JSON.decode(operation._response.responseText);
                providerList = response.metadata.pListItems.split('^');
                if (providerList.length === 0) { return; }
                if (providerList.length > 0) {
                    providerList[1] = providerList[1].replace('-', '');

                    for (var i = 0; i < providerList.length; i++) {
                        tempGroup = [];
                        tempGroup.push(providerList[i]);
                        tempGroup.push(providerList[i + 1]);
                        groups.push(tempGroup);
                        i++;
                    }

                    provGroupStore = new Ext.data.ArrayStore({
                        fields: ['text', 'value'],
                        data: groups
                    });
                }

                Ext.create('Ext.window.Window', {
                    title: 'Print Enrollment Reports',
                    modal: true,
                    reference: 'reportWindow',
                    items: {
                        xtype: 'portalsproviderprintenrollmentreportswindow',
                        viewModel: {
                            data: {
                                provider: provider,
                                input: input,
                                provStore: provGroupStore,
                                multipleGroups: provGroupStore.count() > 1
                            }
                        }
                    }
                }).show();
            }
        });
    },

    handleExportAll: function() {
        var provGroupModel = Ext.create('Atlas.portals.provider.model.ProvGroupListGraph', {}),
            user = Ext.first('viewport').getViewModel().get('user'),
            providersExportStore = this.getView().getViewModel().getStore('providersExport'),
            provider = this.getView().getViewModel().get('providerDetails'),
            me = this;

        provGroupModel.getProxy().setExtraParam('pUserName', user.un);
        provGroupModel.getProxy().setExtraParam('pLobID', '');
        provGroupModel.load( {
            callback: function(record, operation) {
                var response = {},
                    providerList = [],
                    provGroupStore = {},
                    groups = [],
                    tempGroup = [];

                if (!operation) {
                    Ext.Msg.alert('Error', 'Request Failed.');
                    return;
                }

                response = Ext.JSON.decode(operation._response.responseText);
                providerList = response.metadata.pListItems.split('^');
                if (providerList.length === 0) { return; }
                if (providerList.length > 0) {
                    providerList[1] = providerList[1].replace('-', '');

                    for (var i = 0; i < providerList.length; i++) {
                        tempGroup = [];
                        tempGroup.push(providerList[i]);
                        tempGroup.push(providerList[i + 1]);
                        groups.push(tempGroup);
                        i++;
                    }

                    provGroupStore = new Ext.data.ArrayStore({
                        fields: ['text', 'value'],
                        data: groups
                    });
                }

                if (groups.length > 1) {
                    Ext.create('Ext.window.Window', {
                        title: 'Export All Providers',
                        modal: true,
                        reference: 'exportWindow',
                        items: {
                            xtype: 'portalsproviderexportenrollmentreportswindow',
                            viewModel: {
                                data: {
                                    reportDate: me.calculateCurrentPeriod(),
                                    providerId: provider.provID,
                                    provStore: provGroupStore
                                },
                                stores: {
                                    providersExport: providersExportStore
                                }
                            }
                        }
                    }).show();
                    return;
                }

                providersExportStore.getProxy().setExtraParam('pProvGroupId', groups[0][1]);
                providersExportStore.getProxy().setExtraParam('pFileDate', me.calculateCurrentPeriod());
                providersExportStore.load({
                    callback: function() {
                        var grid = me.lookupReference('hiddenProviderExport');

                        grid.saveDocumentAs({
                            type: 'xlsx',
                            title: 'All Providers Export',
                            fileName: 'AllProvidersExport.xlsx'
                        });
                    }
                });
            }
        });
    },

    handleExportHedis: function() {
        var exportHedisModel = Ext.create('Atlas.portals.provider.model.ProviderHedisWeb', {}),
            provider = this.getView().getViewModel().get('providerDetails'),
            user = Ext.first('viewport').getViewModel().get('user'),
            providerId = provider.provID ? provider.provID : -1,
            params = user.un + '|' + providerId + '|03/01/2012|' + user.userPreferences.providerGroupId;

        exportHedisModel.getProxy().setExtraParam('pMenu', 'rptexporthedis.p');
        exportHedisModel.getProxy().setExtraParam('pProgDesc', 'Provider Hedis Report');
        exportHedisModel.getProxy().setExtraParam('pParams', params);
        exportHedisModel.getProxy().setExtraParam('pcUserName', user.un);
        exportHedisModel.getProxy().setExtraParam('pDocType', 'xls');
        exportHedisModel.load({
            callback: function(record, operation) {
                var response = {};

                if (!operation) {
                    Ext.Msg.alert('Error', 'Request Failed.');
                    return;
                }

                metadata = Ext.JSON.decode(operation._response.responseText).metadata;
                if (metadata.pStatus.indexOf('Job') !== -1) {
                    Ext.Msg.alert('Message', 'Provider Hedis Report has been submitted to the queue. Please go to HOME tab and click refresh button on the web message panel.');
                    return;
                }
                Ext.Msg.alert('Message', metadata.pStatus);
            }
        });
    },

    handlePrintHedis: function() {
        var reportDate = this.calculateCurrentPeriod(),
            reportYear = new Date(reportDate).getFullYear(),
            provider = this.getView().getViewModel().get('providerDetails');

        Ext.create('Ext.window.Window', {
            title: 'Print HEDIS',
            modal: true,
            reference: 'reportWindow',
            items: {
                xtype: 'portalsproviderprintenrollmenthediswindow',
                viewModel: {
                    data: {
                        provider: provider,
                        reportDate: reportDate,
                        reportYear: reportYear,
                        id: '',
                        groupIndicator: 0
                    }
                }
            }
        }).show();
    },

    onPocStatusClick: function(record) {
        var provider = this.getView().getViewModel().get('providerDetails');

        if (!record.get('pocStatus')) { return; }
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

    calculateCurrentPeriod: function() {
        var date = new Date(),
            month = '';

        if (date.getMonth() < 3) {
            month = '01';
        } else if (date.getMonth() < 6) {
            month = '04';
        } else if (date.getMonth() < 9) {
            month = '07'
        } else {
            month = '10';
        }

        return month + '/01/' + date.getFullYear().toString();
    }
});