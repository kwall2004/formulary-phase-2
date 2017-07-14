Ext.define('Atlas.admin.model.claimdef.FormularyDataSourceList', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminclaimdefformularydatasourcelist',
    idProperty: 'systemID',
    fields: [
        {
            name: 'ListItem',
            type: 'string'
        }, {
            name: 'ListDefintion',
            type: 'string'
        }
    ],
    proxy: {
        extraParams: {
            pListName: 'FormularyDataSource'
        },
        url: 'system/{0}/listdetail'
    }
});