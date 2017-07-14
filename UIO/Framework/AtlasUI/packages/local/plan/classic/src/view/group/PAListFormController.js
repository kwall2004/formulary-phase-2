Ext.define('Atlas.plan.view.group.PAListFormController', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.EditWindowController',
    alias: 'controller.plan-group-palistform',

    onDoneClick: function () {
        var me = this,
            vm = me.getViewModel(),
            grid = me.getView().callingView, //this is the grid scope
            record = vm.get('record'),
            form = me.lookupReference('editorForm'),
            values = form.getValues(),
            carrierId = me.lookupReference('carrierId').getValue(),
            carrierName =  me.lookupReference('carrierName').getValue(),
            url = Atlas.apiURL + 'plan/rx/planpalist/update',
            pFields = 'accountName',
            pValues;

        if (form.isValid()) {
            return false;
            //debugger;
            pValues = values['accountName'] ;
            modeParams =  {
                pSessionID: Atlas.user.sessionId,
                pCarrierId:  carrierId,
                pCarrierAcctNumber:  values['carrierAcctNumber'],
                pAction: vm.get('isEditing') ? 'U': 'A',
                pFields: pFields,
                pValues: pValues

            };

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