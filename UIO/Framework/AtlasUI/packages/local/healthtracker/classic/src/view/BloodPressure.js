Ext.define('Atlas.healthtracker.view.BloodPressure', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    xtype: 'healthtracker-bloodpressure',
    title: 'Blood Pressure',
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
            bloodpressurelevels: {
                // model: 'Atlas.healthtracker.model.BloodPressureLevel',
                autoLoad: true
            }
        }
    },

    /*
     bind:{
     store: '{bloodpressurelevels}'
     },
     */
    columns: {
        defaults: {
            width: 180
        },
        items: [
            {
                text: 'Date', flex: 1,dataIndex: ''
            },
            {
                text: 'Systolic', dataIndex: ''
            },
            {
                text: 'Diastolic', dataIndex: ''
            },
            {
                text: 'Pulse', dataIndex: ''
            }
        ]
    }

});
