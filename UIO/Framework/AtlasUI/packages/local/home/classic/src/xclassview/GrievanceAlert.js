Ext.define('Atlas.home.xclassview.GrievanceAlert', {
    extend: 'Ext.grid.Panel',

    controller: 'xclassgrievancealert',
    viewModel: {
        stores: {
            grievancealert: {
                model: 'Atlas.home.model.GrievanceAlert'
            }
        }
    },

    hideHeaders: true,

    bind: '{grievancealert}',
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