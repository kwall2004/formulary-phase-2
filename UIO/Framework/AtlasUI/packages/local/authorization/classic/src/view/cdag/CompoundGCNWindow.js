/**
 * Created by agupta on 9/20/2016.
 */
Ext.define('Atlas.authohrization.view.cdag.CompoundGCNWindow', {
    extend: 'Ext.window.Window',
    xtype: 'authorization-compoundgcnwindow',
    title: 'Compound GCN\'s',
    controller: 'compoundgcnwindowcontroller',
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
            flex: 10,
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {text: 'GCN SeqNo', dataIndex: 'GCN_SEQNO'},
                    {text: 'GCN Desc', dataIndex: 'GNN60'}
                ]
            },
            bind: '{storecompoundgcn}'
        }
    ]
});