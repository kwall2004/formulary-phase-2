/**
 * Created by b2352 on 12/21/2016.
 */
Ext.define('Atlas.plan.view.group.PlanTransitionConfig', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.plan-group-plantransitionconfig',
    controller: 'plan-group-plantransitionconfig',
    viewModel: 'plan-group-plantransitionconfig',

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
                reference: 'PlanTransitionConfigGrid',
                bind: {
                    store: '{plantransitionconfig}'
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
                        beforeEdit: 'beforeEdit'
                    }
                }],
                columns: {
                    defaults: {
                        flex: 1,
                        align: 'center'
                    },
                    items: [

                        {
                            text: 'Transition Start Date',
                            dataIndex: 'TransitionStartDate',
                            xtype: 'datecolumn',
                            format: 'm/d/Y',
                            editor: {
                                xtype: 'datefield',
                                allowBlank: false
                            }
                        },
                        {
                            text: 'Reset Every Year',
                            dataIndex: 'ResetEveryYear',
                            xtype: 'checkcolumn',
                            bind: {
                                disabled: '{!record.isEditing}'
                            },
                            disabled: true,
                            editor: {
                                xtype: 'checkbox',
                                allowBlank: false,
                                checked: true,
                                inputValue: true,
                                uncheckedValue: false
                            }
                        },
                        {
                            text: 'Transition Period Days',
                            dataIndex: 'TransitionPeriodDays',
                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false,
                                autoLoadOnValue: true,
                                hideTrigger: true,
                                maxLength:3,
                                minValue:0

                            }
                        },
                        {
                            text: 'Non LTC Days Supply Max',
                            dataIndex: 'NonLTCDaysSupplyMax',

                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false,
                                autoLoadOnValue: true,
                                hideTrigger: true,
                                maxLength:3,
                                minValue:0
                            }
                        },
                        {
                            text: 'LTC Days Supply Max',
                            dataIndex: 'LTCDaysSupplyMax',
                            editor: {
                                xtype: 'numberfield',
                                allowBlank: false,
                                autoLoadOnValue: true,
                                name: 'feeClassType',
                                hideTrigger: true,
                                maxLength:3,
                                minValue:0
                            }
                        },

                        {
                            text: 'Effective From',
                            dataIndex: 'EffectiveDate',
                            xtype: 'datecolumn',
                            format: 'm/d/Y',
                            editor: {
                                xtype: 'datefield',
                                allowBlank: false
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
        title: 'Plan Transition Configuration'
    }, {
        xtype: 'toolbar',
        dock: 'top',
        items: [
            {
                xtype: 'button',
                iconCls: 'x-fa fa-plus-square',
                text: 'Add',
                handler: 'onAdd',
                reference: 'btntransitionconfigAdd',
                bind: {
                    disabled: '{!isEditing}'
                }
            },
            {
                xtype: 'button',
                text: 'Remove',
                iconCls: 'x-fa fa-minus-circle',
                handler: 'onRemoveButtonClick',
                reference: 'btntransitionconfigRemove',
                bind: {
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
                handler: 'onTransitionConfigAdminEdit',
                reference: 'btnTransitionConfigAdminEdit',
                bind: {
                    disabled: '{!canEdit}'
                }
            },
            {
                xtype: 'button',
                text: 'Save',
                iconCls: 'x-fa fa-floppy-o',
                handler: 'onTransitionConfigSave',
                reference: 'btnTransitionConfigSave',
                bind: {
                    disabled: '{!isEditing}'
                }

            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-ban',
                handler: 'onTransitionConfigCancel',
                text: 'Cancel',
                bind: {
                    disabled: '{!isEditing}'
                }
            }]

    }]

});

