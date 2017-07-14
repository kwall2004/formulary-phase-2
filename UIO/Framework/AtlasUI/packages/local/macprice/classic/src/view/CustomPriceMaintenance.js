Ext.define('Atlas.macprice.view.CustomPriceMaintenance', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.CustomPriceMaintenance',
    itemId: 'CustomPriceMaintenanceGrid',
    title: 'Custom Price Maintenance',
    controller: 'CustomPriceMaintenanceController',

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'drugtypeahead',
                    fieldLabel: 'Drug Info',
                    labelWidth: 60,
                    itemId: 'cbxDrug',
                    hideLabel: false,
                    emptyText: ' [e.g. Nexium]',
                    listeners: {
                        select: 'drugtypeahead_Select'
                    },
                    displayField: 'LN',
                    valueField: 'GCN_SEQNO',
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
                    handler: 'onSearch'
                }
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                '->',
                {
                    xtype: 'button',
                    itemId: 'btnImport',
                    text: 'Import From Excel',
                    iconCls: 'x-fa fa-check-circle',
                    handler: 'onImport'
                },
                {
                    xtype: 'button',
                    itemId: 'btnExport',
                    text: 'Export To Excel',
                    iconCls: 'x-fa fa-check-circle',
                    handler: 'onExport'
                },
                {
                    xtype: 'button',
                    itemId: 'btnSaveChanges',
                    text: 'Save Changes',
                    iconCls: 'x-fa fa-floppy-o',
                    handler: 'onSaveChanges'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            bind: '{CustomPriceListDetail}',
            pageSize: 20,
            displayInfo: true,
            dock: 'bottom'
        }
    ],

    bind: {
     store: '{CustomPriceListDetail}'
     },

    columns: {
        defaults: {
            flex: 1
        },
        items: [
            {text: 'Included', dataIndex: 'included', xtype:'checkcolumn'},
            {text: 'NDC', dataIndex: 'NDC'},
            {text: 'Label Name', dataIndex: 'labelName'},
            {
                text: 'Cust Cost Basis',
                dataIndex: 'costBasis',
                editor: {
                    xtype: 'combobox',
                    allowBlank: false,
                    queryMode: 'local',
                    bind: {store: '{CostBasis}'},
                    displayField: 'name',
                    valueField: 'value'
                },
                renderer: 'rendererCostBasis'
            },
            {text: 'NDC Price', dataIndex: 'NDCPrice', xtype: 'numbercolumn', format: '$0,00.0000'},
            {
                text: 'Cust Unit Price',
                dataIndex: 'unitPrice',
                xtype: 'numbercolumn',
                editor: {
                    xtype: 'numberfield',
                    minValue: 0,
                    hideTrigger: true
                }
            },
            {
                text: 'Cust Discount',
                dataIndex: 'discpercent',
                xtype: 'numbercolumn',
                editor: {
                    xtype: 'numberfield',
                    hideTrigger: true
                }
            },
            {text: 'Cust Price', dataIndex: 'customPrice', xtype: 'numbercolumn', format: '$0,00.0000'},
            {text: 'Contract Id', dataIndex: 'contractId', hidden: true},
            {text: 'Chain/Pharmacy Id', dataIndex: 'pharmacyChain', hidden: true},
            {text: 'Name', dataIndex: 'pharmacyName', hidden: true},
            {text: 'Address', dataIndex: 'pharmacyAddress', hidden: true},
            {text: 'Phone', dataIndex: 'pharmacyPhone', hidden: true}
        ]
    },
    selModel: 'rowmodel',
    plugins:[
        {
            ptype: 'rowediting',
            clicksToEdit: 2,
            autoCancel: false,
            width: 300
        }
    ]

});
