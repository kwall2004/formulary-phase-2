Ext.define('Atlas.home.xclassview.PatientSafetyAlert', {
    extend: 'Ext.grid.Panel',

    controller: 'xclasspatientsafetyalert',
    viewModel: {
        stores: {
            patientsafetyalert: {
                model: 'Atlas.home.model.PatientSafetyAlert'
            }
        }
    },

    hideHeaders: true,

    bind: '{patientsafetyalert}',
    columns: [{
        text: 'Count',
        width: 60,
        dataIndex: 'totalCount'
    }, {
        text: 'Description',
        flex: 1,
        dataIndex: 'alertTypeName'
    }, {
        xtype: 'actioncolumn',
        iconCls: 'x-fa fa-arrow-circle-right',
        width: 40,
        handler: 'onActionItemClick'
    }],
    listeners: {
        itemdblclick: 'onItemDblClick'
    }
});