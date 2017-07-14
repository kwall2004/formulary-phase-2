/**
 * Created by b2352 on 12/19/2016.
 */
Ext.define('Atlas.plan.view.benefits.DAWCopay', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-benefits-dawcopay',
    title: '~dawcopay',

    viewModel: 'plan-benefits-dawcopay',
    controller: 'plan-benefit-dawcopay',

    scrollable: true,

    layout: 'border',
    items: [
        {
            region: 'center',
            layout: 'fit',
            flex: 3,
            alighnment: 'center',
            autoScroll: true,

            items: [{
                xtype: 'grid',
                reference: 'DAWCopayGrid',
                bind: {
                    store: '{dawcopays}'
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
                            text: 'DAW Type',
                            dataIndex: 'dawType',
                            renderer: 'rendererDAWType',
                            editor: {
                                xtype: 'combobox',
                                name:'dawType',
                                allowBlank: false,
                                autoLoadOnValue: true,
                                displayField: 'name',
                                valueField: 'value',
                                queryMode: 'local',
                                bind: {
                                    store: '{dawtypes}'
                                }
                            }
                        },
                        {
                            text: 'Maint. Days',
                            dataIndex: 'maintenance',
                            renderer: 'rendererMaintenance',

                            editor: {
                                xtype: 'combobox',
                                name:'maintenance',
                                queryMode: 'local',
                                allowBlank: false,
                                autoLoadOnValue: true,
                                displayField: 'name',
                                valueField: 'value',
                                bind: {
                                    store: '{maintenances}'
                                }
                            }
                        },
                        {
                            text: 'Formulary Tiers',
                            dataIndex: 'FormularyTierId',
                            renderer: 'rendererFormularyTier',
                            editor: {
                                xtype: 'combobox',
                                name:'FormularyTierId',
                                queryMode: 'local',
                                autoLoadOnValue: true,
                                allowBlank: false,
                                displayField: 'TierDesc',
                                valueField: 'TierCode',
                                bind: {
                                    store: '{formularytiers}'
                                }

                            }

                        },
                        {
                            text: 'Pharmacy Network',
                            dataIndex: 'PharmacyNetworkId',
                            renderer: 'rendererPharmacyNetwork',
                            //queryMode: 'local',
                            editor: {
                                xtype: 'combobox',
                                name:'PharmacyNetworkId',
                                allowBlank: false,
                                //autoLoadOnValue: true,
                                reference:'cmbPharmacyNetwork',
                                displayField: 'NetworkDescription',
                                valueField: 'NetworkID',
                                queryMode: 'local',
                                bind: {
                                    store: '{filteredpharmacynetworks}'
                                }
                            }
                        },
                        {
                            text: 'Copay Amount($)',
                            dataIndex: 'copayAmount',
                            xtype: 'numbercolumn',
                            format: '$0.00',
                            editor: {
                                xtype: 'numberfield',
                                //allowBlank: false,
                                maxValue:150000,
                                maxLength: 7,
                                enforceMaxLength: true,
                                //format: '$0,0.00',
                                allowNegative: 'false',
                                hideTrigger: true

                            }
                        },
                        {
                            text: 'Copay Percent',
                            dataIndex: 'copayPercent',
                            xtype: 'numbercolumn',
                            format: '0,0%',
                            editor: {
                                xtype: 'numberfield',
                                //allowBlank: false,
                                maxValue: 100,
                                maxLength: 3,
                                enforceMaxLength: true,
                                //format: '0,0%',
                                allowNegative: 'false',
                                maxLength: 3,
                                hideTrigger: true
                            }
                        },

                        {
                            text: 'Coinsurance(%)',
                            dataIndex: 'coinsurancePercent',
                            xtype: 'numbercolumn',
                            format: '0,0%',
                            editor: {
                                xtype: 'numberfield',
                                maxLength: 3,
                                enforceMaxLength: true,
                                //format: '000%',
                                //allowBlank: false,
                                minValue: 0,
                                maxValue: 100,
                                maxLength: 3,
                                allowNegative: 'false',
                                hideTrigger: true
                            }
                        },
                        {
                            text: 'Mem Resp(%)',
                            dataIndex: 'costDiffMemberRespPct',
                            xtype: 'numbercolumn',
                            format: '0,0%',
                            //width: 110,
                            editor: {
                                xtype: 'numberfield',
                                maxLength: 3,
                                enforceMaxLength: true,
                                //format: '000%',
                               // allowBlank: false,
                                maxValue: 100,
                                minValue: 0,
                                hideTrigger: true
                            }
                        },
                        {
                            text: 'Plan Resp(%)',
                            dataIndex: 'costDiffPlanRespPct',
                            xtype: 'numbercolumn',
                            format: '0,0%',
                            editor: {
                                xtype: 'numberfield',
                                //allowBlank: false,
                                maxValue: 100,
                                minValue: 0,
                                maxLength: 3,
                                enforceMaxLength: true,
                                allowNegative: false,
                                hideTrigger: true
                            }
                        },
                        {
                            text: 'Pharma Resp(%)',
                            dataIndex: 'costDiffPharmaRespPct',
                            xtype: 'numbercolumn',
                            format: '0,0%',
                            editor: {
                                xtype: 'numberfield',
                                //allowBlank: false,
                                maxValue: 100,
                                minValue: 0,
                                maxLength: 3,
                                enforceMaxLength: true,
                                allowNegative: false,
                                hideTrigger: true

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
                }
            }]
        }],
    dockedItems: [{
        xtype: 'panel',
        title: 'DAW Copay Setup'
    },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-plus-circle',
                    text: 'Add',
                    handler: 'onAdd',
                    bind: {
                        disabled: '{!isEditing}'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Remove',
                    iconCls: 'x-fa fa-remove',
                    handler: 'onRemoveButtonClick',
                    bind: {
                        disabled: '{!isEditing}'
                    }
                }]
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: ['->',
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-edit',
                    text: 'Admin Edit',
                    handler: 'onDAWCopayEdit',
                    bind: {
                        disabled: '{!canEdit}'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Save',
                    iconCls: 'x-fa fa-floppy-o',
                    handler: 'onDAWCopaySave',
                    bind: {
                        disabled: '{!isEditing}'
                    }
                }]
        }]

});

