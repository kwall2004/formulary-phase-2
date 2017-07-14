/**
 * Created by d3973 on 9/28/2016.
 */
Ext.define('Atlas.admin.view.Menus', {
    //extend: 'Ext.Container',
    extend: 'Ext.panel.Panel',
    xtype: 'admin-menus',
    cls: 'headerTriState',

    controller: 'admin-menus',
    viewModel: {
        data: {
            menuRecord: null
        },
        stores: {
            adminmenuitems: {
                type: 'common-systemmenus-admin',
                /*listeners: {
                 load: 'onExpand'
                 },*/
                autoLoad: false

            },
            groupusers: {
                model: 'Atlas.common.model.shared.UserGroupByMenu',
                listeners: {
                    datachanged: 'onGroupUserChange'
                },
                autoLoad: false
            },
            groups: {
                model: 'Atlas.common.model.UserGroup',
                autoLoad: false
            },
            yesNo: {
                data: [
                    {name: 'Yes', value: 'yes'},
                    {name: 'No', value: 'no'}
                ]
            }
        }
    },
    layout: 'border',

    items: [
        {
            xtype: 'treepanel',
            region: 'west',
            cls: 'panelNavigation',
            reference: 'menuTree',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype: 'button',
                        //iconCls: 'x-fa fa-plus-circle',
                        bind: {
                            disabled: '{!menuTree.selection}'
                        },
                        menu: [{
                            text: 'Before Selected Menu',
                            iconCls: 'x-fa fa-chevron-left',
                            bind: {
                                disabled: '{menuRecord.root}'
                            },
                            handler: 'onAddBefore'
                        }, {
                            text: 'After Selected Menu',
                            iconCls: 'x-fa fa-chevron-right',
                            bind: {
                                disabled: '{menuRecord.root}'
                            },
                            handler: 'onAddAfter'
                        }, {
                            text: 'Child of Selected Menu',
                            reference: 'childCreationMenu',
                            iconCls: 'x-fa fa-sitemap',
                            handler: 'onAddChild'
                        }],
                        text: 'Add',
                        iconCls: 'fa fa-plus-circle'
                    }, {
                        xtype: 'button',
                        iconCls: 'x-fa fa-pencil',
                        text: 'Update',
                        bind: {
                            disabled: '{!menuTree.selection}'
                        },
                        handler: 'onUpdate'
                    }, {
                        xtype: 'button',
                        iconCls: 'x-fa fa-minus-circle',
                        text: 'Delete',
                        bind: {
                            disabled: '{!menuTree.selection}'
                        },
                        handler: 'onDelete'
                    }, {
                        xtype: 'tbfill'
                    }, {
                        xtype: 'button',
                        text: 'Expand All',
                        handler: 'onExpand',
                        alignment: 'right'
                        //width: 110
                    }, {
                        xtype: 'button',
                        text: 'Collpase All',
                        handler: 'onCollapse',
                        alignment: 'right'
                    }
                    ]
                }
            ],
            bind: {
                store: '{adminmenuitems}'
            },
            queryMode: 'local',
            split: true,

            width: 450,

            rootVisible: true,
            hideHeaders: true,
            useArrows: false,

            columns: [{
                xtype: 'treecolumn',
                useColorIcons: true,
                dataIndex: 'menuTitle',
                flex: 1
            }],
            listeners: {
                itemclick: 'onNavigationItemClick' //different method as we have a tree here
            }
        }, {
            xtype: 'panel',
            region: 'center',
            bind: {
                title: 'Menu Security for {menuRecord.menuTitle}' //<span class="x-fa fa-shield"></span>
            },
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
                    reference: 'groupsgrid',
                    selModel: {mode: 'MULTI'},
                    bind: {
                        store: '{groups}'
                    },
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'Group Name',
                                dataIndex: 'groupName'
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
                                    bind: {
                                        disabled: '{!menuTree.selection}'
                                    },
                                    alignment: 'right'
                                    //width: 110
                                }, {
                                    xtype: 'button',
                                    text: '<span class="x-fa fa-chevron-circle-up"></span>',
                                    handler: 'onUnAssign',
                                    bind: {
                                        disabled: '{!menuTree.selection}'
                                    },
                                    alignment: 'right'
                                }, {
                                    xtype: 'tbfill'
                                }
                            ]
                        }
                    ],
                    title: 'User Groups',
                    iconCls: 'fa fa-users'
                },
                {
                    xtype: 'grid',
                    title: 'Assigned Groups',
                    iconCls: 'fa fa-user-plus',
                    reference: 'assignedgroupsgrid',
                    selModel: {mode: 'MULTI'},
                    bind: {
                        store: '{groupusers}'
                    },
                    plugins: [
                        {
                            ptype: 'rowediting',
                            triggerEvent: 'celldblclick',
                            removeUnmodified: true,
                            id: 'rowEdit'
                        }
                    ],
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
                                text: 'Group ID',
                                dataIndex: 'groupID',
                                hidden: true
                            },
                            {
                                text: 'External Access Allowed',
                                dataIndex: 'allowExtAccess',
                                renderer: function (value) {
                                    if (value)
                                        return 'Yes';
                                    else
                                        return 'No';
                                },
                                editor: {
                                    xtype: 'combobox',
                                    reference: 'cbxExternalAcccesAllowed',
                                    bind: {
                                        store: '{yesNo}'
                                    },
                                    selectOnFocus: true,
                                    displayField: 'name',
                                    valueField: 'value'
                                }
                            }
                        ]
                    },
                    listeners: {
                        itemclick: 'assignedgroupsgrid_itemclick',
                        itemDblClick: 'assignedgroupsgrid_itemdblclick'
                    }
                }
            ],

            bbar: [

                '->',
                {
                    xtype: 'button',
                    itemId: 'btnAdvancedSecuritySetting',
                    text: 'Advanced Security Setting',
                    iconCls: 'fa fa-wrench',
                    handler: 'btnAdvancedSecuritySettingClick',
                    disabled: true
                }

            ]
        }]
});