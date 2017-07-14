/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.integratedcaredata.ICBRTransactionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.icbrtransactionscontroller',

    listen: {
        controller: {
            '*': {
                memberDetailsSet: 'loadCreateNewRequest'
            }
        }
    },

    loadCreateNewRequest: function(memberdetails) {
        var me = this,
            vm = me.getViewModel(),

            user = Ext.first('viewport').getViewModel().get('user'),
            transactionsstore = vm.getStore('transactionsstore'),
            recipientId = vm.get('recipientId');

        transactionsstore.getProxy().setExtraParam('pSessionID', user.sessionId);
        transactionsstore.getProxy().setExtraParam('pRecipientID', recipientId);
        transactionsstore.getProxy().setExtraParam('pSource', 'portal');
        transactionsstore.load();


        this.fireEvent('clearICDdata');

    },

    onTransactionsGridClick: function(view, record) {
        var memberdetails = this.getView().getViewModel().get('memberDetails');
        this.fireEvent('loadHeaderMemberDetail', record);
    }
});