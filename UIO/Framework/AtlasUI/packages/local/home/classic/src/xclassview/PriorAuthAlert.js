Ext.define('Atlas.home.xclassview.PriorAuthAlert', {
    extend: 'Ext.grid.Panel',

    controller: 'xclasspriorauthalert',
    viewModel: {
        stores:{
            priorauthsummaryalert: {
                model: 'Atlas.home.model.PriorAuthAlert'
            }
        }
    },

    hideHeaders: true,

    bind:  '{priorauthsummaryalert}',
    columns: [{
        text: 'Count',
        width: 60,
        dataIndex: 'totalCount'
    }, {
        text: 'Description',
        flex: 1,
        dataIndex: 'authStatusDesc',
        renderer: function (value, metaData, record, row, col, store, gridView) {
            var item = record.data.authStatusDesc;
            if (item.indexOf('Concurrent') > -1 || item.indexOf('IRE')>-1 || item.indexOf('Medicare Urgent') > -1 ){
                return '<SPAN style="COLOR: red">' + item + '</SPAN>'
            }
            else if ( item.indexOf('Pending General Letters') > -1 || item.indexOf('Approved General Letters') > -1 ){
                return '<SPAN style="COLOR: green">' + item + '</SPAN>'
            }
            else {
                return item;
            }
        }
    }, {
        xtype: 'actioncolumn',
        iconCls: 'x-fa fa-arrow-circle-right',
        width: 40,
        handler: 'onActionItemClick'
    }]
});
