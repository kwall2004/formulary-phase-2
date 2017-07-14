/**
 * This Class represents the State License Add Poppup of the Credentialing Pharmacy Tab
 */
Ext.define('Atlas.pharmacy.view.credentialing.popups.NcpdpSourceData', {
    extend: 'Ext.window.Window',
    width: 500,
    height: 400,
    title: 'NCPDP State License Details',
    items: [{
        xtype: 'grid',
        reference: 'ncpdpSourceWin',
        bind: {
            store: '{statelicensencpdphistory}'
        },
        columns: [
            {text: 'NCPDIP', flex: 1, dataIndex: 'ncpdipid'},
            {text: 'State', flex: 1, dataIndex: 'LicenseStateCode'},
            {text: 'License Number', flex: 1, dataIndex: 'stateLicenseNumber'},
            {
                text: 'Expiration Date', flex: 1, dataIndex: 'stateLicenseExpDate', xtype: 'datecolumn', format: 'm/d/Y', filter: {type: 'date'},
                renderer : function(value, metaData) {
                    var dt = '';
                    if (value) {
                        dt = Ext.Date.format(new Date(value), 'm/d/Y');
                    }
                    return dt;
                }
                },
            {text: 'Deleted Date', flex: 1, dataIndex: 'deleteDate'}
        ]
    }],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Close',
                    handler: function (btn) {
                        btn.up('window').close()
                    }
                }
            ]
        }
    ]
});