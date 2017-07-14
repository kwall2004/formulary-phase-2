Ext.define('Atlas.admin.view.PBMErrors', {
    extend: 'Ext.panel.Panel',
    xtype: 'admin-pbmerrors',
    title: 'PBM Errors',
    reference: 'admin-pbmerrors',
    controller: 'admin-pbmerrorscontroller',
    viewModel: 'view-pbmerrorsviewmodel',
    layout: 'border',

    addFlagErrorList: false,
    prevSelErrorList: null,
    placeHolderErrorList: null,

    items: [
        {
            xtype: 'grid',
            region: 'center',
            itemId: 'errorListGrid',
            flex: 2,
            plugins: [{
                ptype: 'rowediting',
                triggerEvent: 'celldblclick',
                errorSummary: false,
                id: 'rowEdit',
                listeners: {
                    beforeedit: 'onBeforeEdit',
                    edit: 'editRow',
                    canceledit: 'onCancelEdit'
                }
            }],
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {
                        text: 'List ID',
                        dataIndex: 'ErrorListId'
                    },
                    {
                        text: 'Description',
                        dataIndex: 'Description',
                        flex: 2,
                        editor: {
                            allowBlank: false,
                            xtype: 'textfield'
                        }
                    },
                    {
                        text: 'ErrorSourceID',
                        dataIndex: 'ErrorSourceID',
                        hidden: true
                    },
                    {
                        text: 'Source',
                        dataIndex: 'ErrorSource',
                        flex: 2,
                        editor: {
                            allowBlank: false,
                            xtype: 'combobox',
                            bind: {
                                store: '{cbxErrorSource}'
                            },
                            displayField: 'ListDescription',
                            valueField: 'ListItem',
                            queryMode: 'local',
                            forceSelection: true
                        },
                        renderer: 'renderSource'
                    },
                    {
                        width: 85,
                        flex: 0,
                        xtype: 'widgetcolumn',
                        align: 'center',
                        hideable: false,
                        resizable: false,
                        menuDisabled: true,
                        widget: {
                            xtype: 'button',
                            text: 'Reject',
                            width: 75,
                            iconCls: 'x-action-col-icon x-fa fa-undo',
                            bind: {
                                tooltip: 'Reject '
                            },
                            handler: 'onBtnReject'
                        },
                        onWidgetAttach: function(col, widget, rec) {
                            widget.setVisible(rec.get('isUpdated'));
                            col.mon(col.up('gridpanel').getView(), {
                                itemupdate: function() {
                                    widget.setVisible(rec.get('isUpdated'));
                                }
                            });
                        }
                    }
                ]
            },
            bind: {
                store: '{errorList}'
            },
            listeners: {
                select: 'onSelectErrorList',
                beforeselect: 'beforeSelectErrorList'
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
                            iconCls: 'x-fa fa-plus-circle',
                            listeners: {
                                click: 'onAddError'
                            }
                        }, {
                            xtype: 'button',
                            text: 'Remove',
                            iconCls: 'x-fa fa-minus-circle',
                            listeners: {
                                click: 'removeRecord'
                            },
                            bind: {
                                disabled: '{!admin-lettertemplate.selection}'
                            }
                        }/*,
                        '->',
                        {
                            xtype: 'button',
                            text: 'Save',
                            bind:{
                                disabled: '{!lettertemplate.needsSync}'
                            },
                            listeners: {
                                click: 'saveGrid'
                            }
                        }*/
                    ]
                }, {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: 'true',
                    hideRefresh: true,
                    bind: {
                        store: '{errorList}'
                    }
                }
            ]

        }, {
            xtype: 'panel',
            flex: 1,
            region: 'south',
            layout: 'fit',
            items: [
                {
                    xtype: 'grid',
                    region: 'center',
                    plugins: [{
                        ptype: 'rowediting',
                        triggerEvent: 'celldblclick',
                        // removeUnmodified: true,
                        id: 'rowEdit',
                        errorSummary: false,
                        listeners: {
                            beforeedit: 'onBeforeErrorCodeEdit',
                            edit: 'editRow',
                            canceledit: 'onCancelEdit'
                        }
                    }],
                    itemId: 'errorDetailGrid',
                    listeners: {
                        /*
                         upon initial load of the page, the first time the user adds a new record and
                         rejects changes to that record, the record is instead edited. The
                         following ensures that record changes are rejected instead of edited.
                         */
                        beforecelldblclick: 'onNormalEdit'

                    },
                    columns: {
                        defaults: {
                            flex: 1
                        },
                        items: [
                            {
                                text: 'Error Code',
                                dataIndex: 'ErrorCode',
                                editor: {
                                    allowBlank: false
                                }
                            },
                            {
                                text: 'Description',
                                dataIndex: 'ErrorDescription',
                                editor: {
                                    allowBlank: false
                                }
                            },
                            {
                                text: 'List Id',
                                dataIndex: 'ErrorListId',
                                hidden: true
                            },
                            {
                                text: 'Type',
                                dataIndex: 'ErrorType',
                                editor: {}
                            },
                            {
                                text: 'Field Qualifier',
                                dataIndex: 'FieldQualifier',
                                editor: {}
                            },
                            {
                                xtype: 'widgetcolumn',
                                align: 'center',
                                width: 85,
                                flex: 0,
                                hideable: false,
                                resizable: false,
                                menuDisabled: true,
                                widget: {
                                    xtype: 'button',
                                    text: 'Reject',
                                    width: 75,
                                    iconCls: 'x-action-col-icon x-fa fa-undo',
                                    bind: {
                                        tooltip: 'Reject '
                                    },
                                    handler: 'onBtnReject'
                                },
                                onWidgetAttach: function(col, widget, rec) {
                                    widget.setVisible(rec.get('isUpdated'));
                                    col.mon(col.up('gridpanel').getView(), {
                                        itemupdate: function() {
                                            widget.setVisible(rec.get('isUpdated'));
                                        }
                                    });
                                }
                            }
                        ]
                    },
                    bind: {
                        store: '{errorDetail}'
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
                                    itemId: 'btnAddErrorDetail',
                                    iconCls: 'x-fa fa-plus-circle',
                                    disabled: true,
                                    listeners: {
                                        click: 'onAddError'
                                    }
                                }, {
                                    xtype: 'button',
                                    text: 'Remove',
                                    itemId: 'btnRemoveErrorDetail',
                                    iconCls: 'x-fa fa-minus-circle',
                                    disabled: true,
                                    listeners: {
                                        click: 'removeRecord'
                                    },
                                    bind: {
                                        disabled: '{!admin-lettertemplate.selection}'
                                    }
                                },
                                '->',
                                {
                                    xtype: 'button',
                                    text: 'Save',
                                    iconCls: 'fa fa-save',
                                    bind:{
                                        disabled: '{!lettertemplate.needsSync}'
                                    },
                                    listeners: {
                                        click: 'saveAll'
                                    }
                                }
                            ]
                        }, {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            displayInfo: 'true',
                            hideRefresh: true,
                            bind: {
                                store: '{errorDetail}'
                            }
                        }
                    ]

                }
            ]
        }]


});

