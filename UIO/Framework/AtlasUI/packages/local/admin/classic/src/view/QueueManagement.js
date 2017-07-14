Ext.define('Atlas.admin.view.QueueManagement', {
    extend: 'Ext.Container',
    xtype: 'admin-queuemanagement',
    title: 'Queue Management',
    reference: 'admin-queuemanagement',
    // controller: 'admin-queuemanagement',
    viewModel: {},
    layout: 'border',
    items: [
        {
            xtype: 'grid',
            region: 'center',
            flex: 2,
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {
                        text: 'Queue ID',
                        dataIndex: 'ruleName'
                    },
                    {
                        text: 'Queue Description',
                        dataIndex: 'ruleCriteria'
                    },
                    {
                        text: 'Fax Queue',
                        xtype: 'checkcolumn',
                        dataIndex: 'progressFunctions'
                    },
                    {
                        text: 'Fax ID',
                        dataIndex: 'isActive'
                    }
                ]
            },
            bind: {
                store: '{queuemanagement}'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    alignment: 'left',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Add',
                            listeners: {
                                click: 'addRecord'
                            }
                        }, {
                            xtype: 'button',
                            text: 'Remove',
                            listeners: {
                                click: 'removeRecord'
                            },
                            bind: {
                                disabled: '{!admin-queuemanagement.selection}'
                            }
                        },
                        '->',
                        {
                            xtype: 'button',
                            text: 'Save',
                            iconCls: 'x-fa fa-save',
                            bind:{
                                disabled: '{!queuemanagement.needsSync}'
                            },
                            listeners: {
                                click: 'saveGrid'
                            }
                        }
                    ]
                }, {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: 'true',
                    bind: {
                        store: '{pbmRules}'
                    }
                }
            ]

        }, {
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
                    bind: {
                        store: '{groups}'
                    },
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'Available Plan Group',
                                dataIndex: 'DESCRIPTION'
                            }
                        ]
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
                                    text: '<span class="x-fa fa-chevron-circle-down"></span>',
                                    handler: 'onAssign',
                                    alignment: 'right'
                                    //width: 110
                                }, {
                                    xtype: 'button',
                                    text: '<span class="x-fa fa-chevron-circle-up"></span>',
                                    handler: 'onUnAssign',
                                    alignment: 'right'
                                }, {
                                    xtype: 'tbfill'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    title: 'Assigned Groups',
                    bind: {
                        store: '{groupusers}'
                    },
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'Group Name',
                                dataIndex: 'groupName'
                            },
                            {
                                text: 'Queue Name',
                                dataIndex: 'extaccess??'
                            }
                        ]
                    }
                }
            ]
        }]


});

