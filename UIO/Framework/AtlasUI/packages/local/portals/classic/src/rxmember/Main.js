Ext.define('Atlas.portals.view.rxmember.Main',{

    extend: 'Ext.panel.Panel',

    xtype: 'portalsrxmembermain',

    controller: 'portalsRxmemberMainController',

    viewModel: 'portalsRxmemberMainModel',

    title: 'Home',

    scrollable: 'y',

    layout: {
        type: 'vbox',
        align: 'center'
    },

    defaults: {
        width: '80%',
        margin: '5 0'
    },

    items: [
        {
            xtype: 'panel',
            cls: 'card-panel',
            tbar: [
                {
                    xtype: 'label',
                    style: {
                        fontSize: 'large',
                        fontWeight: 'bold'
                    },
                    bind: {
                        text: 'Welcome, {userModel.FullName}'
                    }
                },
                '->',
                {
                    xtype: 'container',
                    layout: 'vbox',
                    defaults: {
                        style: {
                            color: 'black'
                        }
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Member Number:',
                                    width: 120,
                                    style: {
                                        fontWeight: 'bold'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    bind: {
                                        text: '{userModel.MemberID}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Current Plan:',
                                    width: 120,
                                    style: {
                                        fontWeight: 'bold'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    reference: 'memberCurrentPlans'
                                }
                            ]
                        }
                    ]

                }
            ],
            defaults: {
                style: {
                    marginRight: '8px',
                    marginBottom: '8px'
                }
            },
            items: [
                {
                    xtype: 'gridpanel',
                    title: 'Overdue Prescriptions',
                    columns: [
                        { text: 'Claim ID', dataIndex: 'claimID' },
                        {
                            text: 'Description',
                            dataIndex: 'medication',
                            flex: 1,
                            renderer: function(value) {
                                return '<span style="color: red;">' + value + '</span>';
                            }
                        },
                        {
                            xtype: 'widgetcolumn',
                            menuDisabled: true,
                            sortable: false,
                            align: 'center',
                            width: 240,
                            widget: {
                                xtype: 'container',
                                items: [
                                    {
                                        xtype: 'button',
                                        iconCls: 'x-fa fa-search',
                                        text: 'View',
                                        handler: 'goToClaims',
                                        width: 70
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'x-fa fa-check',
                                        text: 'Acknowledge',
                                        handler: 'ackOverdueClaim',
                                        width: 130
                                    }
                                ]
                            }
                        }
                    ],
                    bind: {
                        store: '{overduePrescriptions}',
                        hidden: '{!hasOverduePrescriptions}'
                    }
                },
                {
                    xtype: 'container',
                    constrain: true,
                    layout: {
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'container',
                            style: {
                                marginLeft: '-8px'
                            },
                            html: '<img height="317" width="531" src="resources/images/PCP_Image.png" />'
                        },
                        {
                            flex: 1,
                            xtype: 'container',
                            margin: '0 0 0 5px',
                            html: '<h3>Better your health</h3>' + '<h3>Lower your health care costs</h3>' +
                                '<p>Preventive care is the most important step you can take to manage your health. ' +
                                'Many of the top risk factors leading to illness and premature death are preventable.' +
                                ' Preventing these risk factors and detecting them early are important to living a ' +
                                'healthy life.' + '<br /><br />' + 'Follow the guidelines and advice of your PCP to ' +
                                'help you stay healthy. Talk to your PCP if you have specific health questions.</p>'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'gridpanel',
            cls: 'card-panel',
            title: 'My Coverage',
            hidden: true,
            columns: [
                { text: 'Plan', dataIndex: 'CarrierName', flex: 1 },
                { text: 'Plan Type', dataIndex: 'LOBName', flex: 1 },
                { text: 'Effective Date', dataIndex: 'EffDate', flex: 1, renderer: function (date) {
                    if (date !== undefined) {
                        return Atlas.common.utility.Utilities.formatDate(new Date(date), 'm/d/Y');
                    }

                    return '';
                }},
                { text: 'Termination Date', dataIndex: 'TermDate', flex: 1, renderer: Ext.util.Format.dateRenderer('m/d/Y')}
            ],
            reference: 'memberCoveragesRef',
            bbar: {
                xtype: 'toolbar',
                items: [
                    '->',
                    {
                        xtype: 'button',
                        text: 'Learn more about my Benefit and Coverage',
                        handler: 'goToMyBenefits'
                    }
                ]
            }
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            defaults: {
                flex: 1
            },
            items: [
                {
                    xtype: 'gridpanel',
                    title: 'My Prescription Expenses',
                    cls: 'card-panel',
                    margin: '0 5 0 0',
                    bind: {
                        store: '{prescriptionExpenses}'
                    },
                    tbar: {
                        xtype: 'toolbar',
                        items: [
                            {
                                xtype: 'combo',
                                reference: 'yearCombo',
                                fieldLabel: 'Select Year',
                                queryMode: 'local',
                                displayField: 'value',
                                valueField: 'value',
                                listeners: {
                                    change: 'onYearSelected'
                                }
                            },
                            '->',
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Total Amount You Paid: $',
                                bind: {
                                    value: '{totalAmount}'
                                }
                            }
                        ]
                    },
                    columns: [
                        { text: 'Month', dataIndex: 'itemDescription', flex: 1, sortable: false, menuDisabled: true },
                        { text: 'Amount', dataIndex: 'displayAmt', flex: 1, sortable: false, menuDisabled: true },
                        {
                            xtype: 'actioncolumn',
                            menuDisabled: true,
                            sortable: false,
                            align: 'center',
                            items: [{
                                xtype: 'button',
                                iconCls: 'x-fa fa-search',
                                handler: 'goToMyClaims'
                            }]
                        }
                    ],
                    bbar: {
                        xtype: 'toolbar',
                        items: [
                            '->',
                            {
                                xtype: 'button',
                                text: 'View my prescription expenses history',
                                handler: 'goToMyClaimsNoDate'
                            }
                        ]
                    }
                },
                {
                    xtype: 'form',
                    title: 'My Current Total Amount Spent',
                    margin: '0 0 0 5',
                    reference: 'deductibles',
                    cls: 'card-panel',
                    tbar: {
                        xtype: 'toolbar',
                        items: [
                            {
                                xtype: 'combo',
                                minWidth: '560',
                                labelWidth: 150,
                                fieldLabel: 'Active Coverage:',
                                displayField: 'PlanGroupName',
                                valueField: 'PlanBenefitId',
                                emptyText: 'Select active coverage',
                                bind: {
                                    store: '{activeMemberCoverages}'
                                },
                                listeners: {
                                    select: 'onCoverageSelected'
                                }
                            }
                        ]
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            fieldLabel: 'Deductible not applicable for selected plan benefit.',
                            labelWidth: 290,
                            labelSeparator: '',
                            bind: {
                                hidden: '{hasDeductible}'
                            }
                        },
                        {
                            xtype: 'container',
                            bind: {
                                hidden: '{!hasDeductible}'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    width: 560,
                                    style: {
                                        textAlign: 'center'
                                    },
                                    items: {
                                        xtype: 'label',
                                        style: {
                                            fontWeight: 'bold'
                                        },
                                        bind: {
                                            text: '{spentAmount}'
                                        }
                                    }

                                },
                                {
                                    xtype: 'progressbar',
                                    reference: 'progressBar',
                                    width: 560,
                                    margin: '10 0',
                                    text: ' '
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    width: 560,
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            html: '<b>$ 0.00</b>'
                                        },
                                        {
                                            xtype: 'label',
                                            reference: 'DeductibleAmt',
                                            style: {
                                                textAlign: 'right',
                                                fontWeight: 'bold'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    width: 560,
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '(Deductible)'
                                        },
                                        {
                                            style: {
                                                textAlign: 'right'
                                            },
                                            xtype: 'label',
                                            text: '(Out of Pocket)'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});