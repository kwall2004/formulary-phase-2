/**
 * Created by agupta on 10/4/2016.
 */
Ext.define('Atlas.authohrization.view.cdag.CompoundGPIWindow', {
    extend: 'Ext.window.Window',
    xtype: 'authorization-compoundgpiwindow',
    title: "Compound GPI's",
    controller: 'compoundgpiwindowcontroller',
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
                    xtype : 'gpitypeahead',
                    itemId : 'cbxCompoundGPI',
                    fieldLabel : 'Medication Info',
                    hideLabel : false,
                    matchFieldWidth: false,
                    displayField : 'GPIName',
                    valueField : 'GPICode',
                    listeners: {
                        select: 'cbxCompoundGPI_Select'
                    }
                },
                {
                    xtype : 'displayfield',
                    fieldLabel : 'GPI',
                    labelWidth : 30
                },
                {
                    xtype : 'label',
                    itemId : 'lblcompoundGPI',
                    labelWidth : 60
                },
                '->',
                {
                    xtype : 'button',
                    text : 'Add GPI',
                    itemId : 'winBtnAddGPI',
                    iconCls : 'fa fa-plus-circle',
                    handler: 'winBtnAddGPI_Click'
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
            itemId : 'gpCompoundGPI',
            tbar : [
                {
                    xtype : 'button',
                    text : 'Remove',
                    itemId : 'winBtnDeleteGPI',
                    iconCls : 'fa  fa-minus-circle',
                    handler : 'winBtnDeleteGPI_Click'
                }

            ],
            flex: 10,
            columns: {
                defaults: {
                    flex: 1
                },
                items: [
                    {text: 'GPI CODE', dataIndex: 'GPICode'},
                    {text: 'GPI Desc', dataIndex: 'GPIName'}
                ]
            },
            bind: '{storecompoundgpi}'
        }
    ]
});