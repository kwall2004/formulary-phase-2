/**
 * Created by c4539 on 10/3/2016.
 */
Ext.define('Atlas.portals.prescriber.model.FormularyDrugSearchModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.portalsPrescriberFormularyDrugSearchModel',

    stores:{
        formularyTiers: {
            model: 'Atlas.portals.prescriber.model.FormularyTier'
        },
        formularyDrugSearchResults: {
            model: 'Atlas.portals.prescriber.model.FormularyDrugSearchResults'
        }
    },

    data: {
        'isPreferred': false,
        'hasTiers': false,
        'drugTitle': 'Drug Details',
        'drugDetailTitle': 'Drug Details',
        '_drugTitle': '',
        'hasDrugs': false
    }
});