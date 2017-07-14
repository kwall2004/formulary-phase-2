Ext.define('Atlas.common.model.GroupUser',{
    extend: 'Atlas.common.model.Base',
    idProperty: 'SystemID',
    fields: [
        {name: 'SystemID',  type: 'number'},
        {name: 'userName',  type: 'string'},
        {name: 'firstName',  type: 'string'},
        {name: 'lastName',  type: 'string'},
        {name: 'phone',  type: 'string'},
        {name: 'email',  type: 'string'},
        {name: 'active',  type: 'boolean'},
        {name: 'dbRowID',  type: 'string'},
        {name: 'RowNum',  type: 'number'}
    ],
    proxy: {
        url: 'system/{0}/usersbygroup'
    }
});