Ext.define('Atlas.portals.view.healthtracker.BloodA1C', {
    extend: 'Ext.Container',

    xtype: 'healthtracker-blooda1c',

    title: 'Hemoglobin A1C',

    scrollable: 'y',

    controller: 'blooda1ccontroller',

    viewModel: 'blooda1cmodel',

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

                            title: 'Hemoglobin A1C',

                            cls: 'card-panel',

                            reference: 'a1cGrid',

                            plugins: [{
                                ptype: 'rowediting'
                            }],

                            bind: {
                                store: '{a1cstore}'
                            },

                            listeners: {
                                canceledit: 'cancelA1CEdit',
                                edit: 'editA1C',
                                beforeedit: 'maybeEditA1C',
                                'selectionchange': function(view, records){
                                    this.down('#removeA1C').setDisabled(!records.length);
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
                                    dataIndex: 'dateHemoglobinA1CReading',
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
                                    text: 'Hemoglobin A1C',
                                    dataIndex: 'hemoglobina1c',
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

                                        text: 'Add Hemoglobin A1C',

                                        iconCls: 'x-fa fa-plus-circle',

                                        handler: 'addA1C'
                                    },
                                    {
                                        xtype: 'button',

                                        text: 'Delete Hemoglobin A1C',

                                        iconCls: 'x-fa fa-minus-circle',

                                        handler: 'removeA1C',

                                        itemId: 'removeA1C',

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