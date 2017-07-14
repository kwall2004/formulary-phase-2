Ext.define('Atlas.healthtracker.view.Exercise', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    xtype: 'healthtrack-erexcercise',
    title: 'Exercise',
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
            excercises: {
                // model: 'Atlas.healthtracker.model.ExceriseItem',
                autoLoad: true
            }
        }
    },

    /*
     bind:{
     store: '{exercises}'
     },
     */

    columns: {
        items: [
            {
                text: 'Date', dataIndex: ''
            },
            {
                text: 'Type', dataIndex: ''
            },
            {
                text: 'How Long? (in minutes)', dataIndex: ''
            },
            {
                text: 'How did you feel?', flex: 1,dataIndex: ''
            }
        ]
    }
});
