/**
 * Created by j3703 on 10/10/2016.
 */
Ext.define('Atlas.benefitplan.view.PharmacyTypes.Main', {
    extend: 'Ext.panel.Panel',
    title: 'Pharmacy Types',
    layout: 'fit',
    trackResetOnLoad: true,
    cmbBenefitPlanSK: 0,
    cmbBenefitType: 0,
    LOBName: 0,
    listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },
    controller: 'pharmacyTypesController',
    viewModel: {
        data: {
            changed: false,
            editingrow: false
        },
        stores: {
            pharmacyLimits: {
                model : 'Atlas.benefitplan.model.BenefitPlanPharmacyLimitsConfig'
            },
            pharmacyTypes: {
                model: 'Atlas.benefitplan.model.BenefitPlanPharmacyType'
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
                    scrollable : true,
                    region: 'center',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Pharmacy Limits Configuration',
                            items: [
                                /*Pharmacy Limits Configuration Grid*/
                                {
                                    xtype: 'grid',
                                    reference:  'pharmacyLimitsConfigurationGrid',
                                    minHeight: 200,
                                    defaults: {
                                        sortable: true,
                                        filter: {
                                            type: 'string'
                                        }
                                    },
                                    viewConfig: {
                                        loadMask: false
                                    },
                                    plugins: [{
                                        ptype: 'rowediting',
                                        pluginId: 'rowEditing',
                                        reference: 'rowEditing',
                                        clicksToEdit: 2,
                                        clicksToMoveEditor: 1,
                                        autoCancel: false
                                    }],
                                    selModel: 'rowmodel',
                                    bind: {
                                        store: '{pharmacyLimits}'
                                    },

                                    columns: [
                                        {
                                            dataIndex: 'BnftPlanSK',
                                            hidden: true
                                        },
                                        {
                                            dataIndex: 'CurrentUser',
                                            renderer: 'onCurrentUserRenderer',
                                            hidden: true
                                        },
                                        {
                                            header: 'Pharmacy Types',
                                            dataIndex: 'PharmTypeSK',
                                            flex: 1,
                                            renderer: 'getEditorDisplayValue',
                                            editor: {
                                                xtype: 'combo',
                                                displayField: 'PharmTypeCode',
                                                valueField: 'PharmTypeSK',
                                                allowBlank: false,
                                                typeAhead: true,
                                                forceSelection: true,
                                                queryMode: 'local',
                                                bind: {
                                                    store: '{pharmacyTypes}'
                                                }
                                            }
                                        },
                                        {
                                            header:'Non Maint. Day Supply Limit',
                                            dataIndex: 'MaxDaySuplNonMntncMedications',
                                            flex: 1,
                                            xtype:'numbercolumn',
                                            format: '0',
                                            editor: {
                                                vtype: 'numeric',
                                                allowBlank: false
                                            }
                                        },
                                        {
                                            header:'Maint. Day Supply Limit',
                                            dataIndex: 'MaxDaySuplMntncMedications',
                                            flex: 1,
                                            xtype: 'numbercolumn',
                                            format: '0',
                                            editor: {
                                                vtype: 'numeric',
                                                allowBlank: false
                                            }
                                        },
                                        {
                                            header:'Early Refill %',
                                            dataIndex: 'EarlyRefillPct',
                                            xtype: 'numbercolumn',
                                            format: '0.00',
                                            renderer: function (value) {
                                                return value + '%';
                                            },
                                            flex: 1,
                                            editor: {
                                                vtype: 'percent',
                                                allowBlank: false,
                                                enableKeyEvents: true
                                            }
                                        },
                                        {
                                            header: 'Monthly Max $',
                                            nestedIndex: 'DaySupplyTypeList[0].MaximumCost',
                                            flex: 1,
                                            formatter: 'usMoney',
                                            xtype: 'numbercolumn',
                                            editor: {
                                                vtype: 'currency',
                                                allowBlank: false
                                            }
                                        },
                                        {
                                            header: 'Max $ Per 60 Days',
                                            nestedIndex: 'DaySupplyTypeList[1].MaximumCost',
                                            flex: 1,
                                            formatter: 'usMoney',
                                            xtype: 'numbercolumn',
                                            editor: {
                                                vtype: 'currency',
                                                allowBlank: false
                                            }

                                        },
                                        {
                                            header: 'Max $ Per 90 Days',
                                            nestedIndex: 'DaySupplyTypeList[2].MaximumCost',
                                            flex: 1,
                                            formatter: 'usMoney',
                                            xtype: 'numbercolumn',
                                            editor: {
                                                vtype: 'currency',
                                                allowBlank: false
                                            }

                                        },{
                                            header: 'Max $ Per Rx',
                                            dataIndex: 'MaxCostPerRx',
                                            flex: 1,
                                            formatter: 'usMoney',
                                            xtype: 'numbercolumn',
                                            editor: {
                                                vtype: 'currency',
                                                allowBlank: false
                                            }
                                        }
                                    ],
                                    tbar: [
                                        {
                                            text: 'Add Row',
                                            handler: 'onRowAddClick'
                                        },
                                        {
                                            text: 'Remove Row',
                                            handler: 'onRowRemoveClick',
                                            bind:
                                            {
                                                disabled: '{!pharmacyLimitsConfigurationGrid.selection}'
                                            }
                                        }],
                                    listeners: {
                                        canceledit: 'onGridItemCancelEdit',
                                        beforeedit: 'onGridBeforeEdit',
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
            handler : 'onPharmacyLimitsConfigurationBtnCancel'
        },
        {
            text: 'Save',
            handler : 'onPharmacyLimitsConfigurationBtnSave',
            bind: {
                disabled: '{!changed}'
            }
        }
    ]
});
