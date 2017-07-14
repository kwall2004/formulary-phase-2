Ext.define('Atlas.benefitplan.view.benefitplandetailconfiguration.Main', {
    extend: 'Ext.form.Panel',
    trackResetOnLoad: true,
    title: 'Benefit Plan Detail Configuration',
    controller: 'benefitplan-mainbenefitplandetailconfigurationcontroller',
    atlasId: 0,
    cmbBenefitPlanSK: 0,
    cmbBenefitType: 0,
    LOBName: 0,
    listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },
    viewModel: {
        data: {
            changed: false,
            validform: false,
            isCobra: false,
            isMedicaidOrMedicare: false,
            nooptions: false,
            mcrPartBCoinsurancePct:false
            
        },
        stores: {
            basicdetails: {
                model: 'Atlas.benefitplan.model.BenefitPlan'
            },

            lobs:
            {
                type: 'benefitplan-lob-store',
                autoLoad: true
            },
            benefitplantypes:
            {
                type: 'benefitplan-type-store'
            },
            classifications:
            {
                model: 'Atlas.benefitplan.model.BenefitPlanClassification',
                autoLoad: false
            },
            sizeclassifications:
            {
                model: 'Atlas.benefitplan.model.BenefitPlanSizeClassification',
                autoLoad: true
            },
            producttypes:
            {
                model: 'Atlas.benefitplan.model.BenefitPlanProductType',
                autoLoad: true
            },
            copayfunctions:
            {
                model: 'Atlas.benefitplan.model.BenefitPlanCopayFunction',
                autoLoad: true
            },
            datasources:
            {
                model: 'Atlas.benefitplan.model.BenefitPlanDataSource',
                autoLoad: true
            },
            pricing:
            {
                model: 'Atlas.benefitplan.model.BenefitPlanPricingType',
                autoLoad: true
            },
            formularies:
            {
                model: 'Atlas.benefitplan.model.Formulary',
                remoteSort: false,
                sorters: 'FrmlryName',
                autoLoad: true
            },
            prescriberrestrictedplans:
            {
                model: 'Atlas.benefitplan.model.PrescriberRestrictedPlan',
                autoLoad: true
            },
            cmsstructtypes:
            {
                model: 'Atlas.benefitplan.model.CMSStructType',
                autoLoad: true
            },
            prescriberdrugoverrideplans:
            {
                model: 'Atlas.benefitplan.model.PrescriberDrugOverridePlan',
                autoLoad: true
            },
            waivers:
            {
                model: 'Atlas.benefitplan.model.WaiverRiderType',
                autoLoad: false
            },
            numberoftiers:
            {
                autoLoad: true,
                fields: ['Value'],
                data: [{
                    Value: '1'
                }, {
                    Value: '2'
                }, {
                    Value: '3'
                }, {
                    Value: '4'
                }, {
                    Value: '5'
                }]
            },
            monthsupply:
            {
                autoLoad: true,
                fields: ['Id','Value'],
                data: [{
                    Id: '30',
                    Value: '30 Days'
                }, {
                    Id: '31',
                    Value: '31 Days'
                }]
            }
        }
    },
    layout: 'fit',
    items: [
        {
            xtype: 'container',
            layout: 'border',
            items: [
                {
                    xtype: 'benefitplan-progress',
                    region: 'north',
                    itemId: 'thermometerPanel'
                },
                {
                    xtype: 'fieldset',
                    region: 'center',
                    title: 'Benefit Plan Configuration',
                    items: [
                        {
                            xtype: 'textfield',
                            maxLength: 30,
                            minLength: 3,
                            name: 'BnftPlanAbbr',
                            itemId: 'BnftPlanAbbr',
                            fieldLabel: 'Benefit Plan Abbr',
                            vtype: 'atlasAlphaNumDash',
                            listeners: {
                                change: 'onItemChanged'
                            }
                        },
                        {
                            xtype: 'fieldset',
                            itemId: 'benefitPlanTypeFieldset',
                            layout: 'fit',
                            items: [

                                {
                                    xtype: 'panel',
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
                                            xtype: 'textfield',
                                            maxLength: 50,
                                            name: 'BnftPlanName',
                                            itemId: 'BnftPlanName',
                                            fieldLabel: 'Benefit Plan Name',
                                            allowBlank: false,
                                            vtype: 'atlasAlphaNum',
                                            listeners: {
                                                change: 'onItemChanged'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            maxLength: 50,
                                            name: 'BnftPlanID',
                                            fieldLabel: 'Benefit Plan ID',
                                            allowBlank: false,
                                            vtype: 'atlasAlphaNum',
                                            listeners: {
                                                change: 'onItemChanged'
                                            }
                                        }
                                    ]
                                },
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
                                            xtype: 'datefield',
                                            name: 'EfctvStartDt',
                                            itemId: 'EfctvStartDt',
                                            format: 'n/j/Y',
                                            fieldLabel: 'Effective Start Date',
                                            allowBlank: false,
                                            validator: function (val) {
                                                return (new Date(val) < new Date(this.up().getComponent('EfctvEndDt').getValue())) ? true : "Must be less than Effective End Date";
                                            },
                                            listeners: {
                                                change: 'onItemChanged'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            name: 'EfctvEndDt',
                                            itemId: 'EfctvEndDt',
                                            format: 'n/j/Y',
                                            fieldLabel: 'Effective End Date',
                                            allowBlank: false,
                                            validator: function (val) {
                                                return (new Date(val) > new Date(this.up().getComponent('EfctvStartDt').getValue())) ? true : "Must be greater than Effective Start Date";
                                            },
                                            listeners: {
                                                change: 'onItemChanged'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            maxLength: 4,
                                            name: 'BnftPlanYr',
                                            fieldLabel: 'Year',
                                            allowBlank: false,
                                            vtype: 'year',
                                            listeners: {
                                                change: 'onItemChanged'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            name: 'LOBSK',
                                            forceSelection: true,
                                            fieldLabel: 'Line of Business',
                                            allowBlank: false,
                                            minChars: 0,
                                            displayField: 'LOBName',
                                            valueField: 'LOBSK',
                                            queryMode: 'local',
                                            typeAhead: true,
                                            disabled: true,
                                            listeners: {
                                                change: 'onItemChanged'
                                            },
                                            bind: {
                                                store: '{lobs}'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            name: 'PlanClsfcnTypeSK',
                                            fieldLabel: 'Plan Classification',
                                            allowBlank: true,
                                            minChars: 0,
                                            displayField: 'PlanClsfcnTypeDesc',
                                            valueField: 'PlanClsfcnTypeSK',
                                            queryMode: 'local',
                                            typeAhead: true,
                                            listeners: {
                                                change: 'onItemChanged'
                                            },
                                            bind: {
                                                disabled: '{isMedicaidOrMedicare}',
                                                store: '{classifications}'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            name: 'NbrofNtwrkTiers',
                                            forceSelection: true,
                                            allowBlank: false,
                                            minChars: 0,
                                            displayField: 'Value',
                                            valueField: 'Value',
                                            queryMode: 'local',
                                            typeAhead: false,
                                            listeners: {
                                                change: 'onItemChanged'
                                            },
                                            plugins: 'responsive',
                                            responsiveConfig: {
                                                'width < 1360': {
                                                    fieldLabel: 'Network Tiers'
                                                },
                                                'width >= 1360': {
                                                    fieldLabel: 'Select Number of Network Tiers'
                                                }
                                            },
                                            bind: {
                                                store: '{numberoftiers}'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            name: 'BnftPlanTypeSK',
                                            fieldLabel: 'Plan Type',
                                            forceSelection: true,
                                            allowBlank: false,
                                            minChars: 0,
                                            displayField: 'BnftPlanTypeDesc',
                                            valueField: 'BnftPlanTypeSK',
                                            queryMode: 'local',
                                            typeAhead: true,
                                            disabled: true,
                                            listeners: {
                                                change: 'onItemChanged'
                                            },
                                            bind: {
                                                store: '{benefitplantypes}'
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            name: 'PrdctTypeSK',
                                            reference: 'productTypeCombo',
                                            fieldLabel: 'Product Type',
                                            forceSelection: true,
                                            allowBlank: false,
                                            minChars: 0,
                                            displayField: 'PrdctTypeDesc',
                                            valueField: 'PrdctTypeSK',
                                            queryMode: 'local',
                                            typeAhead: true,
                                            listeners: {
                                                change: 'onItemChanged'
                                            },
                                            bind: {
                                                store: '{producttypes}'
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
                                                    xtype: 'checkbox',
                                                    name: 'AllowMnlEnrlmtInd',
                                                    fieldLabel: 'Allow Manual Enrollment',
                                                    uncheckedValue: false,
                                                    boxLabel: 'Allow Manual Enrollment',
                                                    hideLabel: true,
                                                    listeners: {
                                                        change: 'onItemChanged'
                                                    }
                                                },
                                                {
                                                    xtype: 'checkbox',
                                                    name: 'TmpltInd',
                                                    fieldLabel: 'Create as Template',
                                                    uncheckedValue: false,
                                                    boxLabel: 'Create as Template',
                                                    hideLabel: true,
                                                    listeners: {
                                                        change: 'onItemChanged',
                                                        enable: 'onItemEnabled'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'detailContainer',
                            layout: 'fit'
                        }
                    ]
                }
            ]
        }
    ],
    bbar: [
        '->',
        {
            text: 'Cancel',
            itemId: 'cancelButton',
            clickEvent: 'mousedown',
            handler: 'onCancelClick'
        },
        {
            text: 'Save',
            handler: 'onSaveClick',
            itemId: 'saveButton',
            clickEvent: 'mousedown',
            bind: {
                disabled: '{!validform || !changed}'
            }
        }
    ]
});
