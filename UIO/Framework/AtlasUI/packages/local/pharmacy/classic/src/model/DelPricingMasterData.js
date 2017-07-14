/**
 * Created by rsalekin on 11/29/2016.
 */
Ext.define('Atlas.pharmacy.model.DelPricingMasterData', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pPriceID: ''
        },
        url: 'pharmacy/{0}/delpricingmasterdata'
    }
});
