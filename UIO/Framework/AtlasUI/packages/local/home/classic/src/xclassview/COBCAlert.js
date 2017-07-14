Ext.define('Atlas.home.xclassview.COBCAlert', {
    extend: 'Ext.grid.Panel',

    controller: 'xclasscobcalert',
    viewModel: {
        stores: {
            cobcalert: {
                model: 'Atlas.home.model.COBCAlert'
            }
        }
    },

    hideHeaders: true,
    bind: '{cobcalert}',
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