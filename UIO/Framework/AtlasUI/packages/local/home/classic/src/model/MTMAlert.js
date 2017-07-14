Ext.define('Atlas.home.model.MTMAlert', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'TotalCount', type: 'int'},
        {name: 'Description', type: 'string'}
    ],

    proxy: {
        url: 'member/{0}/mtmcasealert',
        timeout: 120000
    }
});