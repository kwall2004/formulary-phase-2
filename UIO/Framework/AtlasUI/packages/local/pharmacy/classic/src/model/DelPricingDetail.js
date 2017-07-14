/**
 * Created by rsalekin on 11/29/2016.
 */
Ext.define('Atlas.pharmacy.model.DelPricingDetail', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        extraParams: {
            pKeyType: '',
            pKeyValue: ''
        },
        url: 'pharmacy/{0}/delpricingdetail'
    }
});