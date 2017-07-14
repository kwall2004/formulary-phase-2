Ext.define('Atlas.admin.view.Dashboard', {
    extend: 'Ext.panel.Panel',
    xtype: 'admin-dashboard',
    title: 'Dashboard',
    controller: 'admin-dashboard',
    viewModel: {
        stores: {
            dashboardItems: {
                model: 'Atlas.admin.model.DashboardModel',
                autoLoad: true,
                remoteSort: true,
                remoteFilter: true
                //pageSize: 30
            }
        }
    },


    items:[{
        xtype: 'grid',
        reference: 'admindashboard',
        columns: {
            defaults: {
                flex: 1
            },
            items: [
                {
                    text: 'DashBoard Id',
                    dataIndex: 'dashboardId',
                    hidden:true
                },
                {
                    text: 'Dashboard Name',
                    dataIndex: 'dashboardName',
                    dirtyText: 'Name has been edited',
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        allowBlank: false
                    }
                },
                {
                    text: 'Program Name',
                    dataIndex: 'dashboardProgramName',
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        allowBlank: false
                    }
                },
                {
                    text: 'Description',
                    dataIndex: 'dashboardDesc',
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        allowBlank: false
                    }
                },
                {
                    text: 'Icon',
                    dataIndex: 'dashboardIcon',
                    editor: {
                        // defaults to textfield if no xtype is supplied
                        allowBlank: false
                    }
                },
                {
                    text: 'Sort Order',
                    dataIndex: 'dashboardSortOrder',
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false
                    }
                },
                {
                    text: 'Height',
                    dataIndex: 'dashboardHeight',
                    editor: {
                        xtype: 'numberfield'
                    }
                },
                {
                    text: 'IsDefault',
                    dataIndex: 'isDefault',
                    listeners: {
                        beforecheckchange: function () {
                            return false;
                        }
                    },
                    editor: {
                        xtype: 'checkbox',
                        inputValue: true,
                        uncheckedValue: false,
                        cls: 'x-grid-checkheader-editor'

                    },
                    renderer: function (value) {
                        //debugger;
                        if (value)
                            return 'Yes';
                        else
                            return 'No';
                    }
                    
                },
                {
                    xtype: 'widgetcolumn',
                    align: 'center',
                    hideable : false,
                    widget: {
                        xtype: 'button',
                        width: 75,
                        text: 'Reject',
                        iconCls: 'x-action-col-icon x-fa fa-undo',
                        bind: {

                            tooltip: 'Reject '
                        },
                        handler: 'onUndoChangeClick'

                    },
                    onWidgetAttach: function (col, widget, rec) {

                        widget.setVisible(rec.get('isNeedUpdate'));
                        col.mon(col.up('gridpanel').getView(), {
                            itemupdate: function () {
                                widget.setVisible(rec.get('isNeedUpdate'));
                            }
                        });
                    }
                }

            ]
        },
        bind: {
            store: '{dashboardItems}'
        },
        plugins: [{
            ptype: 'rowediting',
            id: 'rowEdit',
            errorSummary: false,
            autoCancel: false,
            clicksToEdit: 2,
            listeners: {
                cancelEdit: 'cancelEditButton',
                edit: 'completeEdit',
                beforeEdit: 'beforeEdit'
            }
        }]
    }],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Add',
                    iconCls: 'fa  fa-plus-circle',
                    listeners: {
                        click: 'addRecord'
                    }
                }, {
                    xtype: 'button',
                    text: 'Remove',
                    iconCls: 'fa  fa-minus-circle',
                    listeners: {
                        click: 'removeRecord'
                    },
                    bind:{
                        disabled: '{!admindashboard.selection}'
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Save Dashboard Changes',
                    iconCls: 'x-fa fa-save',
                    bind:{
                        disabled: '{!dashboardItems.needsSync}'
                    },
                    listeners: {
                        click: 'saveGrid'
                    }
                }
            ]
        }, {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            hideRefresh:true,
            displayInfo: 'true',
            bind: {
                store: '{dashboardItems}'
            }
        }
    ]


});