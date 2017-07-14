Ext.define('Atlas.plan.view.carriers.LOBFormController', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.EditWindowController',
    alias: 'controller.plan-carriers-lobform',


    init:function(){
        if(!this.getViewModel().get('isEditing'))
        {
            this.lookupReference('carrierLOBId').setDisabled(false);
        }
        if(this.getViewModel().data.record.data) {
            this.lookupReference('carrierLOBId').setValue(this.getViewModel().data.record.data.carrierLOBId);
            this.lookupReference('carrierlobName').setValue(this.getViewModel().data.record.data.lobName);
        }
        this.lookupReference('defaulteditbbar').setVisible(false);
    },

    onSaveClick: function () {
        //debugger;

        var me = this,
            vm = me.getViewModel(),
            grid = me.getView().callingView, //this is the grid scope
            record = vm.get('record'),
            form = me.lookupReference('editorForm'),
            values = form.getValues(),
            carrierId = me.lookupReference('carrierId').getValue(),
            carrierName =  me.lookupReference('carrierName').getValue(),
            carrierLobId = me.lookupReference('carrierLOBId').getValue(),
            url = Atlas.apiURL + 'plan/rx/carrierlob/update',
            pFields = 'lobName',
            pValues;

        if (form.isValid()) {

            pValues = values['lobName'] ;
            modeParams =  {
                pSessionID: Atlas.user.sessionId,
                pCarrierId:  carrierId,
                pCarrierLOBId:  carrierLobId,
                pAction: vm.get('isEditing') ? 'U': 'A',
                pFields: pFields,
                pValues: pValues,
                pRetSystemID: vm.data.record.data.SystemID

            };


            var returnValue = Atlas.common.utility.Utilities.post(
                'plan/rx/carrierlob/update',
                modeParams,
                null
            );

            if(returnValue.code != 0)
            {
                Ext.MessageBox.alert('Failure', returnValue.message, this.showResult, this);
            }
            else
            {
                Ext.Msg.alert("PBM ", ' LOB Details Successfully Saved');
                me.getView().up().up().down('plan-carriers-lobs').getStore().load(function(){
                    me.onCancelClick();
                });

            }
        }
    }
});