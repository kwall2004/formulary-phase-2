/**
 * Created by m4542 on 10/31/2016.
 */
Ext.define('Atlas.portals.view.healthtracker.HealthCondition', {
    extend: 'Ext.Container',

    xtype: 'healthtracker-healthcareconditions',

    title: 'Healthcare Conditions',

    scrollable: 'y',

    controller: 'healthconditioncontroller',

    viewModel: 'healthconditionmodel',

    layout: 'border',

    items: [
        {
            xtype: 'container',

            region: 'center',

            layout: {
                type: 'hbox',
                align: 'stretch'
            },

            defaults: {
                flex: 1
            },

            items: [
                {
                    xtype: 'container',

                    layout: 'border',

                    items: [
                        {
                            xtype: 'gridpanel',
                            viewConfig:{
                                markDirty:false
                            },

                            region: 'north',

                            height: 400,

                            title: 'Health Conditions',

                            cls: 'card-panel',

                            reference: 'healthcareConditionsGrid',

                            plugins: [{
                                ptype: 'rowediting'
                            }],

                            bind: {
                                store: '{healthrackerdatastore}'
                            },

                            listeners: {
                                canceledit: 'cancelConditionEdit',
                                edit: 'editCondition',
                                beforeedit: 'maybeEditCondition',
                                'selectionchange': function(view, records){
                                    this.down('#removeCondition').setDisabled(!records.length);
                                }
                            },

                            columns: [
                                {
                                    hidden: true,
                                    hideable: false,
                                    dataIndex: 'recipientID'
                                },
                                {
                                    hidden: true,
                                    hideable: false,
                                    dataIndex: 'sectionID'
                                },
                                {
                                    hidden: true,
                                    hideable: false,
                                    dataIndex: 'seqNum'
                                },
                                {
                                    hidden: true,
                                    hideable: false,
                                    dataIndex: 'markDelete'
                                },
                                {
                                    text: 'Condition',
                                    dataIndex: 'conditions',
                                    menuDisabled: true,
                                    flex: 1,
                                    editor: {
                                        xtype: 'combobox',
                                        queryMode: 'server',
                                        bind: {
                                            store: '{conditionstore}'
                                        },
                                        valueField: 'listDescription',
                                        displayField: 'listDescription',
                                        triggerAction: 'all',
                                        emptyText: 'Select conditions',
                                        typeAhead: true
                                    }
                                },

                                {
                                    text: 'Symptoms began',
                                    dataIndex: 'startSymptomDate',
                                    xtype: 'datecolumn',
                                    value: new Date(),
                                    flex: 1,
                                    editor: {
                                        xtype: 'datefield',
                                        format: 'm/d/Y',
                                        value: new Date(),
                                        maxValue: new Date()
                                    },
                                    filter: {type: 'date'}
                                },

                                {
                                    text: 'How concerned',
                                    dataIndex: 'concerned',
                                    flex: 1,
                                    editor: {
                                        xtype: 'combobox',
                                        queryMode: 'server',
                                        bind: {
                                            store: '{concernstore}'
                                        },
                                        valueField: 'listDescription',
                                        displayField: 'listDescription',
                                        triggerAction: 'all',
                                        emptyText: 'Select how concerned are you',
                                        typeAhead: true
                                    }
                                },

                                {
                                    text: 'Provider',
                                    dataIndex: 'provider',
                                    flex: 1,
                                    editor: {
                                        xtype: 'combobox',
                                        bind: {
                                            store: '{providerstore}'
                                        },
                                        queryMode: 'server',
                                        valueField: 'providerdescription',
                                        displayField: 'providerdescription',
                                        triggerAction: 'all',
                                        emptyText: 'Enter or select a provider',
                                        typeAhead: true
                                    }
                                }
                            ],

                            tbar: {
                                xtype: 'toolbar',

                                items: [
                                    {
                                        xtype: 'button',

                                        text: 'Add Condition',

                                        iconCls: 'x-fa fa-plus-circle',

                                        handler: 'addCondition'
                                    },
                                    {
                                        xtype: 'button',

                                        text: 'Delete Condition',

                                        iconCls: 'x-fa fa-minus-circle',

                                        handler: 'removeCondition',

                                        itemId: 'removeCondition',

                                        bind: {
                                            disabled: '{viewOnly}'
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    ]
});