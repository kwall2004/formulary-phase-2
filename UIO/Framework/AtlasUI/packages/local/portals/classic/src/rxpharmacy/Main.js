/**
 * Created by c4539 on 11/7/2016.
 */
Ext.define('Atlas.portals.view.rxpharmacy.Main', {
    extend: 'Ext.Container',
    xtype: 'portalspharmacyrxmain',
    controller: 'portalspharmacyrxmain',
    title: 'MAC View',
    scrollable: 'y',
    layout: 'border',
    viewModel: {
        stores: {
            macPricePharmacies: {
                model: 'Atlas.portals.rxpharmacy.model.MaxPricePharmacyP'
            }
        },
        data: {
            drugSelected: true,
            claimSelected: false,
            listSelected: false
        }
    },
    items: [
        {
            xtype: 'panel',
            cls: 'card-panel',
            title: 'Selections',
            region: 'north',
            defaults: {
                margin: '8px'
            },
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        margin: '8px'
                    },
                    items: [
                        {
                            xtype: 'radiofield',
                            name: 'view',
                            inputValue: 'drugMacPrice',
                            boxLabel: 'Drug MAC Price',
                            bind: {
                                value: '{drugSelected}'
                            },
                            handler: 'resetGrid'
                        },
                        {
                            xtype: 'radiofield',
                            name: 'view',
                            inputValue: 'claimMacPrice',
                            boxLabel: 'Claim MAC Price',
                            bind: {
                                value: '{claimSelected}'
                            },
                            handler: 'resetGrid'
                        },
                        {
                            xtype: 'radiofield',
                            name: 'view',
                            inputValue: 'macList',
                            boxLabel: 'MAC List',
                            bind: {
                                value: '{listSelected}'
                            },
                            handler: 'resetGrid'
                        }
                    ]
                },
                {
                    xtype: 'form',
                    width: 650,
                    reference: 'drugMacPriceForm',
                    bind: {
                        hidden: '{!drugSelected}'
                    },
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'container',
                            defaults: {
                                xtype: 'textfield',
                                labelWidth: 115,
                                allowBlank: false
                            },
                            items: [
                                { fieldLabel: 'Cardholder ID', name: 'cardholderId' },
                                { fieldLabel: 'PCN', name: 'pcn',
                                    style: {
                                        marginBottom: '2px'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            defaults: {
                                xtype: 'textfield',
                                labelWidth: 115,
                                allowBlank: false
                            },
                            items: [
                                { fieldLabel: 'National Drug Code', name: 'drugCode' }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'form',
                    width: 650,
                    reference: 'claimMacPriceForm',
                    bind: {
                        hidden: '{!claimSelected}'
                    },
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'container',
                            defaults: {
                                xtype: 'textfield',
                                labelWidth: 115,
                                allowBlank: false
                            },
                            items: [
                                { fieldLabel: 'Cardholder ID', name: 'cardholderId' },
                                { fieldLabel: 'PCN', name: 'pcn',
                                    style: {
                                        marginBottom: '2px'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            defaults: {
                                xtype: 'textfield',
                                labelWidth: 115,
                                allowBlank: false
                            },
                            items: [
                                { fieldLabel: 'RX #', name: 'rxNumber' },
                                { xtype: 'datefield', fieldLabel: 'Service Date', name: 'serviceDate' }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'form',
                    width: 650,
                    reference: 'macListForm',
                    bind: {
                        hidden: '{!listSelected}'
                    },
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'container',
                            defaults: {
                                xtype: 'textfield',
                                labelWidth: 115,
                                allowBlank: false
                            },
                            items: [
                                { fieldLabel: 'Cardholder ID', name: 'cardholderId' },
                                { fieldLabel: 'PCN', name: 'pcn',
                                    style: {
                                        marginBottom: '2px'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'button'
                    },
                    items: [
                        {
                            text: 'Search',
                            iconCls: 'x-fa fa-search',
                            handler: 'search'
                        },
                        {
                            text: 'Reset',
                            iconCls: 'x-fa fa-refresh',
                            handler: 'reset'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'gridpanel',
            cls: 'card-panel',
            region: 'center',
            title: 'MAC View Detail',
            reference: 'macGrid',
            bind: {
                store: '{macPricePharmacies}'
            },
            columns: [
                {
                    text: 'National Drug Code',
                    dataIndex: 'NDC',
                    flex: 1,
                    bind: {
                        hidden: '{listSelected}'
                    }
                },
                {
                    text: 'Label Name',
                    dataIndex: 'Labelname',
                    flex: 2,
                    bind: {
                        hidden: '{listSelected}'
                    }
                },
                {
                    text: 'MAC Price',
                    dataIndex: 'MacPrice',
                    flex: 1,
                    bind: {
                        hidden: '{listSelected}'
                    }
                },
                {
                    text: 'Generic Name',
                    dataIndex: 'GNN',
                    flex: 1,
                    bind: {
                        hidden: '{!listSelected}'
                    }
                }
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                emptyMsg: 'No data to display.'
            }
        }
    ]
});