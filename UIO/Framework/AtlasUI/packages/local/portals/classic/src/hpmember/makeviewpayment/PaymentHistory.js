/**
 * Created by t3852 on 10/19/2016.
 */
Ext.define('Atlas.portals.view.hpmember.makeviewpayment.PaymentHistory', {
    extend: 'Ext.Container',
    xtype: 'portalshpmemberpaymenthistory',
    title: 'Payment History',

    controller: 'paymenthistoryview',
    viewModel: {
        stores: {
            paymentHistory: {
                model: 'Atlas.portals.hpmember.model.MemberPremiumWeb'
            }
        },
        data: {
            familyList: null
        }
    },

    scrollable: true,
    items: [{
        xtype: 'container',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [
            {
                xtype: 'form',
                bodyPadding: '15 50 15 15',
                cls: 'card-panel',
                title: 'Selections',
                reference: 'paymentHistoryForm',
                minWidth: 680,
                maxWidth: 680,
                defaults: {
                    labelWidth: 75,
                    width: 500,
                    align: 'center',
                    style: {
                        padding: '5px'
                    }
                },
                items: [
                            {
                                xtype: 'combo',
                                reference: 'familyListCombo',
                                fieldLabel: 'Member',
                                queryMode: 'local',
                                displayField: 'name',
                                valueField: 'value',
                                name: 'familyCombo'
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'From',
                                value: Ext.Date.add(new Date(), Ext.Date.MONTH, -6),
                                maxValue: new Date(),
                                name: 'fromDate',
                                format: 'm/d/y'
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'To',
                                value: new Date(),
                                maxValue: new Date(),
                                name: 'toDate',
                                format: 'm/d/y'
                            },
                            {
                                xtype: 'container',
                                width: '100%',
                                layout: {
                                    pack: 'center',
                                    align: 'center',
                                    type: 'hbox'
                                },
                                items: {
                                    xtype: 'button',
                                    text: 'Search',
                                    width: 200,
                                    align: 'center',
                                    iconCls: 'x-fa fa-share-square-o',
                                    handler: 'searchPaymentHistory'
                                }
                            }
                        ]
            },
            {
                xtype: 'gridpanel',
                cls: 'card-panel',
                minWidth: 680,
                maxWidth: 680,
                title: 'Payment History',
                bind: '{paymentHistory}',
                columns: [
                    {
                        text: 'Payment Date',
                        dataIndex: 'paymentDueDate',
                        formatter: 'date("m/d/Y")',
                        flex: 3
                    },
                    {
                        text: 'Amount',
                        dataIndex: 'paymentAmountDue',
                        formatter: 'usMoney',
                        align: 'right',
                        flex: 1
                    }
                ]
            }
        ]

    }]

});