/**
 * Created by agupta on 9/7/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGHistory', {
    extend: 'Ext.panel.Panel',
    xtype: 'cdaghistory',
    controller : 'cdaghistorycontroller',
    viewModel: 'cdaghistoryviewmodel',
    flex: 10,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    height : '100%',
    width : '100%',
    items: [
        {
            xtype: 'grid',
            title : 'Member Prior Authorization History',
            bind: '{storehistoryjson}',
            flex: 10,
            columns: {
                items: [
                    {text: 'Auth ID', dataIndex: 'AuthID', width: 150},
                    {text: 'Determination Type', dataIndex: 'DeterminationType', width: 150},
                    {text: 'GCN SEQ #', dataIndex: 'GCN_SEQNO', width: 150},
                    {text: 'GPI Code', dataIndex: 'GPICode', width: 150},
                    {text: 'NDC', dataIndex: 'NDC', width: 150},
                    {text: 'Medication', dataIndex: 'medication', width: 150},
                    {text: 'Status', dataIndex: 'authStatus', width: 150},
                    {text: 'Carrier', dataIndex: 'carrierName', width: 150},
                    {text: 'Account', dataIndex: 'AccountName', width: 150},
                    {text: 'LOB', dataIndex: 'LOBName', width: 150},
                    {text: 'Urgency Type', dataIndex: 'UrgencyTypeDesc', width: 150},

                    {
                        text: 'Effective Date',
                        dataIndex: 'effDate',
                        xtype: 'datecolumn',
                        format: 'Y-m-d',
                        filter: {type: 'date'},
                        width: 220
                    },
                    {
                        text: 'Term Date',
                        dataIndex: 'termDate',
                        xtype: 'datecolumn',
                        format: 'Y-m-d',
                        filter: {type: 'date'},
                        width: 220
                    },
                    {
                        text: 'Created Date',
                        dataIndex: 'createDate',
                        xtype: 'datecolumn',
                        format: 'Y-m-d',
                        filter: {type: 'date'},
                        width: 220
                    },
                    {
                        text: 'Modified Date',
                        dataIndex: 'lastModified',
                        xtype: 'datecolumn',
                        format: 'Y-m-d',
                        filter: {type: 'date'},
                        width: 220
                    },
                    {
                        text: 'Filled Date',
                        dataIndex: 'filledDate',
                        xtype: 'datecolumn',
                        format: 'Y-m-d',
                        filter: {type: 'date'},
                        width: 220
                    }
                ]
            },
            listeners : {
                rowdblclick : 'row_dblClick'
            },
            dockedItems: [{
                xtype: 'pagingtoolbar',
                bind: '{storehistoryjson}',
                dock: 'bottom',
                displayInfo: true
            }]
        }
    ]
});