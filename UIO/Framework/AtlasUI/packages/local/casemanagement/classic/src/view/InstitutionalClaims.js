/**
 * Created by mkorivi on 11/11/2016.
 */

Ext.define('Atlas.casemanagement.view.InstitutionalClaims', {
    extend: 'Ext.panel.Panel',
    xtype: 'institutionalclaims',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    width: '100%',
    height: '100%',
    items: [
        {
            xtype: 'grid',
            title: 'Claim Header',
            frame: true,
            flex: 5,
            scrollable: true,
            //height:'450',
            reference: 'institutionalGrid',
            listeners: {
                select: 'institutionalGridSelect'
            },
            columns: {
                items: [
                    {text: 'Claim#', dataIndex: 'claimNumber', flex: 1},
                    {text: 'Serv. Date', dataIndex: 'stmtFromDate', xtype: 'datecolumn', format: 'm/d/Y', flex: 1},
                    {text: 'Prov. ID', dataIndex: 'servProvId', flex: 1},
                    {text: 'Prov. Name', dataIndex: 'servProvName', flex: 1},
                    {text: 'POS', dataIndex: 'pos', flex: 1},
                    {text: 'TOB', dataIndex: 'billType', flex: 1},
                    {text: 'DRG', dataIndex: 'drgCode', flex: 1},
                    {text: 'Diag 1', dataIndex: 'diagCd1', flex: 1},
                    {text: 'Diag 2', dataIndex: 'diagCd2', flex: 1},
                    {text: 'Account#', dataIndex: 'ptnAccountNum', flex: 1},
                    {text: 'LOB', dataIndex: 'lobID', flex: 1}
                ]
            },

            bind: '{StoreClaimHeader}',
            dockedItems: [{
                dock: 'bottom',
                xtype: 'pagingtoolbar',
                bind: {
                    store: '{StoreClaimHeader}'
                },
                pageSize: 12,
                displayInfo: true

            }]
        }, /*Grid*/
        {
            xtype: 'grid',
            title: 'Claim Details',
            frame: true,
            flex: 5,
            scrollable: true,
            columns: {
                items: [
                    {text: 'Status', dataIndex: 'claimStatusDesc', flex: 1},
                    {text: 'Line#', dataIndex: 'lineNUm', flex: 1},
                    {text: 'Rev Code', dataIndex: 'revCode', flex: 1},
                    {text: 'HCPCS', dataIndex: 'procCd', flex: 1},
                    {text: 'Rate', dataIndex: 'rate', flex: 1},
                    {text: 'Serv From', dataIndex: 'servFromDate', xtype: 'datecolumn', format: 'm/d/Y', flex: 1},
                    {text: 'Units', dataIndex: 'units', flex: 1},
                    {text: 'Charge', dataIndex: 'chargeAmt', flex: 1},
                    {text: 'Paid Amt.', dataIndex: 'netAmount', flex: 1},
                    {text: 'Non-Covered Charges', dataIndex: 'nonCoveredAmt', flex: 1}
                ]
            },
            bind: '{StoreClaimDetails}',
            dockedItems: [{
                dock: 'bottom',
                xtype: 'pagingtoolbar',
                bind: {
                    store: '{StoreClaimDetails}'
                },
                pageSize: 24,
                displayInfo: true
            }]
        }/*Grid*/
    ]
});
