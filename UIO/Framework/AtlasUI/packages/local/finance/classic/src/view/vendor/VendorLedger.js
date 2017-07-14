Ext.define('Atlas.finance.view.vendor.VendorLedger', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.finance-vendorledger',

    requires: [
        'Ext.grid.feature.Grouping',
        'Ext.grid.column.Check'
    ],

    controller: 'finance-vendorledger',
    viewModel: 'finance-vendorledger',

    title: 'Vendor Ledger',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    selectedRec: null,

    tbar: [{
        xtype: 'uxsearchfield',
        reference: 'payeenumsearch',
        flex: 3,
        fieldLabel: 'Payee No:',
        labelWidth: 60,
        bind: {
            emptyText: '{searchEmptyTextPayeeId}'
        },
        listeners: {
            search: 'onSearchPayee',
            clear: 'onClearPayee',
            change: 'onChangePayeeNo'
        }
    },{
        xtype:'tbseparator'
    },{
        xtype: 'segmentedbutton',
        flex: 2,
        items: [{
            text: 'Relationship',
            hint: '[e.g. CVS MI]',
            action: 'relationship',
            iconCls: 'x-fa fa-search',
            pressed: true,
            tooltip: 'Search by Relationship Contract'
        },{
            text: 'Pharmacy',
            hint: '[e.g. Target Pharmacy MI 48188]',
            iconCls: 'x-fa fa-search',
            action: 'pharmacy',
            tooltip: 'Search by Pharmacy Contract'
        }],
        listeners: {
            toggle: 'onSearchTypeToggle'
        }
    },{
        xtype: 'relationshiptypeahead',
        reference: 'relationshipsearch',
        flex: 4,
        bind: {
            hidden: '{!isRelationshipSearch}',
            emptyText: '{searchEmptyText}'
        },
        listeners: {
            search: 'onSearch'
        }
    },{
        xtype: 'providertypeahead',
        reference: 'pharmacysearch',
        flex: 4,
        bind: {
            hidden: '{!isPharmacySearch}',
            emptyText: '{searchEmptyText}'
        },
        listeners: {
            search: 'onSearch'
        }
    },{
        xtype:'tbseparator'
    },{
        xtype: 'datefield',
        fieldLabel: 'Date From:',
        name: 'dateFrom',
        itemId: 'dateFrom',
        reference: 'datefrom',
        format: 'm/d/Y',
        flex: 3,
        labelWidth: 65,
        listeners: {
            focusleave: 'onLeaveDate'
        }
    },{
        xtype: 'datefield',
        fieldLabel: 'Date To:',
        name: 'dateTo',
        itemId: 'dateTo',
        reference: 'dateto',
        format: 'm/d/Y',
        labelWidth: 48,
        flex: 3,
        listeners: {
            focusleave: 'onLeaveDate'
        }
    },{
        xtype:'tbseparator'
    },{
        xtype: 'button',
        flex: 1,
        text: 'Search',
        iconCls: 'x-fa fa-search',
        handler: 'onSearch'
    },{
        xtype: 'button',
        flex: 1,
        text: 'Reset',
        iconCls: 'x-fa fa-rotate-left',
        handler: 'onReset'
    }],

    items: [{
        xtype: 'grid',
        bind: {
            store: '{vendorledger}'
        },
        //bind: '{vendorledger}',
        height: '100%',

        tbar: [{
            text: 'Export to Excel',
            iconCls: 'x-fa fa-file-excel-o',
            handler: 'onExportVendorLedger'
        }],

        columns: {
            defaults: {
                flex: 1
            },
            items: [{
                text: 'Payee No',
                dataIndex: 'taxID',
                flex: 2
            },{
                text: 'NCPDPID',
                dataIndex: 'ncpdpId'
            },{
                text: 'Relationship ID',
                dataIndex: 'relationshipId'
            },{
                text: 'Pay Center Name',
                dataIndex: 'checkName',
                flex: 2
            },{
                xtype: 'datecolumn',
                text: 'Check Date',
                dataIndex: 'checkDate'
            },{
                text: 'Check No.',
                dataIndex: 'checkNum'
            },{
                text: 'EFT Trace ID',
                dataIndex: 'eftTraceId',
                renderer: function(val){
                    var newEftTraceId = val;
                    if(val)
                        return parseInt(newEftTraceId,10)+'';
                    else
                        return val;
                    /*while (newEftTraceId[0] === '0'){
                        newEftTraceId = val.replace('0', '');
                    }*/
                    return newEftTraceId;
                }
            },{
                xtype: 'numbercolumn',
                text: 'Check Amt.',
                dataIndex: 'checkAmt',
                format: '$#,###,##0.00'
            },{
                xtype: 'widgetcolumn',
                width: 40,
                flex: 0,
                hideable: false,
                widget: {
                    xtype: 'button',
                    handler: 'onOpenPaymentDetail',
                    iconCls: 'x-fa fa-search'
                }
            }]
        },

        dockedItems: [{
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: 'true',
            itemId: 'gridPagingToolbar',
            pageSize: 25,
            keepParams: true,
            doRefresh: function(){
                this.store.loadPage(1);
            },
            listeners: {
                beforeChange: 'getSelectedPageData'
            }
        }]
    }]
});