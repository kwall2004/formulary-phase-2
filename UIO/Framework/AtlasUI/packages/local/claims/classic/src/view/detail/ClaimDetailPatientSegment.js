/**
 * Created by T4317 on 10/18/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimDetailPatientSegment', {
    extend: 'Ext.form.FieldSet',
    xtype: 'claimdetailpatientsegment',
    title: 'Patient Segment',
    collapsible: true,

    items: [
        {
            xtype: 'container',
            flex: 3,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 2,
                    defaults: {
                        xtype: 'displayfield',
                        labelWidth: 170
                    },
                    items: [
                        {
                            fieldLabel: 'Residence Code',
                            bind: {
                                value: '{masterrecord.PatResidenceCode}'
                            }
                        },
                        {
                            xtype: 'displayfield',
                            itemId: 'dfTransitionFill',
                            fieldLabel: 'Transition Fill',
                            fieldStyle: 'text-transform:Capitalize',
                            bind: {
                                value: '{masterrecord.TransitionFill}',
                                hidden: '{transFill}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Transition Fill',
                            forceSelection: true,
                            reference: 'transFillDropDown',
                            width: 300,
                            store: ['yes', 'no'],
                            bind: {
                                hidden: '{transFillEdit}'
                            },
                            listeners: {
                                beforeshow: function (control) {
                                    this.setValue(this.up().down('#dfTransitionFill').getValue());
                                }
                            }
                        },
                        {
                            fieldLabel: 'Transition Date',
                            bind: {
                                value: '{masterrecord.TransitionDate}'
                            }
                        },
                        {
                            fieldLabel: 'Transition Fill Type',
                            fieldStyle: 'text-transform:Capitalize',
                            bind: {
                                value: '{masterrecord.TransitionFillType}'
                            }
                        },
                        {

                            xtype: 'displayfield',
                            fieldLabel: 'Emergency Fill',
                            fieldStyle: 'text-transform:Capitalize',
                            bind: {
                                value: '{masterrecord.EmergencyFill}'
                            }
                        },
                        {
                            fieldLabel: 'Other Coverage Code',
                            bind: {
                                value: '{masterrecord.coveragecode}'
                            }
                        },
                        {
                            fieldLabel: 'Gender Code',
                            bind: {
                                value: '{masterrecord.genderCode}'
                            },
                            renderer: function (value) {
                                if (value == 1) return "Male";
                                else if (value == 2) return "Female";
                                else return "";
                            }
                        },
                        {
                            fieldLabel: 'Reason for Service Code',
                            bind: {
                                value: '{masterrecord.ReasonForServiceCode}'
                            }
                        },
                        {
                            fieldLabel: 'Professional Service Code',
                            bind: {
                                value: '{masterrecord.ProfessionalServiceCode}'
                            }
                        },
                        {
                            fieldLabel: 'Program Group Code',
                            bind: {
                                value: '{masterrecord.mcsProgGroupCode}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    title: 'Patient Resp Amount',
                    flex: 2,
                    itemId: 'responsibilityGrid',
                    bind: {
                        store: '{PatientResponsibility}',
                        hidden: '{PatientResponsibilityHide}'
                    },
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'Qualifier',
                                dataIndex: 'otherPayerPatRespQual'
                            },
                            {
                                xtype: 'numbercolumn',
                                text: 'Amount',
                                dataIndex: 'otherPayerPatRespAmt',
                                format: '$0,0.00'
                            }
                        ]
                    }
                }
            ]
        },
        {
            xtype: 'container',
            flex: 1,
            defaults: {
                xtype: 'displayfield',
                labelWidth: 170
            },
            items: [
                {
                    fieldLabel: 'Retro Termed',
                    fieldStyle: 'text-transform:Capitalize',
                    bind: {
                        value: '{masterrecord.RetroTermedInd}'
                    }
                },
                {
                    fieldLabel: 'Sub. Clarification Code',
                    fieldStyle: 'text-transform:Capitalize',
                    bind: {
                        value: '{masterrecord.SubClarificationCode}'
                    }
                },
                {
                    fieldLabel: 'Short Cycle Fill',
                    fieldStyle: 'text-transform:Capitalize',
                    bind: {
                        value: '{masterrecord.ShortCycleFill}'
                    }
                },
                {
                    fieldLabel: 'Non-Exchange Claim',
                    fieldStyle: 'text-transform:Capitalize',
                    bind: {
                        value: '{masterrecord.nonExchangeClaim}'
                    }
                },
                {
                    fieldLabel: 'Claim Adjudication Code',
                    bind: {
                        value: '{masterrecord.formattedClaimAdjudicationCode}'
                    }
                }
            ]
        },
        {
            xtype: 'toolbar',
            cls:'borderNone',
            items: ['->', {
                text: 'Edit',
                handler: 'editPatientSeg',
                bind: {
                    hidden: '{canEdit}'
                }
            }, {
                text: 'Update',
                handler: 'updatePatientSeg',
                bind: {
                    hidden: '{canUpdate}'
                }
            }, {
                text: 'Cancel',
                handler: 'cancelPatientSeg',
                bind: {
                    hidden: '{canCancel}'
                }
            }]
        }
    ]
});
