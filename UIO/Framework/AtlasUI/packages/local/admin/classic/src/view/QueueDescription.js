/**
 * Created by s6685 on 11/22/2016.
 */
Ext.define('Atlas.admin.view.QueueDescription', {
    extend: 'Ext.panel.Panel',
    //xtype: 'adminQueueDescription',
    title: 'Queue Management',
    controller: 'QueueDescriptionController',
    viewModel: 'QueueDescriptionViewModel',
    layout: 'border',
    items: [
        {
            xtype: 'grid',
            itemId: 'gpQueueManagement',
            region: 'center',
            flex: 2,
            tbar: [
                {
                    xtype: 'button',
                    text: 'Add',
                    iconCls: 'fa  fa-plus-circle',
                    handler:'btnAddClick'
                },
                {
                    xtype: 'button',
                    text: 'Remove',
                    iconCls: 'fa  fa-minus-circle',
                    handler:'btnRemoveClick'
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Save',
                    iconCls: 'fa fa-save',
                    handler:'btnSaveClick'
                }


            ],
            columns: {
                defaults: {
                    flex: .92
                },
                items: [
                    {
                        text: 'Queue ID',
                        dataIndex: 'QueID',
                        editor: {
                            emptyText: 'Queue ID',
                            allowBlank: false,
                            bind:{disabled:'{!isNeedUpdate}'},
                            hideLabel: true
                        }
                    },
                    {
                        text: 'Queue Description',
                        dataIndex: 'Description',
                        editor: {
                            emptyText: 'Description',
                            allowBlank: false,
                            hideLabel: true
                        }
                    },
                    {
                        text: 'Fax Queue',
                        xtype: 'checkcolumn',
                        dataIndex:'FaxIdCheck',
                        disabled:true,
                        itemId:'faxId',
                        editor: {
                            xtype: 'checkbox',
                            disabled: false
                        }



                    },
                    {
                        text: 'Fax ID',
                        dataIndex:'FaxId',
                        editor: {
                            emptyText: 'Fax ID',
                            allowBlank: true,
                            hideLabel: true
                        }
                    },
                    {
                        text: 'System ID',
                        dataIndex:'SystemID',
                        hidden:true
                    },
                    {
                        xtype: 'widgetcolumn',
                        align: 'center',
                        hideable: false,
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
                            col.mon(col.up('grid').getView(), {
                                itemupdate: function() {
                                    widget.setVisible(rec.get('isUpdated'));
                                }
                            });
                        }

                    }

                ]

            },
            bind: {
                store: '{QueueDescriptionListStore}'
            },
            listeners: {
                rowclick :'grdQuedescRowClick'
            },
            plugins: {
                ptype: 'rowediting',
                clicksToEdit: 2,
                autoCancel: false,
                listeners: {
                    beforeedit: 'beforeGridEdit',
                    'canceledit': 'cancelEditButton',
                    edit: 'completeEdit'

                }
            }

        }
        , {
            xtype: 'panel',
            flex: 1,
            region: 'east',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                flex: 1
            },
            items: [
                {
                    xtype: 'grid',
                    title: 'Plan Groups',
                    itemId:'grdAvailablePlanGroup',
                   // bind: '{StoreAvailablePlanGroup}',
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'Available Plan Group',
                                dataIndex: 'planGroupName'
                            }
                        ]
                    },
                    listeners: {
                        rowclick :'grdAvailbleRowClick'
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'tbfill'
                                }, {
                                    xtype: 'button',
                                    itemId:'btndown',
                                    text: '<span class="x-fa fa-chevron-circle-down"></span>',
                                    handler: 'onAssign',
                                    disabled: true,
                                    alignment: 'right'
                                    //width: 110
                                }, {
                                    xtype: 'button',
                                    itemId:'btnup',
                                    text: '<span class="x-fa fa-chevron-circle-up"></span>',
                                    handler: 'onUnAssign',
                                    alignment: 'right',
                                    disabled: true
                                }, {
                                    xtype: 'tbfill'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    title: 'Assigned Plan Groups',
                    itemId:'grdAssinedGroups',
                    bind: {
                        store: '{storeAssignedPlanGroup}'
                    },
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'Assigned Plan Group',
                                dataIndex: 'PlanGroupName'
                            },
                            {
                                dataIndex: 'planGroupId',
                                hidden:true
                            },
                            {
                                text: 'Queue Name',
                                dataIndex: 'queName',
                                editor: {
                                    emptyText: 'Queue Name',
                                    allowBlank: false,
                                    hideLabel: true,
                                    listeners: {
                                        blur: 'SaveAssinedQueueName'
                                    }
                                }
                            }
                        ]
                    },
                    listeners: {
                        rowclick :'grdAssignedRowClick'
                    },
                    plugins: [
                        {
                            ptype: 'cellediting',
                            clicksToEdit: 2,
                            autoCancel: false
                        }
                    ]

                }
            ]
        }]


});


