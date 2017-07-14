Ext.define('Atlas.admin.model.claimdef.TransactionType', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminclaimdeftransactiontype',
    idProperty: 'systemID',
    fields: [],
    proxy: {
        extraParams: {
            pListName: 'ClaimEditTransactionType'
        },
        url: 'system/{0}/listdetail'
    }
});