Ext.define('Atlas.healthtracker.view.MedicationSupplement', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    xtype: 'healthtrcker-medicationsupplement',

    title: 'Medication/Supplements',

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
            supplements: {
                // model: 'Atlas.healthtracker.model.MedicationSuplimentItem',
                autoLoad: true
            }
        }
    },

    /*
     bind:{
     store: '{supplements}'
     },
     */

    columns: {
        defaults: {
            width: 180
        },
        items: [
            {
                text: 'Medicine Name', dataIndex: ''
            },
            {
                text: 'Strength', dataIndex: ''
            },
            {
                text: 'What dosage do you take', dataIndex: ''
            },
            {
                text: 'How often do you take this?', dataIndex: ''
            },
            {
                text: 'Start Date', dataIndex: ''
            },
            {
                text: 'Why do you take this?', flex: 1, dataIndex: ''
            }
        ]
    }
});
