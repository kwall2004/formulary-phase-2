Ext.define('Atlas.home.xclassview.LocksAlert', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.grid.feature.Grouping'
    ],

    controller: 'xclasslocksalert',
    viewModel: {
        stores: {
            locksalert: {
                model: 'Atlas.home.model.LocksAlert',
                groupField: 'ttypegroup'
            }
        }
    },

    hideHeaders: true,

    bind: '{locksalert}',
    columns: [{
        text: 'Count',
        width: 60,
        dataIndex: 'ttcount'
    }, {
        text: 'Status',
        flex: 1,
        dataIndex: 'ttstatus'
    }, {
        xtype: 'actioncolumn',
        iconCls: 'x-fa fa-arrow-circle-right',
        width: 40,
        handler: 'onActionItemClick'
    }],
    listeners: {
        itemdblclick: 'onItemDblClick'
    },

    features: [{
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: '<span style="font-weight:bold">{name}</span>'
    }]
});