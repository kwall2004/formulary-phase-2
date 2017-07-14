Ext.define('Atlas.provider.view.vendor.VendorGrid', {
    extend: 'Ext.grid.Panel',

    xtype: 'providerportal-vendor-vendorgrid',

    disableSelection: true,
    columns: [{
        text: 'Check/EFT Number',
        dataIndex: 'eftNumber'
    }, {
        text: 'Date',
        dataIndex: 'date'
    }, {
        text: 'LOB',
        dataIndex: 'lob'
    }, {
        text: 'Check Name',
        dataIndex: 'checkName'
    }, {
        text: 'Bank',
        dataIndex: 'bank'
    }, {
        text: 'Account Num',
        dataIndex: 'accountNum'
    }, {
        text: 'Previous Balance',
        dataIndex: 'previousBalance'
    }, {
        text: 'Remit Amt',
        dataIndex: 'remitAmt'
    }, {
        text: 'Balance Due',
        dataIndex: 'balanceDue'
    }, {
        text: 'Payment Amt',
        dataIndex: 'paymentAmt'
    }, {
        text: 'Type',
        dataIndex: 'type'
    }, {
        text: 'Void',
        dataIndex: 'void'
    }, {
        text: 'Recon Date',
        dataIndex: 'reconDate'
    }, {
        text: 'Seq Num',
        dataIndex: 'seqNum'
    }],
    // paging bar on the bottom
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});
