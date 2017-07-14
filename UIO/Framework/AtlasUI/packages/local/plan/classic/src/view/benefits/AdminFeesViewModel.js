/**
 * Created by b2352 on 12/19/2016.
 */
Ext.define('Atlas.plan.view.AdminFeesViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.plan-benefits-adminfees',


    data: {
        //note: this needs to move to controller with user permissions
        userpermissions: {
            create: true,
            update: true,
            destroy: true
        }

    },

    stores: {
        planadminfees: {
            type: 'plan-planadminfees'
        },
        feetypes: {
            type: 'plan-benefits-feetypes'
            // listeners: {
            //     load: function (store, records) {
            //         // debugger;
            //     }
            // }
        },
        feeclasstypes: {
            type: 'plan-benefits-feeclasstypes'
            // listeners: {
            //     load: function (store, records) {
            //         //debugger;
            //     }
            // }
        },
        feeclassvalues: {
            type: 'plan-benefits-feeclassvalues'
            // listeners: {
            //     load: function (store, records) {
            //         //debugger;
            //     }
            // }

        },

        feeperiods: {
            type: 'plan-benefits-feeperiods'

        }

        // feeclassvaluesLocal: {
        //
        //     fields: [
        //         {name: 'itemName', type: 'string'},
        //         {name: 'value',type: 'string'},
        //         {name: 'name',type: 'string'}
        //
        //     ],
        //     proxy: {
        //         type: 'memory'
        //     }
        // }

    }
});