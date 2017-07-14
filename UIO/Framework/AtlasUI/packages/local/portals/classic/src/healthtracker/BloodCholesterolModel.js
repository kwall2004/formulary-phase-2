/**
 * Created by m4542 on 11/1/2016.
 */
Ext.define('Atlas.portals.healthtracker.BloodCholesterolModel', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridModel',
    alias: 'viewmodel.bloodcholesterolmodel',

    stores: {
        cholesterolstore: {
            model: 'Atlas.portals.healthtracker.model.CholesterolData'
        }
    },


    data: {
        viewOnly: true,
        newRecord: false
    }
});