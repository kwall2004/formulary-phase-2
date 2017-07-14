/**
 * Created by rsalekin on 11/28/2016.
 */
Ext.define('Atlas.pharmacy.model.PricingDetail', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pRowid: '0',
            pRowNum: 0,
            pBatchSize: 0,
            pPriceID: '',
            pSort: ''
        },
        url: 'pharmacy/{0}/pricingdetail'
    }
});
