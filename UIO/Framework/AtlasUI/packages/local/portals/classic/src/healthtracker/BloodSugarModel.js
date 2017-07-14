/**
 * Created by m4542 on 11/1/2016.
 */
Ext.define('Atlas.portals.healthtracker.BloodSugarModel', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridModel',
    alias: 'viewmodel.bloodsugarmodel',

    stores: {
        bsstore: {
            model: 'Atlas.portals.healthtracker.model.BloodSugarData'
        },

        daytimestore: {
            model: 'Atlas.portals.healthtracker.model.TimeOfDay',
            autoLoad: true
        }
    },


    data: {
        viewOnly: true,
        newRecord: false
    }
});