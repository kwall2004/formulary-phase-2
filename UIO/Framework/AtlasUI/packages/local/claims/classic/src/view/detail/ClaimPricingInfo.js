/**
 * Created by T4317 on 10/24/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimPricingInfo', {
    extend: 'Ext.panel.Panel',
    title: 'Pricing Info',
    closable: true,
    width: '100%',
    height: '100%',
    layout : {
        type : 'vbox',
        align : 'stretch'
    },
    items: [
        {
            xtype: 'panel',

            //flex: 1,
            layout: 'hbox',
            items: [{
                xtype: 'gridpanel',
                title: 'Pharmacy Pricing Detail',

                flex: 1,
                bind: {
                    store: '{pricing}'
                },
                columns: [{
                    text: 'Contract ID',
                    dataIndex: 'contractId',
                    flex: 1
                }, {
                    text: 'Cost Basis',
                    dataIndex: 'costBasis',
                    flex: 1
                }, {
                    xtype: 'numbercolumn',
                    text: 'Unit price',
                    dataIndex: 'unitPrice',
                    align:'right',
                    format: '$0,0.00000',
                    flex: 1
                }, {
                    xtype: 'numbercolumn',
                    text: 'Discount %',
                    dataIndex: 'discpercent',
                    align:'right',
                    format: '0,0.000%',
                    flex: 1
                }, {
                    xtype: 'numbercolumn',
                    text: 'Discount Amt.',
                    dataIndex: 'discAmount',
                    align:'right',
                    format: '$0,0.00000',
                    flex: 1
                }, {
                    xtype: 'numbercolumn',
                    text: 'Final price',
                    dataIndex: 'finalPrice',
                    align:'right',
                    format: '$0,0.00000',
                    flex: 1
                }, {
                    xtype: 'numbercolumn',
                    text: 'Dispense Fee',
                    dataIndex: 'dispFee',
                    align:'right',
                    format: '$0,0.00000',
                    flex: 1
                }, {
                    xtype: 'checkcolumn',
                    disabled:true,
                    text: 'Used',
                    dataIndex: 'usedForClaimPricing',
                    flex: 1
                }]
            }, {
                xtype: 'gridpanel',
                title: 'Plan Pricing Detail',
                
                flex: 1,
                bind: {
                    store: '{storePlanPricing}',
                    hidden: '{!planpricing}'
                },
                columns: [{
                    text: 'Cost Basis',
                    dataIndex: 'costBasis',
                    flex: 1
                }, {
                    xtype: 'numbercolumn',
                    text: 'Unit price',
                    dataIndex: 'unitPrice',
                    format: '$0,0.00000',
                    flex: 1
                }, {
                    xtype: 'numbercolumn',
                    text: 'Discount %',
                    dataIndex: 'discpercent',
                    format: '0,0.000%',
                    flex: 1
                }, {
                    xtype: 'numbercolumn',
                    text: 'Discount Amt.',
                    dataIndex: 'discAmount',
                    format: '$0,0.00000',
                    flex: 1
                }, {
                    xtype: 'numbercolumn',
                    text: 'Final price',
                    dataIndex: 'finalPrice',
                    format: '$0,0.00000',
                    flex: 1
                }, {
                    xtype: 'numbercolumn',
                    text: 'Dispense Fee',
                    dataIndex: 'dispFee',
                    format: '$0,0.00000',
                    flex: 1
                }]
            }]
        },
        {
            xtype: 'ClaimDetailStatusDrugPricing',
            flex: 1,
            autoScroll : true,
            overFlowX : 'scroll',
            overFlowY : 'scroll'
        },
        {
            bbar: [{
                xtype: 'displayfield',
                bind: {
                    value: '{paidcontracttext}'
                }
            }
            ]
        }
    ]
});
