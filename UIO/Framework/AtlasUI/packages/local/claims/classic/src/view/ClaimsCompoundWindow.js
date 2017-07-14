/**
 * Created by akumar on 1/17/2017.
 */

Ext.define('Atlas.claims.view.ClaimsCompoundWindow', {
    extend: 'Ext.window.Window',
    xtype: 'claims-compoundgcnwindow',
    iconCls: 'x-fa fa-search',
    title: 'Compound Drug',
    controller: 'claimscompoundwindowcontroller',
    width: 600,
    height: 350,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    dockedItems: [
        {
            xtype:'toolbar',
            dock:'top',
            items:[
                {
                    xtype : 'drugtypeahead',
                    itemId : 'cbxMedInfo',
                    fieldLabel : 'Medication Info',
                    emptyText: '[e.g. Nexium]',
                    hideLabel : false,
                    matchFieldWidth: false,
                    forceSelection: true,
                    displayField : 'LN',
                    valueField : 'GCN_SEQNO',
                    listeners: {
                        select: 'cbxMedInfo_Select'
                    }
                },
                {
                    xtype : 'displayfield',
                    fieldLabel : 'GCN',
                    labelWidth : 30
                },
                {
                    xtype : 'label',
                    itemId : 'lblcompoundGCN',
                    labelWidth : 60
                },
                '->',
                {
                    xtype : 'button',
                    text : 'Add NDC',
                    itemId : 'winBtnAddGCN',
                    iconCls : 'fa fa-plus-circle',
                    handler: 'winBtnAddGCN_Click'
                }
            ]
        }
    ],

    items: [
        {
            xtype: 'grid',
            itemId : 'gpCompoundGCN',
            plugins: [
                {
                    ptype: 'rowediting',
                    triggerEvent: 'celldblclick',
                    removeUnmodified: true,
                    id: 'rowEdit'
                }
            ],
            tbar : [
                {
                    xtype : 'button',
                    text : 'Remove',
                    itemId : 'winBtnDeleteGCN',
                    iconCls : 'fa  fa-minus-circle',
                    handler : 'winBtnDeleteGCN_Click'
                }

            ],
            flex: 10,
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {text: 'NDC', dataIndex: 'NDC'},
                    {text: 'LN', dataIndex: 'LN'},
                    {
                        text: 'Basis Of Cost',
                        dataIndex: 'ingBasisOfCost',
                        renderer: 'rendererIngBasisOfCost',
                        editor: {
                            xtype: 'combobox',
                            allowBlank: false,
                            bind: {store: '{UCFCostBasis}'},
                            matchFieldWidth: true,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value'
                        }
                    },
                    {
                        text: 'Ingr. Cost',
                        dataIndex: 'ingCost',
                        format: '$0,0.00',
                        editor: {
                            xtype: 'numberfield',
                            minValue: 1,
                            maxLength: 8,
                            allowBlank: false,
                            allowDecimals: false,
                            hideTrigger: true
                        }
                    },
                    {
                        text: 'Ingr. Qty',
                        dataIndex: 'ingQuantity',
                        editor: {
                            xtype: 'numberfield',
                            minValue: 1,
                            maxLength: 8,
                            allowBlank: false,
                            allowDecimals: true,
                            hideTrigger: true
                        }
                    }
                ]
            },
            bind: '{storecompoundgcn}'
        }
    ]
});
