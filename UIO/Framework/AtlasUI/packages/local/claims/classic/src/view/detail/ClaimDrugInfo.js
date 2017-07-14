/**
 * Created by T4317 on 10/24/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimDrugInfo', {
    extend: 'Ext.Container',
    xtype: 'claimDrugInfo',
    scrollable: true,
    overFlowX : 'scroll',
    overFlowY : 'scroll',
    width: '100%',
    height: '100%',
    layout : {
        type : 'vbox',
        align : 'stretch'
    },
    items: [
        {
        xtype: 'fieldset',
        layout: 'hbox',
            //flex : 3,
        defaults: {
            xtype: 'container',
            flex: 1
        },
        items: [
            {
            defaults: {
                labelWidth: 150
            },
            items:
                [
                {
                xtype: 'displayfield',
                fieldLabel: 'NDC',
                bind: {
                    value: '{masterrecord.NDC} {masterrecord.drugLN}'
                }
            },
                {
                xtype: 'displayfield',
                fieldLabel: 'GCN Seq No',
                bind: {
                    value: '{masterrecord.gcnseq}'
                }
            },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'GNN',
                    bind: {
                        value: '{masterrecord.gnn}'
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Drug Type',
                    bind: {
                        value: '{masterrecord.drugType}'
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'DAW Type',
                    bind: {
                        value: '{masterrecord.dawType}'
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Clinical Formulation',
                    bind: {
                        value: '{masterrecord.clinicalFormulation}'
                    }
                }
            ]
        },
            {
            defaults: {
                labelWidth: 140
            },
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Compound Code',
                    bind: {
                        value: '{masterrecord.compoundCode}'
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Days Supply',
                    bind: {
                        value: '{masterrecord.daysSupply}'
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Dispensed Quantity',
                    bind: {
                        value: '{masterrecord.dispQuantity}'
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Therapeutic Class',
                    bind: {
                        value: '{masterrecord.therapeuticClass}'
                    }
                }
            ]
        },
            {
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'GPI Code',
                    bind: {
                        value: '{masterrecord.GPICode}'
                    }
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Drug Source',
                    bind: {
                        value: '{masterrecord.DataSource}'
                    }
                }
            ]
        }
        ]

        },
        {
        xtype: 'fieldset',
        layout: 'hbox',
            //flex : 4,
        defaults: {
            xtype: 'container',
            flex: 1
        },
        items: [
            {
            defaults: {
                labelWidth: 140
            },
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'Formulary Name',
                bind: {
                    value: '{masterrecord.FormularyInfo}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Covered',
                bind: {
                    value: '{masterrecord.Covered}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'PDL Flag',
                bind: {
                    value: '{masterrecord.PDLFlag}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'CMS RxCUI',
                bind: {
                    value: '{masterrecord.CMS}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'ETC Id',
                bind: {
                    value: '{masterrecord.ETC_ID}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Medicare PA Type',
                bind: {
                    value: '{masterrecord.MedicarePAType}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'PA Name',
                bind: {
                    value: '{masterrecord.PAName}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'PA Ind',
                bind: {
                    value: '{masterrecord.PAInd}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Step Therapy Name',
                bind: {
                    value: '{masterrecord.formularyDetailsStepTherapyName}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'PA Approved Criteria',
                bind: {
                    value: '{masterrecord.PAapprovalCriteria}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Step Therapy Criteria',
                bind: {
                    value: '{masterrecord.StepTherapyName}'
                }
            }]
        }, {
            defaults: {
                labelWidth: 140
            },
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'Formulary Version',
                bind: {
                    value: '{masterrecord.formularyVer}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Formulary Drug Type',
                bind: {
                    value: '{masterrecord.DrugType}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Specialty Drug',
                bind: {
                    value: '{masterrecord.SpecialtyDrugInd}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Day Supply Limit',
                bind: {
                    value: '{masterrecord.DaysSupply}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Qty Limit',
                bind: {
                    value: '{masterrecord.QtyLimit}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Max Age',
                bind: {
                    value: '{masterrecord.MaxAge}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'PA Max Age',
                bind: {
                    value: '{masterrecord.PAMaxAge}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Step Therapy Ind',
                bind: {
                    value: '{masterrecord.StepTherapyInd}'
                }
            }]
        }, {
            defaults: {
                labelWidth: 140
            },
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'ETC Name',
                bind: {
                    value: '{masterrecord.ETC_NAME}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'PartD Excluded Drug',
                bind: {
                    value: '{masterrecord.PartDExcludedDrug}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'DaysSupplyTimePeriod',
                bind: {
                    value: '{masterrecord.DaysSupplyTimePeriod}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Qty Limit TimePeriod',
                bind: {
                    value: '{masterrecord.QtyLmtTimePeriod}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Min Age',
                bind: {
                    value: '{masterrecord.MinAge}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'PA Min Age',
                bind: {
                    value: '{masterrecord.PAMinAge}'
                }
            }, {
                xtype: 'displayfield',
                fieldLabel: 'OTC IND',
                bind: {
                    value: '{masterrecord.OTCInd}'
                }
            }]
        }]
    },
        {
        xtype: 'gridpanel',
        title: 'DUR Alerts',
            minHeight : 200,
        bind: {
            store: '{duralerts}'
        },
        columns: [
            {text: 'Significance', dataIndex: 'significance', flex: 1},
            {text: 'Reason', dataIndex: 'reason', flex: 1},
            {text: 'Description', dataIndex: 'discription', flex: 1}
        ]
        }
    ]

});