/**
 * Created by b1343 on 5/24/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimDetailStatusDrugDetail', {
    extend: 'Ext.Container',
    xtype: 'claimDetailStatusDrugDetail',
    items: [
        {
            xtype: 'fieldset',
            title: 'Drug Detail',
            collapsible: true,
            defaults:{
                xtype:'container',
                margin:5
            },
            items: [{
                layout: 'hbox',
                defaults: {
                    flex: 1
                },
                items: [{
                    xtype: 'container',
                    defaults: {
                        labelWidth: 150
                    },
                    items: [{
                        xtype: 'displayfield',
                        fieldLabel: 'NDC',
                        width: '100%',
                        bind: {
                            value: '{masterrecord.NDC} {masterrecord.drugLN}'
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'GCN',
                        bind: {
                            value: '{masterrecord.gcnseq}'
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'GPI',
                        bind: {
                            value: '{masterrecord.GPICode}'
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'PDL Status',
                        bind: {
                            value: '{masterrecord.formularyDetails.PDLFlag}'
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Specialty Drug',
                        fieldStyle: 'text-transform:Capitalize',
                        bind: {
                            value: '{masterrecord.SpecialtyDrugInd}'
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Covered',
                        fieldStyle: 'text-transform:Capitalize',
                        bind: {
                            value: '{masterrecord.Covered}'
                        }
                    }]
                }, {
                    xtype: 'container',
                    defaults: {
                        labelWidth: 150,
                        style:{
                            background:'white'
                        }
                    },
                    items: [{
                        xtype: 'displayfield',
                        fieldLabel: 'GNN',
                        bind: {
                            value: '{masterrecord.gnn}'
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Drug Type',
                        bind: {
                            value: '{masterrecord.drugType}'
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'BLA NDA Drug',
                        bind: {
                            value: '{masterrecord.BLANDAdrug}'
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Compound Code',
                        bind: {
                            value: '{masterrecord.compoundCode}'
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Tier',
                        bind: {
                            value: '{masterrecord.Tiercode}'
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Part B Drug',
                        fieldStyle: 'text-transform:Capitalize',
                        bind: {
                            value: '{masterrecord.PartBDrug}'
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Generic Substitutable',
                        bind: {
                            value: '{masterrecord.genSubstitutableNDC}'
                        }
                    }]
                }]
            }, {
                layout: 'hbox',
                defaults: {
                    flex: 1
                },
                items: [{
                    xtype: 'container',
                    defaults: {
                        labelWidth: 150
                    },
                    items: [{
                        xtype: 'displayfield',
                        fieldLabel: 'Qty Prescribed',
                        bind: {
                            value: '{masterrecord.quantityPrescribed}'
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Qty Dispensed',
                        bind: {
                            value: '{masterrecord.dispQuantity}'
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Day Supply',
                        bind: {
                            value: '{masterrecord.daysSupply}'
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'DAW Type',
                        bind: {
                            value: '{masterrecord.dawType}'
                        }
                    }]
                }]
            }, {
                layout: 'hbox',
                defaults: {
                    flex: 1
                },
                items: [{
                    xtype: 'container',
                    defaults: {
                        labelWidth: 150
                    },
                    items: [{
                        xtype: 'displayfield',
                        fieldLabel: 'Therapeutic Class',
                        bind: {
                            value: '{masterrecord.therapeuticClass}'
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Clinical Formulation',
                        bind: {
                            value: '{masterrecord.clinicalFormulation}'
                        }
                    }]
                }]
            }]
        }]
});
