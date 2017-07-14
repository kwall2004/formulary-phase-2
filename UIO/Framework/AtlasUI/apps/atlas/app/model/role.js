Ext.define('Atlas.model.Role',{
    extend: 'Atlas.common.model.StaticBase',
    idProperty: 'RoleId',
    fields: [
        {name: 'AccountNumber',  type: 'string'},
        {name: 'AccountName',  type: 'string'}
    ],
    proxy: {
        url: 'resources/data/roles.json'
    }
});