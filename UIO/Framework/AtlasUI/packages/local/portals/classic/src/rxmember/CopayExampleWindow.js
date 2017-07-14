Ext.define('Atlas.portals.rxmember.CopayExampleWindow', {
    extend: 'Ext.Container',
    xtype: 'portlasrxmembercopayexamplewindow',
    items: [
        {
            xtype: 'container',
            border: false,
            anchor: '5% 100%',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    style: {
                        marginTop: '35px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            border: false,
                            html: '<center><b>Copay Examples</b></center>',
                            style: {
                                fontSize: '15px'
                            }
                        }
                    ]
                },
                {
                    xtype: 'label',
                    html: '<u>Plans with coinsurance only</u>',
                    style: {
                        paddingLeft: '10px'
                    }
                },
                {
                    layout: 'center',
                    border: false,
                    style: {
                        marginTop: '10px'
                    },
                    items: [
                        {
                            xtype: 'container',
                            border: false,
                            defaults: {
                                height: 50,
                                style: {
                                    padding: '8px'
                                }
                            },
                            layout: {
                                type: 'table',
                                columns: 6
                            },
                            items: [
                                {
                                    width: 150,
                                    html: '<b>RxType</b>'
                                },
                                {
                                    width: 100,
                                    html: '<b>Deductible</b>'
                                },
                                {
                                    width: 100,
                                    html: '<b>Coinsurance Amount (%)</b>'
                                },
                                {
                                    width: 100,
                                    html: '<b>Coinsurance Start Amount</b>'
                                },
                                {
                                    width: 100,
                                    html: '<b>Maximum Copay</b>'
                                },
                                {
                                    width: 100,
                                    html: '<b>Out of Pocket Max</b>'
                                },

                                {
                                    width: 150,
                                    html: 'Rx 10/20/10% FCS'
                                },
                                {
                                    width: 100,
                                    html: 'N/A'
                                },
                                {
                                    width: 100,
                                    html: '10%'
                                },
                                {
                                    width: 100,
                                    html: '$750'
                                },
                                {
                                    width: 100,
                                    html: '$200'
                                },
                                {
                                    width: 100,
                                    html: 'N/A'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    style: {
                        paddingLeft: '50px',
                        marginTop: '30px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: '1)	Patient responsibility amount is regular copay rate for drugs whose cost is less than $750.'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    style: {
                        paddingLeft: '50px',
                        marginBottom: '30px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: '2) Patient responsibility amount = 10% X cost of drug; up to maximum copay ($200) for drugs whose cost is greater than or equal to $750.'
                        }
                    ]
                },
                {
                    style: {
                        paddingLeft: '35px',
                        marginBottom: '30px'
                    },
                    xtype: 'label',
                    text: 'Examples:'
                },
                {
                    xtype: 'container',
                    style: {
                        paddingLeft: '100px',
                        marginBottom: '30px',
                        marginTop: '35px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Member is prescribed generic Simvastatin which costs $30. Member pays the $10 copay for generic drug.'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    style: {
                        paddingLeft: '100px',
                        marginBottom: '30px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Member is prescribed brand Lovenox which costs $1100. Member pays: 10% X $1100 = $110 for drug.'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    style: {
                        paddingLeft: '100px',
                        marginBottom: '30px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Member is prescribed high cost organ transplant drug which costs $2500. Drug triggers the coinsurance amount: 10% X $2500 = $250, but member pays $200 maximum copay.'
                        }
                    ]
                },
                {
                    xtype: 'label',
                    html: '<u>Plans with deductible only</u>',
                    style: {
                        paddingLeft: '10px'
                    }
                },
                {
                    layout: 'center',
                    border: false,
                    style: {
                        marginTop: '10px'
                    },
                    items: [
                        {
                            xtype: 'container',
                            defaults: {
                                height: 50,
                                style: {
                                    padding: '8px'
                                },
                                border: false
                            },
                            layout: {
                                type: 'table',
                                columns: 6
                            },
                            items: [
                                {
                                    width: 150,
                                    html: '<b>RxType</b>'
                                },
                                {
                                    width: 100,
                                    html: '<b>Deductible</b>'
                                },
                                {
                                    width: 100,
                                    html: '<b>Coinsurance Amount (%)</b>'
                                },
                                {
                                    width: 100,
                                    html: '<b>Coinsurance Start Amount</b>'
                                },
                                {
                                    width: 100,
                                    html: '<b>Maximum Copay</b>'
                                },
                                {
                                    width: 100,
                                    html: '<b>Out of Pocket Max</b>'
                                },

                                {
                                    width: 150,
                                    html: 'Rx 6350'
                                },
                                {
                                    width: 100,
                                    html: '$6350'
                                },
                                {
                                    width: 100,
                                    html: 'N/A'
                                },
                                {
                                    width: 100,
                                    html: 'N/A'
                                },
                                {
                                    width: 100,
                                    html: 'N/A'
                                },
                                {
                                    width: 100,
                                    html: '$6350'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    style: {
                        paddingLeft: '50px',
                        marginTop: '35px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: '1)	Patient is responsible for entire cost of all drugs until deductible amount is met.'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    style: {
                        paddingLeft: '50px',
                        marginBottom: '30px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: '2)	Once deductible amount is met, patient incurs no additional costs for prescriptions.'
                        }
                    ]
                },
                {
                    xtype: 'label',
                    html: '<u>Plans with deductible and coinsurance</u>',
                    style: {
                        paddingLeft: '10px'
                    }
                },
                {
                    layout: 'center',
                    border: false,
                    style: {
                        marginTop: '10px'
                    },
                    items: [
                        {
                            xtype: 'container',
                            border: false,
                            defaults: {
                                height: 50,
                                style: {
                                    padding: '8px'
                                },
                                border: false
                            },
                            layout: {
                                type: 'table',
                                columns: 6
                            },
                            items: [
                                {
                                    width: 150,
                                    html: '<b>RxType</b>'
                                },
                                {
                                    width: 100,
                                    html: '<b>Deductible</b>'
                                },
                                {
                                    width: 100,
                                    html: '<b>Coinsurance Amount (%)</b>'
                                },
                                {
                                    width: 100,
                                    html: '<b>Coinsurance Start Amount</b>'
                                },
                                {
                                    width: 100,
                                    html: '<b>Maximum Copay</b>'
                                },
                                {
                                    width: 100,
                                    html: '<b>Out of Pocket Max</b>'
                                },

                                {
                                    width: 150,
                                    html: 'Rx DED 20/40/75/125/10% Plus 20 FCS'
                                },
                                {
                                    width: 100,
                                    html: '$250'
                                },
                                {
                                    width: 100,
                                    html: '10%'
                                },
                                {
                                    width: 100,
                                    html: '$1000'
                                },
                                {
                                    width: 100,
                                    html: '$200'
                                },
                                {
                                    width: 100,
                                    html: '$6350'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    style: {
                        paddingLeft: '50px',
                        marginTop: '35px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: '1)	Patient responsibility amount is entire cost of all drugs until deductible amount is met.'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    style: {
                        paddingLeft: '50px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: '2)	Patient responsibility amount is regular copay rate for drugs whose cost is less than $1000.'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    style: {
                        paddingLeft: '50px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: '3)	Patient responsibility amount = 10% X cost of drug; up to maximum copay ($200) for drugs whose cost is greater than or equal to $1000.'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    style: {
                        paddingLeft: '50px',
                        marginBottom: '35px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: '4)	Once OOPM amount has been met, patient incurs no additional costs for prescriptions.'
                        }
                    ]
                },
                {
                    style: {
                        paddingLeft: '35px',
                        marginBottom: '30px'
                    },
                    xtype: 'label',
                    text: 'Examples:'
                },
                {
                    xtype: 'container',
                    style: {
                        paddingLeft: '100px',
                        marginBottom: '30px',
                        marginTop: '35px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Member  fills his/her first prescription of the year for generic  Metformin. The cost of the drug is $80. Member  pays $80 and has $170 remaining on the deductible.'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    style: {
                        paddingLeft: '100px',
                        marginBottom: '30px'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'Same member fills another prescription for brand Protonix costing $300. The member pays $210 ($170 to meet deductible  +  $40 copay for remaining $130 cost of drug). Maximum copay does not apply in this case because the member was still paying towards the deductible.'
                        }
                    ]
                }
            ]
        }
    ]
});