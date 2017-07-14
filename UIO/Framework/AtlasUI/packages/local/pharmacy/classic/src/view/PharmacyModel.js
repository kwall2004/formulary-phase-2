Ext.define('Atlas.pharmacy.view.PharmacyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pharmacy',

    data: {
        initialized: false,
        searchBy: 'ncpdpId', //ncpdpId | npi
        ncpdpId: null,
        npi: null,
        searchEmptyText: '[NCPDP]',
        activePharmacy: null
    },

    stores: {
        menu: {
            model: 'Atlas.common.model.SystemMenu'
        },
        pharmacyRelationship: {
            model: 'Atlas.pharmacy.model.PharmacyRelationship'
        }
    }
});
