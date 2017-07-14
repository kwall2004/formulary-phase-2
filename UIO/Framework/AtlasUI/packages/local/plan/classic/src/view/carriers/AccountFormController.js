Ext.define('Atlas.plan.view.carriers.AccountFormController', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.EditWindowController',
    alias: 'controller.plan-carriers-accountform',

    init:function(){
        if(!this.getViewModel().get('isEditing'))
        {
            this.lookupReference('carrierAcctNumber').setDisabled(false);

        }
        if(this.getViewModel().data.record.data) {
            this.lookupReference('carrierAcctNumber').setValue(this.getViewModel().data.record.data.carrierAcctNumber);
            this.lookupReference('carrieraccountName').setValue(this.getViewModel().data.record.data.accountName);
        }
        this.lookupReference('defaulteditbbar').setVisible(false);
    },

    onSaveClick: function () {
         var me = this,
            vm = me.getViewModel(),
            grid = me.getView().callingView, //this is the grid scope
            record = vm.get('record'),
            form = me.lookupReference('editorForm'),
            values = form.getValues(),
            carrierId = me.lookupReference('carrierId').getValue(),
            carrierName =  me.lookupReference('carrierName').getValue(),
            carrierAcctNumber = me.lookupReference('carrierAcctNumber').getValue(),
            url = Atlas.apiURL + 'plan/rx/carrieraccount/update',
            pFields = 'accountName',
            pValues;

        if (form.isValid()) {

            pValues = values['accountName'] ;
            var modeParams =  {
                pSessionID: Atlas.user.sessionId,
                pCarrierId:  carrierId,
                pCarrierAcctNumber:  carrierAcctNumber,
                pAction: vm.get('isEditing') ? 'U': 'A',
                pFields: pFields,
                pValues: pValues,
                pRetSystemID: vm.data.record.data.SystemID

            };


            var returnValue = Atlas.common.utility.Utilities.post(
                'plan/rx/carrieraccount/update',
                modeParams,
                null
            );

            if(returnValue.code != 0)
            {
                Ext.MessageBox.alert('Failure', returnValue.message, this.showResult, this);
            }
            else
            {
                Ext.Msg.alert("PBM", 'Account Details Successfully Saved');
                me.getView().up().up().down('plan-carriers-accounts').getStore().load(function(){
                    me.onCancelClick();
                });
            }



            // Ext.Ajax.request({
            //     useDefaultXhrHeader: false,
            //     paramsAsJson: true,
            //     noCache: false,
            //     url: url,
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     params: Ext.JSON.encode(modeParams),
            //     success: function (response, opts) {
            //        Ext.Msg.alert("PBM", 'Account Details Successfully Saved');
            //         var obj = Ext.decode(response.responseText);
            //         grid.getStore().load(function(){
            //             me.onCancelClick();
            //         });
            //
            //     },
            //     failure: function (response, opts) {
            //         console.log('server-side failure with status code ' + response.status);
            //
            //     }
            // });
        }
    }
});