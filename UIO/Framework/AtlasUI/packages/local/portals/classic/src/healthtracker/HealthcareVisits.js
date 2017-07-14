Ext.define('Atlas.portals.view.healthtracker.HealthcareVisits', {
    extend: 'Ext.Container',

    xtype: 'healthtracker-healthcarevisits',

    title: 'Healthcare Visits',

    scrollable: 'y',

    controller: 'healthcarevisitscontroller',

    viewModel: 'healthcarevisitsmodel',

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

                            title: 'Healthcare Visits',

                            cls: 'card-panel',

                            reference: 'healthcareVisitGrid',

                            plugins: [{
                                ptype: 'rowediting'
                            }],

                            bind: {
                                store: '{healthrackerdatastore}'
                            },

                            listeners: {
                                canceledit: 'cancelVisitEdit',
                                edit: 'editVisit',
                                beforeedit: 'maybeEditVisit',
                                'selectionchange': function(view, records){
                                    this.down('#removeVisit').setDisabled(!records.length);
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
                                    text: 'Date of Visit',
                                    dataIndex: 'dateOfVisit',
                                    xtype: 'datecolumn',
                                    flex: 1,
                                    editor: {
                                        xtype: 'datefield',
                                        format: 'm/d/Y'
                                    },
                                    filter: {type: 'date'}
                                },

                                {
                                    text: 'Reason for Visit (Condition)',
                                    dataIndex: 'reasonforVisit',
                                    flex: 1,
                                    editor: {
                                        xtype: 'combobox',
                                        bind: {
                                            store: '{visitreasonstore}'
                                        },
                                        queryMode: 'server',
                                        valueField: 'listDescription',
                                        displayField: 'listDescription',
                                        triggerAction: 'all',
                                        emptyText: 'Select reason for visit',
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
                                },

                                {
                                    text: 'Result of Visit',
                                    dataIndex: 'resultOfVisit',
                                    flex: 1,
                                    editor: {
                                        xtype: 'combobox',
                                        bind: {
                                            store: '{visitresultstore}'
                                        },
                                        queryMode: 'server',
                                        valueField: 'listDescription',
                                        displayField: 'listDescription',
                                        triggerAction: 'all',
                                        emptyText: 'Select result for visit',
                                        typeAhead: true
                                    }
                                },

                                {
                                    text: 'New Rx?',
                                    align: 'left',
                                    dataIndex: 'newPrescription',
                                    flex: 1,
                                    xtype: 'checkcolumn',
                                    editor: {
                                        xtype: 'checkboxfield',
                                        align: 'center'
                                    }
                                },

                                {
                                    text: 'Notes',
                                    dataIndex: 'notes',
                                    width: 300,
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

                                        text: 'Add',

                                        iconCls: 'x-fa fa-plus-circle',

                                        handler: 'addVisit'
                                    },
                                    {
                                        xtype: 'button',

                                        text: 'Remove',

                                        iconCls: 'x-fa fa-minus-circle',

                                        handler: 'removeVisit',

                                        itemId: 'removeVisit',

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