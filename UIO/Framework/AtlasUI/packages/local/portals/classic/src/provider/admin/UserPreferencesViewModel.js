Ext.define('Atlas.portals.view.provider.admin.UserPreferencesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.userhpprovider',

    stores: {
        userPrefs: {
            model: 'Atlas.portals.provider.model.UserSetupWeb'
        },
        states: {
            model: 'Atlas.portals.provider.model.State'
        },
        statesParsed: {
            proxy: {
                type: 'memory'
            }
        }
    }
});
