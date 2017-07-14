/**
 * Created by m4542 on 11/1/2016.
 */
Ext.define('Atlas.portals.healthtracker.BloodA1CModel', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridModel',
    alias: 'viewmodel.blooda1cmodel',

    stores: {
        a1cstore: {
            model: 'Atlas.portals.healthtracker.model.BloodA1CData'
        }
    },

    data: {
        viewOnly: true,
        newRecord: false
    }
});