/**
 * Created by m4542 on 11/1/2016.
 */
Ext.define('Atlas.portals.healthtracker.MedicationsModel', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridModel',
    alias: 'viewmodel.medicationsmodel',

    stores: {
        medstore: {
            model: 'Atlas.portals.healthtracker.model.MedicationsData'
        }
    },

    data: {
        viewOnly: true,
        newRecord: false
    }
});