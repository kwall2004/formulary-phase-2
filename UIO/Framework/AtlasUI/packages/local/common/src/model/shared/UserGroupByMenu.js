Ext.define('Atlas.common.model.shared.UserGroupByMenu',{
    extend: 'Atlas.common.model.Base',
    idProperty: 'groupId',
    fields: [
        {name: 'groupID',  type: 'number'},
        {name: 'groupName',  type: 'string'},
        {name: 'Description',  type: 'string'},
        {name: 'allowExtAccess',  type: 'boolean'}
    ],
    proxy: {
        url: 'shared/{0}/usergroupbymenu'
    }
});