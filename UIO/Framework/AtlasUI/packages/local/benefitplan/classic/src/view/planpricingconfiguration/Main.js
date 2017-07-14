/**
 * Created by s6393 on 9/19/2016.
 */
Ext.define('Atlas.benefitplan.view.planpricingconfiguration.Main', {
    extend: 'Ext.form.Panel',
    alias: 'widget.benefitplan-planpricing-main',
    title: 'Plan Pricing Configuration',
    cmbBenefitPlanSK: 0,
    cmbBenefitType: 0,
    LOBName: 0,
    listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },
    controller: 'planpricingview',
    layout: 'fit',
    viewModel: {
        data: {
            changed: false,
            phantomrecord: false,
            pharmacytypesexist: false
        },
        stores: {
            basicdetails: {
                model: 'Atlas.benefitplan.model.BenefitPlanPricing'
            },
            daylimit:
            {
                model: 'Atlas.benefitplan.model.DaySupplyType',
                autoLoad: true
            },
            drugbrandtypes: {
                autoLoad: true,
                model: 'Atlas.benefitplan.model.DrugBrandType'
            },
            pharmacytypes: {
                model: 'Atlas.benefitplan.model.BenefitPlanPharmacyType'
            },
            costbasistypes: {
                autoLoad: true,
                model: 'Atlas.benefitplan.model.CostBasisType'
            }
        }
    },
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
                    xtype: 'container',
                    region: 'center',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Pharmacy Type Selection',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'toolbar',
                                    itemId: 'pharmacyTypeButtons',
                                    cls: 'borderNone',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Pharmacy Type:'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Pricing Details',
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'grid',
                                    height:400,
                                    itemId:'CopayDistributionGrid',
                                    reference: 'CopayDistributionGrid',
                                    viewConfig: {
                                        loadMask: false
                                    },
                                    defaults: {
                                        sortable: true,
                                        filter: {
                                            type: 'string'
                                        }
                                    },
                                    plugins: [{
                                        ptype: 'rowediting',
                                        reference: 'rowediting',
                                        clicksToEdit: 2,
                                        clicksToMoveEditor: 1,
                                        pluginId: 'rowEditing',
                                        autoCancel: false
                                    }],
                                    bind: {
                                        store: '{basicdetails}'
                                    },

                                    columns: [
                                        {
                                            header: 'Day Limit',
                                            dataIndex: 'DaySuplTypeSK',
                                            renderer: 'getEditorDisplayValue',
                                            flex: 1,
                                            editor: {
                                                xtype: 'combo',
                                                typeAhead: true,
                                                allowBlank: false,
                                                forceSelection: true,
                                                bind: {
                                                    store: '{daylimit}'
                                                },
                                                queryMode: 'local',
                                                displayField: 'DaySuplTypeDesc',
                                                valueField: 'DaySuplTypeSK'
                                            }
                                        },
                                        {
                                            header: 'Drug Type',
                                            dataIndex: 'DrugBrandTypeSK',
                                            renderer: 'getEditorDisplayValue',
                                            flex: 1,
                                            dirtyText: 'Value has been edited',
                                            editor: {
                                                xtype: 'combo',
                                                typeAhead: true,
                                                allowBlank: false,
                                                forceSelection: true,
                                                bind: {
                                                    store: '{drugbrandtypes}'
                                                },
                                                queryMode: 'local',
                                                displayField: 'DrugBrandTypeCode',
                                                valueField: 'DrugBrandTypeSK'
                                            }
                                        },
                                        {
                                            header: 'Cost Basis',
                                            dataIndex: 'CostBasisTypeSK',
                                            renderer: 'getEditorDisplayValue',
                                            flex: 1,
                                            editor: {
                                                xtype: 'combo',
                                                typeAhead: true,
                                                allowBlank: false,
                                                forceSelection: true,
                                                bind: {
                                                    store: '{costbasistypes}'
                                                },
                                                queryMode: 'local',
                                                displayField: 'CostBasisTypeCode',
                                                valueField: 'CostBasisTypeSK'
                                            }
                                        },
                                        {
                                            header: 'Discount Percentage',
                                            dataIndex: 'DiscPct',
                                            format: '0.00',
                                            renderer: function (value) {
                                                return value + '%';
                                            },
                                            flex: 1,
                                            editor: {
                                                //vtype: 'posnegpercent',
                                                regex: /^(-)?(\d{1,3}(\.\d{1,2})?)$/,
                                                allowBlank: true
                                            }
                                        },
                                        {
                                            header: 'Discount Amount',
                                            dataIndex: 'DiscAmt',
                                            flex: 1,
                                            formatter: 'usMoney',
                                            editor: {
                                                vtype: 'currency',
                                                allowBlank: true
                                            }
                                        },
                                        {
                                            header: 'Minimum Dispensing Fee',
                                            dataIndex: 'MinDspnsgFeeAmt',
                                            flex: 1,
                                            formatter: 'usMoney',
                                            editor: {
                                                vtype: 'currency',
                                                allowBlank: true
                                            }
                                        },
                                        {
                                            header: 'Maximum Dispensing Fee',
                                            dataIndex: 'MaxDspnsgFeeAmt',
                                            flex: 1,
                                            formatter: 'usMoney',
                                            editor: {
                                                vtype: 'currency',
                                                allowBlank: true
                                            }
                                        },
                                        {
                                            header: 'GER Dispensing Fee',
                                            dataIndex: 'GERDspnsgFeeAmt',
                                            flex: 1,
                                            formatter: 'usMoney',
                                            editor: {
                                                vtype: 'currency',
                                                allowBlank: true
                                            }
                                        },
                                        {
                                            dataIndex: 'CurrentUser',
                                            hidden: true
                                        }],

                                    tbar: [
                                        {
                                            text: 'Add Row',
                                            handler: 'onAddClick',
                                            bind: {
                                                disabled: '{!pharmacytypesexist}'
                                            }
                                        },
                                        {
                                            text: 'Remove Row',
                                            reference: 'removeRow',
                                            handler: 'onRemoveClick',
                                            bind: {
                                                disabled: '{!CopayDistributionGrid.selection}'
                                            }
                                        }],
                                    listeners: {
                                        selectionchange: 'onSelectionChange',
                                        canceledit: 'onGridItemCancelEdit',
                                        edit: 'onGridItemComplete'
                                    }
                                }
                            ]
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
            handler: 'onCancelClick'
        },
        {
            text: 'Save',
            handler: 'onSaveClick',
            bind: {
                disabled: '{!changed || !pharmacytypesexist}'
            }
        }
    ]
});
