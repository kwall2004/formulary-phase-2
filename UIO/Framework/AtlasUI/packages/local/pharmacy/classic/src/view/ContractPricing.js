/**
 * Created by rsalekin on 11/11/2016.
 */
Ext.define('Atlas.pharmacy.view.ContractPricing', {
    extend: 'Ext.panel.Panel',
    xtype: 'pharmacy-contractpricing',
    name: 'contractpricing',
    controller: 'contractpricing',
    viewModel: 'contractpricing',
    itemId: 'formContractPricing',
    width: '100%',
    height: '100%',
    layout: 'hbox',
    items: [
        {
            xtype: 'form',
            itemId: 'formContractPricingDetail',
            title: 'Contract Pricing',
            flex: 4,
            width: '100%',
            height: '100%',
            layout: 'vbox',
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Detail',
                    width: '100%',
                    height: '100%',
                    defaults: {
                        labelWidth: 125,
                        flex: 1
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'txtLOB',
                            fieldLabel: 'LOB',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'txtFulfillmentType',
                            fieldLabel: 'Type',
                            readOnly: true
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'cbxPeriod',
                            fieldLabel: 'GER Period',
                            forceSelection: true,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value',
                            value: '-----',
                            bind: {
                                store: '{storeGERPeriod}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'txtPer',
                            fieldLabel: '% of',
                            width: 225,
                            maskRe: /[0-9-.]/
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    text: '',
                                    width: 125
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cbxCostBasis',
                                    width: 95,
                                    forceSelection: true,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'value',
                                    value: '-----',
                                    bind: {
                                        store: '{storeCostBasis}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'cbxMultiSource',
                            fieldLabel: 'Multisource',
                            forceSelection: true,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value',
                            value: '-----',
                            bind: {
                                store: '{storeMultiSource}'
                            },
                            disabled: true
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'txtVaccineAdminFee',
                            fieldLabel: 'Vaccine Admin Fee$',
                            maskRe: /[0-9-.]/
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'cbxDispFeeRuleID',
                            fieldLabel: 'Dispensing Fee Rule',
                            forceSelection: true,
                            queryMode: 'local',
                            displayField: 'RuleName',
                            valueField: 'DispFeeRuleID',
                            bind: {
                                store: '{storeDispFeeRuleID}'
                            }
                        }
                    ]
                }
            ],
            dockedItems: {
                dock: 'bottom',
                xtype: 'toolbar',
                items: [
                    {
                        xtype: 'button',
                        text: 'Save',
                        iconCls: 'fa fa-save',
                        handler: 'btnSaveDetail_Click'
                    },
                    '->',
                    {
                        xtype: 'button',
                        itemId: 'btnDeleteAll',
                        text: 'Delete All Pricing',
                        disabled: true,
                        iconCls: 'fa fa-close',
                        handler: 'btnDeleteAll_Click'
                    }
                ]
            }
        },
        {
            xtype: 'form',
            itemId: 'formContractPricingNetwork',
            title: 'Contract Pricing - Network',
            flex: 6,
            width: '100%',
            height: '100%',
            layout: 'vbox',
            items: [
                {
                    xtype: 'grid',
                    itemId: 'gpPricingDetail',
                    width: '100%',
                    height: '100%',
                    flex: 1,
                    tbar: [
                        {
                            xtype: 'button',
                            itemId: 'btnAdd',
                            text: 'Add',
                            disabled: true,
                            iconCls: 'fa  fa-plus-circle',
                            handler: 'btnAddClick'
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnRemove',
                            text: 'Remove',
                            disabled: true,
                            iconCls: 'fa  fa-minus-circle',
                            handler: 'btnRemoveClick'
                        },
                        '->',
                        {
                            xtype: 'button',
                            itemId: 'btnSelect',
                            text: 'Add from Pricing Template',
                            disabled: true,
                            handler: 'btnSelect_Click'
                        }
                    ],
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'Maint. Days', dataIndex: 'Maintenance',
                                editor: {
                                    xtype: 'combobox',
                                    itemId: 'cbxmaintdays',
                                    width: 350,
                                    displayField: 'name',
                                    valueField: 'value',
                                    forceSelection: true,
                                    queryMode: 'local',
                                    allowBlank: false,
                                    listConfig: {
                                        maxWidth: 220
                                    },
                                    bind: {
                                        value: 'Maintenance',
                                        store: '{storeMaintenance}'
                                    }
                                }
                                , renderer: 'comboBoxMaintenanceRenderer'
                            },
                            {
                                text: 'OTC', dataIndex: 'OTCInd',
                                editor: {
                                    xtype: 'combobox',
                                    itemId: 'cbxotc',
                                    width: 350,
                                    forceSelection: true,
                                    queryMode: 'local',
                                    displayField: 'name',
                                    valueField: 'value',
                                    listConfig: {
                                        maxWidth: 220
                                    },
                                    bind: {
                                        value: 'OTCInd',
                                        store: '{storeOTCInd}'
                                    }
                                }
                                , renderer: 'comboBoxOTCIndRenderer'
                            },
                            {
                                text: 'Drug Type', dataIndex: 'DrugType',
                                editor: {
                                    xtype: 'combobox',
                                    itemId: 'cbxdrugtype',
                                    width: 350,
                                    forceSelection: true,
                                    queryMode: 'local',
                                    allowBlank: false,
                                    displayField: 'name',
                                    valueField: 'value',
                                    listConfig: {
                                        maxWidth: 220
                                    },
                                    bind: {
                                        value: 'DrugType',
                                        store: '{storeDrugType}'
                                    }
                                }
                                , renderer: 'comboBoxDrugTypeRenderer'
                            },
                            {
                                text: 'Cost Basis', dataIndex: 'CostBasis',
                                editor: {
                                    xtype: 'combobox',
                                    itemId: 'cbxCostBasisEditor',
                                    width: 350,
                                    forceSelection: true,
                                    queryMode: 'local',
                                    allowBlank: false,
                                    displayField: 'name',
                                    valueField: 'value',
                                    listConfig: {
                                        maxWidth: 220
                                    },
                                    bind: {
                                        value: 'CostBasis',
                                        store: '{storeCostBasisEditor}'
                                    }
                                }
                                , renderer: 'comboBoxCostBasisRenderer'
                            },
                            {
                                xtype: 'numbercolumn', text: '(%)', dataIndex: 'DiscPercent', format: '0,0.000%',
                                editor: {
                                    allowBlank: false,
                                    width: 400,
                                    hideLabel: true,
                                    maskRe: /[0-9-.]/
                                }
                            },
                            {
                                xtype: 'numbercolumn', text: '($)', dataIndex: 'DiscAmount', format: '$0,0.000',
                                editor: {
                                    allowBlank: true,
                                    width: 400,
                                    hideLabel: true,
                                    maskRe: /[0-9-.]/
                                }
                            },
                            {
                                xtype: 'numbercolumn', text: 'DispFee$', dataIndex: 'DispFee', format: '$0,0.000',
                                editor: {

                                    allowBlank: true,
                                    width: 400,
                                    hideLabel: true,
                                    maskRe: /[0-9-.]/
                                }
                            },
                            {text: '', dataIndex: 'systemID', hidden: true}
                        ]
                    },
                    plugins: {
                        ptype: 'rowediting',
                        clicksToEdit: 2,
                        autoCancel: false,
                        listeners: {
                            'canceledit': function (rowEditing, context) {
                                if (context.record.phantom) {
                                    context.store.remove(context.record);
                                }
                            },
                            'edit': function (rowEditing, context) {
                                if (context.record.dirty) {
                                    // context.grid.columns[3].items[0].hidden = false;
                                    //context.grid.getView().refresh();
                                    var pricingPanel = this.view.up('pharmacy-contractpricing');
                                    if (pricingPanel) {
                                        if (pricingPanel.title.indexOf('(edited)') == -1) {
                                            pricingPanel.setTitle(pricingPanel.title + '(edited)');
                                        }
                                    }
                                }
                            }
                        }
                    },
                    listeners: {
                        //beforeedit: 'gpFormularyDetail_beforeedit'
                    },
                    bind: '{storePricingDetail}'
                }
            ],
            dockedItems: {
                dock: 'bottom',
                xtype: 'toolbar',
                items: [
                    '->',
                    {
                        xtype: 'button',
                        itemId: 'btnSavePricingDetail',
                        text: 'Save',
                        disabled: true,
                        iconCls: 'fa fa-save',
                        handler: 'btnSavePricingDetail_Click'
                    }
                ]
            }
        }
    ]
});
