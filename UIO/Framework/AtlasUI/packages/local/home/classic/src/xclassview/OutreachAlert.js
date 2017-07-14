Ext.define('Atlas.home.xclassview.OutreachAlert', {
    extend: 'Ext.grid.Panel',

    controller: 'xclassoutreachalert',
    viewModel: {
        stores: {
            outreachalert: {
                model: 'Atlas.home.model.OutreachAlert'
            }
        }
    },

    hideHeaders: true,

    bind: '{outreachalert}',
    columns: [{
        text: 'Count',
        width: 60,
        dataIndex: 'AlertCount'
    }, {
        text: 'Description',
        flex: 1,
        dataIndex: 'AlertDescription'
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