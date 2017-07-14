Ext.define('Atlas.pharmacy.view.AdvancedSearchModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.pharmacy-advsearch',

    stores: {
        states: {
            type: 'common-states',
            autoLoad: true
        },
        counties: {
            type: 'common-counties'
        },
        pharmacies: {
            model: 'Atlas.pharmacy.model.Pharmacy',
            remoteSort: true,
            autoLoad: false
        }
    }
});
