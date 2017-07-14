Ext.define('Atlas.macprice.view.CustomPriceSearch', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.CustomPriceSearch',
    itemId: 'CustomPriceSearchGrid',
    title: 'Custom Price Search',
    controller: 'CustomPriceSearchController',
    viewModel: 'CustomPriceSearchModel',

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'LOB',
                    labelWidth: 30,
                    itemId: 'LineOfBusiness',
                    emptyText: ' Line of Business',
                    bind: {
                        store: '{LineOfBusiness}'
                    },
                    editable: false,
                    name: 'LineOfBusiness',
                    forceSelection: true,
                    displayField: 'name',
                    valueField: 'value',
                    selectOnFocus: false,
                    value: '999'
                },
                {
                    xtype: 'drugtypeahead',
                    itemId: 'cbxDrug',
                    fieldLabel: 'Drug Info',
                    labelWidth: 70,
                    forceSelection: true,
                    emptyText: ' [e.g. Nexium]',
                    listeners: {
                        select: 'drugtypeahead_Select'
                    },
                    displayField: 'GNN60',
                    valueField: 'GCN_SEQNO',
                    width: 350
                },
                {

                    xtype: 'displayfield',
                    fieldLabel: 'GCN',
                    labelWidth: 30,
                    itemId: 'GCN'
                }, '-',
                {
                    xtype: 'button',
                    itemId: 'btnSearch',
                    text: 'Search',
                    iconCls: 'x-fa fa-search',
                    handler: 'onSearch'
                }
            ]
        }
    ],

    bind: {
        store: '{CustomPriceSearch}'
    },

    columns: {
        defaults: {
            flex: 1
        },
        items: [
            {text: 'Line Of Business', dataIndex: 'LineOfBusiness', hidden: true},
            {text: 'Pharmacy Type', dataIndex: 'PharmacyType'},
            {text: 'NDC', dataIndex: 'NDC'},
            {text: 'Label Name', dataIndex: 'labelName'},
            {text: 'Cust Cost Basis', dataIndex: 'costBasis'},
            {
                text: 'NDC Price',
                dataIndex: 'NDCPrice',
                xtype: 'numbercolumn',
                format: '$0,0.0000'
            },
            {
                text: 'Cust Unit Price',
                dataIndex: 'CustomUnitPrice',
                xtype: 'numbercolumn',
                format: '$0,0.0000'
            },
            {
                text: 'Cust Discount',
                dataIndex: 'customDiscount',
                xtype: 'numbercolumn',
                format: '00.00%'
            },
            {
                text: 'Cust Price',
                dataIndex: 'customPrice',
                xtype: 'numbercolumn',
                format: '$0,0.0000'
            },
            {
                text: 'Dispensing Fee',
                dataIndex: 'dispFee',
                xtype: 'numbercolumn',
                format: '$0,0.0000'
            },
            {text: 'Contract Id', dataIndex: 'contractId'},
            {text: 'Chain/Pharmacy Id', dataIndex: 'pharmacyChain'},
            {text: 'Name', dataIndex: 'pharmacyName'},
            {text: 'Address', dataIndex: 'pharmacyAddress'},
            {text: 'Phone', dataIndex: 'pharmacyPhone'}
        ]
    },

    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '{name}',
        hideGroupedHeader: true,
        enableGroupingMenu: true
    }]
});
