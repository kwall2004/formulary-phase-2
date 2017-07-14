/**
 * Created by m4542 on 11/1/2016.
 */
Ext.define('Atlas.portals.healthtracker.HealthConditionModel', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridModel',
    alias: 'viewmodel.healthconditionmodel',

    stores: {
        healthrackerdatastore: {
            model: 'Atlas.portals.healthtracker.model.HealthConditionData'
        },

        conditionstore: {
            model: 'Atlas.portals.healthtracker.model.ReasonListItems',
            autoLoad: true
        },

        concernstore: {
            model: 'Atlas.portals.healthtracker.model.ConcernListItems',
            autoLoad: true
        },

        providerstore: {

        }

    },

    data: {
        viewOnly: true,
        newRecord: false
    }
});