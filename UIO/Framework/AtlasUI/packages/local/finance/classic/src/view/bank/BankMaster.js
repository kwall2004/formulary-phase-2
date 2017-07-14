Ext.define('Atlas.finance.view.bank.BankMaster', {
    //extend: 'Ext.grid.Panel',
    extend: 'Ext.panel.Panel',
    alias: 'widget.finance-bankmaster',

    requires: [
        'Ext.grid.feature.Grouping',
        'Ext.grid.column.Check'
    ],

    layout: 'fit',
    controller: 'finance-bankmaster',
    viewModel: 'finance-bankmaster',

    items: [{
        xtype: 'gridpanel',
        layout: 'fit',
        title: 'Bank Information',
        iconCls: 'x-fa fa-university,6',
        tbar: [
            {xtype: 'button', text: 'Add', iconCls: 'x-fa fa-plus-circle', handler: 'onAddClick'},
            {xtype: 'button', text: 'Update' ,iconCls: 'x-fa fa-edit', handler: 'onEditClick', disabled: true},
            {xtype: 'button', text: 'Delete', iconCls: 'x-fa fa-minus-circle', handler: 'onDeleteClick', disabled: true}
        ],

        bind: {
            store: '{bankacctmaster}'
        },

        columns: {
            defaults: {
                width: 150
            },
            items: [
            {
                text: 'Bank Account Number',
                dataIndex: 'accountNum',
                width: 175
            },{
                text: 'Bank',
                dataIndex: 'bank',
                hidden: true
            },{
                text: 'Bank Code',
                dataIndex: 'bankCode',
                hidden: true
            },{
                text: 'Bank Name',
                dataIndex: 'bankName',
                hidden: true
            },{
                text: 'Account Description',
                dataIndex: 'AcctDescription',
                width: 175
            },{
                text: 'Last Check Number',
                dataIndex: 'lastCheckNum'
            },{
                text: 'Last EFT Number',
                dataIndex: 'lastEFTnum'
            },{
                // xtype: 'checkcolumn',
                text: 'Sungard Memo Checks',
                dataIndex: 'sungardMemoChecks',
                width: 175,
                // disabled: true
                xtype: 'widgetcolumn',
                widget:{
                    xtype: 'checkbox',
                    disabled: true
                }
            },{
                xtype: 'datecolumn',
                text: 'Last Modified',
                dataIndex: 'lastModified',
                format: 'm/d/Y',
                hidden: true
            },{
                text: 'Company ID',
                dataIndex: 'companyId'
            },{
                text: 'Company Name',
                dataIndex: 'companyName'
            },{
                text: 'Origin ID',
                dataIndex: 'originId'
            },{
                text: 'Origin Name',
                dataIndex: 'originName'
            },{
                text: 'Origin DFI',
                dataIndex: 'originDFI'
            },{
                text: 'System ID',
                dataIndex: 'systemID',
                hidden: true
            }]
        },

        listeners: {
            select: 'onSelect',
            itemdblclick: 'onItemDblClick'
        },

        features: [{
            ftype: 'grouping',
            startCollapsed: false,
            groupHeaderTpl: '<span style="font-weight:bold">{name}</span>',
            hideGroupedHeader: true
        }]
    }]
});