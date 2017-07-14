// k3279 - Kevin Tabasan - 11/10/2016

Ext.define('Atlas.portals.provider.model.NotificationStatus', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'pMessage',type: 'string'}
    ],

    proxy: {
        url: 'provider/hp/messagedata'
    }
});