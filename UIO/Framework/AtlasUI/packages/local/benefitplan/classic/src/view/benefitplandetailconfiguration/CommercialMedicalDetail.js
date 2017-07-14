Ext.define('Atlas.benefitplan.view.benefitplandetailconfiguration.CommercialMedicalDetail', {
    extend: 'Ext.form.FieldSet',
    title: 'Commercial Detail',
    alias: 'widget.benefitplan-commercialmedicaldetail',
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
                labelWidth: 185
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'On/Off Exchange',
                    defaultType: 'radio',
                    defaults: {
                        flex: 1
                    },
                    layout: 'hbox',
                    defaults: {
                        labelWidth: 185
                    },
                    items: [
                        {
                            boxLabel: 'On',
                            name: 'OnHIEInd',
                            inputValue: 'true',
                            listeners: {
                                change: 'onItemChanged'
                            },
                            checked:true
                        },
                        {
                            boxLabel: 'Off',
                            name: 'OnHIEInd',
                            inputValue: 'false',
                            listeners: {
                                change: 'onItemChanged'
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Grandfathered',
                    defaultType: 'radio',
                    defaults: {
                        flex: 1
                    },
                    layout: 'hbox',
                    defaults: {
                        labelWidth: 185
                    },
                    items: [
                        {
                            boxLabel: 'Yes',
                            name: 'GrandfatheredPlanInd',
                            inputValue: 'true',
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            boxLabel: 'No',
                            name: 'GrandfatheredPlanInd',
                            inputValue: 'false',
                            listeners: {
                                change: 'onItemChanged'
                            },
                            checked: true
                        }
                    ]
                },
                {
                    xtype: 'combobox',
                    name: 'BnftPlanSizeClsfcnTypeSK',
                    fieldLabel: 'Size Classification',
                    forceSelection: true,
                    allowBlank: false,
                    minChars: 0,
                    displayField: 'BnftPlanSizeClsfcnCode',
                    valueField: 'BnftPlanSizeClsfcnTypeSK',
                    queryMode: 'local',
                    typeAhead: true,
                    listeners: {
                        change: 'onItemChanged'
                    },
                    bind: {
                        store: '{sizeclassifications}'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            layout: {
                type: 'table',
                columns: 2,
                tableAttrs: {
                    style: {
                        width: '100%'
                    }
                }
            },
            defaults: {
                labelWidth: 185
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'COBRA Benefits Offered',
                    defaultType: 'radio',
                    defaults: {
                        flex: 1
                    },
                    layout: 'hbox',
                    defaults: {
                        labelWidth: 185
                    },
                    items: [
                        {
                            boxLabel: 'Yes',
                            name: 'COBRABnftOfferedInd',
                            inputValue: 'true',
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            boxLabel: 'No',
                            name: 'COBRABnftOfferedInd',
                            inputValue: 'false',
                            listeners: {
                                change: 'onItemChanged'
                            },
                            checked: true
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    maxLength: 80,
                    name: 'MaxNbrofDaysAlwdonCOBRAAmt',
                    fieldLabel: 'Maximum Days Allowed on COBRA',
                    allowBlank: false,
                    vtype: 'numeric',
                    maxLength: 5,
                    listeners: {
                        change: 'onItemChanged'
                    },
                    bind: {
                        disabled: '{!isCobra}'
                    }
                }
            ]
        }
    ]
});
