/**
 * Created by T3852 on 10/26/2016.
 */
Ext.define('Atlas.portals.hpmember.makeviewpayment.PaymentHistoryViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.paymenthistoryview',

    init: function () {
        var familyListStore = {},
            combo = this.lookupReference('familyListCombo'),
            user = Ext.first('viewport').getViewModel().get('user');

        familyListStore = new Ext.data.Store({
            fields: [
                'familyList'
            ]
        });

        familyListStore.loadData(user.familyList);
        combo.setStore(familyListStore);
        combo.select(combo.getStore().getAt(0))
    },

    searchPaymentHistory: function () {
        var me = this,
            vm = me.getViewModel(),
            paymentHistory = vm.getStore('paymentHistory'),
            paymentHistoryForm = me.lookup('paymentHistoryForm'),
            validForm = paymentHistoryForm.isValid(),
            user = Ext.first('viewport').getViewModel().getData().user;

        if (validForm === true) {
            var formValues = paymentHistoryForm.getValues();

            paymentHistory.getProxy().setExtraParam('viRecipientID', user.recipientId);
            paymentHistory.getProxy().setExtraParam('viAction', 'getPaymentHistory');
            paymentHistory.getProxy().setExtraParam('viStartDate', formValues.fromDate);
            paymentHistory.getProxy().setExtraParam('viEndDate', formValues.toDate);

            paymentHistory.load();

        }

    }
});