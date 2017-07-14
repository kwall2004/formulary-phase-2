Ext.define('Atlas.macprice.view.MacPharmacyPricingInq', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.MacPharmacyPricingInq',
    itemId: 'MacPharmacyPricingInq',
    title: 'MAC Pharmacy Price Inquiry',
    controller: 'MacPharmacyPricingInqController',
    viewModel: 'MacPharmacyPricingInqModel',

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'combo',
                    itemId: 'AlertStatus',
                    fieldLabel: 'Alert Status',
                    labelWidth: 50,
                    bind: {
                        store: '{AlertStatus}'
                    },
                    queryMode: 'local',
                    name: 'AlertStatus',
                    value: '0',
                    displayField: 'ListDescription',
                    valueField: 'ListItem',
                    selectOnFocus: false,
                    editable: false,
                    listeners: {
                        select: 'onSearch'
                    }
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Inquiry Date From',
                    labelWidth: 50,
                    itemId:'InquiryDateFrom',
                    format: 'm/d/Y',
                    forceSelection: true,
                    maxValue: new Date(),
                    value: (Ext.Date.add(new Date(), Ext.Date.MONTH, -1))

                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Inquiry Date To',
                    labelWidth: 50,
                    itemId:'InquiryDateTo',
                    format: 'm/d/Y',
                    forceSelection: true,
                    maxValue: new Date(),
                    value: new Date()
                }, '-',
                {
                    xtype: 'button',
                    itemId: 'btnSearch',
                    iconCls: 'x-fa fa-search',
                    text: 'Search',
                    handler: 'onSearch'
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            cls: 'card-panel',
            items: [
                {
                    xtype: 'label',
                    itemId: 'lblInqInfo',
                    text: 'Pharmacy Price Inquiry',
                    iconCls: 'x-fa fa-bell-o',
                    style: {
                        'font-weight': 'bold'
                    }
                },
                '->',
                {
                    xtype: 'button',
                    itemId: 'btnInqRefresh',
                    style: {
                        align: 'right'
                    },
                    iconCls: 'x-fa fa-refresh',
                    tooltip: 'Refresh',
                    handler: 'onRefresh'
                }
                /*{
                    xtype: 'form',
                    flex: 1,
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'label',
                            itemId: 'lblInqInfo',
                            text: 'Pharmacy Price Inquiry',
                            iconCls: 'x-fa fa-bell-o',
                            style: {
                                'font-weight': 'bold'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btnInqRefresh',
                            style: {
                                align: 'right'
                            },
                            iconCls: 'x-fa fa-refresh',
                            tooltip: 'Refresh',
                            handler: 'onRefresh'
                        }
                    ]
                }*/
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button',
                    itemId: 'btnAcknowledge',
                    text: 'Acknowledge',
                    iconCls: 'x-fa fa-check',
                    handler: 'onAction'
                },
                {
                    xtype: 'button',
                    itemId: 'btnSubmitApproval',
                    text: 'Submit for Approval',
                    iconCls: 'x-fa fa-tasks',
                    handler: 'onAction'
                },
                '->',
                {
                    xtype: 'button',
                    itemId: 'btnExport',
                    text: 'Export To Excel',
                    iconCls: 'x-fa fa-file-excel-o',
                    handler: 'onExport'
                },
                {
                    xtype: 'button',
                    itemId: 'btnApprove',
                    text: 'Approve',
                    iconCls: 'x-fa fa-check-circle',
                    handler: 'onAction'
                },
                {
                    xtype: 'button',
                    itemId: 'btnReject',
                    text: 'Reject',
                    iconCls: 'x-fa fa-times',
                    handler: 'onAction'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            itemId: 'gridPagingToolbar',
            displayInfo: 'true',
            pageSize: 25,
            doRefresh: function() {
                this.store.loadPage(1);
            },
            listeners: {
                beforechange: 'getSelectedPageData',
                afterrender: function() {
                    this.getComponent('refresh').hide();
                }
            }
        }
    ],

    bind: {
     store: '{MacPharmacyPricingInq}'
     },

    listeners : {
        rowdblclick : 'row_dblClick'
    },
    selModel: {
        selType: 'checkboxmodel',
        checkOnly: true
    },
    plugins: 'gridfilters',

    viewConfig: {
        getRowClass: function(record, rowIndex, rowParams, store){
            var alertType = this.up().down('#AlertStatus').getValue(),
                currDate = Atlas.common.utility.Utilities.getLocalDateTime() ,
                alertDate = record.data.AlertDate;

            if ((alertType == '0' || alertType == '1') && alertDate < currDate) {
                return 'm-red-color';
            }
            else {
                return '';
            }
        }
    },
    columns: {
        items: [
            { text: 'Inquiry Date', dataIndex: 'InquiryDate', xtype: 'datecolumn', format: 'm/d/Y'},
            { text: 'Respond By', dataIndex: 'ResponseDate', xtype: 'datecolumn', format: 'm/d/Y'},
            { text: 'NDC', dataIndex: 'NDC', filter: {
                type: 'string'
            }},
            { text: 'MACLists', dataIndex: 'MACLists', hidden: true},
            { text: 'Product Name', dataIndex: 'LN', filter: {
                type: 'string'
            }},
            { text: 'NCPDPID', dataIndex: 'NCPDPID', filter: {
                type: 'string'
            }},
            { text: 'Pharmacy Name', dataIndex: 'NAME'},
            { text: 'State', dataIndex: 'PharState', filter: {
                type: 'string'
            }},
            { text: 'Paid Amt', dataIndex: 'paidAmt', xtype: 'numbercolumn', format: '$0,0.0000'},
            { text: 'Pharmacy Cost', dataIndex: 'pharmacyCost', xtype: 'numbercolumn', format: '$0,0.0000'},
            { text: 'Current Mac', dataIndex: 'CurrentMac', xtype: 'numbercolumn', format: '$0,0.0000'},
            { text: 'Sugg. MAC', dataIndex: 'suggestedMAC', xtype: 'numbercolumn', format: '$0,0.0000'},
            { text: 'Change', xtype: 'actioncolumn', align: 'center', hideable: false, handler: 'onClickChange',
                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                    var currentMac   = r.data.CurrentMac;
                    var suggestedMac = r.data.suggestedMAC;

                    if (currentMac < suggestedMac) {
                        return "x-fa fa-plus";
                    }
                    else if (currentMac > suggestedMac) {
                        return "x-fa fa-minus";
                    }
                    else {
                        return "x-fa fa-check";
                    }

                }
            },
            { text: 'Prev. AWP', dataIndex: 'prevAWP', hidden: true, xtype: 'numbercolumn', format: '$0,0.0000'},
            { text: 'AWP', dataIndex: 'currAWP', xtype: 'numbercolumn', format: '$0,0.0000'},
            { text: 'Prev. WAC', dataIndex: 'prevWAC', hidden: true, xtype: 'numbercolumn', format: '$0,0.00'},
            { text: 'WAC', dataIndex: 'currWAC', xtype: 'numbercolumn', format: '$0,0.0000'},
            { text: 'MI MAC', dataIndex: 'MIMAC', xtype: 'numbercolumn', format: '$0,0.0000'},
            { text: 'State MAC', xtype: 'actioncolumn', iconCls: 'x-fa fa-usd', hideable: false, align: 'center', handler: 'onClickStateMAC'},
            { text: '85% off AWP', dataIndex: 'PctOfAWP85', xtype: 'numbercolumn', format: '$0,0.0000'},
            { text: 'Rx Count - Last Yr.', dataIndex: 'totRxLastYear', xtype: 'numbercolumn', format: '0,000'},
            { text: 'Qty Count - Last Yr.', dataIndex: 'totQtyLastYear', xtype: 'numbercolumn', format: '0,0.0000'},
            { text: 'Total Ing. Cost - Last Yr.', dataIndex: 'totIngLastYear', hidden: true, xtype: 'numbercolumn', format: '$0,0.00'},
            { text: 'Avg. Ing. Cost - Last Yr.', dataIndex: 'avgIngLastyear', hidden: true, xtype: 'numbercolumn', format: '$0,0.00'},
            { text: 'Mkt. Rx - Last Yr.', dataIndex: 'mktRxLastYear',
                renderer: function(record)
                {
                    return record + '%';
                }
            },
            { text: 'Mkt. Qty - Last Yr.', dataIndex: 'mktQtyLastYear',
                renderer: function(record)
                {
                    return record + '%';
                }
            },
            { text: 'Mkt. Ing - Last Yr.', dataIndex: 'mktIngLastYear',
                renderer: function(record)
                {
                    return record + '%';
                }
            },
            { text: 'Last Update Date', dataIndex: 'lastUpdateDate', hidden: true, xtype: 'datecolumn', format: 'm/d/Y'},
            { text: 'Confirmation Number', dataIndex: 'confirmationNum', filter: {
                type: 'string'
            }}
        ]
    }
});
