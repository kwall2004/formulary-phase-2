/**
 * Created by b2352 on 12/19/2016.
 */

Ext.define('Atlas.plan.view.benefits.DAWCopayViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.plan-benefits-dawcopay',
    data: {
        isEditing: false
    },
    stores: {

        dawcopays:{
            model: 'Atlas.plan.model.PlanDAWCopay',
            autoLoad: false

        },
        dawtypes:{
            type: 'plan-dawtype'

        },
        pharmacynetworks:{
            type: 'plan-pharmanetworks',
            listeners: {
                load: function (store, records) {
                    // debugger;
                }
            }
        },

        filteredpharmacynetworks:{
            extend: 'Ext.data.SimpleStore',
            autoLoad: false,
            fields: [
                {name: 'systemID',  type: 'string'},
                {name: 'NetworkID',  type: 'number'},
                {name: 'NetworkDescription',  type: 'string'}
            ]
            // // ,
            // proxy: {
            //     type: 'memory'
            // }
        },


        maintenances:{
            type: 'plan-benefitmaintenance'
        },

        formularytiers: {
            type: 'plan-planformularytiers',
            listeners: {
                load: function (store, records) {
                    //debugger;
                }
            }
        }


    }
});


