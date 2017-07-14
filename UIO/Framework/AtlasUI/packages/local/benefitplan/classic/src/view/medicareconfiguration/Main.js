/**
 * Created by n6570 on 2/13/2017.
 */
Ext.define('Atlas.benefitplan.view.medicareconfiguration.Main', {
    extend:'Ext.form.Panel',
    trackResetOnLoad: true,
    title: 'Medicare Configuration',
    cmbBenefitPlanSK: 0,
    cmbBenefitType: 0,
    LOBName: 0,
    layout: 'fit',
    scrollable: true,
    reference: 'medicareConfigForm',
    controller: 'medicareConfigurationController',
    viewModel: {
        data: {
            changed: false,
            validform: false,
            listaddedrow: false,
            childaddedrow: false,
            isLICSSetupChanged: false
        },
        stores: {
            licsSetupConfiguration:{
                model:'Atlas.benefitplan.model.LICSSetup',
                sorters: 'LICSSetupSK',
                listeners: {update : 'licsStoreUpdated'}
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

            logic: {
                model: 'Atlas.benefitplan.model.CopayCoinsuranceLogicType',
                sorters: 'CopayCoinsuranceLogicTypeSK',
                autoLoad: false
            },

            /*LICSType*/
            LICSType:{
                model:'Atlas.benefitplan.model.LICSType',
                sorters: [
                    {
                        property:'LICSTypeSK',
                        direction: 'ASC'
                    }
                ],
                autoLoad: false
            },
            CopyLICSType: {
                model: 'Atlas.benefitplan.model.LICSType',
                autoLoad: true
            },
            daysupplytype: {
                model: 'Atlas.benefitplan.model.DaySupply',
                sorters: 'BnftPlanPharmTypeDaySuplSK',
                autoLoad: false
            }
            ,
            benefitPlanPharmacyType:{
                model: 'Atlas.benefitplan.model.BenefitPlanPharmacyType',
                sorters: 'PharmTypeSK',
                autoLoad: false
            },
           CopyPharmacyType:{
                model: 'Atlas.benefitplan.model.BenefitPlanPharmacyType',
                sorters: 'PharmTypeSK',
                autoLoad: true
            },
            NetworkTierPharmTypesInPlan:{
                model:'Atlas.benefitplan.model.NetworkTierPharmTypesInPlan',
                autoLoad:false
            },
            LICSCopy:{
                model:'Atlas.benefitplan.model.LICSCopy'
            },
            CurrentNetworkTiers: {
                fields : [
                    'NtwrkTierSK', 'NtwrkTierName'
                ]
            },
            CurrentLICSLevel: {
                fields : [
                    'LICSTypeSK', 'LICSTypeCode'
                ]
            },
            CurrentLICSPharmType: {
                fields : [
                    'PharmTypeSK', 'PharmTypeCode'
                ]
            }
        }
    },

    listeners: {
        beforeClose: 'checkForUnsavedRecords'
    },
    items: [
        {
            layout: 'border',
            items: [
                /*Progress Bar*/
                {
                    xtype: 'benefitplan-progress',
                    region: 'north',
                    itemId: 'thermometerPanel'
                },
                {
                    xtype:'container',

                    scrollable:true,
                    region: 'center',
                    items:[
                        {   xtype: 'fieldset',
                            title: 'Medicare Setup',
                            items:[
                                {   xtype: 'fieldset',
                                    title: 'Medicare Setup Filters',
                                    layout: 'vbox',
                                    items :[
                                        {
                                            xtype:'toolbar',
                                            itemId: 'LICSTypeButtons',
                                            cls: 'borderNone',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'LICS Level:'
                                                }
                                            ]
                                        },
                                        {
                                            xtype:'toolbar',
                                            itemId: 'pharmacyTypeButtons',
                                            cls: 'borderNone',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Pharmacy Types:'
                                                }
                                            ]
                                        },
                                        {
                                            xtype:'toolbar',
                                            itemId: 'formularyTierButtons',
                                            cls: 'borderNone',
                                            width: '100%',
                                            layout: 'column',
                                            defaults: {
                                                style: {
                                                    'margin-bottom': '4px'
                                                }
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    text: 'Formulary Tier:'
                                                }
                                            ]
                                        }

                                    ]
                                },
                                /*Transition Configuration Grid*/
                                {   xtype: 'fieldset',
                                    title: 'Medicare Copay',
                                    items: [
                                        {
                                            xtype: 'grid',
                                            sortable: true,

                                            reference: 'refTransitionConfigurationGrid',
                                            minHeight: 300,
                                            defaults: {
                                                filter: {
                                                    type: 'string'
                                                }
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
                                            viewConfig: {
                                                loadMask: false
                                            },
                                            columns: [
                                                {
                                                    dataIndex: 'LICSSetupSK',
                                                    hidden:true
                                                },
                                                {
                                                    dataIndex: 'BnftPlanSK',
                                                    hidden:true

                                                },
                                                {
                                                    header: 'LICS Level',
                                                    dataIndex: 'LICSTypeSK',
                                                    renderer: 'getEditorDisplayValue',
                                                    flex: 1,
                                                    editor: {
                                                        xtype: 'combo',
                                                        emptyText: 'Select Level',
                                                        bind: {
                                                            store: '{LICSType}'
                                                        },
                                                        displayField: 'LICSTypeCode',
                                                        valueField: 'LICSTypeSK',
                                                        allowBlank: false,
                                                        enableKeyEvents: true,
                                                        typeAhead: true,
                                                        forceSelection: true,
                                                        queryMode: 'local'
                                                    }

                                                },
                                                {
                                                    header: 'Pharmacy Types',
                                                    dataIndex: 'PharmTypeSK',
                                                    flex: 1,
                                                    renderer: 'getEditorDisplayValue',
                                                    editor: {
                                                        xtype: 'combo',
                                                        emptyText: 'Select Type',
                                                        bind: {
                                                            store: '{benefitPlanPharmacyType}'
                                                        },
                                                        allowBlank: false,
                                                        enableKeyEvents: true,
                                                        typeAhead: true,
                                                        forceSelection: true,
                                                        queryMode: 'local',
                                                        displayField: 'PharmTypeCode',
                                                        valueField: 'PharmTypeSK'
                                                    }

                                                },

                                                {
                                                    header: 'Formulary Tier',
                                                    dataIndex: 'FrmlryTierSK',
                                                    flex: 1,
                                                    renderer: 'getEditorDisplayValue',
                                                    editor: {
                                                        xtype: 'combo',
                                                        emptyText: 'Select Tier',
                                                        bind: {
                                                            store: '{formularytier}'
                                                        },
                                                        displayField: 'FrmlryTierNbr',
                                                        valueField: 'FrmlryTierSK',
                                                        allowBlank: false,
                                                        enableKeyEvents: true,
                                                        typeAhead: true,
                                                        forceSelection: true,
                                                        queryMode: 'local'
                                                    }
                                                },
                                                {
                                                    header: 'Coverage Phase',
                                                    dataIndex: 'CvrgPhaseSK',
                                                    flex: 1,
                                                    renderer: 'getEditorDisplayValue',
                                                    editor: {
                                                        xtype: 'combo',
                                                        emptyText: 'Select Type',
                                                        bind: {
                                                            store: '{coveragephasetype}'
                                                        },
                                                        allowBlank: false,
                                                        enableKeyEvents: true,
                                                        typeAhead: true,
                                                        forceSelection: true,
                                                        queryMode: 'local',
                                                        displayField: 'CvrgPhaseCode',
                                                        valueField: 'CvrgPhaseSK'
                                                    }

                                                },
                                                {
                                                    header: 'Day Supply',
                                                    dataIndex: 'DaySuplTypeSK',
                                                    flex: 1,
                                                    renderer: 'getEditorDisplayValue',
                                                    editor: {
                                                        xtype: 'combo',
                                                        emptyText: 'Select Type',
                                                        bind: {
                                                            store: '{daysupplytype}'
                                                        },
                                                        allowBlank: false,
                                                        enableKeyEvents: true,
                                                        typeAhead: true,
                                                        forceSelection: true,
                                                        queryMode: 'local',
                                                        displayField: 'DaySuplTypeCode',
                                                        valueField: 'DaySuplTypeSK'
                                                    }

                                                },
                                                {
                                                    header: 'Copay Coinsurance Logic',
                                                    dataIndex: 'CopayCoinsuranceLogicTypeSK',
                                                    renderer: 'getEditorDisplayValue',
                                                    flex: 1,
                                                    editor: {
                                                        xtype: 'combo',
                                                        emptyText: 'Select Logic',
                                                        bind: {
                                                            store: '{logic}'
                                                        },
                                                        displayField: 'CopayCoinsuranceLogicTypeCode',
                                                        valueField: 'CopayCoinsuranceLogicTypeSK',
                                                        allowBlank: false,
                                                        enableKeyEvents: true,
                                                        typeAhead: true,
                                                        forceSelection: true,
                                                        queryMode: 'local'
                                                    }
                                                },
                                                {
                                                    header: 'Copay Amount',
                                                    dataIndex: 'CopayAmt',
                                                    renderer: function (value) {
                                                        if(value != null && value != '') {
                                                            return Ext.util.Format.usMoney(value);
                                                        } else {
                                                            return value;
                                                        }
                                                    },
                                                    flex: 1,
                                                    editor: {
                                                        vtype: 'currency',
                                                        enableKeyEvents: true
                                                    }

                                                },
                                                {
                                                    header: 'Coinsurance %',
                                                    dataIndex: 'CoinsurancePct',
                                                    flex: 1,
                                                    format: '0.00',
                                                    renderer: function (value) {
                                                        if(value != null && value != '') {
                                                            return value + '%';
                                                        } else {
                                                            return value;
                                                        }
                                                    },
                                                    editor: {
                                                        vtype: 'percent',
                                                        enableKeyEvents: true
                                                    }

                                                },
                                                {
                                                    dataIndex: 'Deleted',
                                                    hidden:true

                                                },
                                                {
                                                    dataIndex: 'CurrentUser',
                                                    hidden:true

                                                }
                                            ],

                                            tbar: [
                                                {
                                                    text: 'Add Row',
                                                    handler: 'onGridAddRowClick'
                                                },
                                                {
                                                    text: 'Remove Row',
                                                    reference:'removeRow',
                                                    handler: 'onGridRemoveRowClick',
                                                    bind:
                                                    {
                                                        disabled: '{!refTransitionConfigurationGrid.selection}'
                                                    }
                                                }],
                                            listeners: {
                                                selectionchange: 'onSelectionChange',
                                                canceledit: 'onGridItemCancelEdit',
                                                edit: 'onGridItemComplete',
                                                beforeedit: 'beforeGridEdit',
                                                validateedit:'validateEdit'
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
            itemId: 'onCopyLICSClick',
            title: 'Copy Medicare Configuration',
            iconCls: 'x-fa fa-question-circle',
            draggable: true,
            closable: false,
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
                            html: 'LICS Level',
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
                            displayField: 'LICSTypeCode',
                            reference: 'refFromLICS',
                            valueField: 'LICSTypeSK',
                            queryMode: 'local',
                            bind: {
                                store: '{CurrentLICSLevel}'
                            },
                            listeners: {
                                select: 'onfromLICSLevelSelect'
                            }
                        },
                        {
                            xtype: 'combobox',
                            displayField: 'PharmTypeCode',
                            valueField: 'PharmTypeSK',
                            reference: 'refFromPharm',
                            queryMode: 'local',
                            bind: {
                                store: '{CurrentLICSPharmType}',
                                 disabled:'{!refFromLICS.selection}'
                            }
                        },
                        {
                            xtype: 'label',
                            html: 'Copy To:'
                        },
                        {
                            xtype: 'tagfield',
                            displayField: 'LICSTypeCode',
                            valueField: 'LICSTypeSK',
                            reference: 'refToLICS',
                            queryMode: 'local',
                            multiselect: true,
                            stacked: true,
                            filterPickList: true,
                             bind: {
                                 store: '{CopyLICSType}',
                                 disabled:'{!refFromLICS.selection || !refFromPharm.selection}'
                             }
                        },
                        {
                            xtype: 'tagfield',
                            queryMode: 'local',
                            displayField: 'PharmTypeCode',
                            valueField: 'PharmTypeSK',
                            stacked: true,
                            reference: 'refToPharm',
                            multiselect: true,
                            filterPickList: true,
                            bind: {
                                store: '{CopyPharmacyType}',
                                disabled:'{!refFromLICS.selection || !refFromPharm.selection || !refToLICS.selection}'
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
                            bind: {
                                disabled: '{!refToLICS.selection || !refFromLICS.selection || !refToPharm.selection || !refFromPharm.selection }'
                            },
                            handler:'onCopyLICSSaveClick'
                        },
                        {
                            xtype: 'button',
                            text: 'Cancel',
                            handler: 'onCopyLICSCancelClick'
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
            text: 'Copy Medicare Configuration',
            handler : 'onCopyClick'
        },
        '->',
        {
            text: 'Cancel',
            handler: 'onCancelClick'
        },
        {
            text: 'Save',
            handler: 'onSaveClick',
            bind: {
                disabled: '{!isLICSSetupChanged}'
            }
        }
    ]
});
