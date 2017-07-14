/**
 * Created by b6636 on 12/2/2016.
 */
Ext.define('Atlas.portals.provider.ProviderHEDISSelfReportingPrintWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.providerHEDISSelfReportingPrintWindow',

    init: function(){
        var provGroupsStore = this.getViewModel().getStore('providerGroups'),
            provGroupsProxy = provGroupsStore.getProxy();

        provGroupsProxy.setExtraParam('pUserName', Atlas.user.un);
        provGroupsProxy.setExtraParam('pLobID', 'ALL');
        provGroupsStore.load();
    },

    onProviderChange: function(sender, newValue, oldValue) {
        var me = this,
            vm = me.getViewModel(),
            lobStore = vm.getStore('providerLobs'),
            lobProxy = lobStore.getProxy(),
            providerId = newValue,
            lobCombo = me.lookupReference('lobCombo'),
            inputId = parseInt(newValue);

        lobCombo.reset();

        // load the LOB list for this member
        lobStore.removeAll(true);
        lobStore.includeAll = true;
        lobStore.reload({
            params: {
                pProvID: providerId,
                pDelimiter: ','
            }
        });

        // Get the inputId
        if (inputId < 0) {
            // this is a group
            vm.set('inputId', inputId*(-1));
            vm.set('grpIndicator', 2);
            lobCombo.disable();
        }
        else {
            vm.set('inputId', inputId);
            vm.set('grpIndicator', 1);
            lobCombo.enable();
        }

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
            input = Ext.String.format('{0}|{0}|{1}|{2}|2|0,1,2,3,4,5,10,15,16,17,19,23||{3}|No',
            inputId,
            grpIndicator,
            vFileDate, 
            vReportYr);

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

        this.getView().close();
    },

    onHedisPrintCancel: function(){
        this.getView().close();
    }
});