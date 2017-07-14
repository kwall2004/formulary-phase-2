Ext.define('Atlas.portals.view.healthtracker.Medications', {
    extend: 'Ext.Container',

    xtype: 'healthtracker-medications',

    title: 'Medications and Supplements',

    scrollable: 'y',

    controller: 'medicationscontroller',

    viewModel: 'medicationsmodel',

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

                            title: 'Medications',

                            cls: 'card-panel',

                            reference: 'medGrid',

                            plugins: [{
                                ptype: 'rowediting'
                            }],

                            bind: {
                                store: '{medstore}'
                            },

                            listeners: {
                                canceledit: 'cancelMedEdit',
                                edit: 'editMed',
                                beforeedit: 'maybeEditMed',
                                'selectionchange': function(view, records){
                                    this.down('#removeMeds').setDisabled(!records.length);
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
                                    text: 'Medicine Name',
                                    dataIndex: 'medicineName',
                                    menuDisabled: true,
                                    flex: 1,
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },

                                {
                                    text: 'Strength',
                                    dataIndex: 'strength',
                                    menuDisabled: true,
                                    flex: 1,
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },

                                {
                                    text: 'What dosage do you take?',
                                    dataIndex: 'dosage',
                                    menuDisabled: true,
                                    flex: 1,
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },

                                {
                                    text: 'How often do you take this',
                                    dataIndex: 'frequency',
                                    menuDisabled: true,
                                    flex: 1,
                                    editor: {
                                        xtype: 'textfield'
                                    }
                                },

                                {
                                    text: 'Start Date',
                                    dataIndex: 'dateMedicationStart',
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
                                    text: 'Why do you take this?',
                                    dataIndex: 'reasonForTaking',
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

                                        text: 'Add Meds and Supplement',

                                        iconCls: 'x-fa fa-plus-circle',

                                        handler: 'addMeds'
                                    },
                                    {
                                        xtype: 'button',

                                        text: 'Delete Meds and Supplement',

                                        iconCls: 'x-fa fa-minus-circle',

                                        handler: 'removeMeds',

                                        itemId: 'removeMeds',

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