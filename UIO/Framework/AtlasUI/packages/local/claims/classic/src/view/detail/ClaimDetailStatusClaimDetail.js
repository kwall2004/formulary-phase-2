/**
 * Created by b1343 on 5/23/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimDetailStatusClaimDetail', {
    extend: 'Ext.Container',
    requires: ['Ext.layout.container.Column'],
    xtype: 'claimDetailStatusClaimDetail',

    itemId: 'claimDetailStatusClaimDetailID',

    items: [
        {
            xtype: 'fieldset',
            title: 'Claim Detail',
            collapsible: true,
            items: [
                {
                    xtype: 'fieldcontainer',
                    items: [{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                            xtype: 'fieldcontainer',
                            width: 300,
                            defaults: {
                                labelWidth: 200,
                                margin: '0 0 0 0'
                            },
                            items: [{
                                xtype: 'displayfield',
                                fieldLabel: 'Claim ID',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'Source',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'Status',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'NDC',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'Compound',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'Tier',
                                value: 'TBD'
                            }]
                        }, {
                            xtype: 'fieldcontainer',
                            width: 300,
                            defaults: {
                                labelWidth: 200,
                                margin: '0 0 0 0'
                            },
                            items: [{
                                xtype: 'displayfield',
                                fieldLabel: 'Pricing',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'Formulary Detail Info',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'Authorization ID',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'GP/GCN',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'PDL Status',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'Part B Drug',
                                value: 'TBD'
                            }]
                        }, {
                            xtype: 'fieldcontainer',
                            width: 300,
                            defaults: {
                                labelWidth: 200,
                                margin: '0 0 0 0'
                            },
                            items: [{
                                xtype: 'displayfield',
                                fieldLabel: 'HICL',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'Specialty Drug',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'Qty Prescribed',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'Therapeutic Class',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'Days Supply',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'Drug Type',
                                value: 'TBD'
                            }]
                        }, {
                            xtype: 'fieldcontainer',
                            width: 300,
                            defaults: {
                                labelWidth: 200,
                                margin: '0 0 0 0'
                            },
                            items: [{
                                xtype: 'displayfield',
                                fieldLabel: 'Covered',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'Qty Dispensed',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'Clinical Formulation',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'OTC',
                                value: 'TBD'
                            }, {
                                xtype: 'displayfield',
                                fieldLabel: 'DAW Type',
                                value: 'TBD'
                            }]
                        }]
                    },


                        {
                            xtype: 'fieldset',
                            title: 'Formulary Detail',
                            collapsible: false,
                            items: [{
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [{
                                    xtype: 'fieldcontainer',
                                    width: 300,
                                    defaults: {
                                        labelWidth: 200,
                                        margin: '0 0 0 0'
                                    },
                                    items: [{
                                        xtype: 'displayfield',
                                        fieldLabel: 'Formulary Name',
                                        value: 'TBD'
                                    }, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'CMS RxCUI',
                                        value: 'TBD'
                                    }, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Part D Excluded Drug',
                                        value: 'TBD'
                                    }, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Min Age',
                                        value: 'TBD'
                                    }]
                                }, {
                                    xtype: 'fieldcontainer',
                                    width: 300,
                                    defaults: {
                                        labelWidth: 200,
                                        margin: '0 0 0 0'
                                    },
                                    items: [{
                                        xtype: 'displayfield',
                                        fieldLabel: 'Formulary',
                                        value: 'TBD'
                                    }, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'ETC ID',
                                        value: 'TBD'
                                    }, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Specialty Drug',
                                        value: 'TBD'
                                    }, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Max Age',
                                        value: 'TBD'
                                    }]

                                }, {
                                    xtype: 'fieldcontainer',
                                    width: 300,
                                    defaults: {
                                        labelWidth: 200,
                                        margin: '0 0 0 0'
                                    },
                                    items: [{
                                        xtype: 'displayfield',
                                        fieldLabel: 'Covered',
                                        value: 'TBD'
                                    }, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'ETC Name',
                                        value: 'TBD'
                                    }, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Formulary Drug Type',
                                        value: 'TBD'
                                    }]
                                }, {
                                    xtype: 'fieldcontainer',
                                    width: 300,
                                    defaults: {
                                        labelWidth: 200,
                                        margin: '0 0 0 0'
                                    },
                                    items: [{
                                        xtype: 'displayfield',
                                        fieldLabel: 'Tier',
                                        value: 'TBD'
                                    }, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'PDL Flag',
                                        value: 'TBD'
                                    }, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Therapeutic Class',
                                        value: 'TBD'
                                    }]
                                }]
                            },{
                                xtype: 'fieldcontainer',
                                layout: 'column',
                                items: [{
                                    title: 'Prior Authorization',
                                    columnWidth: 0.3,
                                    defaults: {
                                        labelWidth: 200,
                                        margin: '0 0 0 0'
                                    },
                                    items: [{
                                        xtype: 'displayfield',
                                        fieldLabel: 'Medicare PA Type',
                                        value: 'TBD'
                                    }, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'PA Name',
                                        value: 'TBD'
                                    }, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'PA Approved Criteria',
                                        value: 'TBD'
                                    }, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'PA Min Age',
                                        value: 'TBD'
                                    }, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'PA Max Age',
                                        value: 'TBD'
                                    }]
                                },{
                                    title: 'Step Therapy',
                                    columnWidth: 0.3,
                                    defaults: {
                                        labelWidth: 200,
                                        margin: '0 0 0 0'
                                    },
                                    items: [{
                                        xtype: 'displayfield',
                                        fieldLabel: 'Step Therapy Name',
                                        value: 'TBD'
                                    }, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Step Therapy Criteria',
                                        value: 'TBD'
                                    }]
                                },{
                                    title: 'Quantity Limits',
                                    columnWidth: 0.3,
                                    defaults: {
                                        labelWidth: 200,
                                        margin: '0 0 0 0'
                                    },
                                    items: [{
                                        xtype: 'displayfield',
                                        fieldLabel: 'Quantity Limit',
                                        value: 'TBD'
                                    }, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Days Supply',
                                        value: 'TBD'
                                    },{
                                        xtype: 'displayfield',
                                        fieldLabel: 'Days Supply Limit',
                                        value: 'TBD'
                                    }, {
                                        xtype: 'displayfield',
                                        fieldLabel: 'Days Supply Time Per',
                                        value: 'TBD'
                                    }]
                                }]

                            }]

                        }
                    ]
                }
            ]
        }]
});