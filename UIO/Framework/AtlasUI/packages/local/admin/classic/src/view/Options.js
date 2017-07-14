/*
 Last Developer: David Lorenz
 Previous Developers: [Sundar Parthasarathy]
 Origin: Merlin - Member
 Description: A view that allows the admin to set different options.
 */
Ext.define('Atlas.admin.view.Options', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.plugin.RowEditing'
    ]
    ,xtype: 'admin-options',
    title: 'Options',
    controller: 'optionsController',
    layout:'fit',
    selModel:{
        mode:'MULTI'
    },
    viewModel: {
        stores: {
            optionsStore: {
                model: 'Atlas.admin.model.Options',
                remoteSort: true,
                remoteFilter: true,
                autoLoad: false
            }
        }
    },
    plugins: [
        {
            ptype: 'rowediting',
            //triggerEvent: 'celldblclick',
           // removeUnmodified: true,
            id: 'rowEdit'
        },
        {
            ptype: 'gridfilters'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                text: 'Add',
                reference:'addButton',
                iconCls: 'x-fa  fa-plus-circle',
                handler: 'onAdd',
                alignment: 'left'
            }, {
                text: 'Remove',
                reference:'removeButton',
                iconCls: 'x-fa  fa-minus-circle',
                disabled:true,
                handler: 'onRemove',
                alignment: 'left'
            }]
        },
        {
            xtype:'toolbar',
            dock:'bottom',
            items:[
                {
                    xtype: 'tbfill'
                },
                {
                    text: 'Save',
                    reference:'saveButton',
                    iconCls: 'x-fa fa-save',
                    disabled:true,
                    handler: 'onSave',
                    alignment: 'right'
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
                    displayInfo: 'true',
                    pageSize: 25,
                    bind: {
                        store: '{optionsStore}'
                    }
                }
            ]

        }
    ],

    columns: [
        {
            text: 'Key Name',
            dataIndex: 'keyName',
            flex:1,
            editor: {
                allowBlank: false
            },
            filter: {
                type: 'string'
            }
        }, {
            text: 'Key Value',
            dataIndex: 'keyValue',
            flex:1,
            editor: {
                allowBlank: false
            },
            filter: {
                type: 'string'
            }
        }, {
            text: 'Key Description',
            dataIndex: 'keyDescription',
            flex:1,
            editor: {
                allowBlank: false
            }
        },
        {
            xtype: 'widgetcolumn',
            align: 'center',
            width: 100,
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
                        preventDefault:true,
                        width: 75,
                        iconCls: 'x-action-col-icon x-fa fa-undo',
                        bind: {
                            hidden: '{!record.isNeedUpdate}',
                            tooltip: 'Reject '
                        },
                        handler:'onReject'

                    }
                ]
            }
        }

    ],
    bind: {
        store: '{optionsStore}'
    }
});

