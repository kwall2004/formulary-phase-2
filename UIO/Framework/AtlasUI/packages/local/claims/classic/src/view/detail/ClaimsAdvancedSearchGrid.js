Ext.define('Atlas.claims.view.detail.ClaimsAdvancedSearchGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'claimsAdvancedSearchGrid',
    title: '',
    bind: '{claims}',
    columns: [
        { text: 'Claim #', sortable: true, dataIndex: 'claimNumber', flex: 1 },
        { text: 'Meridian Rx ID', sortable: true, dataIndex: 'meridianRxId', flex: 1 },
        { text: 'Member Name', sortable: true, dataIndex: 'memberName', flex: 1 },
        { text: 'Carrier', sortable: true, dataIndex: 'carrier', flex: 1 },
        { text: 'Account', sortable: true, dataIndex: 'account', flex: 1 },
        { text: 'LOB', sortable: true, dataIndex: 'lob', flex: 1 },
        { text: 'NDC', sortable: true, dataIndex: 'ndc', flex: 1 },
        { text: 'Medication', sortable: true, dataIndex: 'medication', flex: 1 },
        { text: 'Service Date', sortable: true, dataIndex: 'serviceDate', flex: 1 },
        { text: 'Status', sortable: true, dataIndex: 'status', flex: 1 },
        { text: 'Rx Num', sortable: true, dataIndex: 'rxNum', flex: 1 },
        { text: 'ncpdpid', sortable: true, dataIndex: 'ncpdpid', flex: 1 },
        { text: 'Pharmacy Name', sortable: true, dataIndex: 'pharmacyName', flex: 1 },
        { text: 'Prescriber NPI', sortable: true, dataIndex: 'prescriberNpi', flex: 1 },
        { text: 'Prescriber Name', sortable: true, dataIndex: 'prescriberName', flex: 1 }

    ],
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        displayInfo: true,
        emptyMsg: 'No Records Found',
        bind: {
            store: '{claims}'
        },
        items: [{
            xtype: 'container',
            items: [{
                xtype: 'button',
                text: 'Export to Excel',
                iconCls: 'x-fa fa-file-excel-o',
                menuAlign: 'tr-br?'
            }]
        }],
        layout: 'hbox'
    }],
    viewConfig: { stripeRows: true },
    height: 300,
    scrollable: true
});
