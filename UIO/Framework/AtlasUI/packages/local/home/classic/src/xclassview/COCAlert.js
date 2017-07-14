Ext.define('Atlas.home.xclassview.COCAlert', {
    extend: 'Ext.grid.Panel',

    controller: 'xclasscocalert',
    viewModel: {
        stores: {
            cocalert: {
                model: 'Atlas.home.model.COCAlert'
            }
        }
    },

    hideHeaders: true,

    bind: '{cocalert}',
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