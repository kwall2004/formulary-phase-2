/**
 * Created by agupta on 9/8/2016.
 */
Ext.define('Atlas.common.view.ClaimHist', {
    extend : 'Ext.panel.Panel',
    xtype : 'claimhist',
    layout : {
        type : 'vbox',
        align : 'stretch'
    },
    width : 1245,
    height : 640,
    items :[
        {
            xtype : 'panel',
            flex : 3.8,
            collapsible : true,
            collapseToolText : 'Search',
            items : [
                {
                    xtype : 'fieldset',
                    title : 'Selection',
                    items :[
                        {
                            xtype : 'container',
                            layout : 'hbox',
                            items : [
                                {
                                    xtype : 'datefield',
                                    fieldLabel : 'Service Date From',
                                    labelWidth : 120
                                },
                                {
                                    xtype : 'textfield',
                                    fieldLabel : 'Member',
                                    labelWidth : 120
                                },
                                {
                                    xtype : 'combobox',
                                    fieldLabel : 'Pharmacy',
                                    labelWidth : 120
                                }
                            ]
                        },
                        {
                            xtype : 'container',
                            layout : 'hbox',
                            items : [
                                {
                                    xtype : 'datefield',
                                    fieldLabel : 'Service Date To',
                                    labelWidth : 120
                                },
                                {
                                    xtype : 'textfield',
                                    fieldLabel : 'Drug',
                                    labelWidth : 120
                                },
                                {
                                    xtype : 'combobox',
                                    fieldLabel : 'Prescriber',
                                    labelWidth : 120
                                }
                            ]
                        },
                        {
                            xtype : 'container',
                            layout : 'hbox',
                            items : [
                                {
                                    xtype : 'combobox',
                                    fieldLabel : 'Claim Status',
                                    labelWidth : 120
                                },
                                {
                                    xtype : 'combobox',
                                    fieldLabel : 'GCN',
                                    labelWidth : 120
                                },
                                {
                                    xtype : 'textfield',
                                    fieldLabel : 'Rx Number',
                                    labelWidth : 120
                                }
                            ]
                        },
                        {
                            xtype : 'container',
                            layout : 'hbox',
                            items : [
                                {
                                    xtype : 'textfield',
                                    fieldLabel : 'Rx Number',
                                    labelWidth : 120
                                },
                                {
                                    xtype : 'button',
                                    text : 'Search',
                                    iconCls : 'fa fa-search'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype : 'grid',
            flex : 6.2,
            tbar : [
                {
                    xtype : 'button',
                    text : 'Export to Excel',
                    iconCls : 'fa fa-file-excel-o'
                },
                {
                    xtype : 'button',
                    text : 'Export to PDF',
                    iconCls : 'fa fa-file-pdf-o'
                }
            ],
            columns : {
                items : [
                    {text : 'Claim#', dataIndex : '', width : 100},
                    {text : 'Medication', dataIndex : '', width : 150},
                    {text : 'NDC', dataIndex : '', width : 150},
                    {text : 'GCN', dataIndex : '', width : 120},
                    {text : 'GPI', dataIndex : '', width : 120},
                    {text : 'ETC', dataIndex : '', width : 120},
                    {text : 'Source', dataIndex : '', width : 120},
                    {text: 'Service Date', dataIndex: '',xtype: 'datecolumn',   format:'Y-m-d', filter: { type: 'date'} , width : 220},
                    {text: 'Transaction Date', dataIndex: '',xtype: 'datecolumn',   format:'Y-m-d', filter: { type: 'date'} , width : 220},
                    {text : 'Status', dataIndex : '', width : 120},
                    {text : 'Auto Generate CD', dataIndex : '', width : 120},
                    {text : 'Create override', dataIndex : '', width : 120},
                    {text : 'Process Test Claim', dataIndex : '', width : 120},
                    {text : 'Qty', dataIndex : '', width : 120},
                    {text : 'Days Supply', dataIndex : '', width : 120},
                    {text : 'Pharmacy Name', dataIndex : '', width : 120},
                    {text : 'Member ID', dataIndex : '', width : 120},
                    {text : 'First Name', dataIndex : '', width : 120},
                    {text : 'Last Name', dataIndex : '', width : 120},
                    {text : 'Group', dataIndex : '', width : 120},
                    {text : 'Carrier', dataIndex : '', width : 120},
                    {text : 'Account', dataIndex : '', width : 120},
                    {text : 'LOB', dataIndex : '', width : 120},
                    {text : 'Prescriber NPI', dataIndex : '', width : 120},
                    {text : 'Prescriber Name', dataIndex : '', width : 120},
                    {text : 'IngCost Paid', dataIndex : '', width : 120},
                    {text : 'DispFee Paid', dataIndex : '', width : 120},
                    {text : 'TotalAmt Paid', dataIndex : '', width : 120},
                    {text : 'Admin Fee', dataIndex : '', width : 120},
                    {text : 'AWP', dataIndex : '', width : 120},
                    {text : 'GER Amount Owed', dataIndex : '', width : 120},
                    {text : 'Rebate', dataIndex : '', width : 120},
                    {text : 'Facility ID', dataIndex : '', width : 120}
                ]
            },
            dockedItems : [
                {
                    xtype:'pagingtoolbar',
                    dock : 'bottom',
                    displayInfo : true
                }
            ]

        }
    ]
});
