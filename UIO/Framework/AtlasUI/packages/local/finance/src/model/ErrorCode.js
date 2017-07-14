Ext.define('Atlas.finance.model.ErrorCode', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'name', type: 'string'},
        {name: 'value', type: 'string'}
    ],

    proxy: {
        url: 'shared/{0}/listitems',
        extraParams:{
            pListName: 'auditErrorCode'
        }
    }
});