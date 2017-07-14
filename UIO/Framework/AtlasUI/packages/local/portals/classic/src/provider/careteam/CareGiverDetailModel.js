/**
 * Created by m4542 on 11/15/2016.
 */
Ext.define('Atlas.portals.view.provider.careteam.CareGiverDetailModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.caregiverdetailmodel',

    stores: {
        caregiverdetail: {
            model: 'Atlas.portals.provider.model.CareGiverDetail'
        }
    },

    data: {
        /* This object holds the arbitrary data that populates the ViewModel and is then available for binding. */
    }
});