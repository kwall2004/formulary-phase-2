Ext.define('Atlas.home.model.PriorAuthAlert', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'totalCount', type: 'int'},
        {name: 'AlertType', type: 'string'},
        {name: 'authStatusCode', type: 'string'},
        {name: 'authStatusDesc', type: 'string'}
    ],

    proxy: {
        url: 'claims/{0}/priorauthsummary',
        timeout: 120000
    }
});