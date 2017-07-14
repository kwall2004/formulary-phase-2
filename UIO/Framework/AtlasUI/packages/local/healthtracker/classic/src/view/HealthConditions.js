Ext.define('Atlas.healthtracker.view.HealthConditions', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    xtype: 'healthtracker-healthconditions',
    title: 'Health Conditions',

    viewModel: {
        type: 'common-shared-editgridmodel',
        data: {
            //note: this needs to move to controller with user permissions
            userpermissions: {
                create: true,
                update: true,
                destroy: true
            }
        },
        stores: {
            bmi: {
                // model: 'Atlas.healthtracker.model.BMIItem',
                autoLoad: true
            }
        }
    },

    /*
     bind:{
     store: '{bmi}'
     },
     */

    columns: {
        items: [
            {
                text: 'Condition', dataIndex: ''
            },
            {
                text: 'Symptoms began', flex: 1, dataIndex: ''
            },
            {
                text: 'How concerned', dataIndex: ''
            },
            {
                text: 'Provider', dataIndex: ''
            }
        ]
    }

});
