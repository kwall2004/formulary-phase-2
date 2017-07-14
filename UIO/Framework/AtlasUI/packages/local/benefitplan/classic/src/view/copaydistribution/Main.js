/**
 * Created by n6570 on 10/26/2016.
 */
Ext.define('Atlas.benefitplan.view.copaydistribution.Main', {
    extend: 'Ext.form.Panel',
    alias: 'widget.copaydistribution',
    title: 'Copay Distribution',
    controller: 'CopayDistributionController',
    reference: 'CopayDistributionForm',
    scrollable: true,
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
            isEnabled: false

        },
        stores: {
            copaydistributionLICS: {
                model:'Atlas.benefitplan.model.CopayDistributionLICS',
                proxy: {
                    type: 'benefitplan',
                    url: '/CopayDistributionLICS',
                    actionMethods: {
                        create: 'PUT',
                        read: 'GET',
                        update: 'PUT',
                        destroy: 'PUT'
                    }
                }
            },
            formularytier:{
                model:'Atlas.benefitplan.model.FormularyTier',
                sorters: 'FrmlryTierSK',
                autoLoad: false
            },
            coveragephasetype: {
                model: 'Atlas.benefitplan.model.CoveragePhaseType',
                sorters: 'CvrgPhaseTypeSK',
                autoLoad: true
            },
            copaydistribution:{
                model:'Atlas.benefitplan.model.CopayDistribution',
                sorters: 'CopayDistSK',
                listeners: {update : 'storeUpdated'}
            },
            licstypebyplan:{
                model: 'Atlas.benefitplan.model.LICSTypeByPlan',
                sorters: 'LICSTypeSK',
                autoLoad: true
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
                        {
                            xtype: 'fieldset',
                            title: 'Filters',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'toolbar',
                                    itemId: 'coveragePhaseTypeButtons',
                                    cls: 'borderNone',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Coverage Phase Type:'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'toolbar',
                                    itemId: 'formularyTierButtons',
                                    cls: 'borderNone',
                                    layout: 'column',
                                    width: '100%',
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
                                },
                                {
                                    xtype: 'toolbar',
                                    itemId: 'LICSTypeButtons',
                                    cls: 'borderNone',
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'LICS Level:'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype:'fieldset',
                            items:[
                                {
                                    xtype: 'numberfield',
                                    name: 'LICS4DeducblAmt',
                                    reference: 'LICSDeductible',
                                    fieldLabel: 'LICS 4 Deductible',
                                    renderer: function (value) {
                                        if(value != null && value != '') {
                                            return Ext.util.Format.usMoney(value);
                                        } else {
                                            return value;
                                        }
                                    },
                                    bind:{
                                        disabled: '{!isEnabled}'
                                    },
                                    hideTrigger : true,
                                    spinDownEnabled: false,
                                    spinUpEnabled: false,
                                    minValue : 0,
                                    maxValue:  999999.99,
                                    listeners:{
                                        change: 'onItemChanged'
                                    }
                                }
                            ]

                        },
                        {
                            xtype: 'fieldset',
                            title: 'Copay Distribution',
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'grid',
                                    minHeight:250,
                                    itemId: 'refCopayDistributionGrid',
                                    reference: 'refCopayDistributionGrid',
                                    bind: {
                                        store: '{copaydistribution}'
                                    },
                                    viewConfig: {
                                        loadMask: false
                                    },
                                    plugins: [
                                        {
                                            ptype: 'rowediting',
                                            reference: 'rowEditing',
                                            clicksToEdit: 2,
                                            clicksToMoveEditor: 1,
                                            id: 'rowEditing'
                                        }
                                    ],
                                    columns: [
                                        {
                                            text: 'LICS Level',
                                            flex: 1,
                                            emptytext: 'select type',
                                            dataIndex: 'LICSTypeSK',
                                            renderer: 'getEditorDisplayValue',
                                            editor: {
                                                xtype: 'combo',
                                                emptytext: 'select LICS Level',
                                                bind: {
                                                    store: '{licstypebyplan}'
                                                },
                                                editable:false,
                                                selectOnFocus: false,
                                                triggerAction: 'all',
                                                displayField: 'LICSTypeCode',
                                                valueField: 'LICSTypeSK',
                                                allowBlank: false,
                                                typeAhead: false,
                                                forceSelection: true,
                                                queryMode: 'local'
                                            }
                                        },
                                        {
                                            text: 'Coverage Phase',
                                            flex: 1,
                                            emptytext: 'select type',
                                            dataIndex: 'CvrgPhaseTypeSK',
                                            renderer: 'getEditorDisplayValue',
                                            editor: {
                                                xtype: 'combo',
                                                emptyText: 'Select Type',
                                                bind: {
                                                    store: '{coveragephasetype}'
                                                },
                                                editable:false,
                                                selectOnFocus: false,
                                                triggerAction: 'all',
                                                allowBlank: false,
                                                forceSelection: true,
                                                typeAhead: false,
                                                queryMode: 'local',
                                                displayField: 'CvrgPhaseCode',
                                                valueField: 'CvrgPhaseTypeSK'
                                            }
                                        },
                                        {
                                            text: 'Formulary Tier',
                                            flex: 1,
                                            dataIndex: 'FrmlryTierSK',
                                            renderer: 'getEditorDisplayValue',
                                            editor: {
                                                xtype: 'combo',
                                                emptytext: 'select Tier',
                                                bind: {
                                                    store: '{formularytier}'
                                                },
                                                editable:false,
                                                selectOnFocus: false,
                                                triggerAction: 'all',
                                                displayField: 'FrmlryTierNbr',
                                                valueField: 'FrmlryTierSK',
                                                allowBlank: false,
                                                typeAhead: false,
                                                forceSelection: true,
                                                queryMode: 'local'
                                            }
                                        },
                                        {
                                            text: 'Member Responsibility Amount',
                                            flex: 1,
                                            dataIndex: 'MbrRespAmt',
                                            formatter: 'usMoney',
                                            editor: {
                                                vtype: 'currency',
                                                allowBlank: false
                                            }
                                        },
                                        {
                                            text: 'Member Responsibility %',
                                            flex: 1,
                                            dataIndex: 'MbrRespPct',
                                            xtype: 'numbercolumn',
                                            format: '0.00',
                                            renderer: function (value) {
                                                return value + '%';
                                            },
                                            editor: {
                                                vtype: 'percent',
                                                allowBlank: false,
                                                enableKeyEvents: true
                                            }
                                        },
                                        {
                                            text: 'Manufacturer Responsibility %',
                                            flex: 1,
                                            xtype: 'numbercolumn',
                                            format: '0.00',
                                            dataIndex: 'MfgRespPct',
                                            renderer: function (value) {
                                                return value + '%';
                                            },
                                            editor: {
                                                vtype: 'percent',
                                                allowBlank: false,
                                                enableKeyEvents: true
                                            }
                                        },
                                        {
                                            text: 'LICS Subsidy Applies',
                                            flex: 1,
                                            renderer: function(aValue, aMetadata, aRecord, aRowInderx, aColIndex, aStore){
                                                aMetadata.style = "text-align: center";
                                                return '<div class="x-grid-checkcolumn' + (aValue != null && aValue == true ? '-checked' : '') + '"> </div>';
                                            },
                                            dataIndex: 'LICSSubsidyAppliesInd',
                                            editor: {
                                                xtype: 'checkbox',
                                                cls: 'x-grid-checkheader-editor',
                                                uncheckedValue: false
                                            }


                                        },
                                        {
                                            dataIndex: 'CopayDistSK',
                                            hidden: true
                                        },
                                        {
                                            dataIndex: 'IsDeleted',
                                            hidden: true
                                        }
                                    ],
                                    tbar: [
                                        {
                                            text: 'Add Row',
                                            itemId: 'addRow',
                                            handler: 'onCopayDistGridAddClick'
                                        },
                                        {
                                            text: 'Remove Row',
                                            itemId: 'removeRow',
                                            handler: 'onCopayDistGridRemoveRowClick',
                                            bind: {
                                                disabled: '{!refCopayDistributionGrid.selection}'
                                            }
                                        }
                                    ],
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
        }],
    bbar: [
        '->',
        {
            text: 'Cancel',
            handler: 'onCancelClicks'
        },
        {
            text: 'Save',
            bind: {
                disabled: '{!validform || !changed}'
            },
            handler: 'onSaveClick'
        }
    ]
});