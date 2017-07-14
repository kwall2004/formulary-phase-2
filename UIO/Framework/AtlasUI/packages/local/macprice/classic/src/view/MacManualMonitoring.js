
Ext.define('Atlas.macprice.view.MacManualMonitoring', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.MacManualMonitoring',
    xtype: 'macprice-MacManualMonitoring',
    itemId: 'MacManualMonitoring',
    title: 'Alerts Manual Monitoring',

    tabConfig: {
        listeners: {
            activate: 'onTabChange'
        }
    },

    items: [
        {
            xtype: 'container',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    collapsible: true,
                    title: 'Search',
                    cls: 'card-panel',
                    flex: 3,
                    layout: {
                        type: 'fit',
                        align: 'stretch'
                    },
                    dockedItems: {
                        dock: 'top',
                        xtype: 'toolbar',
                        items: [
                            {
                                xtype: 'gpitypeahead',
                                fieldLabel: 'GPI',
                                labelWidth: 30,
                                width: 300,
                                itemId: 'cbxGPI',
                                emptyText: ' [e.g. Cycloserine]',
                                displayField: 'GPICode',
                                valueField: 'GPICode',
                                listeners: {
                                    select: 'onMonitorGPISearch'
                                }
                            },
                            {
                                xtype: 'drugtypeahead',
                                fieldLabel: 'NDC/LN',
                                labelWidth: 50,
                                width: 300,
                                itemId: 'cbxDrug',
                                emptyText: ' [e.g. Nexium]',
                                displayField: 'NDC',
                                valueField: 'NDC',
                                listeners: {
                                    select: 'onMonitorNDCSearch'
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnSearch',
                                text: 'Search',
                                iconCls: 'x-fa fa-search',
                                handler: 'onMonitorSearch'
                            }
                        ]
                    },
                    items: [
                        {
                            xtype: 'grid',
                            itemId: 'manualMonitorGrid',
                            bind: {
                                store: '{DrugMonitorAlert}'
                            },
                            selModel: {
                                selType: 'checkboxmodel',
                                checkOnly: true
                            },
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        '->',
                                        {
                                            xtype: 'button',
                                            itemId: 'btnAddDrug',
                                            text: 'Add Selected Drugs',
                                            iconCls: 'x-fa fa-check',
                                            handler: 'onAddDrug'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'pagingtoolbar',
                                    bind: '{DrugMonitorAlert}',
                                    displayInfo: true,
                                    dock: 'bottom'
                                }
                            ],
                            columns: {
                                defaults: {
                                    flex: 1
                                },
                                items: [
                                    {text: 'GPI Code', dataIndex: 'GPICode'},
                                    {text: 'GPI Name', dataIndex: 'GPIName'},
                                    {text: 'NDC', dataIndex: 'NDC'},
                                    {text: 'Product Name', dataIndex: 'LN'},
                                    {xtype: 'numbercolumn', text: 'User MAC', dataIndex: 'userMac', format: '$0,0.0000'},
                                    {xtype: 'numbercolumn', text: 'System MAC', dataIndex: 'sysMac', format: '$0,0.0000'},
                                    {xtype: 'numbercolumn', text: 'Current AWP', dataIndex: 'currAWP', format: '$0,0.0000'},
                                    {xtype: 'numbercolumn', text: 'AWP Change', dataIndex: 'AWPChgPct', format: '0,0.00%'},
                                    {xtype: 'numbercolumn', text: 'Current WAC', dataIndex: 'currWAC', format: '$0,0.0000'},
                                    {xtype: 'numbercolumn', text: 'WAC Change', dataIndex: 'WACChgPct', format: '0,0.00%'},
                                    {
                                        xtype: 'numbercolumn',
                                        text: 'Rx Count - Last Three Months',
                                        dataIndex: 'totRxLast3Mths',
                                        format: '0,000'
                                    },
                                    {
                                        xtype: 'numbercolumn',
                                        text: 'Qty Count - Last Three Months',
                                        dataIndex: 'totQtyLast3Mths',
                                        format: '0,000.00'
                                    },
                                    {
                                        xtype: 'numbercolumn',
                                        text: 'Total Ing. Cost - Last Three Months',
                                        dataIndex: 'totIngLast3Mths'
                                    },
                                    {
                                        xtype: 'numbercolumn',
                                        text: 'Avg. Ing. Cost - Last Three Months',
                                        dataIndex: 'avgIngLast3Mths'
                                    },
                                    {xtype: 'datecolumn', text: 'Change Dt.', dataIndex: 'priceChangeDt', format: 'm/d/Y'},
                                    {
                                        xtype: 'datecolumn',
                                        text: 'Last Update Date',
                                        dataIndex: 'lastUpdateDate',
                                        format: 'm/d/Y'
                                    }
                                ]
                            }
                        }
                    ]
                },

                {
                    xtype: 'MacAlertShared',
                    flex: 7
                }
            ]
        }
    ]

});