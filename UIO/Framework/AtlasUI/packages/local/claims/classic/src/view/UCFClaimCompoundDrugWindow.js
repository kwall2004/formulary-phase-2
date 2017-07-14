/**
 * Created by d4662 on 1/20/2017.
 */
Ext.define('Atlas.claims.view.UCFClaimCompoundDrugWindow', {
    extend: 'Ext.window.Window',
    xtype: 'claims-ucfclaimcompounddrugwindowcontroller',
    title: 'Compound GCN\'s',
    controller: 'ucfclaimcompounddrugwindowcontroller',
    width: 700,
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
                    hideLabel : false,
                    matchFieldWidth: false,
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
                    text : 'Add GCN',
                    itemId : 'winBtnAddGCN',
                    iconCls : 'fa fa-plus-circle',
                    handler: 'winBtnAddGCN_Click'
                }
            ]
        },
        {
            xtype:'toolbar',
            dock:'bottom',
            items: [
                '->',
                {
                    xtype: 'button',
                    itemId: 'btnWinClose',
                    text: 'Close',
                    handler: 'onClose',
                    iconCls: 'x-fa fa-times'
                }
            ]
        }
    ],

    items: [
        {
            xtype: 'grid',
            itemId : 'gpCompoundGCN',
            tbar : [
                {
                    xtype : 'button',
                    text : 'Remove',
                    itemId : 'winBtnDeleteGCN',
                    iconCls : 'fa  fa-minus-circle',
                    handler : 'winBtnDeleteGCN_Click'
                }

            ],
            plugins: [
                {
                    ptype: 'rowediting',
                    triggerEvent: 'celldblclick',
                    removeUnmodified: true,
                    id: 'rowEdit5'
                },
                {
                    ptype: 'gridfilters'
                }
            ],
            flex: 10,
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {text: 'NDC', dataIndex: 'productId',flex:2},
                    {text: 'LN', dataIndex: 'LN',flex:2},
                    {
                        text: 'Basis of Cost',
                        dataIndex: 'ingBasisOfCost',
                        editor:{
                            xtype:'combobox',
                            displayField:'name',
                            valueField:'value',
                            bind:{
                                store:'{ucfcostbasis}'
                            }

                        }
                    },
                    {text: 'Ingr. Cost', dataIndex: 'ingCost', editor:{xtype:'textfield'}},
                    {text: 'Ingr. Qty', dataIndex: 'ingQuantity',editor:{xtype:'textfield'}}

                ]
            },
            bind: '{ucfclaimcompound}'
        }
    ]
});
