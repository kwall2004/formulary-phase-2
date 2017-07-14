// k3279 - Kevin Tabasan - 11/10/2016

Ext.define('Atlas.portals.provider.model.Notification', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'date',type: 'string'},
        {name: 'ProvGrpID',type: 'string'},
        {name: 'jobNum',type: 'string'},
        {name: 'read',type: 'string'},
        {name: 'subject',type: 'string'},
        {name: 'description',type: 'string'},
        {name: 'messageID',type: 'string'},
        {name: 'priority',type: 'string'}
    ],

    proxy: {
        url: 'provider/hp/messages'
    }
});