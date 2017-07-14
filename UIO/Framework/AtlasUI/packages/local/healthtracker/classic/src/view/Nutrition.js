Ext.define('Atlas.healthtracker.view.Nutrition', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    xtype: 'healthtracker-nutrition',
    title: 'Nutrition',
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
            nutrition: {
                // model: 'Atlas.healthtracker.model.NutritionItem',
                autoLoad: true
            }
        }
    },

    /*
     bind:{
     store: '{nutrition}'
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
                text: 'Breakfast Notes', dataIndex: ''
            },
            {
                text: 'Lunch', dataIndex: ''
            },
            {
                text: 'Dinner', dataIndex: ''
            },
            {
                text: 'Snacks', dataIndex: ''
            },
            {
                text: 'Notes', dataIndex: ''
            }
        ]
    }
});
