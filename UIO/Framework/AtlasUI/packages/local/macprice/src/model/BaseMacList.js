
Ext.define('Atlas.macprice.model.BaseMacList', {
    extend: 'Atlas.common.model.Base',
    idProperty: 'MACListID',
    fields: [
        {name: 'MACListID', type: 'number'},
        {name: 'MACListName', type: 'string'}
    ],
    proxy: {
        extraParams: {
        },
        url: 'formulary/{0}/maclists'
    }
});