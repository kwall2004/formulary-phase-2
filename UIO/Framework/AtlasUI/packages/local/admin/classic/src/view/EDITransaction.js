Ext.define('Atlas.admin.view.EDITransaction', {
    extend: 'Ext.panel.Panel',
    xtype: 'EDITransaction',
    title: 'EDI Transaction',
    region: 'center',
    controller: 'EDITransactionController',
    viewModel: 'EDITransactionViewModel',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'panel',
            //flex: 2.2,
            collapsible: true,
            collapseToolText: 'Search',
            items: [
                {
                    xtype: 'form',
                    itemId: 'frmSet',
                    items: [
                        {
                            xtype: 'fieldset',
                            iconCls: 'fa fa-search',
                            title: 'Advanced Filter',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        // {
                                        //     xtype: 'box',
                                        //     html: '<b>Transaction Date Range:<b>'
                                        // },

                                        {
                                            xtype: 'datefield',
                                            itemId: 'TranfromDate',
                                            fieldLabel: 'Transaction Date Range',
                                            bind: {value: '{submitDateFrom}'},
                                            value: Ext.Date.format(new Date(), 'm/d/Y'),
                                            maxValue: new Date(),
                                            format: 'm/d/Y',
                                            altFormats: 'm/d/Y',
                                            labelWidth: 150,
                                            width: 288
                                        },
                                        {
                                            xtype: 'datefield', itemId: 'TrantoDate', bind: {value: '{submitDateTo}'},
                                            value: Ext.Date.format(new Date(), 'm/d/Y'),
                                            format: 'm/d/Y', altFormats: 'm/d/Y', width: 120
                                        }
                                        , {
                                            xtype: 'combobox',
                                            itemId: 'cbxSource',
                                            queryMode: 'local',
                                            name: 'Source',
                                            fieldLabel: 'Source',
                                            emptyText: 'Select Source',
                                            displayField: 'name',
                                            valueField: 'value',
                                            forceSelection: true,
                                            bind: {
                                                store: '{EDIHubsSourceStore}'
                                            },
                                            labelWidth: 80
                                        },
                                        {
                                            xtype: 'box',
                                            style: {
                                                margin: '3px 0px 0px 20px! important'
                                            },
                                            html: 'Pharmacy:'
                                        },
                                        {
                                            xtype: 'providertypeahead',
                                            itemId: 'cbxcreateeditpharmacyprovidertype',
                                            displayField: 'Name',
                                            valueField: 'ncpdpId',
                                            width: 250,
                                            emptyText: '[NCPDP Pharmacy]'
                                        }
                                    ]

                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [

                                        {
                                            xtype: 'datefield',
                                            itemId: 'ServfromDate',
                                            fieldLabel: 'Service Date Range',
                                            //bind: {value: '{submitDateFrom}'},
                                            maxValue: new Date(),
                                            format: 'm/d/Y',
                                            altFormats: 'm/d/Y',
                                            labelWidth: 150,
                                            width: 288
                                        },
                                        {
                                            xtype: 'datefield', itemId: 'ServtoDate',// bind: {value: '{submitDateTo}'},
                                            format: 'm/d/Y', altFormats: 'm/d/Y',
                                            width: 120

                                        }
                                        , {
                                            xtype: 'combobox',
                                            itemId: 'cbxPort',
                                            name: 'Port',
                                            fieldLabel: 'Port',
                                            emptyText: 'Select Port',
                                            displayField: 'name',
                                            valueField: 'value',
                                            forceSelection: true,
                                            queryMode: 'local',
                                            bind: {
                                                store: '{EDIPortsStore}'
                                            },
                                            labelWidth: 80
                                        }

                                    ]


                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [

                                        {
                                            fieldLabel: 'Transaction ID',
                                            name: 'ncpdpid',
                                            xtype: 'textfield', itemId: 'txtTransactionid',
                                            labelWidth: 150,
                                            width: 412
                                        }
                                        , {
                                            xtype: 'combobox',
                                            itemId: 'cbxLOB',
                                            autoLoadOnValue: true,
                                            queryMode: 'local',
                                            fieldLabel: 'LOB',
                                            emptyText: 'Select a LOB',
                                            bind: {
                                                store: '{LOBStore}'
                                            },
                                            displayField: 'value',
                                            valueField: 'name',
                                            labelWidth: 80
                                        },
                                        /*{
                                            xtype: 'container',
                                            flex: 1
                                        },*/
                                        {
                                            xtype: 'button',
                                            text: 'Search',
                                            style: {
                                                margin: '0px 0px 0px 20px! important'
                                            },
                                            iconCls: 'fa fa-search',
                                            scale: 'small',
                                            width: 80,
                                            listeners: {
                                                click: 'SearchOnClick'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            text: 'Reset  ',
                                            style: {
                                                margin: '0px 0px 0px 20px! important'
                                            },
                                            iconCls: 'fa  fa-refresh',
                                            scale: 'small',
                                            width: 80,
                                            listeners: {
                                                click: 'ResetOnClick'
                                            }
                                        }
                                    ]
                                }

                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'grid',
            flex: 1,
            extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
            itemId: 'grdPriorAuthItems',
            viewModel: {
                type: 'common-shared-editgridmodel'

            },
            bind: {
                store: '{EDITransactionsStore}'
            },
            dockedItems: [{
                dock: 'bottom',
                xtype: 'pagingtoolbar',
                displayInfo: true,
                hideRefresh: true,
                pageSize: 24,
                bind: {
                    store: '{EDITransactionsStore}'
                }
            }],
            plugins: [
                {
                    ptype: 'cellediting',
                    clicksToEdit: 2,
                    autoCancel: false
                }
            ],
            columns: {

                items: [


                    {
                        text: 'Source',
                        dataIndex: 'SOURCE',
                        width: 120
                    },
                    {
                        text: 'Socket',
                        dataIndex: 'Socket',
                        hidden: true
                    }, {
                        text: 'Port',
                        dataIndex: 'Port',
                        hidden: true
                    },
                    {
                        text: 'Transaction ID',
                        dataIndex: 'TransactionID',
                        width: 120

                    },
                    {
                        xtype: 'actioncolumn',
                        iconCls: 'x-fa fa-long-arrow-right',
                        width: 40,
                        hideable: false,
                        align: 'center',
                        handler: 'TransactionOnClick'
                    },
                    {
                        text: 'Transaction Code',
                        dataIndex: 'TranCode', width: 130
                    },
                    {
                        text: 'Service Date',
                        dataIndex: 'ServiceDate',
                        width: 120,
                        xtype: 'datecolumn',
                        format: 'm/d/Y',
                        filter: {type: 'date'}
                    },
                    {
                        text: 'Transaction Date',
                        dataIndex: 'TranDate', width: 120, xtype: 'datecolumn', format: 'm/d/Y', filter: {type: 'date'}
                    },
                    {
                        text: 'Time In [HH:MM:SS:MMM]',
                        dataIndex: 'TmIn', width: 150, xtype: 'datecolumn', format: 'H:i:s.u', filter: {type: 'date'}
                    },
                    {
                        text: 'Time Out [HH:MM:SS:MMM]',
                        dataIndex: 'TmOut', width: 150, xtype: 'datecolumn', format: 'H:i:s.u', filter: {type: 'date'}
                    },
                    {
                        text: 'Process Time [MM:SS:MMM]',
                        dataIndex: 'TransactionTime', width: 150,
                        renderer: function (value, metaData, record, row, col, store, gridView) {
                            var item = record.data.TransactionTime;
                            item = (item == '') ? '' : item;
                            if (item.toString().length >= 4) {
                                var sec = parseInt(item) / 1000;
                                return '00:0' + sec;
                            }
                            else {
                                return '00:00.' + item;
                            }
                        }
                    }, {
                        text: 'Status',
                        dataIndex: 'Status',
                        hidden: true
                    }, {
                        text: 'Transaction Count',
                        dataIndex: 'Status',
                        hidden: true
                    }, {
                        text: 'Provider ID',
                        dataIndex: 'ProviderID',
                        hidden: true
                    }, {
                        text: 'NCPDP ID',
                        dataIndex: 'NCPDPID',
                        hidden: true
                    },
                    {
                        text: 'Pharmacy Name',
                        dataIndex: 'PharmacyName', width: 120
                    },
                    {
                        xtype: 'actioncolumn',
                        iconCls: 'x-fa fa-home',
                        width: 40,
                        hideable: false,
                        align: 'center',
                        handler: 'PharmacyOnClick',
                        renderer: function (value, meta, rec) {
                            if (rec.data.NCPDPID == '') {
                                meta.style = "display: none";
                            }
                        }
                    }, {
                        text: 'MeridianRx ID',
                        dataIndex: 'RecipientID',
                        hidden: true
                    }, {
                        text: 'Member ID',
                        dataIndex: 'MemberID',
                        hidden: true
                    },
                    {
                        text: 'Member Name',
                        dataIndex: 'MemberName', width: 150
                    },
                    {
                        xtype: 'actioncolumn',
                        iconCls: 'x-fa fa-user',
                        width: 40,
                        hideable: false,
                        align: 'center',
                        handler: 'MemberOnClick',
                        renderer: function (value, meta, rec) {
                            if (rec.data.RecipientId == 0) {
                                meta.style = "display: none";
                            }
                        }
                    },
                    {
                        text: 'NCPDP Ver',
                        dataIndex: 'NCPDPVer',
                        hidden: true
                    }
                ]

            }
        }
    ]
});
