Ext.define('Atlas.reports.model.DynamicUserGroupListModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'rptdynamicusergrouplist',
    fields: [
        {name: 'groupName', type: 'string'},
        {name: 'groupId', type: 'string'}

    ],
    proxy: {
        url: 'shared/{0}/usergrouplist'
    }
});