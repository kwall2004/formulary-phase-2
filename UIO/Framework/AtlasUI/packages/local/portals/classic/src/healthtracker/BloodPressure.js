Ext.define('Atlas.portals.view.healthtracker.BloodPressure', {
    extend: 'Ext.Container',

    xtype: 'healthtracker-bloodpressure',

    title: 'Blood Pressure and Pulse',

    scrollable: 'y',

    controller: 'bloodpressurecontroller',

    viewModel: 'bloodpressuremodel',

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

                            title: 'Blood Pressure and Pulse',

                            cls: 'card-panel',

                            reference: 'bpGrid',

                            plugins: [{
                                ptype: 'rowediting'
                            }],

                            bind: {
                                store: '{bpstore}'
                            },

                            listeners: {
                                canceledit: 'cancelBPEdit',
                                edit: 'editBP',
                                beforeedit: 'maybeEditBP',
                                'selectionchange': function(view, records){
                                    this.down('#removeBP').setDisabled(!records.length);
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
                                    dataIndex: 'dateBPReading',
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
                                    text: 'Systolic',
                                    dataIndex: 'systolic',
                                    menuDisabled: true,
                                    flex: 1,
                                    editor: {
                                        xtype: 'numberfield'
                                    }
                                },

                                {
                                    text: 'Diastolic',
                                    dataIndex: 'diastolic',
                                    menuDisabled: true,
                                    flex: 1,
                                    editor: {
                                        xtype: 'numberfield'
                                    }
                                },

                                {
                                    text: 'Pulse',
                                    dataIndex: 'pulse',
                                    menuDisabled: true,
                                    flex: 1,
                                    editor: {
                                        xtype: 'numberfield'
                                    }
                                }
                            ],

                            tbar: {
                                xtype: 'toolbar',

                                items: [
                                    {
                                        xtype: 'button',

                                        text: 'Add BP and Pulse',

                                        iconCls: 'x-fa fa-plus-circle',

                                        handler: 'addBP'
                                    },
                                    {
                                        xtype: 'button',

                                        text: 'Delete BP and Pulse',

                                        iconCls: 'x-fa fa-minus-circle',

                                        handler: 'removeBP',

                                        itemId: 'removeBP',

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