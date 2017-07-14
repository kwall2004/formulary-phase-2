Ext.define('Atlas.common.model.UserGroup',{
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'groupId',  type: 'integer',defaultValue:0},
        {name: 'groupName',  type: 'string'},
        {name: 'DESCRIPTION',  type: 'string'},
        {name: 'defaultMenu',  type: 'number'},
        {name: 'UG1ROWID',  type: 'string'},
        {name: 'RowNum',  type: 'number'}
    ],
    proxy: {
        url: 'system/{0}/usergroups',
        extraParams: {
            pagination: true
        }
    }
});