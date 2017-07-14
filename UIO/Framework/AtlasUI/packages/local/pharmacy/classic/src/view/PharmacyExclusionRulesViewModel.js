/**
 * Created by rsalekin on 11/25/2016.
 */
Ext.define('Atlas.pharmacy.view.PharmacyExclusionRulesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pharmacyexclusionrules',

    stores: {
        StoreIncludedStates: {
            model: 'Atlas.pharmacy.model.PharmacyExclRulesByState',
            autoLoad: false
        },
        StoreExcludedStates: {
            model: 'Atlas.pharmacy.model.PharmacyExclRulesByState',
            autoLoad: false

        },
        StoreExcludedStatesPage:
        {
            proxy: {
                type: 'memory',
                enablePaging: true
            }

        }
    }
});
