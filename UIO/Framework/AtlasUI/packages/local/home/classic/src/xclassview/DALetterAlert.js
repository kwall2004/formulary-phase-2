Ext.define('Atlas.home.xclassview.DALetterAlert', {
    extend: 'Ext.grid.Panel',

    controller: 'xclassdaletteralert',
    viewModel: {
        stores: {
            daletteralert: {
                model: 'Atlas.home.model.DALetterAlert'
            }
        }
    },

    hideHeaders: true,

    bind: '{daletteralert}',
    columns: [{
        text: 'Count',
        width: 60,
        dataIndex: 'tTotalCount'
    }, {
        text: 'Description',
        flex: 1,
        dataIndex: 'tDescription'
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