// k3279 - Kevin Tabasan - 11/15/2016

Ext.define('Atlas.portals.provider.model.DeleteNotification', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'provider/hp/delmessages'
    }
});