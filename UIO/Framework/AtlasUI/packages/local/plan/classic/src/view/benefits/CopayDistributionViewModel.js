/**
 * Created by b2352 on 12/19/2016.
 */
Ext.define('Atlas.plan.view.CopayDistributionViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.plan-benefits-copaydistribution',

    data: {
        //note: this needs to move to controller with user permissions
        userpermissions: {
            create: true,
            update: true,
            destroy: true
        }

    },
    stores: {
        copaydistributions: {
            type: 'plan-copaydistributions'
        },
        coveragephases:{
            type: 'plan-coveragephases',


            listeners: {
                load: function (store, records) {
                    // debugger;
                }
            }
        },
        formularytiers: {
            type:'plan-planformularytiers'
        }
    }
});