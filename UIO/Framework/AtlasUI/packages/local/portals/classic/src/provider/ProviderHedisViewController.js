Ext.define('Atlas.portals.provider.ProviderhedisViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.providerhedis',

    listen: {
        controller: {
            'portalsprovidermain': {
                providerDetailsSet: 'onProviderDetailsSet'
            }
        }
    },

    init: function() {
        this.getConfigValues();
    },

    getConfigValues: function(){
        var me = this,
            vm = this.getViewModel();

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

    onProviderDetailsSet: function (providerDetails) {
        var me = this,
            vm = me.getViewModel(),
            claimStore = vm.getStore('claims'),
            claimsForm = me.lookupReference('claimsForm');

        vm.set('providerDetails', providerDetails);
        me.providerHedisForm();
    },

    providerHedisForm: function () {
        var me = this,
            vm = me.getViewModel(),
            hedisDataStore = vm.getStore('providerhedisdata'),
            selectedProvider = vm.get('providerDetails').provID;

        hedisDataStore.getProxy().setExtraParam('pPCPID', selectedProvider);

        hedisDataStore.load()
    },

    hedisMeasureSelect: function (row, record, eOpts) {
        var me = this,
            vm = me.getViewModel(),
            hedisDetailStore = vm.getStore('hedisdetail'),
            providerId = vm.get('providerDetails').provID;

        hedisDetailStore.getProxy().setExtraParam('pPCPID', providerId);
        hedisDetailStore.getProxy().setExtraParam('pMeasure', record.data.Measure);

        hedisDetailStore.load();
    },

    generatePdf: function (view, rowIndex, colIndex, item, e, record, row) {
        var requestModel = Ext.create('Atlas.portals.hpmember.model.RunReport64', {}),
            me = this,
            vm = this.getViewModel(),
            providerId = vm.get('providerDetails').provID,
            measureId = record.data.Measure, // is this right?
            currentPeriod = vm.get('vFileDate'),
            thisYear = vm.get('vReportYr'),
            inputFields = providerId + '|' + providerId + '|1|' + currentPeriod + '|2|' + measureId + '||' +
                thisYear + '|No||' + Atlas.user.un + '|Medicaid|' + Atlas.user.userPreferences.providerGroupId + '||';

        Ext.MessageBox.show({
            title: "Downloading",
            msg: 'Please Wait...',
            closable: false
        });

        requestModel.phantom = false;
        requestModel.getProxy().url = 'eligibility/hp/runreport64';
        requestModel.getProxy().setExtraParam('pReportName', 'provhedislist.p');
        requestModel.getProxy().setExtraParam('pParameters', inputFields);
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
	                Ext.MessageBox.hide();
                }
            }
        });
    }
});