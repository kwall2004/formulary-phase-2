Ext.define('Atlas.healthtracker.view.BloodA1C', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    xtype: 'healthtracker-blooda1c',
    title: 'Blood A1C',
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
            blooda1c: {
                // model: 'Atlas.healthtracker.model.BloodA1C',
                autoLoad: true
            }
        }
    },

    /*
     bind:{
     store: '{blooda1c}'
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
                text: 'Hemoglobin A1C', dataIndex: ''
            },
            {
                text: 'Notes', flex: 1, dataIndex: ''
            }
        ]
    }
});
