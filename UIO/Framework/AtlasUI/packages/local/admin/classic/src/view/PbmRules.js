/**
 * Created by s4505 on 10/13/2016.
 */
/*
 Last Developer: Sundar Parthasarathy
 Previous Developers: [Sundar Parthasarathy]
 Origin: Merlin - Member
 Description: A view that allows the admin to set different options.
 */
Ext.define('Atlas.admin.view.PbmRules', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.plugin.RowEditing'
    ],
    xtype: 'admin-pbmRules',

    title: 'PBM Rules',
    reference: 'admin-pbmrules',
    controller: 'admin-pbmrules',
    viewModel: 'adminPbmRulesViewModel',
    plugins: [
        {
            ptype: 'rowediting',
            listeners: {
                'canceledit': 'cancelEditButton',
                'beforeedit': 'beforeEditing',
                'edit': 'afterEditing'
            },
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
                text: 'Rule Type',
                dataIndex: 'RuleType',
                hidden : true
            },
            {
                text: 'Rule Name',
                dataIndex: 'RuleName',
                editor: {allowBlank: false}
            },
            {
                text: 'Rule Criteria',
                dataIndex: 'RuleCriteria',
                editor: {allowBlank: false,emptyText:"Format e.g. xxxxx^xxxxx^xxxxx^xxxxx"}
            },
            {
                text: 'Progress Function',
                dataIndex: 'ProgressFuncName',
                editor: {allowBlank: false}
            },
            {
                text: 'Active',
                dataIndex: 'RuleActive',
                listeners: {
                    beforecheckchange: function () {
                        return false;
                    }
                },
                editor: {
                    xtype: 'checkbox',
                    inputValue: true,
                    uncheckedValue: false,
                    checked: true
                },
                renderer: function (value) {
                    if (value)
                        return 'Yes';
                    else
                        return 'No';
                }

            },
            {
                xtype: 'widgetcolumn',
                align: 'center',
                width: 100,
                flex:0,
                hideable : false,
                widget: {
                    xtype: 'container',
                    bind: true,
                    defaults: {
                        xtype: 'tool',
                        viewModel: true
                    },

                    items: [
                        // reject tool
                        {
                            xtype: 'button',
                            text: 'Reject',
                            width: 75,
                            iconCls: 'x-action-col-icon x-fa fa-undo',
                            bind: {
                                hidden: '{!record.isNeedUpdate}',
                                tooltip: 'Reject '
                            },
                            handler: 'onReject'

                        }
                    ]
                }
            }

        ]
    },
    bind: {
        store: '{pbmrulesStore}'
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
                    iconCls: 'x-fa  fa-plus-circle',
                    reference:'addButton',
                    handler: 'onAdd',
                    disabled:true
                }, {
                    xtype: 'button',
                    text: 'Remove',
                    iconCls: 'x-fa  fa-minus-circle',
                    reference:'removeButton',
                    handler: 'onRemove',
                    disabled:true
                },
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'combobox',
                    queryMode: 'local',
                    emptyText: 'Select a Rule Type',
                    grow: true,
                    growMin: 350,
                    alignment:'right',
                    fieldLabel: 'Rule Types',
                    reference: 'pbmRuleTypesCombo',
                    name: 'ruleTypes',
                    valueNotFoundText: 'Select a Rule Type',
                    displayField: 'name',
                    valueField: 'name',
                    bind: {
                        store: '{pbmTypes}'
                    },
                    listeners: {
                        select: "onTypesSelect"
                    }
                }
            ]
        },

        {

            xtype: 'toolbar',
            dock: 'bottom',
            items:[
                {
                    xtype: 'tbfill'
                },
                {
                    text: 'Save',
                    reference:'saveButton',
                    iconCls: 'x-fa fa-save',
                    handler: 'onSave',
                    disabled:true,
                    alignment: 'right'
                },
                {
                    xtype: 'button',
                    reference: 'deleteListButton',
                    iconCls: 'x-fa fa-trash',
                    text: 'Delete Selected List',
                    alignment: 'right',
                    handler:'onDeleteList',
                    disabled:true
                }
            ]

        },
        {

            xtype: 'toolbar',
            dock: 'bottom',
            layout:'fit',
            items:[
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    itemId:'pgToolbar',
                    displayInfo: 'true',
                    pageSize: 25,
                    bind: {
                        store: '{pbmrulesStore}'
                    }
                }
            ]

        }
    ]
});

