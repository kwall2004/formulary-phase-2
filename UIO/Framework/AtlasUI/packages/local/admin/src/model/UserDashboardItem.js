Ext.define('Atlas.admin.model.UserDashboardItem', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.admin-userdashboarditem',

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