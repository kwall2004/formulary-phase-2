Ext.define('Atlas.finance.view.check.CheckMaster', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.finance-checkmaster',
    name: 'checkmaster',
    controller: 'finance-checkmaster',
    viewModel: 'finance-checkmaster',

    title: 'Check Master',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    defaults: {
        anchor: '100%'
    },

    tbar: [{
            xtype: 'segmentedbutton',
            items: [{
                text: 'Check Number',
                hint: '[Check Number]',
                action: 'checkNumber',
                iconCls: 'x-fa fa-folder',
                tooltip: 'Search by Check Number',
                pressed: true
            }, {
                text: 'EFT Trace ID',
                hint: '[EFT Trace ID]',
                iconCls: 'x-fa fa-archive',
                tooltip: 'Search by EFT Trace ID',
                action: 'eftTraceId'
            }],
            listeners: {
                toggle: 'onSearchTypeToggle'
            }
        }, {
            xtype: 'uxsearchfield',
            reference: 'searchfield',
            width: 150,
            bind: {
                emptyText: '{searchEmptyText}',
                value: '{searchValue}'
            },
            listeners: {
                search: 'onSearch'
            }
        }, {
            text: 'Advanced Search',
            iconCls: 'x-fa fa-search',
            handler: 'onAdvancedSearch'
        }
    ],

    items: [
        {
            xtype: 'grid',
            width: '70%',
            reference: 'checkMasterGrid',
            bind: '{claimradetail}',
            tbar: [
                {
                    text: 'Export to Excel',
                    iconCls: 'x-fa fa-file-excel-o',
                    handler: 'onExcelClick',
                    bind: {
                        disabled: '{!isRecord}'
                    }
                },
                {
                    text: 'Create 5010 ERA',
                    iconCls: 'x-fa fa-book',
                    handler: 'onERAClick',
                    bind: {
                        disabled: '{!isRecord}'
                    }
                }],
            columns: {
                items: [{
                    text: 'NCPDPID',
                    dataIndex: 'ncpdpid'
                }, {
                    text: 'Rx Num',
                    dataIndex: 'rxNum'
                }, {
                    text: 'Claim ID',
                    dataIndex: 'transactionID'
                }, {
                    //xtype: 'datecolumn',
                    text: 'Date Filled',
                    dataIndex: 'transactionDate',
                    renderer : function(val){
                        var strDate = '',
                            arrDate = val.split('-');
                        if(arrDate.length == 3){
                            strDate = arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0];
                        }
                        return strDate;
                    }
                }, {
                    //xtype: 'datecolumn',
                    text: 'Service Date',
                    dataIndex: 'serviceDate',
                    renderer : function(val){
                        var strDate = '',
                            arrDate = val.split('-');
                        if(arrDate.length == 3){
                            strDate = arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0];
                        }
                        return strDate;
                    }
                }, {
                    text: 'QTY',
                    dataIndex: 'dispQuantity'
                }, {
                    text: 'NDC',
                    dataIndex: 'ndc',
                    width: 150
                }, {
                    text: 'Drug Name',
                    dataIndex: 'medication',
                    width: 250
                }, {
                    xtype: 'numbercolumn',
                    text: 'Check Amt',
                    dataIndex: 'totalAmtPaid',
                    format: '$0.00',
                    align: 'start',
                    renderer: function (v) {
                        return '<span class="m-red-color">' + Ext.util.Format.currency(v, '$', 2) + '</span>';
                    }
                }, {
                    xtype: 'actioncolumn',
                    iconCls: 'x-fa fa-search',
                    width: 40,
                    hideable: false,
                    handler: 'onOpenPaymentDetail'
                }]
            },
            listeners: {
                itemdblclick: 'rowDblClick'
            },
            dockedItems: [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: 'true',
                pageSize: 25,
                keepParams: true,
                bind: {
                    store: '{claimradetail}'
                }
            }]
        },
        {
            xtype: 'form',
            width: '30%',
            scrollable: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'fieldset',
                title: 'Check/EFT',
                collapsible: true,
                defaults: {
                    xtype: 'displayfield',
                    labelWidth : 130
                },
                items: [{
                    fieldLabel: 'Issue Date:',
                    bind: '{checkmasterrec.checkDate}',
                    userCls: 'm-red-color-displayfield'
                }, {
                    fieldLabel: 'Check Number:',
                    bind: '{checkmasterrec.checkNum}',
                    userCls: 'm-red-color-displayfield'
                }, {
                    fieldLabel: 'EFT Trace ID:',
                    bind: '{checkmasterrec.eftTraceId}',
                    userCls: 'm-red-color-displayfield'
                }, {
                    fieldLabel: 'Remit Batch No:',
                    bind: '{checkmasterrec.remitBatch}'
                }, {
                    fieldLabel: 'Ledger Seq No:',
                    bind: '{ledgerSeq}'
                }, {
                    fieldLabel: 'Reconciliation $:',
                    bind: '{checkmasterrec.checkReconAmount}'
                }, {
                    fieldLabel: 'Reconciliation Date:',
                    bind: '{checkmasterrec.checkReconDate}'
                }, {
                    fieldLabel: 'Status:',
                    bind: '{checkmasterrec.voidFlag}',
                    userCls: 'm-red-color-displayfield'
                }]
            }, {
                xtype: 'fieldset',
                title: 'Check Address',
                collapsible: true,
                defaults: {
                    xtype: 'displayfield'
                },
                items: [{
                    fieldLabel: 'Payee No:',
                    bind: '{checkmasterrec.vendorCd}'
                }, {
                    fieldLabel: 'Payee:',
                    bind: '{checkmasterrec.checkName}'
                }, {
                    fieldLabel: 'Address:',
                    bind: '{checkmasterrec.checkAddress}'
                }, {
                    fieldLabel: 'City, State:',
                    bind: '{checkmasterrec.checkCityStateZip}'
                }]
            }, {
                xtype: 'fieldset',
                title: 'Statement Total',
                collapsible: true,
                defaults: {
                    xtype: 'displayfield'
                },
                items: [{
                    fieldLabel: 'Claim Total:',
                    bind: '{vendorledgerrec.checkAmt}',
                    renderer: function (v) {
                        return Ext.util.Format.currency(v, '$', 2);
                    }
                }, {
                    fieldLabel: 'Previous $:',
                    bind: '{vendorledgerrec.prevBalance}',
                    renderer: function (v) {
                        return Ext.util.Format.currency(v, '$', 2);
                    }
                }, {
                    fieldLabel: 'Statement $:',
                    bind: '{vendorledgerrec.remitAmt}',
                    renderer: function (v) {
                        return Ext.util.Format.currency(v, '$', 2);
                    }
                }]
            },
                {
                    xtype: 'fieldset',
                    title: 'Notes',
                    itemId: 'fsNotes',
                    width: '100%',
                    height: '100%',
                    layout: 'vbox',
                    flex: 1,
                    items: [
                        {
                            xtype: 'checkmaster.notes',
                            width: '100%',
                            height: '100%',
                            flex: 1,
                            parentSystemId: ''
                        }
                    ]
                }
            ]
        }]
});