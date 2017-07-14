/**
 * Created by T4317 on 10/24/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimCompoundsInfo', {
    extend: 'Ext.grid.Panel',
    closable: true,
    bind: {
        store: '{compounds}'
    },
    columns: [{
        text: 'Compound NDC',
        dataIndex: 'productId',
        flex: 1
    }, {
        text: 'Medication name',
        dataIndex: 'productName',
        flex: 2
    }, {
        text: 'GCN Seq#',
        dataIndex: 'GCN_SEQNO',
        flex: 1
    }, {
        text: 'GPI Code',
        dataIndex: 'GPICode',
        flex: 1
    }, {
        text: 'Ing Qty',
        dataIndex: 'ingQty',
        align: 'end',
        flex: 1
    }, {
        xtype: 'numbercolumn',
        text: 'Ing Cost Submitted',
        dataIndex: 'ingCostSub',
        format: '$0,0.00',
        align: 'end',
        flex: 1
    }, {
        xtype: 'numbercolumn',
        text: 'Ing Cost Paid',
        dataIndex: 'ingCostPaid',
        format: '$0,0.00',
        align: 'end',
        flex: 1
    }]
});
