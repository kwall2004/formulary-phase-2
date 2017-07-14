/**
 * Created by m4542 on 10/27/2016.
 */
Ext.define('Atlas.portals.healthtracker.HealthcareVisitsModel', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.GridModel',
    alias: 'viewmodel.healthcarevisitsmodel',

    stores: {
        healthrackerdatastore: {
            model: 'Atlas.portals.healthtracker.model.HealthcareVisitData'
        },

        visitreasonstore: {
            model: 'Atlas.portals.healthtracker.model.ReasonListItems',
            autoLoad: true
        },

        visitresultstore: {
            model: 'Atlas.portals.healthtracker.model.ResultListItems',
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