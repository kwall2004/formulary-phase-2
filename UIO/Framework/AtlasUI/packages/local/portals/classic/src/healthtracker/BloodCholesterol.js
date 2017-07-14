Ext.define('Atlas.portals.view.healthtracker.BloodCholesterol', {
    extend: 'Ext.container.Container',

    xtype: 'healthtracker-bloodcholesterol',

    title: 'Blood Cholesterol',

    scrollable: true,

    controller: 'bloodcholesterolcontroller',

    viewModel: 'bloodcholesterolmodel',

    items: [
        {
            xtype: 'container',
            defaults: {
                flex: 1
            },
            scrollable: true,

            items: [
                {
                    xtype: 'container',
                    scrollable: true,
                    items: [
                        {
                            xtype: 'gridpanel',
                            viewConfig:{
                                markDirty:false
                            },

                            region: 'north',

                            height: 400,

                            title: 'Cholesterol',

                            cls: 'card-panel',

                            reference: 'cholesterolGrid',

                            plugins: [{
                                ptype: 'rowediting'
                            }],

                            bind: {
                                store: '{cholesterolstore}'
                            },

                            listeners: {
                                canceledit: 'cancelCholesterolEdit',
                                edit: 'editCholesterol',
                                beforeedit: 'maybeEditCholesterol',
                                'selectionchange': function(view, records){
                                    this.down('#removeCholesterol').setDisabled(!records.length);
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
                                    dataIndex: 'dateCholesterolReading',
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
                                    text: 'HDL (mg/dl)',
                                    dataIndex: 'HDL',
                                    flex: 1,
                                    menuDisabled: true,
                                    xtype: 'numbercolumn',
                                    editor: {
                                        xtype: 'numberfield'
                                    }
                                },

                                {
                                    text: 'LDL (mg/dl)',
                                    dataIndex: 'LDL',
                                    flex: 1,
                                    menuDisabled: true,
                                    xtype: 'numbercolumn',
                                    editor: {
                                        xtype: 'numberfield'
                                    }
                                },

                                {
                                    text: 'Triglycerides (mg/dl)',
                                    dataIndex: 'triglycerides',
                                    flex: 1,
                                    menuDisabled: true,
                                    xtype: 'numbercolumn',
                                    editor: {
                                        xtype: 'numberfield'
                                    }
                                },

                                {
                                    text: 'Total Cholesterol (mg/dl)',
                                    dataIndex: 'totalcholesterol',
                                    flex: 1,
                                    menuDisabled: true
                                },

                                {
                                    text: 'Notes',
                                    dataIndex: 'notes',
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

                                        text: 'Add Cholesterol',

                                        iconCls: 'x-fa fa-plus-circle',

                                        handler: 'addCholesterol'
                                    },
                                    {
                                        xtype: 'button',

                                        text: 'Delete Cholesterol',

                                        iconCls: 'x-fa fa-minus-circle',

                                        handler: 'removeCholesterol',

                                        itemId: 'removeCholesterol',

                                        bind: {
                                            disabled: '{viewOnly}'
                                        }
                                    }
                                ]
                            }
                        },

                        {
                            xtype: 'gridpanel',

                            region: 'north',

                            title: 'Triglyceride Reference Chart',

                            cls: 'card-panel',

                            reference: 'cholesterolRefGrid',

                            bind: {
                                store: '{cholesterolRefStore}'
                            },

                            columns: [
                                {
                                    text: 'Triglyceride',
                                    dataIndex: 'triglyceride',
                                    flex: 1
                                },
                                {
                                    text: 'Triglyceride Category',
                                    dataIndex: 'triglycerideCategory',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});