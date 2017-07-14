Ext.define('Atlas.pharmacy.view.NetworkSetup', {
    extend: 'Ext.panel.Panel',
    controller: 'networksetupcontroller',
    viewModel: 'networksetupviewmodel',

    title: 'Network SetUp',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    defaults: {
        anchor: '100%'
    },
    items: [
        {
            xtype: 'grid',
            itemId: 'gpNetworkSetup',
            height: 900,
            tbar: [
                {
                    xtype: 'button',
                    text: 'Add',
                    iconCls: 'fa  fa-plus-circle',
                    handler: 'btnAddClick'
                },
                {
                    xtype: 'button',
                    text: 'Remove',
                    iconCls: 'fa  fa-minus-circle',
                    handler: 'btnRemoveClick'
                }

            ],
            flex: 10,
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {
                        text: 'Network ID', dataIndex: 'NetworkID',
                        editor: {
                            emptyText: 'Network ID',
                            allowBlank: false,
                            itemId: 'networkid',
                            xtype: 'numberfield',
                            width: 400,
                            hideLabel: true
                        }
                    },
                    {
                        text: 'Network Description', dataIndex: 'NetworkDescription',
                        editor: {
                            allowBlank: false,
                            emptyText: 'Network Description'
                        }
                    },
                    {
                        xtype: 'widgetcolumn',
                        align: 'center',
                        width: 100,
                        hideable: false,
                        flex: 0,
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
                                    handler: 'onUndoChangeClick'
                                }
                            ]
                        }
                    }
                ]
            },
            plugins: {
                ptype: 'rowediting',
                clicksToEdit: 2,
                autoCancel: false,
                id: 'rowEdit',
                listeners: {
                    'canceledit': function (rowEditing, context) {
                        if (context.record.phantom) {
                            context.store.remove(context.record);
                        }
                    },
                    'edit': 'gpNetworkSetup_afteredit'
                }
            },
            listeners: {
                beforeedit: 'gpNetworkSetup_beforeedit',
                edit: 'onEdit'
            },
            bind: '{allPharmacyNetworks}',
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    bind: '{allPharmacyNetworks}',
                    displayInfo: true,
                    dock: 'bottom',
                    pageSize: 10
                }

            ]
        }
    ],
    bbar: [

        '->',
        {
            xtype: 'button',
            text: 'Save',
            iconCls: 'fa fa-save',
            handler: 'btnSaveClick',
            itemId: 'btnSave',
            disabled: true
        }

    ]
});
