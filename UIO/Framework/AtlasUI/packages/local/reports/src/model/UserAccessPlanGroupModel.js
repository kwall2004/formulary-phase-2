

Ext.define('Atlas.reports.model.UserAccessPlanGroupModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'useraccessplangroupmdl',
    fields: [
        {name: 'pDescription', type: 'string', mapping: 'pDescription' }
    ],
    pageSize: 50,
    proxy: {
        url: 'system/{0}/useraccessplangroup'
    }
});