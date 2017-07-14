/**
 * Created by s6627 on 11/26/2016.
 */
Ext.define('Atlas.common.view.sharedviews.DrugAllergies', {
    extend: 'Ext.panel.Panel',
    xtype: 'drugallergies',
    title: 'Drug Allergies',
    controller: 'DrugAllergiesController',
    viewModel:'DrugAllergiesViewModel',
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },

    items: [
        {
            xtype: 'panel',
            itemId:'pnlAllergies',
            border: true,
            // layout: 'fit',
            flex: 1,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'grid',
                    itemId: 'gridDrugAllergies',
                    height:'100%',
                    width : '100%',
                    flex: 1,
                    bind: '{StoreAllergies}',
                    tbar: [
                        {
                            xtype: 'button',
                            text: 'Add',
                            iconCls: 'fa  fa-plus-circle',
                            handler: 'btnAddClick'
                        },
                        {
                            xtype: 'button',
                            text: 'Remove',
                            iconCls: 'fa  fa-minus-circle',
                            handler: 'btnRemoveClick'
                        }
                    ],
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'Allergen', dataIndex: 'CONCEPT_ID_DESC',
                                editor: {
                                    allowBlank: false,
                                    xtype: 'allergentypeahead',
                                    itemId: 'cbxAllergen',
                                    displayField: 'CONCEPT_ID_DESC',
                                    valueField: 'CONCEPT_ID_DESC',
                                    listeners: {
                                        select: 'cbxAllergen_Select'
                                    }
                                }
                            },
                            {
                                text: 'Allergen Concept Id', dataIndex: 'DAM_CONCEPT_ID', hidden: true
                            },
                            {
                                text: 'Allergen Concept Type', dataIndex: 'DAM_CONCEPT_ID_TYP_DESC',
                                editor: {
                                    itemId: 'DAM_CONCEPT_ID_TYP_DESC',
                                    disabled: true
                                }
                            },
                            {
                                text: 'Allergen Concept Type Id', dataIndex: 'DAM_CONCEPT_ID_TYP', hidden: true
                            },
                            {
                                text: 'Reported Source', dataIndex: 'reportedBy',
                                renderer: function (value, summaryData, dataIndex) {
                                    return dataIndex.data.reportedBy;
                                },
                                editor: {
                                    allowBlank: false,
                                    xtype: 'combobox',
                                    forceSelection: true,
                                    itemId: 'cbxFormularyList',
                                    displayField: 'name',
                                    valueField: 'value',
                                    bind: {
                                        store: '{StoreStatus}'
                                    }

                                }
                            },
                            {
                                text: 'Reported Date', dataIndex: 'reportedDate',
                                xtype: 'datecolumn',
                                format: 'm/d/Y',
                                editor: {
                                    allowBlank: false,
                                    xtype: 'datefield',
                                    maxValue: new Date(),
                                    listeners: {
                                        focusleave: 'onLeaveDateRange'
                                    },
                                    format: 'm/d/Y',
                                    emptyText: '[mm/dd/yyyy]'
                                }
                            },
                            {
                                text: 'Reactions And Effects', dataIndex: 'reactionsAndEffects',
                                editor: {
                                    xtype: 'textfield'
                                }
                            }
                        ]
                    },
                    plugins: [{
                        ptype: 'rowediting',
                        clicksToEdit: 2,
                        autoCancel: false,
                        width: 300, errorSummary: false,
                        listeners: {
                            'canceledit': function (rowEditing, context) {
                                if (context.record.phantom) {
                                    context.store.remove(context.record);
                                }
                            }
                        }
                    }],
                    listeners: {
                    beforeedit: 'gridDrugAllergies_beforeedit'
                }
                },
                {
                    xtype: 'hidden', itemId: 'hiddenKey'
                }
            ],
            dockedItems: [

                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {
                            xtype: 'button',
                            text: 'Save',
                            iconCls: 'fa fa-save',
                            handler: 'btnSaveClick',
                            itemId: 'btnSave'
                        }
                    ]
                },

                {
                    xtype: 'pagingtoolbar',
                    bind: '{StoreAllergies}',
                    displayInfo: true,
                    dock: 'bottom'

                }
            ]
        }]
})
