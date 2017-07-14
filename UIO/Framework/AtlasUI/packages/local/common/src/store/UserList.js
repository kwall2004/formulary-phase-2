Ext.define('Atlas.common.store.UserList',{
    alias: 'store.common-userlist',
    extend: 'Ext.data.Store',
    model: 'Atlas.common.model.UserListItem',
    autoLoad: true
});