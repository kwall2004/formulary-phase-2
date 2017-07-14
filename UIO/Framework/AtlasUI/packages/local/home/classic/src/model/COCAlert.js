Ext.define('Atlas.home.model.COCAlert', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'TotalCount', type: 'int'},
        {name: 'Description', type: 'string'}
    ],

    proxy: {
        url: 'member/{0}/cobcalert',
        timeout: 120000
    }
});