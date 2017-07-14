Ext.define('Atlas.healthtracker.view.HealthcareVisits', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    xtype: 'healthtracker-healthcarevisits',
    title: 'Healthcare Visits',

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
            visits: {
                // model: 'Atlas.healthtracker.model.Visit',
                autoLoad: true
            }
        }
    },

    /*
     bind:{
     store: '{visits}'
     },
     */

    columns: {
        defaults: {
            width: 180
        },
        items: [
            {
                text: 'Date of Visit', dataIndex: ''
            },
            {
                text: 'Reason for Visit (Condition)', dataIndex: ''
            },
            {
                text: 'Provider', dataIndex: ''
            },
            {
                text: 'Result of Visit', dataIndex: ''
            },
            {
                text: 'New Rx?', dataIndex: ''
            },
            {
                text: 'Notes', flex: 1,dataIndex: ''
            }
        ]

    }
});
