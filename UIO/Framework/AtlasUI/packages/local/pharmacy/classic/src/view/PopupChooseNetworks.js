/**
 * Created by n6684 on 11/15/2016.
 */
Ext.define('Atlas.authohrization.view.PopupChooseNetworks', {
    extend: 'Ext.window.Window',
    xtype: 'contractassignment-popupchoosenetworks',
    //itemId : 'custompricewindow',
    title: 'Custom Price Info',
    viewModel: 'contractassignment_popupchoosenetworksviewmodel',
    controller: 'contractassignment_popupchoosenetworkscontroller',
    width: 400,
    height: 550,
    modal: true,
    title: 'Choose Network',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'grid',
            itemId: 'gpassignedNetworkIds',
            bind: '{assignedNetworkIds}',
            flex: 1,
            columns: {
                items: [
                    {
                        text: 'Assigned', dataIndex: 'NetworkName', flex: 1,
                        editor: {
                            allowBlank: false,
                            emptyText: 'Network Description'
                        }
                    }
                ]
            },
            listeners: {
                itemclick: 'gpassignedNetworkIds_itemclick'
            }
        },
        {
            dockedItems: {
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                dock: 'top',
                xtype: 'toolbar',
                items: [
                    {
                        xtype: 'label',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        itemId: 'btndown',
                        text: '',
                        disabled: true,
                        iconCls: 'fa fa-arrow-down',
                        handler: 'btndown',
                        tooltip: ['Remove', 'Unassign Selected Networks']
                    }, {
                        xtype: 'button',
                        itemId: 'btnup',
                        text: '',
                        disabled: true,
                        iconCls: 'fa fa-arrow-up',
                        handler: 'btnup',
                        tooltip: ['Add', 'Assign Selected Networks']
                    },
                    {
                        xtype: 'label',
                        flex: 1
                    }
                ]
            }
        },
        {
            xtype: 'grid',
            itemId: 'gpunAssignedNetworks',
            bind: '{unAssignedNetworks}',
            flex: 1,
            columns: {
                items: [
                    {
                        text: 'Unassigned', dataIndex: 'NetworkName', flex: 1,
                        editor: {
                            allowBlank: false,
                            emptyText: 'Network Description'

                        }
                    }
                ]
            },
            listeners: {
                itemclick: 'gpunAssignedNetworks_itemclick'
            }
        },
        {
            dockedItems: {
                dock: 'bottom',
                xtype: 'toolbar',
                items: ['->',
                    {
                        xtype: 'button',
                        text: 'Update',
                        iconCls: 'fa fa-save',
                        handler: 'btnUpdateClick'
                    }, {
                        xtype: 'button',
                        text: 'Cancel',
                        iconCls: 'fa fa-times',
                        handler: 'btncancel'
                    }
                ]
            }
        }

    ]

});