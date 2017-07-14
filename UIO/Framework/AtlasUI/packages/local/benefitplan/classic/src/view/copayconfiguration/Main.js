/**
 * Created by s6393 on 10/24/2016.
 */
Ext.define('Atlas.benefitplan.view.copayconfiguration.Main', {
    extend: 'Ext.form.Panel',
    trackResetOnLoad: true,
    title: 'Plan Copay Configuration',
    controller: 'copayConfigurationController',
    scrollable: true,
    cmbBenefitPlanSK: 0,
    cmbBenefitType: 0,
    LOBName: 0,
    listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },
    viewModel: {
        data: {
            changed: false
        },
        stores: {
           copyCopay: {
               model: 'Atlas.benefitplan.model.CopyCopayConfiguration'
           },
            NetworkTier: {
                model: 'Atlas.benefitplan.model.NetworkTier',
                sorters: 'NtwrkTierSK',
                autoload: false
            },
            formularytier:{
                model:'Atlas.benefitplan.model.FormularyTier',
                sorters: 'FrmlryTierSK',
                autoLoad: false
            },
            coveragephasetype: {
                model: 'Atlas.benefitplan.model.CoveragePhaseType',
                sorters: 'CvrgPhaseTypeSK',
                autoLoad: false
            },
            pharmacytype: {
                model: 'Atlas.benefitplan.model.BenefitPlanPharmacyType',
                sorters: 'PharmTypeSK',
                autoLoad: false
            },

            daysupplytype: {
                model: 'Atlas.benefitplan.model.DaySupply',
                sorters: 'BnftPlanPharmTypeDaySuplSK',
                autoLoad: false
            },
            logic: {
                model: 'Atlas.benefitplan.model.CopayCoinsuranceLogicType',
                sorters: 'CopayCoinsuranceLogicTypeSK',
                autoLoad: false
            },
            copayconfiguration:{
                model:'Atlas.benefitplan.model.CopaySetup',
                sorters: 'CopaySetupSK',
                listeners: {update : 'storeUpdated'},
                proxy: {
                    actionMethods: {
                        create: 'PUT',
                        read: 'GET',
                        update: 'PUT',
                        destroy: 'PUT'
                    },
                    type: 'benefitplan',
                    url: '/CopaySetup'
                }
            },
            pharmacyTypes:{
                model: 'Atlas.benefitplan.model.PharmacyTypes',
                autoLoad: true
            },
            NetworkTier:{
                model: 'Atlas.benefitplan.model.NetworkTiersInPlan',
                autoLoad:true
            },
            NetworkTierPharmTypesInPlan:{
                model:'Atlas.benefitplan.model.NetworkTierPharmTypesInPlan',
                autoLoad:false
            },
            CurrentNetworkTiers: {
                fields : [
                    'NtwrkTierSK', 'NtwrkTierName'
                ]
            }
        }
    },
    items: [
        {
            xtype: 'container',
            layout: 'fit',
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
                        {   xtype: 'fieldset',
                            title: 'Plan Copay Setup',
                            items:[
                        {
                            xtype: 'fieldset',
                            title: 'Plan Copay Filter',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'toolbar',
                                    itemId: 'networkTierButtons',
                                    cls: 'borderNone',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Network Tier'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'toolbar',
                                    itemId: 'pharmacyTypeButtons',
                                    cls: 'borderNone',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Pharmacy Type'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'toolbar',
                                    itemId: 'coveragePhaseButtons',
                                    cls: 'borderNone',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Coverage Phase'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'toolbar',
                                    itemId: 'formularyTierButtons',
                                    layout: 'column',
                                    width: '100%',
                                    cls: 'borderNone',
                                    defaults: {
                                        style: {
                                            'margin-bottom': '4px'
                                        }
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Formulary Tier'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            layout: 'fit',
                            title: 'Plan Copay',
                            items: [
                                {
                                    xtype: 'grid',
                                    minHeight:250,
                                    itemId: 'refCopayConfigurationGrid',
                                    reference: 'refCopayConfigurationGrid',
                                    plugins: [
                                        {
                                            ptype: 'rowediting',
                                            reference: 'rowEditing',
                                            clicksToEdit: 2,
                                            clicksToMoveEditor: 1,
                                            id: 'rowEditing'
                                        }
                                    ],
                                    viewConfig: {
                                        loadMask: false
                                    },
                                    columns: [
                                        {
                                            text: 'Network Tier',
                                            flex: 1,
                                            dataIndex: 'NtwrkTierSK',
                                            renderer: 'getEditorDisplayValue',
                                            editor: {
                                                xtype: 'combo',
                                                emptytext: 'select Tier',
                                                bind: {
                                                    store: '{NetworkTier}'
                                                },
                                                displayField: 'NtwrkTierName',
                                                valueField: 'NtwrkTierSK',
                                                allowBlank: false,
                                                typeAhead: true,
                                                forceSelection: true,
                                                queryMode: 'local'
                                            }
                                        },


                                        {
                                            text: 'Pharmacy Type',
                                            dataIndex: 'PharmTypeSK',
                                            flex: 1,
                                            renderer: 'getEditorDisplayValue',
                                            editor: {
                                                xtype: 'combo',
                                                emptytext: 'select Pharmacy Type',
                                                displayField: 'PharmTypeCode',
                                                valueField: 'PharmTypeSK',
                                                allowBlank: false,
                                                typeAhead: true,
                                                forceSelection: true,
                                                queryMode: 'local',
                                                bind: {
                                                    store: '{pharmacytype}'
                                                }
                                            }
                                        },
                                        {
                                            text: 'Coverage Phase',
                                            flex: 1,
                                            emptytext: 'select type',
                                            dataIndex: 'CvrgPhaseSK',
                                            renderer: 'getEditorDisplayValue',
                                            editor: {
                                                xtype: 'combo',
                                                emptyText: 'Select Type',
                                                bind: {
                                                    store: '{coveragephasetype}'
                                                },
                                                allowBlank: false,
                                                typeAhead: true,
                                                forceSelection: true,
                                                queryMode: 'local',
                                                displayField: 'CvrgPhaseCode',
                                                valueField: 'CvrgPhaseSK'
                                            }
                                        },
                                        {
                                            text: 'Form Tier',
                                            flex: 1,
                                            dataIndex: 'FrmlryTierSK',
                                            renderer: 'getEditorDisplayValue',
                                            editor: {
                                                xtype: 'combo',
                                                emptytext: 'select Tier',
                                                bind: {
                                                    store: '{formularytier}'
                                                },
                                                displayField: 'FrmlryTierNbr',
                                                valueField: 'FrmlryTierSK',
                                                allowBlank: false,
                                                typeAhead: true,
                                                forceSelection: true,
                                                queryMode: 'local'
                                            }
                                        },{
                                            header: 'Days Supply',
                                            dataIndex: 'DaySuplTypeSK',
                                            renderer: 'getEditorDisplayValue',
                                            flex: 1,
                                            editor: {
                                                xtype: 'combo',
                                                itemId: 'daycombo',
                                                emptytext: 'select Tier',
                                                bind: {
                                                    store: '{daysupplytype}'
                                                },

                                                displayField: 'DaySuplTypeDesc',
                                                valueField: 'DaySuplTypeSK',
                                                allowBlank: false,
                                                typeAhead: true,
                                                forceSelection: true,
                                                queryMode: 'local'
                                            }
                                        },
                                        {
                                            header: 'Copay Amount',
                                            dataIndex: 'CopayAmt',
                                            formatter: 'usMoney',
                                            flex: 1,
                                            editor: {
                                                vtype: 'currency',
                                                allowBlank: false
                                            }
                                        },
                                        {
                                            header: 'Coinsurance %',
                                            dataIndex: 'CoinsurnacePct',
                                            flex: 1,
                                            xtype: 'numbercolumn',
                                            format: '0.00',
                                            renderer: function (value) {
                                                return value + '%';
                                            },
                                            editor: {
                                                vtype: 'percent',
                                                allowBlank: false
                                            }
                                        },{
                                            header: 'Logic',
                                            dataIndex: 'CopayCoinsuranceLogicTypeSK',
                                            renderer: 'getEditorDisplayValue',
                                            flex: 1,
                                            editor: {
                                                xtype: 'combo',
                                                emptytext: 'select Logic',
                                                bind: {
                                                    store: '{logic}'
                                                },
                                                displayField: 'CopayCoinsuranceLogicTypeCode',
                                                valueField: 'CopayCoinsuranceLogicTypeSK',
                                                allowBlank: false,
                                                typeAhead: true,
                                                forceSelection: true,
                                                queryMode: 'local'
                                            }
                                        },{
                                            header: 'Max Cost Per Rx',
                                            dataIndex: 'MaxMbrCostPerRx',
                                            formatter: 'usMoney',
                                            flex: 1,
                                            editor: {
                                                vtype: 'currency',
                                                allowBlank: false
                                            }
                                        },{
                                            header: 'Member Monthly Coverage Max',
                                            dataIndex: 'MbrMthlyCvrgMaxAmt',
                                            formatter: 'usMoney',
                                            flex: 1,
                                            editor: {
                                                vtype: 'currency',
                                                allowBlank: false
                                            }
                                        },{
                                            header: 'Member Yearly Coverage Max',
                                            dataIndex: 'MbrYearlyCvrgMaxAmt',
                                            formatter: 'usMoney',
                                            flex: 1,
                                            editor: {
                                                vtype: 'currency',
                                                allowBlank: false
                                            }
                                        },{
                                            header: 'Plan Monthly Coverage Max',
                                            dataIndex: 'PlanMthlyCvrgMaxAmt',
                                            formatter: 'usMoney',
                                            flex: 1,
                                            editor: {
                                                vtype: 'currency',
                                                allowBlank: false
                                            }
                                        },{
                                            header: 'Plan Yearly Coverage Max',
                                            dataIndex: 'PlanYearlyCvrgMaxAmt',
                                            formatter: 'usMoney',
                                            flex: 1,
                                            editor: {
                                                vtype: 'currency',
                                                allowBlank: false
                                            }
                                        },
                                        {
                                            dataIndex: 'BnftPlanSK',
                                            hidden: true
                                        },
                                        {
                                            dataIndex: 'CurrentUser',
                                            renderer: 'onCurrentUserRenderer',
                                            hidden: true
                                        }
                                    ],

                                    tbar: [
                                        {
                                            text: 'Add Row',
                                            handler: 'onCopaySetupGridAddClick'
                                        },
                                        {
                                            text: 'Remove Row',
                                            reference: 'removeRow',
                                            handler: 'onCopaySetupGridRemoveRowClick',
                                            bind:{
                                                disabled:'{!refCopayConfigurationGrid.selection}'
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
            ]
        },
        {
            xtype: 'window',
            itemId: 'onCopyClick',
            title: 'Copy Copay Configuration',
            iconCls: 'x-fa fa-question-circle',
            // region:'center',
            draggable: false,
            closable:false,
            scrollable: false,
            resizable: false,
            modal: true,
            defaults: {

                labelWidth: 200,
                allowBlank: false,
                typeAhead: true,
                forceSelection: true
            },
            items: [
                {
                    xtype: 'label',
                    value: 'Select the elements  you would like to copy:'
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'table',
                        columns: 3
                    },
                    items: [
                        {
                            html: ''
                        },
                        {
                            xtype: 'label',
                            html: 'Network Tier:',
                            cellCls: 'x-title-align-center'
                        },
                        {
                            xtype: 'label',
                            html: 'Pharmacy Type:',
                            cellCls: 'x-title-align-center'
                        },
                        {
                            xtype: 'label',
                            html: 'Copy From:'
                        },
                        {
                            xtype: 'combobox',
                            displayField: 'NtwrkTierName',
                            valueField: 'NtwrkTierSK',
                            reference: 'fromNetworkRef',
                            queryMode: 'local',
                            bind: {
                                store: '{CurrentNetworkTiers}'
                            },
                            listeners: {
                                select: 'onfromNtwrkTierSelect'
                            }
                        },
                        {
                            xtype: 'combobox',
                            displayField: 'PharmTypeCode',
                            valueField: 'PharmTypeSK',
                            bind: {
                                store: '{NetworkTierPharmTypesInPlan}',
                                disabled: '{!fromNetworkRef.selection}'
                            },
                            listeners: {
                                select: 'onfromPharmacyTypeSelect'
                            }
                        },
                        {
                            xtype: 'label',
                            html: 'Copy To:'
                        },
                        {
                            xtype: 'combobox',
                            displayField: 'NtwrkTierName',
                            valueField: 'NtwrkTierSK',
                            reference:'toNetworkRef',
                            bind: {
                                store: '{NetworkTier}'
                            },
                            listeners: {
                                select: 'ontoNtwrkTierSelect'
                            }
                        },
                        {
                            xtype: 'tagfield',
                            queryMode: 'local',
                            displayField: 'PharmTypeCode',
                            valueField: 'PharmTypeSK',
                            multiselect: true,
                            filterPickList: true,
                            listeners: {
                                select: 'ontoPharmacyTypeSelect'
                            },
                            bind: {
                                store: '{pharmacytype}',
                                disabled: '{!toNetworkRef.selection}'
                            }
                        }
                    ]
                }
            ]
            ,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Save',
                            handler:'onCopyCopaySaveClick'
                        },
                        {
                            xtype: 'button',
                            text: 'Cancel',
                            handler: 'onCopyCopayCancelClick'
                        },
                        {
                            dataIndex: 'username',
                            renderer: 'onUserRenderer',
                            hidden: true
                        }
                    ]
                }
            ]
        }
        ],
    bbar: [
        {
            text: 'Copy Copay Configuration',
            handler : 'onCopyClick'
        },
        '->',
        {
            text: 'Cancel',
            handler: 'onCancelClick'
        },
        {
            text: 'Save',
            handler : 'onSaveClick',
            bind:{
                disabled: '{!changed}'
            }
        }
    ]
});