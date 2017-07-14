Ext.define('Atlas.home.xclassview.DMRAlert', {
    extend: 'Ext.grid.Panel',

    controller: 'xclassdmralert',
    viewModel: {
        stores: {
            dmralert: {
                model: 'Atlas.home.model.DMRAlert'
            }
        }
    },

    hideHeaders: true,

    bind: '{dmralert}',
    columns: [{
        text: 'Count',
        width: 60,
        dataIndex: 'totalCount'
    }, {
        text: 'Description',
        flex: 1,
        dataIndex: 'StatusDescription'
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