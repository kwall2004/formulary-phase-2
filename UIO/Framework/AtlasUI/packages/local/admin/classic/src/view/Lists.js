/**
 * Created by d3973 on 10/11/2016.
 */
Ext.define('Atlas.admin.view.Lists', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.plugin.RowEditing'
    ],
    xtype: 'view-adminlists',
    title: 'Lists',
    controller: 'adminlistsviewcontroller',
    viewModel: 'adminlistsviewmodel',
    reference: 'lists',
    bind: {
        store: '{listGrid}'
    },
    plugins: [
        {
            ptype: 'rowediting',
            triggerEvent: 'celldblclick',
            removeUnmodified: true,
            id: 'rowEdit',
            listeners: {
                beforeedit: 'beforeEditing',
                edit: 'afterEditing',
                canceledit: 'cancelEditing'
            }
        }
    ],
    dockedItems:[{
        xtype: 'toolbar',
        dock: 'top',
        layout: 'hbox',
        items: [
             {
                xtype: 'button',
                text: 'Add',
                iconCls: 'x-fa  fa-plus-circle',
                listeners: {
                    click: 'addListItem'
                },
                disabled: true,
                itemId: 'addButton'
            }, {
                xtype: 'button',
                text: 'Remove',
                iconCls: 'x-fa  fa-minus-circle',
                listeners: {
                    click: 'removeListItem'
                },
                disabled: true,
                itemId: 'removeButton'
            },
            '->',
            {
                xtype: 'combobox',
                queryMode: 'local',
                emptyText: 'Select a list name',
                bind: {
                    store: '{comboBoxLists}'
                },
                displayField: 'name',
                fieldLabel: 'List Names:',
                listeners: {
                    select: 'onListSelect'
            },
                itemId: 'listComboBox',
                grow: true,
                growMin: 305,
                growToLongestValue: false
        },
            {
                xtype: 'button',
                text: 'Add List',
                iconCls: 'x-fa  fa-plus-circle',
                listeners: {
                    click: 'addList'
                },
                itemId: 'addListButton'
            }
        , {
            xtype: 'hiddenfield',
            name: 'comboBoxHiddenVal',
            itemId: 'comboBoxHiddenVal'
        } ]
    }, {
        xtype: 'toolbar',
        dock: 'bottom',
        layout: 'hbox',
        items: [{
            xtype: 'pagingtoolbar',
            pageSize: 25,
            bind: '{listGrid}',
            displayInfo: true
        }, {
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            text: 'Save',
            iconCls: 'x-fa fa-save',
            listeners: {
                click: 'saveList'
            },
            disabled: true,
            itemId: 'saveButton'
        }, {
            xtype: 'button',
            text: 'Remove List',
            iconCls: 'x-fa  fa-minus-circle',
            listeners: {
                click: 'removeList'
            },
            itemId: 'removeListButton',
            disabled: true
        }]
    }],
    columns: [{
        text: 'List Item',
        dataIndex: 'ListItem',
        editor: {
            allowBlank: false
        },
        filter: {
            type: 'string'
        },
        flex: 2
    }, {
        text: 'List Description',
        dataIndex: 'ListDescription',
        editor: {
            allowBlank: false
        },
        filter: {
            type: 'string'
        },
        flex: 2
    },
        {
            text: 'Plan Group Hierarchy',
            dataIndex: 'planGroupAccessData',
            editor: {
                xtype: 'combobox',
                bind: {
                    store: '{planGroupAccess}'
                },
                queryMode: 'local',
                displayField: 'planGroupHierFullName',
                valueField: 'SystemID',
                forceSelection: true,
                multiSelect: true,
                listConfig: {
                    getInnerTpl: function(planGroupHierFullName) {
                        return '<div class="x-combo-list-item"><span class="chkCombo-default-icon chkCombo" ></span> {' + planGroupHierFullName + '}</div>';
                    }
                }
            },
            filter:{
                type: 'string'
            },
            flex: 5,
            renderer: 'planGroupHierarchyRender'
            // renderer: 'initPlanGroupHierarchyRender'
        },


     {
        text: 'Char String',
        dataIndex: 'charString',
        editor: {
            emptyText:"Format e.g. xxxxx^xxxxx^xxxxx^xxxxx"
        },
        filter: {
            type: 'string'
        },
        flex: 3
    }, {
        text: 'Active',
        dataIndex: 'Active',
        editor: {
            xtype: 'checkbox',
            checked: true,
            inputValue: true,
            uncheckedValue: false
        },
        xtype: 'checkcolumn',
        filter: {
            type: 'boolean'
        },
        bind: {
            disabled: '{!record.isEditing}'
        },
        disabled: true,
        flex: 1
    },{
            xtype: 'widgetcolumn',
            align: 'center',
            width: 100,
            hideable : false,
            flex:0,
            widget: {
                xtype: 'container',
                bind: true,
                defaults: {
                    xtype: 'tool',
                    viewModel: true
                },
                items: [
                    {
                        xtype: 'button',
                        text: 'Reject',
                        width: 75,
                        iconCls: 'x-action-col-icon x-fa fa-undo',
                        bind: {
                            hidden: '{!record.isNeedUpdate}',
                            tooltip: 'Reject '
                        },
                        listeners: {
                            click: 'onReject'
                        }
                    }
                ]
            }
        }

    ]
});
