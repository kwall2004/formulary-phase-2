Ext.define('Atlas.healthtracker.view.BloodSugar', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    xtype: 'healthtracker-bloodsugar',
    title: 'Blood Sugar',
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
            bloodsugerlevels: {
                // model: 'Atlas.healthtracker.model.BloodSugarLevel',
                autoLoad: true
            }
        }
    },

    /*
     bind:{
     store: '{bloodsugerlevels}'
     },
     */
    columns: {
        defaults: {
            width: 180
        },
        items: [
            {
                text: 'Date', dataIndex: ''
            },
            {
                text: 'Time of Day', dataIndex: ''
            },
            {
                text: 'Blood Sugar Level (in mg/dl)', dataIndex: ''
            },
            {
                text: 'Notes',flex: 1, dataIndex: ''
            }
        ]
    }

});
