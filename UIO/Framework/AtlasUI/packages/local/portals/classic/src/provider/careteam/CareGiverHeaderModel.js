/**
 * Created by m4542 on 11/15/2016.
 */
Ext.define('Atlas.portals.view.provider.careteam.CareGiverHeaderModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.caregivermodel',

    stores: {
        caregiverheaderstore: {
            model: 'Atlas.portals.provider.model.CareGiverHeader'
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});