Ext.define('Atlas.admin.model.DashboardItem', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.admin-dashboarditem',

    fields: [
        { name: 'dashboardId',     type: 'integer' },
        { name: 'dashboardName',     type: 'string' }
    ],
    proxy: {
        url: 'system/rx/dashboarditembygroup',
        extraParams: {
            pagination: true
        }
    }

});