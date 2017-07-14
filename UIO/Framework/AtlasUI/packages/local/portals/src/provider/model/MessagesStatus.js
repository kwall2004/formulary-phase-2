// k3279 - Kevin Tabasan - 11/17/2016

Ext.define('Atlas.portals.provider.model.MessagesStatus', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'provider/hp/coordcaremessage'
    }
});