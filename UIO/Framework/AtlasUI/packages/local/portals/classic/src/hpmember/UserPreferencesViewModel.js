Ext.define('Atlas.portals.view.hpmember.UserPreferencesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.userhpmember',

    stores: {
        lol: {
            proxy: {
                type: 'memory'
            }
        }
    }
});
