/**
 * Created by rsalekin on 11/29/2016.
 */
Ext.define('Atlas.pharmacy.model.SetPricingDetail', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pSystemID: '',
            pPriceID: '',
            pFieldList: '',
            pFields: ''
        },
        url: 'pharmacy/{0}/pricingdetail'
    }
});
