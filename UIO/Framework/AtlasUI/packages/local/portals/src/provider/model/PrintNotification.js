// k3279 - Kevin Tabasan - 11/16/2016

Ext.define('Atlas.portals.provider.model.PrintNotification', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'pJobNum',type: 'string'},
        {name: 'pData',type: 'string'},
        {name: 'pStatus',type: 'string'}
    ],

    proxy: {
        url: 'eligibility/hp/runreport64'
    }
});