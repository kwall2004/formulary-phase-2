/**
 * Created by rsalekin on 11/25/2016.
 */
Ext.define('Atlas.pharmacy.model.PharmacyExclRulesByState', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        extraParams: {
            pContractID: '',
            pagination: true
        },
        url: 'pharmacy/{0}/pharmacyexclrulesbystate'
    }
});