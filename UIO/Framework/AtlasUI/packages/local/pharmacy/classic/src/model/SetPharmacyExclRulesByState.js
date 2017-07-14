/**
 * Created by rsalekin on 11/25/2016.
 */
Ext.define('Atlas.pharmacy.model.SetPharmacyExclRulesByState', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        extraParams: {
            pContractID: '',
            pActionType: '',
            ttIncludeExclude: ''
        },
        url: 'pharmacy/{0}/pharmacyexclrulesbystate'
    }
});
