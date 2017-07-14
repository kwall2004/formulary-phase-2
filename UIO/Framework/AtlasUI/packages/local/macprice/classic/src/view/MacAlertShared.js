Ext.define('Atlas.macprice.view.MacAlertShared', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.MacAlertShared',
    xtype: 'MacAlertShared',
    itemId: 'MacAlertSharedGrid',
    title: 'Change Alerts',
    iconCls: 'x-fa fa-bell-o',
    controller: 'MacAlertSharedController',
    sourceCall: null,

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    itemId: 'btnSelectAll',
                    text: 'Select All',
                    iconCls: 'x-fa fa-check-circle',
                    handler: 'onSelectAll'
                },
                {
                    xtype: 'button',
                    itemId: 'btnDeselectAll',
                    text: 'Deselect All',
                    iconCls: 'x-fa fa-circle-thin',
                    handler: 'onDeselectAll'
                },
                {
                    xtype: 'button',
                    itemId: 'btnAcknowledge',
                    text: 'Acknowledge',
                    iconCls: 'x-fa fa-check',
                    handler: 'onAction'
                },
                {
                    xtype: 'button',
                    itemId: 'btnSubmit',
                    text: 'Submit for Approval',
                    iconCls: 'x-fa fa-tasks',
                    handler: 'onAction'
                },
                {
                    xtype: 'button',
                    itemId: 'btnMove',
                    text: 'Move To Received',
                    iconCls: 'x-fa fa-level-down',
                    handler: 'onAction'
                }, '->',
                {
                    xtype: 'button',
                    itemId: 'btnApprove',
                    text: 'Approve',
                    iconCls: 'x-fa fa-check-circle',
                    handler: 'onAction'
                },
                {
                    xtype: 'button',
                    itemId: 'btnReject',
                    text: 'Reject',
                    iconCls: 'x-fa fa-times',
                    handler: 'onAction'
                },
                {
                    xtype: 'button',
                    itemId: 'btnDelete',
                    text: 'Delete From Monitoring List',
                    iconCls: 'x-fa fa-times',
                    handler: 'onDeleteFromMonitoring'
                },
                {
                    xtype: 'button',
                    itemId: 'btnUpload',
                    text: 'Upload MAC Price',
                    iconCls: 'x-fa fa-upload',
                    handler: 'onUpload'
                },
                {
                    xtype: 'button',
                    itemId: 'btnExport',
                    text: 'Export To Excel',
                    iconCls: 'x-fa fa-file-excel-o',
                    handler: 'onExport'
                },
                {
                    xtype: 'button',
                    itemId: 'btnSendEmail',
                    iconCls: 'x-fa fa-paper-plane',
                    tooltip: 'Send Approval Request Email',
                    handler: 'onSendEmail'
                },
                {
                    xtype: 'button',
                    itemId: 'btnRefresh',
                    iconCls: 'x-fa fa-refresh',
                    tooltip: 'Refresh',
                    handler: 'onRefresh'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            itemId: 'gridPagingToolbar',
            displayInfo: 'true',
            pageSize: 25,
            doRefresh: function() {
                this.store.loadPage(1);
            },
            listeners: {
                beforechange: 'getSelectedPageData',
                afterrender: function() {
                    this.getComponent('refresh').hide();
                }
            }
        }
    ],

    bind: {
        store: '{MacPriceChangeAlert}'
    },

    listeners : {
        rowdblclick : 'row_dblClick'
    }

});
