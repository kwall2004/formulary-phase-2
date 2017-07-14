/**
 * Created by m4542 on 11/1/2016.
 */
Ext.define('Atlas.portals.healthtracker.ExerciseModel', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridModel',
    alias: 'viewmodel.exercisemodel',

    stores: {
        exercisestore: {
            model: 'Atlas.portals.healthtracker.model.ExerciseData'
        },

        exercisetype: {
            model: 'Atlas.portals.healthtracker.model.ExerciseType'
        },

        feelingafter: {
            model: 'Atlas.portals.healthtracker.model.FeelingAfter'
        }
    },

    data: {
        viewOnly: true,
        newRecord: false
    }
});