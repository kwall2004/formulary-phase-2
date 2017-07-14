Ext.define('Atlas.home.xclassview.PharmacyAuditAlert', {
    extend: 'Ext.grid.Panel',

    controller: 'xclasspharmacyauditalert',
    viewModel: {
        stores: {
            pharmacyauditalert: {
                model: 'Atlas.home.model.PharmacyAuditAlert'
            }
        }
    },

    hideHeaders: true,

    bind: '{pharmacyauditalert}',
    columns: [{
        text: 'Count',
        width: 60,
        dataIndex: 'TotalCount'
    }, {
        text: 'Description',
        flex: 1,
        dataIndex: 'Description'
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