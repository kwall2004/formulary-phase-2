/**
 * Created by d3973 on 4/12/2017.
 */
Ext.define('Atlas.finance.store.ClaimRADetailStore', {
    extend: 'Ext.data.Store',
    alias: 'store.finance-claimsradetail',
    model:'Atlas.finance.model.ClaimRADetail',
    remoteSort: true,
    sorters: [{
        property: 'transactionDate',
        direction: 'ASC'
    }],
    proxy: {
        type: 'layer7',
        url: 'claims/{0}/claimradetail',
        extraParams: {
            pWhere: '',
            pSort: '',
            pBatchSize: 0,
            pRowNum: 0,
            pDBRowID: '',
            pagination: true
        }
    }
});