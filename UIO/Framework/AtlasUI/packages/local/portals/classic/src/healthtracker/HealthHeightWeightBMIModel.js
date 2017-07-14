/**
 * Created by m4542 on 11/1/2016.
 */
Ext.define('Atlas.portals.healthtracker.HealthHeightWeightBMIModel', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridModel',
    alias: 'viewmodel.healthheightweightbmimodel',

    stores: {
        bmistore: {
            model: 'Atlas.portals.healthtracker.model.BMIData'
        }
    },

    data: {
        viewOnly: true,
        newRecord: false
    }
});