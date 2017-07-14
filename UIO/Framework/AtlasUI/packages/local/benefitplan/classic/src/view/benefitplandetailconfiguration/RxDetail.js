Ext.define('Atlas.benefitplan.view.benefitplandetailconfiguration.RxDetail', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.benefitplan-rxdetail',
    itemId: 'rxdetailpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'table',
                columns: 3,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },
            defaults: {
                labelWidth: 165
            },
            items: [
                {
                    xtype: 'combobox',
                    name: 'CopayFuncTypeSK',
                    fieldLabel: 'Copay Function',
                    forceSelection: true,
                    allowBlank: false,
                    minChars: 0,
                    displayField: 'CopayFuncTypeDesc',
                    valueField: 'CopayFuncTypeSK',
                    queryMode: 'local',
                    typeAhead: true,
                    listeners: {
                        change: 'onItemChanged'
                    },
                    bind: {
                        store: '{copayfunctions}'
                    }
                },
                {
                    xtype: 'combobox',
                    name: 'OneMthDaySuplAmt',
                    fieldLabel: '1 Month Supply Equals',
                    forceSelection: true,
                    allowBlank: false,
                    minChars: 0,
                    displayField: 'Value',
                    valueField: 'Id',
                    queryMode: 'local',
                    typeAhead: true,
                    listeners: {
                        change: 'onItemChanged'
                    },
                    bind: {
                        store: '{monthsupply}'
                    }
                },
                {
                    xtype: 'combobox',
                    name: 'DrugRefDbSK',
                    fieldLabel: 'Data Source',
                    forceSelection: true,
                    allowBlank: false,
                    minChars: 0,
                    displayField: 'DrugRefDbName',
                    valueField: 'DrugRefDbSK',
                    queryMode: 'local',
                    typeAhead: true,
                    listeners: {
                        change: 'onItemChanged',
                        beforeselect: 'onItemchangebeforeSelect'
                    },
                    plugins: 'responsive',
                    responsiveConfig: {
                        'width < 1340': {
                            labelWidth: 118
                        },
                        'width >= 1340': {
                            labelWidth: 185
                        }
                    },
                    bind: {
                        store: '{datasources}'
                    }
                },
                {
                    xtype: 'combobox',
                    name: 'RxPrcgTypeSK',
                    fieldLabel: 'Pricing',
                    forceSelection: true,
                    allowBlank: false,
                    minChars: 0,
                    displayField: 'RXPrcgTypeCode',
                    valueField: 'RxPrcgTypeSK',
                    queryMode: 'local',
                    typeAhead: true,
                    listeners: {
                        change: 'onItemChanged'
                    },
                    bind: {
                        store: '{pricing}'
                    }
                },
                {
                    xtype: 'textfield',
                    maxLength: 80,
                    name: 'DefaultVaccineAdmnstnFeeAmt',
                    fieldLabel: 'Default Vaccine Admin Fee',
                    allowBlank: true,
                    vtype: 'currency',
                    listeners: {
                        change: 'onItemChanged'
                    }
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    defaults: {
                        labelWidth: 185
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'NbrofFrmlryTiers',
                            allowBlank: false,
                            enableKeyEvents: true,
                            vtype: 'numeric',
                            validator: function(val) {
                                return ((val > 0 && val < 100)?true:"Must be greater than zero and less than 100");
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1340': {
                                    fieldLabel: 'Formulary Tiers',
                                    labelWidth: 118
                                },
                                'width >= 1340': {
                                    fieldLabel: 'Num of Formulary Tiers',
                                    labelWidth: 185
                                }
                            },
                            listeners: {
                                change: 'onItemChanged',
                                blur: 'onFormularyTiersBlur'
                            }
                        },
                        {
                            xtype: 'combobox',
                            name: 'FrmlrySK',
                            fieldLabel: 'Select Formulary',
                            forceSelection: true,
                            allowBlank: true,
                            minChars: 0,
                            displayField: 'FrmlryName',
                            valueField: 'FrmlrySK',
                            queryMode: 'local',
                            typeAhead: true,
                            listeners: {
                                change: 'onItemChanged',
                                beforeselect: 'onItemchangebeforeSelect'
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1340': {
                                    labelWidth: 118
                                },
                                'width >= 1340': {
                                    labelWidth: 185
                                }
                            },
                            bind: {
                                store: '{formularies}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    defaults: {
                        labelWidth: 185
                    },
                    items: [
                        {
                            xtype: 'checkbox',
                            name: 'AllowMbrLocksInd',
                            fieldLabel: 'Allow Member Locks',
                            uncheckedValue: false,
                            boxLabel: 'Allow Member Locks',
                            hideLabel: true,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype: 'checkbox',
                            name: 'AllowEmrgyFillsInd',
                            fieldLabel: 'Allow Emergency Fills',
                            uncheckedValue: false,
                            boxLabel: 'Allow Emergency Fills',
                            hideLabel: true,
                            hidden: true,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype: 'checkbox',
                            name: 'RequireSpcltyPharmforSpcltyDrugsInd',
                            fieldLabel: 'Specialty Drug at Specialty Pharmacy',
                            uncheckedValue: false,
                            boxLabel: 'Specialty Drug at Specialty Pharmacy',
                            hideLabel: true,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    defaults: {
                        labelWidth: 185
                    },
                    items: [
                        {
                            xtype: 'checkbox',
                            name: 'MndtryGenrcDrugPlanInd',
                            fieldLabel: 'Mandatory Generic Plan',
                            uncheckedValue: false,
                            boxLabel: 'Mandatory Generic Plan',
                            hideLabel: true,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype: 'checkbox',
                            name: 'RejAllClaimsInd',
                            fieldLabel: 'Reject All Claims',
                            boxLabel: 'Reject All Claims',
                            hideLabel: true,
                            uncheckedValue: false,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    defaults: {
                        labelWidth: 185
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'AlwdPrescribersListSK',
                            forceSelection: true,
                            allowBlank: true,
                            minChars: 0,
                            displayField: 'AlwdPrescribersListName',
                            valueField: 'AlwdPrescribersListSK',
                            queryMode: 'local',
                            typeAhead: true,
                            listeners: {
                                change: 'onItemChanged'
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1340': {
                                    fieldLabel: 'Prescr Rstrctd Plan',
                                    labelWidth: 118
                                },
                                'width >= 1340': {
                                    fieldLabel: 'Prescriber Restricted Plan',
                                    labelWidth: 185
                                }
                            },
                            bind: {
                                store: '{prescriberrestrictedplans}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            name: 'PrescbrDrugOvrrdListSK',
                            forceSelection: true,
                            allowBlank: true,
                            minChars: 0,
                            displayField: 'PrescbrDrugOvrrdListName',
                            valueField: 'PrescbrDrugOvrrdListSK',
                            queryMode: 'local',
                            typeAhead: true,
                            listeners: {
                                change: 'onItemChanged'
                            },
                            plugins: 'responsive',
                            responsiveConfig: {
                                'width < 1340': {
                                    fieldLabel: 'Drug Ovride Plan',
                                    labelWidth: 118
                                },
                                'width >= 1340': {
                                    fieldLabel: 'Prescriber Drug Override Plan',
                                    labelWidth: 185
                                }
                            },
                            bind: {
                                store: '{prescriberdrugoverrideplans}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    colspan: 3,
                    itemId: 'additionalrxdetail'
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    defaults: {
                        labelWidth: 185
                    },
                    items: [
                        {
                            xtype: 'checkbox',
                            name: 'ExclPHIDataInReports',
                            fieldLabel: 'Exclude PHI Data In Reports',
                            uncheckedValue: false,
                            boxLabel: 'Exclude PHI Data In Reports',
                            hideLabel: true,
                            listeners: {
                                change: 'onItemChanged'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
