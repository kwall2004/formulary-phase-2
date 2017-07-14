/**
 * Created by agupta on 9/19/2016.
 */
Ext.define('Atlas.authohrization.view.cdag.CustomPriceWindow', {
    extend: 'Ext.window.Window',
    xtype: 'authorization-custompricewindow',
    //itemId : 'custompricewindow',
    title: 'Custom Price Info',
    viewModel: 'custompricewindowmodel',
    controller: 'custompricewindowcontroller',
    //layout: 'fit',
    width: 1000,
    height: 550,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    dockedItems:{
        xtype:'toolbar',
        dock:'top',
        items:[
            {
                xtype : 'combobox',
                fieldLabel : 'LOB',
                itemId : 'winCbxLob',
                displayField: 'name',
                valueField: 'value',
                labelWidth : 30,
                bind: {
                    //value: '{cdmodel.InTake}',
                    store: '{storelob}'
                }
            },
            {
                xtype: 'drugtypeahead',
                itemId: 'winCbxMedication',
                fieldLabel: 'Drug Info',
                labelWidth: 70,
                displayField: 'GNN60',
                emptyText: ' [e.g. Nexium]',
                matchFieldWidth: false,
                listeners: {
                    select: 'winCbxMedication_Select'
                },
                valueField: 'GCN_SEQNO',
                width: 350
            },
            {
                xtype: 'displayfield',
                itemId : 'winLblGCN',
                fieldLabel: 'GCN',
                labelWidth : 30
            },
            '->',
            {
                xtype : 'button',
                text : 'Search',
                itemId : 'winCustPriceSearch',
                iconCls : 'fa fa-search',
                handler: 'winCustPriceSearch_Click'
            }
        ]
    },
    items: [
        {
            xtype: 'grid',
            itemId : 'gpCustomPriceSearch',
            flex: 10,
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
            listeners: {
                itemdblclick: 'gpCustomPriceSearch_ItemDblClick'
            },
            bind: '{storecustompricesearch}',
            /*dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    bind: '{storecustompricesearch}',
                    displayInfo: true,
                    dock: 'bottom'
                }
            ],*/
            features: [{
                id: 'group',
                ftype: 'groupingsummary',
                groupHeaderTpl: '{name}',
                hideGroupedHeader: true,
                enableGroupingMenu: true
            }]
        }
    ]
});