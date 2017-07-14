Ext.define('Atlas.admin.view.UserGroups', {
    extend: 'Ext.panel.Panel',
    xtype: 'admin-usergroups',
    title: 'User Groups',
    controller: 'admin-usergroups',
    viewModel: {
        stores: {
            adminusergroups: {
                model: 'Atlas.common.model.UserGroup',
                autoLoad: true,
                remoteSort: true,
                remoteFilter: true

            },
            adminusers: {
                model: 'Atlas.common.model.merlin.UserByGroup',
                autoLoad: false,
                remoteSort: true,
                remoteFilter: true

            }
        }
    },
    layout: 'border',
    items: [
        {
            xtype: 'grid',
            region: 'center',
            title:'Groups',
            reference: 'usergroups',
            flex: 1,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        text: 'Add',
                        handler: 'onAdd',
                        iconCls: 'fa  fa-plus-circle',
                        alignment: 'left'
                    }, {
                        text: 'Remove',
                        handler: 'onRemove',
                        iconCls: 'fa  fa-minus-circle',
                        alignment: 'left'
                    }, {
                        text: 'Copy Access',
                        handler: 'onCopy',
                        iconCls: 'fa  fa-copy',
                        bind:{
                            disabled:'{!usergroups.selection}'
                        },
                        alignment: 'left'
                    }, '->', {
                        text: 'Save',
                        iconCls: 'fa fa-save',
                        handler: 'onSave',
                        alignment: 'right'
                    }]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: 'true',
                    pageSize: 25,
                    bind: {
                        store: '{adminusergroups}'
                    }
                }
            ],
            columns: {
                items: [
                  {
                        text: 'Group Name',
                        dataIndex: 'groupName',
                        flex: 1,
                        editor: {
                            xtype: 'textfield',
                            allowBlank: false,
                            minWidth: 100
                        }
                    },
                    {
                        text: 'Description',
                        dataIndex: 'DESCRIPTION',
                        flex: 1,
                        editor: {
                            xtype: 'textfield',
                            allowBlank: false,
                            minWidth: 100
                        }
                    },
                    {
                        text: 'DefaultMenu',
                        dataIndex: 'defaultMenu',
                        hidden:true,
                        flex: 1
                    },
                    {
                        text: 'GroupId',
                        dataIndex: 'groupId',
                        hidden:true,
                        flex: 1
                    },
                    {
                        xtype: 'widgetcolumn',
                        align: 'center',
                        widget: {
                            xtype: 'button',
                            width:75,
                            text: 'Reject',
                            iconCls: 'x-action-col-icon x-fa fa-undo',
                            bind: {

                                tooltip: 'Reject '
                            },
                            handler: 'onRuleReject'

                        },
                        onWidgetAttach: function(col, widget, rec) {

                            widget.setVisible(rec.get('isNeedUpdate'));
                            col.mon(col.up('gridpanel').getView(), {
                                itemupdate: function() {
                                    widget.setVisible(rec.get('isNeedUpdate'));
                                }
                            });
                        }

                    }

                ]
            },
            plugins: [
                {
                    ptype: 'rowediting',
                    clicksToEdit: 2,
                    autoCancel: false
                },
                {
                    ptype: 'gridfilters'
                }
            ],
            selModel: 'rowmodel',
            listeners:{
                edit: 'onRuleEdit',
                canceledit: 'onCancelRuleEdit',
                beforeselect:'beforeSelectionChange',
                select: 'onGroupSelect'
            },
            bind: {
                store: '{adminusergroups}'
            }

        }, {
            xtype: 'panel',
            flex: 2,
            region: 'east',
            split: true,
            layout: 'fit',
            items: [
                {
                    xtype: 'grid',
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {text: 'User Name', dataIndex: 'userName'},
                            {text: 'First Name', dataIndex: 'firstName'},
                            {text: 'Last Name', dataIndex: 'lastName'},
                            {text: 'Work Phone', dataIndex: 'phone',renderer: function(value) {
                                return value.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1)-$2-$3');
                            }},
                            {text: 'Email', dataIndex: 'email'},
                            {text: 'Active', dataIndex: 'active', xtype: 'checkcolumn', disabled: true}
                        ]
                    },
                dockedItems:[
                    {
                        xtype: 'pagingtoolbar',
                        dock: 'bottom',
                        displayInfo: 'true',
                        pageSize: 25,
                        bind: {
                            store: '{adminusers}'
                        }
                    }
                    ],
                    listeners:{
                        itemdblclick: 'onUserSelect'
                    },
                    bind: {
                        store: '{adminusers}',
                        title:'{title}'
                    }

                }
            ]
        }
    ]


});

