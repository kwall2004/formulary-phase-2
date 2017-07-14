Ext.define('Atlas.portals.view.healthtracker.Nutrition', {
    extend: 'Ext.Container',

    xtype: 'healthtracker-nutrition',

    title: 'Nutrition',

    scrollable: 'y',

    controller: 'nutritioncontroller',

    viewModel: 'nutritionmodel',

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

                            title: 'Nutrition',

                            cls: 'card-panel',

                            reference: 'nutritionGrid',

                            plugins: [{
                                ptype: 'rowediting'
                            }],

                            bind: {
                                store: '{nutritionstore}'
                            },

                            listeners: {
                                canceledit: 'cancelNutritionEdit',
                                edit: 'editNutrition',
                                beforeedit: 'maybeEditNutrition',
                                'selectionchange': function(view, records){
                                    this.down('#removeNutrition').setDisabled(!records.length);
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
                                    dataIndex: 'dateNutritionStart',
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
                                    text: 'Breakfast Notes',
                                    dataIndex: 'breakfastNotes',
                                    menuDisabled: true,
                                    flex: 1,
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },

                                {
                                    text: 'Lunch',
                                    dataIndex: 'lunchNotes',
                                    menuDisabled: true,
                                    flex: 1,
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },

                                {
                                    text: 'Dinner',
                                    dataIndex: 'dinnerNotes',
                                    menuDisabled: true,
                                    flex: 1,
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },

                                {
                                    text: 'Snacks',
                                    dataIndex: 'snackNotes',
                                    menuDisabled: true,
                                    flex: 1,
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },

                                {
                                    text: 'Notes',
                                    dataIndex: 'dayNotes',
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

                                        text: 'Add Nutrition',

                                        iconCls: 'x-fa fa-plus-circle',

                                        handler: 'addNutrition'
                                    },
                                    {
                                        xtype: 'button',

                                        text: 'Delete Nutrition',

                                        iconCls: 'x-fa fa-minus-circle',

                                        handler: 'removeNutrition',

                                        itemId: 'removeNutrition',

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