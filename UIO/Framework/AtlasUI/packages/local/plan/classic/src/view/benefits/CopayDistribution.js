/**
 * Created by b2352 on 12/19/2016.
 */
Ext.define('Atlas.plan.view.benefits.CopayDistribution', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-benefits-copaydistribution',
    title: '~copaydist',

    viewModel: 'plan-benefits-copaydistribution',
    controller: 'plan-benefits-copaydistribution',

    scrollable: true,

    layout: 'border',
    items: [
        {
            region: 'center',
            layout: 'fit',
            flex: 3,
            alighnment: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'grid',
                    reference: 'PlanCopayDistributionGrid',
                    bind: {
                        store: '{copaydistributions}'
                    },
                    plugins: [{
                        ptype: 'rowediting',
                        reference: 'rowediting',
                        triggerEvent: 'celldblclick',
                        removeUnmodified: true,
                        pluginId: 'rowEditing',
                        listeners: {
                            cancelEdit: 'cancelEditButton',
                            edit: 'completeEdit',
                            beforeEdit: 'beforeEdit',
                            validateedit:'validateEdit'
                        }
                    }],
                    columns: {
                        defaults: {
                            flex: 1,
                            align: 'center'
                        },

                        items: [
                            {
                                text: 'Coverage Phase',
                                dataIndex: 'coveragePhaseID',
                                renderer:'coveragePhaseRenderer',

                                editor: {
                                    xtype: 'combobox',
                                    autoLoadOnValue: false,
                                    forceSelection:true,
                                    //emptyText: '',
                                    allowBlank: false,
                                    reference:'cbxPhase',
                                    displayField: 'coveragePhaseName',
                                    valueField: 'coveragePhaseId',
                                    queryMode: 'local',
                                    bind: {
                                        store: '{coveragephases}'
                                    }

                                }
                            },
                            {
                                text: 'Formulary Tier',
                                dataIndex: 'formularyTierId',
                                renderer:'formularyTierRenderer',
                                editor: {
                                    xtype: 'combobox',
                                    autoLoadOnValue: true,
                                    allowBlank: false,
                                    queryMode: 'local',
                                    reference:'cbxFormularyTier',
                                    displayField: 'TierDesc',
                                    valueField: 'FormularyTierID',
                                    bind: {
                                        store: '{formularytiers}'
                                    }
                                }
                            },
                            {
                                text: 'Member Resp Amount',
                                dataIndex: 'memberResponsibilityAmt',
                                xtype: 'numbercolumn',
                                format:'$0.00',
                                editor: {
                                    xtype:'numberfield',
                                    allowBlank: true,
                                    maxValue: '100',
                                   // format:'$0.00',
                                    allowNegative:false,
                                    maxLength:6,
                                    enforceMaxLength: true,
                                    allowDecimal:true,
                                    hideTrigger:true
                                }
                            },
                            {
                                text: 'Member Resp (%)',
                                dataIndex: 'memberResponsibilityPct',
                                xtype: 'numbercolumn',
                                format:'0,0.00%',
                                editor: {
                                    xtype:'numberfield',
                                    allowBlank: true,
                                    maxValue: '100',
                                    //format:'0,0.00%',
                                    allowNegative:false,
                                    maxLength: 3,
                                    enforceMaxLength: true,
                                    allowDecimal:true,
                                    hideTrigger:true
                                }
                            },
                            {
                                text: 'LICS Subsidy (%)',
                                dataIndex: 'licsSubsidyPct',
                                xtype: 'numbercolumn',
                                format:'0,0.00%',
                                editor: {
                                    xtype:'numberfield',
                                    //format:'0,0.00%',
                                    allowBlank: false, minValue: 0,
                                    maxvalue:100,
                                    maxLength: 3,
                                    enforceMaxLength: true,
                                    allowNegative:false,
                                    allowDecimal:true,
                                    hideTrigger:true
                                }
                            },
                            {
                                text: 'Manufacturer Resp (%)',
                                dataIndex: 'mfrResponsibilityPct',
                                xtype: 'numbercolumn',
                                format:'0,0.00%',
                                editor: {
                                    xtype:'numberfield',
                                    //format:'0,0.00%',
                                    allowBlank: true, maxValue: 100,
                                    maxLength: 3,
                                    enforceMaxLength: true,
                                    minValue:0,
                                    allowNegative:false,
                                    hideTrigger:true
                                }
                            },
                            {
                                text: 'Plan Deduct Amount',
                                dataIndex: 'planDeductAmt',
                                xtype: 'numbercolumn',
                                format:'$0.00',
                                editor: {
                                    xtype:'numberfield',
                                    //format:'0,0.00%',
                                    allowBlank: true, maxValue: 100,
                                    maxLength: 3,
                                    enforceMaxLength: true,
                                    minValue:0,
                                    allowNegative:false,
                                    hideTrigger:true
                                }
                            },
                            {
                                text: 'Monthly OOP Max',
                                dataIndex: 'maxOOPMonthly',
                                xtype: 'numbercolumn',
                                format:'$0.00',
                                editor: {
                                    xtype:'numberfield',
                                   // format:'$0.00',
                                    allowBlank: false, maxValue: 99999,
                                    maxLength:8,
                                    enforceMaxLength: true,
                                    allowNegative:false,
                                    minValue:0,
                                    allowDecimal:true,
                                    hideTrigger:true
                                }
                            },
                            {
                                text: 'Yearly OOP Max',
                                dataIndex: 'maxOOPYearly',
                                xtype: 'numbercolumn',
                                format:'$0.00',
                                editor: {
                                    xtype:'numberfield',
                                    //format:'$0.00',
                                    allowBlank: false, maxValue: 99999,
                                    maxLength:8,
                                    enforceMaxLength: true,
                                    allowNegative:false,
                                    minValue:0,
                                    allowDecimal:true,
                                    hideTrigger:true
                                }
                            },
                            {
                                text: 'Monthly Coverage Max',
                                dataIndex: 'maxCoverageMonthly',
                                xtype: 'numbercolumn',
                                format:'$0.00',
                                editor: {
                                    xtype:'numberfield',
                                    //format:'$0.00',
                                    allowBlank: false,
                                    maxValue: 99999,
                                    maxLength: 3,
                                    enforceMaxLength: true,
                                    allowNegative:false,
                                    minValue:0,
                                    allowDecimal:true,
                                    hideTrigger:true
                                }
                            },
                            {
                                text: 'Yearly Coverage Max',
                                dataIndex: 'maxCoverageYearly',
                                xtype: 'numbercolumn',
                                format:'$0.00',
                                editor: {
                                    xtype:'numberfield',
                                    allowBlank: false,
                                    maxValue: 99999,
                                    maxLength:8,
                                    enforceMaxLength: true,
                                    allowNegative:false,
                                    minValue:0,
                                    allowDecimal:true,
                                    hideTrigger:true
                                }
                            },
                            {
                                xtype: 'widgetcolumn',
                                align: 'center',
                                hideable : false,
                                widget: {
                                    xtype: 'button',
                                    width:75,
                                    text: 'Reject',
                                    iconCls: 'x-action-col-icon x-fa fa-undo',
                                    bind: {
                                        tooltip: 'Reject '
                                    },
                                    handler: 'onUndoChangeClick'
                                },
                                onWidgetAttach: function(col, widget, rec) {
                                    widget.setVisible(rec.get('isUpdated'));
                                    col.mon(col.up('gridpanel').getView(),{
                                        itemupdate: function() {
                                            widget.setVisible(rec.get('isUpdated'));
                                        }
                                    });
                                }

                            }
                        ]
                    }
                }]

        }],

    dockedItems: [{
        xtype: 'panel',
        title: 'Copay Distibution'
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                xtype: 'button',
                iconCls: 'x-fa fa-plus-square',
                text: 'Add',
                handler: 'onAdd',
                reference:'btnCopayDistributionAdd',
                bind:{
                    disabled: '{!isEditing}'
                }
            },
            {
                xtype: 'button',
                text: 'Remove',
                iconCls: 'x-fa fa-minus-circle',
                handler: 'onRemoveButtonClick',
                reference:'btnCopayDistributionRemove',
                bind:{
                    disabled: '{!isEditing}'
                }

            }]

    }, {
        xtype: 'toolbar',
        dock: 'bottom',
        items: ['->',
            {
                xtype: 'button',
                iconCls: 'x-fa fa-plus-square',
                text: 'Admin Edit',
                handler: 'onCopayDistributionAdminEdit',
                reference: 'btnCopayDistributionAdminEdit',
                bind:{
                    disabled: '{!canEdit}'
                }
            },
            {
                xtype: 'button',
                text: 'Save',
                iconCls: 'x-fa fa-floppy-o',
                handler: 'onCopayDistributionSave',
                reference: 'btnCopayDistributionSave',
                bind:{
                    disabled: '{!isEditing}'
                }

            }]
    }]
});

