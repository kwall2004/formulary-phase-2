/**
 * Created by b2352 on 12/21/2016.
 */

Ext.define('Atlas.plan.view.ProgramCodeViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.plan-programcode',

   // type: 'common-shared-editgridmodel',

    data: {
        //note: this needs to move to controller with user permissions
        userpermissions: {
            create: true,
            update: true,
            destroy: true
        }
    },

    stores: {
        // plangroups: {
        //     type: 'plan-plangroups'
        // },
        plangroups: {
            model:'Atlas.common.model.PlanGroup',
            remoteSort:true,
            remoteFilter: true
        },
        programcodes: {
            type: 'plan-planprogramcodes'
        },

        planbenefitlistItem: {
            type: 'plan-planbenefitlistitem'
        },

        plangroupriders: {
            type: 'plan-plangroupriders'
        }
    }
});