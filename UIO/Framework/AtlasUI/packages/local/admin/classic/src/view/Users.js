/**
 * Created by d3973 on 10/4/2016.
 */
Ext.define('Atlas.admin.view.Users', {
    extend: 'Ext.form.Panel',
    xtype: 'view-adminusers',
    title: 'Users',
    scrollable: true,
    controller: 'admin-users',
    viewModel: {
        data: {
            isEditing: false,
            masterRecord: null,
            newUser: false,
            isUserLocked: false,
            isUserSelected: false
        },
        stores: {
            users: {
                model: 'Atlas.common.model.UserList',
                type: 'clonestore',
                autoLoad:true,
                listeners: {
                    load: 'onUsersLoad'
                },
                proxy: {
                    extraParams:{
                        pShowActive:''
                    },
                    url: 'system/rx/userlist'
                }
            },
            usergroups: {
                //model: 'Atlas.common.model.UserGroup',
                model : 'Atlas.common.model.UserGroupList',
                autoLoad: true
            },
            /* userdataaccesslist: {
             type: 'clonestore',
             autoLoad: false,
             proxy: {
             url: 'system/rx/userdataaccess'
             }
             },*/
            userdataaccess: {
                type: 'tree',
                model: 'Atlas.common.model.merlin.DataAccessNode',
                autoLoad: false
            },
            coveragelist: {
                type: 'tree',
                model: 'Atlas.admin.model.UserListAccessNode',
                autoLoad: false
            },
            dashboardlist: { //options based on group
                type: 'clonestore',
                autoLoad: false,
                //model: 'Atlas.admin.model.DashboardItem',
                listeners: {
                    load: 'onDashboardListLoad'
                },
                proxy: {
                    url: 'system/rx/dashboarditembygroup'
                }
            },
            dashboardlistUnique: { //unique options based on group
                autoLoad: false,
                type: 'store'
            },
            userdashboardlist: { //used to gather selected items
                type: 'clonestore',
                autoLoad: false,
                model: 'Atlas.admin.model.UserDashboardItem',
                proxy: {
                    url: 'system/rx/userdashboarditems'
                }
            },
            queuelist: {
                type: 'clonestore',
                autoLoad: true,
                proxy: {
                    extraParams: {
                        pListName: 'UserQueue'
                    },
                    url: 'system/{0}/listdetail'
                }

            },

            // queuelist: {
            //     model: 'Atlas.common.model.shared.ListDetailModel',
            //     autoLoad: false
            // },
            userqueuelist: {
                model: 'Atlas.admin.model.UserQueueList',
                autoLoad: false
            },
            storeuserdashboarditems: {
                model: 'Atlas.common.view.GetUserDashboardItems',
                autoLoad: false
            }
        }
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    disabled: true,
                    iconCls: 'x-fa fa-user',
                    width: 18
                },
                {
                    xtype: 'combobox',
                    fieldLabel: 'User Name',
                    readOnly: true,
                    bind: {
                        disabled: '{isEditing}',
                        store: '{users}'
                    },
                    emptyText: '[Select a User]',
                    reference: 'usercombo',
                    queryMode: 'local',
                    labelWidth: 70,
                    displayField: 'userName',
                    valueField: 'userName',
                    iconCls: 'x-fa fa-user',
                    forceSelection : true,
                    anyMatch : true,
                    listeners: {
                        //buffer: 50,
                        // change: function () {
                        //     if (this.getRawValue() && this.getRawValue().length>0)
                        //     {
                        //        var store = this.store;
                        //        store.clearFilter();
                        //        store.filter({
                        //            property: 'userName',
                        //            anyMatch: true,
                        //            value: this.getValue()
                        //        });
                        //     }
                        // },
                        select: 'onUserSelect'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'fa  fa-info',
                    width: 15,
                    tooltip: 'You can search for a user by typing in any part of the user name'

                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Create a New User',
                    bind: {
                        disabled: '{isEditing}'
                    },
                    iconCls: 'x-fa fa-user-plus',
                    handler: 'onAdd'
                },
                {
                    text: 'Edit a User',
                    bind: {
                        disabled: '{!isUserSelected || isEditing }'
                    },
                    iconCls: 'x-fa fa-user-md',
                    handler: 'onEdit'
                },
                {
                    text: 'Save',
                    bind: {
                        disabled: '{!isEditing}'
                    },
                    iconCls: 'x-fa fa-save',
                    handler: 'onSave'
                },
                {
                    text: 'Cancel',
                    bind: {
                        disabled: '{!isEditing}'
                    },
                    iconCls: 'x-fa fa-remove',
                    handler: 'onCancel'
                },
                {
                    text: 'Set/Reset Password',
                    bind: {
                        disabled: '{!isUserSelected || isEditing}'
                    },
                    iconCls: 'x-fa fa-user-md',
                    handler: 'onResetPassword'
                },
                {
                    text: 'Unlock User',
                    bind: {
                        disabled: '{!isUserLocked || isEditing}'
                    },
                    iconCls: 'x-fa fa-unlock',
                    handler: 'onUnlock'
                },
                {
                    text: 'Delete',
                    bind: {
                        disabled: '{!isUserSelected || isEditing}'
                    },
                    iconCls: 'x-fa fa-user-times',
                    handler: 'onDelete'
                }

            ]
        }
    ],
    layout: 'hbox',
    defaults: {
        flex: 1,
        margin: 10
        /* bind:{
         disabled: '{!isEditing}'
         }*/
    },
    items: [
        {
            xtype: 'form',
            reference: 'form1',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                }
            },
            items: [
                {
                    xtype: 'fieldset',
                    title: 'General Information',
                    iconCls: 'x-fa fa-list-alt',
                    defaults: {
                        labelWidth: 200,
                        xtype: 'textfield',
                        flex: 1
                    },
                    items: [
                        {
                            fieldLabel: 'User Name',
                            bind: {
                                disabled: '{!newUser}'
                            },
                            allowBlank: false,
                            name: 'username'
                        },
                        {
                            fieldLabel: 'First Name',
                            allowBlank: false,
                            name: 'firstname',
                            bind: {
                                readOnly: '{!isEditing}'
                            }
                        },
                        {
                            fieldLabel: 'Middle Name',
                            name: 'middlename',
                            bind: {
                                readOnly: '{!isEditing}'
                            }
                        },
                        {
                            fieldLabel: 'Last Name',
                            allowBlank: false,
                            name: 'lastname',
                            bind: {
                                readOnly: '{!isEditing}'
                            }
                        },
                        {
                            fieldLabel: 'Title',
                            name: 'accreditation',
                            itemId:'txtaccreditation',
                            bind: {
                                readOnly: '{!isEditing}'
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'User Group',
                            autoLoadOnValue: true,
                            allowBlank: false,
                            name: 'groupid',
                            bind: {
                                store: '{usergroups}',
                                readOnly: '{!isEditing}'
                            },
                            listeners: {
                                select: 'onUserGroupSelect'
                            },
                            emptyText: '[Select a User Group]',
                            reference: 'usergroupcombo',
                            queryMode: 'local',
                            displayField: 'groupName',
                            valueField: 'groupId'

                        },
                        {
                            xtype: 'combobox',
                            width: 120,
                            itemId: 'tagQueueList',
                            fieldLabel: 'Queue List',
                            queryMode: 'local',
                            bind: {
                                store: '{queuelist}',
                                //value: '{userqueuelistdata}',
                                readOnly: '{!isEditing}'
                            },
                            multiSelect: true,
                            forceSelection: true,
                            triggerAction: 'all',
                            tpl: new Ext.XTemplate('<tpl for=".">'
                                + '<div class="x-boundlist-item" >'
                                + '<tpl if="this.checkStatus(values) == true">'
                                + '<input type="checkbox" class=" x-form-checkbox x-form-field" checked="true" >&nbsp;{ListDescription}'
                                + '</tpl>'
                                + '<tpl if="this.checkStatus(values) == false">'
                                + '<input type="checkbox" class=" x-form-checkbox x-form-field" >&nbsp;{ListDescription}'
                                + '</tpl>'
                                + '</div></tpl>',
                                {
                                    checkStatus: function (values) {
                                        if (this.field.up().up().up().getViewModel().getData() != null && this.field.up().up().up().getViewModel().getData().userqueuelistdata != null) {
                                            var userQueueListData = this.field.up().up().up().getViewModel().getData().userqueuelistdata;
                                            var arrUserQueueListData = userQueueListData.split(',');
                                            //this.field.up().down('#tagQueueList').setValue(userQueueListData.split(','));
                                            if (this.field.lastValue != "" && this.field.lastValue != null) {
                                                if (this.field.lastValue.indexOf(values.ListItem) != -1)
                                                    return true;
                                            }
                                            return (arrUserQueueListData.indexOf(values.ListItem) != -1 ? true : false);
                                        }
                                        return false;
                                    }

                                }
                            ),
                            listeners: {
                                select: function (combo, records) {
                                    var node;
                                    Ext.each(records, function (rec) {
                                        node = combo.getPicker().getNode(rec);
                                        Ext.get(node).down('input').dom.checked = true;
                                    });
                                },
                                beforedeselect: function (combo, rec) {
                                    var node = combo.getPicker().getNode(rec);
                                    Ext.get(node).down('input').dom.checked = false;
                                }
                            },
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '{ListDescription}, ',
                                '</tpl>'
                            ),
                            valueField: 'ListItem'
                        },
                        {
                            xtype: 'combobox',
                            width: 120,
                            itemId: 'tagDashboardList',
                            fieldLabel: 'Dashboard List',
                            queryMode: 'local',
                            bind: {
                                store: '{dashboardlistUnique}',
                                //value: '{userqueuelistdata}',
                                readOnly: '{!isEditing}'
                            },
                            multiSelect: true,
                            forceSelection: true,
                            triggerAction: 'all',
                            tpl: new Ext.XTemplate('<tpl for=".">'
                                + '<div class="x-boundlist-item" >'
                                + '<tpl if="this.checkStatus(values) == true">'
                                + '<input type="checkbox" class=" x-form-checkbox x-form-field" checked="true" >&nbsp;{dashboardName}'
                                + '</tpl>'
                                + '<tpl if="this.checkStatus(values) == false">'
                                + '<input type="checkbox" class=" x-form-checkbox x-form-field" >&nbsp;{dashboardName}'
                                + '</tpl>'
                                + '</div></tpl>',
                                {
                                    checkStatus: function (values) {
                                        if (this.field.up().up().up().getViewModel().getData() != null && this.field.up().up().up().getViewModel().getData().userdashboardlistdata != null) {
                                            var userDashboadListData = this.field.up().up().up().getViewModel().getData().userdashboardlistdata;
                                            var arrUserDashboadListData = userDashboadListData.split(',');
                                            //this.field.up().down('#tagQueueList').setValue(userDashboadListData.split(','));
                                            if (this.field.lastValue != "" && this.field.lastValue != null) {
                                                if (this.field.lastValue.indexOf(values.menuDashboardID) != -1)
                                                    return true;
                                            }
                                            return (arrUserDashboadListData.indexOf(values.menuDashboardID) != -1 ? true : false);
                                        }
                                    }

                                }
                            ),
                            listeners: {
                                select: function (combo, records) {
                                    var node;
                                    Ext.each(records, function (rec) {
                                        node = combo.getPicker().getNode(rec);
                                        if (node != null && Ext.get(node).down('input') != null) {
                                            Ext.get(node).down('input').dom.checked = true;
                                        }
                                    });
                                },
                                beforedeselect: function (combo, rec) {
                                    var node = combo.getPicker().getNode(rec);
                                    if (node != null && Ext.get(node).down('input') != null) {
                                        Ext.get(node).down('input').dom.checked = false;
                                    }

                                }
                            },
                            displayTpl: Ext.create('Ext.XTemplate',
                                '<tpl for=".">',
                                '{dashboardName}, ',
                                '</tpl>'
                            ),
                            valueField: 'menuDashboardID'
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: 'Queue Admin User',
                            inputValue: 'yes',
                            name: 'queueAdmin',
                            labelWidth:210,
                            reference: 'queueAdmin',
                            bind: {
                                readOnly: '{!isEditing}'
                            }
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: 'Employee',
                            inputValue: 'yes',
                            labelWidth:210,
                            name: 'Employee',
                            reference: 'Employee',
                            bind: {
                                readOnly: '{!isEditing}'
                            }
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: 'Active',
                            inputValue: 'yes',
                            labelWidth:210,
                            name: 'active',
                            reference: 'active',
                            bind: {
                                readOnly: '{!isEditing}'
                            }
                        },
                        {
                            xtype: 'checkbox',
                            fieldLabel: 'Locked',
                            inputValue: 'yes',
                            labelWidth:210,
                            name: 'acctLocked',
                            reference: 'acctLocked',
                            bind: {
                                readOnly: '{!isEditing}'
                            }
                        }, {
                            xtype: 'displayfield',
                            iconCls: 'x-fa fa-clock-o',
                            fieldLabel: 'Created on',
                            name: 'createDateTime'
                             //fill in a date
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'User Permission List',
                    iconCls: 'x-fa fa-pencil-square-o',
                    reference: 'userlist',
                    defaults: {
                        labelWidth: 200
                    },
                    items: [
                        //treepicker added on VC init
                    ],
                    bind: {
                        disabled: '{!isEditing}'
                    }
                },
                {
                    xtype: 'fieldset',
                    title: 'Contact Information',
                    iconCls: 'x-fa fa-phone',
                    defaults: {
                        labelWidth: 200,
                        xtype: 'textfield'
                    },
                    items: [
                        {
                            fieldLabel: 'Email',
                            allowBlank: false,
                            name: 'email',
                            bind: {
                                readOnly: '{!isEditing}'
                            },
                            regex: /^([\w\-\’\-]+)(\.[\w-\’\-]+)*@([\w\-]+\.){1,5}([A-Za-z]){2,4}$/,
                            regexText: 'This field should be an e-mail address in the format \'user@example.com\''
                        },
                        {
                            fieldLabel: 'Work Phone',
                            allowBlank: false,
                            vtype: 'phone',
                            plugins: {
                                ptype: 'phonenumberformatter'
                            },
                            name: 'workphone',
                            bind: {
                                readOnly: '{!isEditing}'
                            }
                        },
                        {
                            fieldLabel: 'Extension',
                            name: 'Ext',
                            bind: {
                                readOnly: '{!isEditing}'
                            }
                        },
                        {
                            fieldLabel: 'Home Phone',
                            vtype: 'phone',
                            plugins: {
                                ptype: 'phonenumberformatter'
                            },
                            name: 'homephone',
                            bind: {
                                readOnly: '{!isEditing}'
                            }
                        },
                        {
                            fieldLabel: 'Cell Phone',
                            vtype: 'phone',
                            plugins: {
                                ptype: 'phonenumberformatter'
                            },
                            name: 'cell',
                            bind: {
                                readOnly: '{!isEditing}'
                            }
                        },
                        {
                            fieldLabel: 'Fax',
                            vtype: 'phone',
                            plugins: {
                                ptype: 'phonenumberformatter'
                            },
                            name: 'fax',
                            bind: {
                                readOnly: '{!isEditing}'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'fieldset',
            title: 'Coverage Determination Status List',
            bind: {
                disabled: '{!isEditing}'
            },
            defaults: {
                labelWidth: 200,
                xtype: 'textfield',
                flex: 1
            },

            items: [
                {
                    xclass: 'Atlas.common.ux.tree.TriStateTree',
                    flex: 1,
                    margin: '35 0 0 0',
                    reference: 'coveragelisttree',
                    title: 'Coverage Determination Status List',
                    bind: {
                        store: '{coveragelist}'
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    text: 'Expand All',
                                    handler: 'onExpandAllCoverage'
                                },
                                {
                                    text: 'Collapse All',
                                    handler: 'onCollapseAllCoverage'

                                }
                            ]
                        }
                    ],
                    columns: [
                        {
                            xtype: 'treecolumn',
                            useColorIcons: false,
                            dataIndex: 'nodeName',
                            flex: 1
                        }],
                    root: {
                        expanded: false,
                        children: [],
                        nodeId:'ALL',
                        nodeName:'ALL'
                    }
                }
            ]
        }
    ]
});