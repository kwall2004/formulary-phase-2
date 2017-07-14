/**
 * Created by b2352 on 12/21/2016.
 */

Ext.define('Atlas.plan.view.PlanTransitionConfigViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.plan-group-plantransitionconfig',


    data: {
        //note: this needs to move to controller with user permissions
        userpermissions: {
            create: true,
            update: true,
            destroy: true
        }

    },

    stores: {
        plantransitionconfig: {
            type: 'plan-plantransitionconfig'
        }
    }
});