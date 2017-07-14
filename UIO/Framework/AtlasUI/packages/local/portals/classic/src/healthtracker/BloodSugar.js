Ext.define('Atlas.portals.view.healthtracker.BloodSugar', {
    extend: 'Ext.Container',

    xtype: 'healthtracker-bloodsugar',

    title: 'Blood Sugar',

    scrollable: 'y',

    controller: 'bloodsugarcontroller',

    viewModel: 'bloodsugarmodel',

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

                            title: 'Blood Sugar',

                            cls: 'card-panel',

                            reference: 'bloodsugarGrid',

                            plugins: [{
                                ptype: 'rowediting'
                            }],

                            bind: {
                                store: '{bsstore}'
                            },

                            listeners: {
                                canceledit: 'cancelBSEdit',
                                edit: 'editBS',
                                beforeedit: 'maybeEditBS',
                                'selectionchange': function(view, records){
                                    this.down('#removeBS').setDisabled(!records.length);
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
                                    text: 'Date',
                                    dataIndex: 'dateBloodSugarReading',
                                    xtype: 'datecolumn',
                                    menuDisabled: true,
                                    flex: 1,
                                    editor: {
                                        xtype: 'datefield',
                                        format: 'm/d/Y',
                                        maxValue: new Date()
                                    },
                                    filter: {type: 'date'}
                                },

                                {
                                    text: 'Time of day',
                                    dataIndex: 'dayTime',
                                    flex: 1,
                                    editor: {
                                        xtype: 'combobox',
                                        bind: {
                                            store: '{daytimestore}'
                                        },
                                        queryMode: 'server',
                                        valueField: 'listDescription',
                                        displayField: 'listDescription',
                                        triggerAction: 'all',
                                        emptyText: 'Select Time of Day',
                                        typeAhead: true
                                    }
                                },

                                {
                                    text: 'Blood Sugar Level (in mg/dl)',
                                    dataIndex: 'bloodsugarLevel',
                                    flex: 1,
                                    menuDisabled: true,
                                    xtype: 'numbercolumn',
                                    editor: {
                                        xtype: 'numberfield'
                                    }
                                },

                                {
                                    text: 'Notes',
                                    dataIndex: 'notes',
                                    menuDisabled: true,
                                    flex: 1,
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                }
                            ],

                            tbar: {
                                xtype: 'toolbar',

                                items: [
                                    {
                                        xtype: 'button',

                                        text: 'Add Blood Sugar',

                                        iconCls: 'x-fa fa-plus-circle',

                                        handler: 'addBS'
                                    },
                                    {
                                        xtype: 'button',

                                        text: 'Delete Blood Sugar',

                                        iconCls: 'x-fa fa-minus-circle',

                                        handler: 'removeBS',

                                        itemId: 'removeBS',

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