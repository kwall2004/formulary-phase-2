/**
 * Created by s6627 on 11/8/2016.
 */
Ext.define('Atlas.casemanagement.view.Goals', {
    extend: 'Ext.Window',
    xtype: 'casemanagementGoals',
    itemId:'winGoals',
    layout: {
        type: 'hbox',
        align: 'stretch',
        pack: 'start'
    },
    width: 800,
    defaults: {
        labelWidth: 200
    },
    items: [
        {
            xtype: 'form',
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'start'
            },
            itemId: 'formGoals',
            width: '100%',
            defaults: {
                labelWidth: 200
            },
            items: [
                {
                    xtype: 'panel', flex: 0.6,
                    autoScroll: true, layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                    items: [
                        {
                            xtype: 'displayfield',
                            itemId: 'lblDescription',
                            fieldLabel: 'ProblemDescr'
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'cbxGoal',
                            fieldLabel: 'Goal',
                            emptyText: '[Select a Goal]',
                            allowBlank: false,
                            displayField: 'name',
                            valueField: 'value',
                            triggerAction: 'all',
                            bind: {
                                //value: '{cdmodel.InTake}',
                                store: '{StoreGoals}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'txtGoalDescription',
                            fieldLabel: 'Description'
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'cbxGoalType',
                            fieldLabel: 'Goal Type',
                            displayField: 'name',
                            valueField: 'value',
                            bind: {
                                //value: '{cdmodel.InTake}',
                                store: '{StoreGoalType}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'cbxGoalStatus',
                            fieldLabel: 'Status',
                            displayField: 'name',
                            valueField: 'value',
                            bind: {
                                //value: '{cdmodel.InTake}',
                                store: '{StoreGoalStatus}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Start Date',
                            itemId: 'dtGoalStartDate',
                            emptyText: '[mm/dd/yyyy]',
                            format : 'm/d/Y'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Close Date',
                            itemId: 'dtGoalFollowupDate',
                            emptyText: '[mm/dd/yyyy]',
                            hidden:true,
                            format : 'm/d/Y'
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'cbxGoalProgress',
                            fieldLabel: 'Progress',
                            displayField: 'name',
                            valueField: 'value',
                            bind: {
                                //value: '{cdmodel.InTake}',
                                store: '{StoreGoalProgress}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel'
                    , flex: 0.4,
                    autoScroll: true,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cbxGoalAction',
                            fieldLabel: 'Action Taken',
                            displayField: 'name',
                            valueField: 'value',
                            bind: {
                                //value: '{cdmodel.InTake}',
                                store: '{StoreGoalAction}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'cbxGoalResult',
                            fieldLabel: 'Result',
                            displayField: 'name',
                            valueField: 'value',
                            bind: {
                                //value: '{cdmodel.InTake}',
                                store: '{StoreGoalResult}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Close Date',
                            itemId: 'dtGoalEndDate',
                            emptyText: '[mm/dd/yyyy]',
                            format : 'm/d/Y'
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'cbxGoalClosedReason',
                            fieldLabel: 'Closed Reason',
                            displayField: 'name',
                            valueField: 'value',
                            bind: {
                                //value: '{cdmodel.InTake}',
                                store: '{StoreGoalClosedReason}'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'hidden', itemId: 'hdnGoalId'
        },
        {
            xtype: 'hidden', itemId: 'hdnProblemIdGoal'
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
                    handler: 'btnSaveGoalClick',
                    itemId: 'btnSaveGoal'
                },
                {
                    xtype: 'button',
                    text: 'Delete',
                    iconCls: 'fa fa-minus-circle',
                    handler: 'btnDeleteGoalClick',
                    itemId: 'btnDeleteGoal'
                },
                {
                    xtype: 'button',
                    text: 'Close',
                    handler: 'btnCancelGoalClick',
                    itemId: 'btnCancel'
                }
            ]
        }]
})