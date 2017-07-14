Ext.define('Atlas.home.xclassview.FinanceCollectionAlert', {
    extend: 'Ext.grid.Panel',

    controller: 'xclassfinancecollectionalert',
    viewModel: {
        stores: {
            financecollectionalert: {
                model: 'Atlas.home.model.FinanceCollectionAlert'
            }
        }
    },

    hideHeaders: true,

    bind: '{financecollectionalert}',
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
        width: 40
    }]
});