/**
 * Created by s6627 on 10/4/2016.
 */
Ext.define('Atlas.formulary.view.AddNDCWindow', {
    extend: 'Ext.window.Window',
    xtype: 'formulary-addndcwindow',
    controller:'addndcwindowcontroller',
    //itemId : 'compoundgcnwindow',
    title: 'NDC Details',
    width: 530,
    height: 200,
    modal: true,
    itemId:'AddNdcWindow',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            layout:'vbox',
            itemId:'formAddNDC',
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'txtNDC1',
                            fieldLabel: 'NDC',
                            enableKeyEvents: true,
                            maskRe: /[0-9]/,
                            minLength: 5,
                            maxLength: 5,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 5,
                            width: 220,
                            listeners: {
                                'keyup': function (obj) {
                                    if(obj.getValue().toString().length == 5){this.up().down('#txtNDC2').focus()};
                                }
                            }
                        },
                        {xtype:'label', text:'-' , style: {'margin-left': '5px','margin-right': '5px'}},
                        {
                            xtype: 'textfield',
                            itemId: 'txtNDC2',
                            width: 120,
                            allowBlank:false,
                            maskRe: /[0-9]/,
                            minLength: 4,maxLength: 4,
                            enableKeyEvents: true,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 4,
                            listeners: {
                                'keyup': function (obj) {
                                    if (obj.getValue().toString().length == 4) {
                                        this.up().down('#txtNDC3').focus();
                                    }
                                }
                            }
                        },
                        {xtype:'label', text:'-' , style: {'margin-left': '5px','margin-right': '5px'}},
                        {xtype: 'textfield', itemId: 'txtNDC3',allowBlank:false,minLength: 2,maxLength: 2,width:120,
                            maskRe: /[0-9]/,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 2}
                    ]
                }
                ,
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'GCN',
                            value: '8888',
                            disabled: true,
                            itemId: 'txtGCN1'
                        },
                        {xtype:'label', text:'-' , style: {'margin-left': '5px','margin-right': '5px'}},
                        {
                            xtype: 'textfield',
                            allowBlank: false,
                            maskRe: /[0-9]/,
                            itemId: 'txtGCN',
                            minLength: 3,
                            maxLength: 3,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: 3
                        }
                    ]
                },
                {
                    xtype: 'textfield',
                    allowBlank: false,
                    fieldLabel: 'LN',
                    itemId: 'txtLN'
                },
                {
                    xtype: 'datefield',
                    allowBlank: false,
                    fieldLabel: 'Price Date',
                    itemId:'txtPriceDate',
                    format: 'm/d/Y',
                    width: 300
                },
                {xtype: 'textfield',maskRe: /[\d\.]/, fieldLabel: 'Unit price', itemId: 'txtUnit_price',allowBlank: false,maxValue: 9999,minValue:0.00001}
            ],
            dockedItems : {
                dock: 'bottom',
                xtype: 'toolbar',
                items : [
                    '->'
                    ,{xtype: 'button', text: 'Save',handler:'btn_SaveClick'},
                    {
                        xtype: 'button', text: 'Cancel',
                        handler:'btn_Cancel'
                    }
                ]
            }
        },
        {
            xtype: 'panel',
            itemId: 'hdnContainer',
            hidden: true,
            items: [
                {xtype: 'hidden', itemId: 'hidMode'}
            ]
        }
        ]
});
