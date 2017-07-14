Ext.define('Atlas.healthtracker.view.HealthWeightBMI', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    xtype: 'healthtracker-healthweightbmi',
    title: 'Health/Weight/BMI',

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
        defaults: {
            width: 180
        },
        items: [
            {
                text: 'Date', dataIndex: ''
            },
            {
                text: 'Weight (in lbs)', dataIndex: ''
            },
            {
                text: 'Height (in inches)', dataIndex: ''
            },
            {
                text: 'BMI', dataIndex: ''
            },
            {
                text: 'BMI Range', dataIndex: ''
            }
        ]
    }
});
