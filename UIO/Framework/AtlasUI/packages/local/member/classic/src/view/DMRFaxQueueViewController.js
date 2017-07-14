/**
 * Created by d3973 on 10/27/2016.
 */
Ext.define('Atlas.member.view.DMRFaxQueueViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memberdmrfaxqueuecontroller',

    searchFaxes: function(){
        var me = this,
            cbxFax = me.getView().down('#faxType'),
            fromDateFaxType = me.getView().down('#fromDateFaxType'),
            toDateFaxType = me.getView().down('#toDateFaxType'),
            storeFaxQDocuments = me.getViewModel().getStore('faxQDocuments');
        storeFaxQDocuments.getProxy().setExtraParam('pPlanID', 'HPM');
        storeFaxQDocuments.getProxy().setExtraParam('pQDescription', 'DMR');
        storeFaxQDocuments.getProxy().setExtraParam('pRecipientDateFrom', fromDateFaxType.getValue());
        storeFaxQDocuments.getProxy().setExtraParam('pRecipientDateTo', toDateFaxType.getValue());
        storeFaxQDocuments.getProxy().setExtraParam('pAcknowledged', cbxFax.getValue());

        storeFaxQDocuments.load({
            callback: function(){
            }
        });
    },

    initiateDMR: function(){
        //the following retrieves the user associated with the DMR selection, and sets the values to enable the button labeled "Fax Attached"

        var me = this,
            storeQManagementData= me.getViewModel().getStore('qManagementData'),
            storeFaxQDocuments =  me.getViewModel().getStore('faxQDocuments'),
            selectedRecord = me.getView().down('gridpanel').getSelection(),
            sysID = storeFaxQDocuments.getAt(selectedRecord[0]).get('SystemID'),
            fieldList = 'AcknowledgedUserName';

        storeQManagementData.getProxy().setExtraParam('pSystemID', sysID);
        storeQManagementData.getProxy().setExtraParam('pFieldList', fieldList);
        storeQManagementData.load({
            callback: function(){
                var ackStatus;
                if (storeQManagementData.getAt(0).get('pFields')){
                    ackStatus = storeQManagementData.getAt(0).get('pFields');
                    var confirmSave = Ext.Msg.confirm(
                        'Fax Processed Already',
                        'This fas has already been processed by ' + ackStatus + '. Are you sure you would like to initiate DMR?',
                        function(buttonId){
                            if (buttonId == 'yes'){
                                var /*me.getView().hiddenValues.*/faxDocID = selectedRecord[0].get('DocumentID'),
                                /*me.getView().hiddenValues.*/faxSystemID = sysID,
                                /*me.getView().hiddenValues.*/confirmFaxAttached = 'Yes';
                                /*me.getView().hiddenValues.viewAttachmentDisabled = false;*/
                                me.fireEvent('attachFax', faxDocID, faxSystemID, confirmFaxAttached /*, viewAttachmentDisabled*/);
                            }
                        }
                    );
                }
            }
        });
    }
});