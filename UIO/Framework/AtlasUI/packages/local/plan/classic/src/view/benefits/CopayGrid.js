Ext.define('Atlas.plan.view.benefits.CopayGrid', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-benefits-copaygrid',
    title: 'Copay Setup',
    controller:"plan-benefitscopaygrid",


    layout: 'border',
    items: [
        {
            region: 'center',
            layout: 'fit',

            alighnment: 'center',
            autoScroll: true,
            title: 'Copay Setup',

            tbar:[

                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-plus-circle',
                    handler: 'onCopayAdd',
                    text: 'Add',
                    bind:{
                        disabled: '{!isEditing}'
                    },
                    reference:'btnCopayAdd'
                },
                {
                    xtype: 'button',
                    reference:'btnCopayDelete',
                    iconCls: 'x-fa fa-ban',
                    handler: 'onCopayDelete',
                    bind:{
                        disabled: '{!isEditing}'
                    },
                    text: 'Remove'
                }

            ],

            items: [
                {

                    xtype: 'grid',
                    //title: 'Copay Setup',
                    reference: 'planBenefitCopyGrid',
                    viewModel: {
                        type: 'common-shared-editgridmodel'
                    },
                    bind:{
                        store: '{plancopay}'
                        //,
                        //disabled: '{!isEditing}'
                    },


                    columns: {
                        defaults: {
                            width: 180
                        },
                        items: [
                            {text: 'Maint. Days', dataIndex: 'maintenance',renderer:'maintenanceDaysRenderer',
                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'maintenanceDays',
                                    emptyText: '',allowBlank: false,  bind: {store: '{maintenance}'},
                                    displayField:'name', valueField:'value'
                                }


                            },

                            {text: 'Coverage Phase', dataIndex: 'coveragePhaseId', renderer:'coveragePhaseRenderer',flex: 1,
                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'coveragePhase',
                                    emptyText: '',allowBlank: false,  bind: {store: '{coveragephases}'},
                                    displayField:'coveragePhaseName', valueField:'coveragePhaseId'
                                }
                            },
                            {text: 'Formulary Tiers', dataIndex: 'formularyTierId',renderer:'FormularyTiersRenderer',

                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'formularyTiers',
                                    emptyText: '',allowBlank: false,  bind: {store: '{formularytiers}'},
                                    displayField:'TierDesc', valueField:'TierCode'
                                }


                            },
                            {text: 'Copay Amount', dataIndex: 'CopayAmount' ,xtype: 'numbercolumn', format:'$0,0.00',
                                editor: {
                                    xtype: 'numberfield',
                                    allowBlank: true,
                                    maxLength: 7,
                                    enforceMaxLength: true,
                                    minValue: 0,
                                    maxValue: 9999,
                                    hideTrigger: true
                                }

                            },
                            {text: 'Copay Percent', dataIndex: 'copayPercent',xtype: 'numbercolumn', format:'0,0.00%',
                                editor: {
                                    xtype: 'numberfield',
                                    allowBlank: true,
                                    maxLength: 3,
                                    enforceMaxLength: true,
                                    minValue: 0,
                                    maxValue: 100,
                                    hideTrigger: true
                                }
                            },
                            {text: 'Coinsurance Percent', dataIndex: 'coinsurancePercent',xtype: 'numbercolumn', format:'0,0.00%',
                                editor: {
                                    xtype: 'numberfield',
                                    allowBlank: true,
                                    maxLength: 3,
                                    enforceMaxLength: true,
                                    minValue: 0,
                                    maxValue: 100,
                                    hideTrigger: true
                                }
                            },
                            {text: 'Max Copay Amount', dataIndex: 'maxCopayAmount',xtype: 'numbercolumn', format:'$0,0.00',
                                editor: {
                                    xtype: 'numberfield',
                                    allowBlank: true,
                                    maxLength: 7,
                                    enforceMaxLength: true,
                                    minValue: 0,
                                    maxValue: 9999,
                                    hideTrigger: true
                                }
                            },
                            {text: 'Copay Amt vs Copay pct', dataIndex: 'copayLesserOf',renderer:'CopayLesserOfRenderer',
                                editor: {
                                    xtype: 'combobox', autoLoadOnValue: true, name: 'plancopayrule',
                                    emptyText: '',allowBlank: false,  bind: {store: '{plancopayrule}'},
                                    displayField:'CopayRuleName', valueField:'copayLesserOf'
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
                                    col.mon(col.up('gridpanel').getView(), {
                                        itemupdate: function() {
                                            widget.setVisible(rec.get('isUpdated'));
                                        }
                                    });
                                }

                            }
                        ]
                    },
                    plugins: [
                        {
                            ptype: 'rowediting',
                            reference: 'rowediting',
                            triggerEvent: 'celldblclick',
                            removeUnmodified: true,
                            pluginId: 'rowEditing',
                            listeners: {
                                cancelEdit: 'cancelEditButton',
                                edit: 'completeEdit',
                                beforeEdit: 'beforeEdit'
                            }
                        }
                    ]
                }],
            bbar: [
                '->',

                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-edit',
                    handler: 'onCopayAdminEdit',
                    text: 'AdminEdit',
                    // disabled: true,
                    bind:{

                        disabled: '{!canEdit}'
                    },
                    reference: 'btnCopayAdminEdit'
                },
                {
                    xtype: 'button',
                    reference: 'btnCopaySave',
                    iconCls: 'x-fa fa-floppy-o',
                    handler: 'onCopaySave',
                    //disabled: true,
                    bind:{
                        disabled: '{!isEditing}'
                    },
                    text: 'Save'
                }

            ]
        }]

});