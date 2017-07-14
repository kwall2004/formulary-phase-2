/*
 * Last Developer: Srujith Cheruku
 * Date: 11-22-2016
 * Previous Developers: []
 * Origin: Provider - Authorization Inquiry- Provider Facility Lookup
 * Description: Gives users a place to search for providers or facility
 */
Ext.define('Atlas.portals.view.provider.ProviderFacilityLookup', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalsProviderFacilityLookup',
    controller: 'portalsProviderFacilityLookupController',
    viewModel: {
        stores: {
            providerMasterAuthStore: {
                model : 'Atlas.portals.provider.model.ProviderMasterAuth'
            },
            providerSelectNPIStore: {
                model : 'Atlas.portals.provider.model.ProviderMasterAuth'
            }
        }  
    },

    items:[{
        xtype:'tabpanel',
        activeTab:0,
        reference: 'searchTabs',
        items:[{
            xtype: 'gridpanel',
            title: 'Search by Name',
            layout: 'fit',
            height: 400,
            reference: 'providerGridRef',
            tbar: {
                xtype: 'toolbar',
                items: [{
                    xtype: 'textfield',
                    labelWidth: 120,
                    width: 500,
                    bind: {
                        fieldLabel: '{labelName}'
                    },
                    listeners: {
                        keyup: 'onSearchKeyPress'
                    },
                    enableKeyEvents: true,
                    reference: 'providerNameRef'
                }, '->', {
                    xtype: 'checkbox',
                    boxLabel: 'In Network',
                    reference: 'InNetworkProviderRef',
                    value: true
                }, {
                    xtype: 'button',
                    text: 'Search',
                    handler: 'onProviderSearchButtonClick'
                }, {
                    xtype: 'button',
                    text: 'Select',
                    handler: 'onProviderSelectButtonClick'
                }]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                emptyMsg: 'No data to display.'
            },
            viewConfig: {
                getRowClass: function(record)
                {
                    var inNetwork = record.get('inNetwork');

                    if (inNetwork === 'true') {
                        return 'green-row-background';
                    } else {
                        return 'red-row-background';
                    }
                }
            },
            columns:[{
                renderer: function(value) {
                    var retValue = '';

                    if (value === 'true') {
                        retValue = "";
                    } else {
                        retValue = "<span style='color:red;font-weight:bold'>OON</span>";
                    }

                    return retValue;
                },
                dataIndex: 'inNetwork',
                text: 'OON',
                tooltip: 'Out Of Network Providers'
            }, {
                dataIndex: 'firstName',
                text: 'First Name'
            }, {
                dataIndex: 'lastName',
                text: 'Last Name'
            }, {
                dataIndex: 'lobID',
                text: 'Lob ID'
            }, {
                dataIndex: 'Address1',
                text: 'Address1'
            }, {
                dataIndex: 'Address2',
                text: 'Address2'
            }, {
                dataIndex: 'City',
                text: 'City'
            }, {
                dataIndex: 'State',
                text: 'State'
            }, {
                dataIndex: 'Zip',
                text: 'Zip'
            }, {
                dataIndex: 'Gender',
                text: 'Gender'
            }, {
                dataIndex: 'specDescription',
                text: 'Spec. Desc.'
            }],
            bind: {
                store: '{providerMasterAuthStore}'
            },
            listeners: {
                rowdblclick: 'onRowDblClickProvider'
            }
        }, {
            title: 'Search by NPI',
            xtype: 'gridpanel',
            layout: 'fit',
            height: 400,
            reference: 'NPIGridRef',
            tbar: {
                xtype: 'toolbar',
                align: 'center',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'NPI',
                    reference: 'NpiRef',
                    labelWidth: 40,
                    width: 200,
                    listeners: {
                        keyup: 'onNPISearchKeyPress'
                    },
                    enableKeyEvents: true
                }, '->', {
                    xtype: 'checkbox',
                    boxLabel: 'In Network',
                    reference:'InNetworkNPIRef',
                    value: true
                }, {
                    xtype: 'button',
                    text: 'Search',
                    handler: 'onProviderNPISearchButtonClick'
                }, {
                    xtype: 'button',
                    text: 'Select',
                    handler: 'onProviderNPISelectButtonClick'
                }]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                emptyMsg: 'No data to display.'
            },
            viewConfig: {
                getRowClass: function(record)
                {
                    var inNetwork = record.get('inNetwork');

                    if (inNetwork === 'true') {
                        return 'green-row-background';
                    } else {
                        return 'red-row-background';
                    }
                }
            },
            bind: {
                store: '{providerSelectNPIStore}'
            },
            listeners: {
                rowdblclick: 'onRowDblClickNPI'
            },
            columns:[{
                renderer: function(value) {
                    var retValue = '';

                    if (value === 'true') {
                        retValue = "";
                    } else {
                        retValue = "<span style='color:red;font-weight:bold'>OON</span>";
                    }

                    return retValue;
                },
                dataIndex: 'inNetwork',
                text: 'OON',
                tooltip: 'Out Of Network Providers'
            }, {
                dataIndex: 'firstName',
                text: 'First Name'
            }, {
                dataIndex: 'lastName',
                text: 'Last Name'
            }, {
                dataIndex: 'lobID',
                text: 'Lob ID'
            }, {
                dataIndex: 'Address1',
                text: 'Address1'
            }, {
                dataIndex: 'Address2',
                text: 'Address2'
            }, {
                dataIndex: 'City',
                text: 'City'
            }, {
                dataIndex: 'State',
                text: 'State'
            }, {
                dataIndex: 'Zip',
                text: 'Zip'
            }, {
                dataIndex: 'Gender',
                text: 'Gender'
            }, {
                dataIndex: 'specDescription',
                text: 'Spec. Desc.'
            }]
        }]
    }]
});