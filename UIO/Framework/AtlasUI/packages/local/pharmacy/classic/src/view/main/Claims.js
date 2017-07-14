/*Ext.define('Atlas.pharmacy.view.main.Claims', {
    extend: 'Ext.Panel',

    controller: 'pharmacy-main-claims',
    viewModel: {
        stores: {
            claimstatusstore: {
                model: 'Atlas.common.model.shared.ClaimStatus',
                autoLoad: true,
                listeners: {
                    load: function (store) {
                        //Add All value that is not present in payload options
                        store.insert(0, {name: 'All', value: ''});
                    }
                }
            },
            claims: {
                model: 'Atlas.pharmacy.model.Claims'
            }
        }
    },

    layout: 'border',

    items: [
        {
            xtype: 'form',
            region: 'north',
            title: 'Search',
            disabled: true,
            collapsible: true,
            bbar: {
                items: [
                    {
                        text: 'Search',
                        iconCls: 'x-fa fa-search',
                        handler: 'onSearch'
                    }
                ]
            },
            defaults: {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                margin: '0 20 0 0',
                defaults: {
                    labelWidth: 130
                }
            },
            items: [
                {
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Service Date From',
                            name: 'pcStart'
                        },
                        {
                            xtype: 'membertypeahead',
                            fieldLabel: 'Member',
                            matchFieldWidth: false,
                            emptyText: '[e.g. John]',
                            name: 'member'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Pharmacy NCPDP',
                            readOnly: true,
                            name: 'pcPharmID'
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Service Date To',
                            name: 'pcEnd'
                        },
                        {
                            xtype: 'drugtypeahead',
                            fieldLabel: 'Drug',
                            matchFieldWidth: false,
                            emptyText: '[e.g. Nexium]',
                            name: 'ndc'
                        },
                        {
                            xtype: 'prescribertypeahead',
                            fieldLabel: 'Prescriber',
                            matchFieldWidth: false,
                            emptyText: '[e.g. Dr. Smith]',
                            name: 'pcPrescrID'
                        }
                    ]
                },
                {
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Claim status',
                            displayField: 'name',
                            valueField: 'value',
                            value: '',
                            bind: {
                                store: '{claimstatusstore}'
                            },
                            name: 'claimStatus'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'GCN',
                            emptyText: '[e.g. 6818]',
                            name: 'pcGcnSeq'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Rx number',
                            name: 'pcRxNum'
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    labelWidth: 130,
                    fieldLabel: 'Auth ID',
                    emptyText: '[Auth ID]',
                    name: 'authID'
                }
            ]
        },
        {
            xtype: 'grid',
            region: 'center',
            bind: '{claims}',
            plugins: [{
                ptype: 'gridexporter'
            }],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Export to Excel',
                            iconCls: 'x-fa fa-file-excel-o',
                            handler: 'onExcelExport'
                        },
                        {
                            text: 'Export to PDF',
                            disabled: true,
                            iconCls: 'x-fa fa-file-pdf-o',
                            handler: 'onPDFExport'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    bind: '{claims}',
                    keepParams: true, // Custom property to keep parameters between pages
                    displayInfo: true,
                    hideRefresh: true
                }
            ],
            columns: {
                items: [
                    {
                        text: '#',
                        dataIndex: 'rowNum',
                        width: 20,
                        hidden: true
                    },
                    {
                        text: 'Claim #',
                        dataIndex: 'claimID',
                        width: 140
                    },
                    {
                        text: 'Medication',
                        dataIndex: 'medication',
                        width: 180
                    },
                    {
                        text: 'NDC',
                        dataIndex: 'ndc',
                        width: 120
                    },
                    {
                        text: 'GCN',
                        dataIndex: 'gcnseq',
                        width: 80
                    },
                    {
                        text: 'GPI',
                        dataIndex: 'GPICode',
                        width: 120
                    },
                    {
                        text: 'ETC',
                        dataIndex: 'ETCName',
                        width: 360
                    },
                    {
                        text: 'Source',
                        dataIndex: 'source',
                        width: 80,
                        hidden: true
                    },
                    {
                        xtype: 'datecolumn',
                        text: 'Service Date',
                        dataIndex: 'svcdate',
                        width: 110
                    },
                    {
                        xtype: 'datecolumn',
                        text: 'Transaction Date',
                        dataIndex: 'transdate',
                        width: 130
                    },
                    {
                        text: 'Status',
                        dataIndex: 'stat',
                        width: 60
                    },
                    {
                        text: 'Auto Generate CD', // TODO : Understand what this is doing
                        dataIndex: '', //empty
                        width: 140
                    },
                    {
                        text: 'Create override', // TODO
                        dataIndex: '',
                        width: 130
                    },
                    {
                        text: 'Process Test Claim', // TODO
                        dataIndex: '',
                        width: 140
                    },
                    {
                        text: 'Qty',
                        dataIndex: 'qty',
                        width: 60
                    },
                    {
                        text: 'Days Supply',
                        dataIndex: 'supply',
                        width: 100
                    },
                    {
                        text: 'Rx ID',
                        dataIndex: 'rxid',
                        width: 70
                    },
                    {
                        text: 'Pharmacy Name',
                        dataIndex: 'rxname',
                        width: 160
                    },
                    {
                        text: 'Member ID',
                        dataIndex: 'memberID',
                        width: 130
                    },
                    {
                        text: 'First Name',
                        dataIndex: 'memFirstName',
                        width: 160
                    },
                    {
                        text: 'Last Name',
                        dataIndex: 'memLastName',
                        width: 160
                    },
                    {
                        text: 'Group',
                        dataIndex: 'planGroupName',
                        width: 130
                    },
                    {
                        text: 'Carrier',
                        dataIndex: 'Carrier',
                        width: 145
                    },
                    {
                        text: 'Account',
                        dataIndex: 'Account',
                        width: 120
                    },
                    {
                        text: 'LOB',
                        dataIndex: 'LOB',
                        width: 120
                    },
                    {
                        text: 'Prescriber NPI',
                        dataIndex: 'npi',
                        width: 110
                    },
                    {
                        text: 'Prescriber Name',
                        dataIndex: 'drname',
                        width: 130
                    },
                    {
                        text: 'IngCost Paid',
                        align: 'end',
                        renderer: Ext.util.Format.usMoney,
                        dataIndex: 'ingCostPaid', // money
                        width: 110
                    },
                    {
                        text: 'DispFee Paid',
                        align: 'end',
                        renderer: Ext.util.Format.usMoney,
                        dataIndex: 'dispFeePaid', // money
                        width: 110
                    },
                    {
                        text: 'TotalAmt Paid',
                        align: 'end',
                        renderer: Ext.util.Format.usMoney,
                        dataIndex: 'totalAmtPaid', // money
                        width: 110
                    },
                    {
                        text: 'Admin Fee',
                        align: 'end',
                        renderer: Ext.util.Format.usMoney,
                        dataIndex: 'AdminFee', //money
                        width: 110
                    },
                    {
                        text: 'AWP',
                        align: 'end',
                        renderer: function (v) {
                            return Ext.util.Format.currency(v, '$', 5);
                        },
                        dataIndex: 'AWPPrice', // money, numbercolumn
                        width: 110
                    },
                    {
                        text: 'GER Amount Owed',
                        align: 'end',
                        renderer: Ext.util.Format.usMoney,
                        dataIndex: 'GERIngCost', // money
                        width: 140
                    },
                    {
                        text: 'Rebate',
                        align: 'end',
                        renderer: Ext.util.Format.usMoney,
                        dataIndex: 'RebateAmount', // money
                        width: 110
                    },
                    {
                        text: 'Facility ID',
                        dataIndex: 'FacilityId',
                        width: 110
                    }
                ]
            },
            listeners : {
                itemDblClick : 'gridItem_DblClick'
            }
        }
    ]
});*/



Ext.define('Atlas.pharmacy.view.main.Claims', {
    extend: 'Atlas.common.view.sharedviews.Claims',
    xtype: 'pharmacy-claims',
    controller:'pharmacy-main-claims',
    title: 'Claims'
});