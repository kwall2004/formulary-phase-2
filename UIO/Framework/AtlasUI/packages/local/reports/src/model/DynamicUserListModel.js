Ext.define('Atlas.reports.model.DynamicUserListModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'rptdynamicuserlist',
    fields: [
        {name: 'userName', type: 'string'},
        {name: 'userName', type: 'string'}

    ],
    proxy: {
        url: 'system/{0}/userlist'
    }
});