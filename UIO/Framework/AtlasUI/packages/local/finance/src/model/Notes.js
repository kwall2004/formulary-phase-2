Ext.define('Atlas.finance.model.Notes', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'SystemID', type: 'number'},
        {name: 'Subject', type: 'string'},
        {name: 'Note', type: 'string'},
        {name: 'CreateUser', type: 'string'},
        {name: 'CreateDate', type: 'date'},
        {name: 'CreateTime', type: 'string'},
        {name: 'rowNUm', type: 'int'},
        {name: 'Access', type: 'string'}
    ],

    proxy: {
        url: 'shared/{0}/notes',
        extraParams:{
            pParentSystemID: 0
        }

    }
});