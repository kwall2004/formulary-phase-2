Ext.define('Atlas.portals.prescriber.HedisAlertWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsprescriberhedisalertwindow',

    init: function() {
        var id = this.getViewModel().get('id'),
            hedisAlertStore = this.getViewModel().getStore('hedisAlerts'),
            user = Ext.first('viewport').getViewModel().get('user');

        hedisAlertStore.getProxy().setExtraParam('pSessionID', user.retSessionID);
        hedisAlertStore.getProxy().setExtraParam('pKeyType', 'recipientID');
        hedisAlertStore.getProxy().setExtraParam('pKey', id);
        hedisAlertStore.load();
    }
});