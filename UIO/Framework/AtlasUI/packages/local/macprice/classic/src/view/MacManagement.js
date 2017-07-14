Ext.define('Atlas.macprice.view.MacManagement', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.MacManagement',
    itemId: 'MacManagementGrid',
    title: 'MAC Approval',
    controller: 'MacManagementController',
    viewModel: 'MacManagementModel',

    bind: {
        store: '{MacList}'
    },

    dockedItems: [
        {
            xtype: 'pagingtoolbar',
            bind: '{MacList}',
            pageSize: 28,
            displayInfo: true,
            dock: 'bottom'
        }
    ],
    columns: {
        defaults: {
            flex: 1
        },
        items: [
            { text: 'MAC List ID', dataIndex: 'MACListID', hidden: true},
            { text: 'Name', dataIndex: 'MACListName'},
            { text: 'Data Source', dataIndex: 'DataSource', width: '50'},
            { text: 'Version', dataIndex: 'MACListVersion', width: '50'},
            { text: 'Mark Up %', dataIndex: 'MarkUpPct', width: '50'},
            { text: 'AWP Disc. %', dataIndex: 'AWPDiscountPct', width: '50'},
            { text: 'WAC Disc. %', dataIndex: 'WACDiscountPct', width: '50'},
            { text: 'Status', dataIndex: 'Stat'},
            { text: 'Effective Date', dataIndex: 'EffectiveDate', xtype: 'datecolumn', format: 'm/d/Y'},
            { text: 'Termination Date', dataIndex: 'TerminationDate', xtype: 'datecolumn', format: 'm/d/Y'},
            { text: 'Last Update By', dataIndex: 'LastUpdateBy'},
            { text: 'Last Updated On', dataIndex: 'LastUpdatedDate', xtype: 'datecolumn', format: 'm/d/Y'},
            {
                text: 'Approve/Reject',
                xtype: 'actioncolumn',
                iconCls: 'x-fa fa-exchange',
                hideable: false,
                align: 'center',
                handler: 'onAppRejClick'
            }
        ]
    }

});
