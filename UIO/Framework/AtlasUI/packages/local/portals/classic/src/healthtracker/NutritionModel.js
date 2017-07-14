/**
 * Created by m4542 on 11/1/2016.
 */
Ext.define('Atlas.portals.healthtracker.NutritionModel', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridModel',
    alias: 'viewmodel.nutritionmodel',

    stores: {
        nutritionstore: {
            model: 'Atlas.portals.healthtracker.model.NutritionData'
        }
    },

    data: {
        viewOnly: true,
        newRecord: false
    }
});