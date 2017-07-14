/**
 * Created by s6627 on 10/5/2016.
 */
Ext.define('Atlas.formulary.view.FormularyNewDrugsDetail', {
    extend: 'Ext.window.Window',
    xtype: 'formulary-formularynewdrugdetail',
    //itemId : 'compoundgcnwindow',
    title: 'Formulary Details',
    viewModel: 'formularynewdrugdetailviewmodel',
    controller: 'formularynewdrugdetailcontroller',
    width: 800,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'panel',
            flex: 1,
            layout:'hbox',
            items: [
                {
                    xtype: 'panel',
                    flex: .5,
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Specialty DrugInd'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Tier Code'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Gender Restriction'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Min Age'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Max Age'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Age Type'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Limited Access'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Days Supply'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Days Supply TimePeriod'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Fills'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Fills TimePeriod'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Quantity Limit'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Quantity Limit TimePeriod'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'QL Notes'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'PA Ind'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'PA Name'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'PA GenderCode'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'PA MinAge'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    flex: .5,
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'PA MaxAge'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Step Therapy Ind'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Step Therapy Name'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Notes'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Text Message'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Resource Link'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Medicaid CarveOut Drug'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Medicaid Fee Screen'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'PartD ExcludedDrug'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Medicare PAType'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Medicare ST Group Count'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Medicare ST Group Description1'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Medicare ST Step Value1'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Medicare ST Group Desccription2'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Medicare ST Step Value2'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Medicare ST Group Description3'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Medicare ST Step Value3'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Formulary DrugType'

                                },
                                {
                                    xtype: 'label'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
})
