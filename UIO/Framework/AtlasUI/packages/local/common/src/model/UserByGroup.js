Ext.define('Atlas.common.model.merlin.UserByGroup',{
    extend: 'Atlas.common.model.Base',
    idProperty: 'username',
    fields: [
        {name: 'username',  type: 'string'},
        {name: 'lastname',  type: 'string'},
        {name: 'firstname',  type: 'string'},
        {name: 'phone',  type: 'string'},
        {name: 'email',  type: 'string'}
    ],
    proxy: {
        url: 'system/rx/usersbygroup',
        extraParams: {
            pagination: true
        }
    }
});