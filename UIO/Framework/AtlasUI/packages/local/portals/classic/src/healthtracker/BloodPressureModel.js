/**
 * Created by m4542 on 11/1/2016.
 */
Ext.define('Atlas.portals.healthtracker.BloodPressureModel', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridModel',
    alias: 'viewmodel.bloodpressuremodel',

    stores: {
        bpstore: {
            model: 'Atlas.portals.healthtracker.model.BPData'
        }
    },

    data: {
        viewOnly: true,
        newRecord: false
    }
});