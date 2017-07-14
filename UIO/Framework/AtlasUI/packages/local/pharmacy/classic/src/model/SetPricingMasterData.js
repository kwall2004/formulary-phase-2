/**
 * Created by rsalekin on 11/29/2016.
 */
Ext.define('Atlas.pharmacy.model.SetPricingMasterData', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pPriceID: '',
            pFieldList: '',
            pFields: ''
        },
        url: 'pharmacy/{0}/pricingmasterdata'
    }
});
