Ext.define('Atlas.home.xclassview.MTMAlert', {
    extend: 'Ext.grid.Panel',

    controller: 'xclassmtmalert',
    viewModel: {
        stores: {
            casemanagementalert: {
                model: 'Atlas.home.model.MTMAlert'
            }
        }
    },

    hideHeaders: true,

    bind: '{casemanagementalert}',
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