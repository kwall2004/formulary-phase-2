Ext.define('Atlas.healthtracker.view.BloodCholesterol', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    xtype: 'healthtracker-bloodcholesterol',
    title: 'Blood Cholesterol',
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
            bloodcholesterollevels: {
                // model: 'Atlas.healthtracker.model.BloodCholesterolLevel',
                autoLoad: true
            }
        }
    },

    /*
     bind:{
     store: '{bloodcholesterollevels}'
     },
     */
    columns: {
        items: [
            {
                text: 'Date', dataIndex: ''
            },
            {
                text: 'HDL (mg/dl)', dataIndex: ''
            },
            {
                text: 'LDL (mg/dl)', dataIndex: ''
            },
            {
                text: 'Triglycerides (mg/dl)', dataIndex: ''
            },
            {
                text: 'Total Cholesterol (mg/dl)', dataIndex: ''
            },
            {
                text: 'Notes', flex: 1, dataIndex: ''
            }
        ]
    }
});
