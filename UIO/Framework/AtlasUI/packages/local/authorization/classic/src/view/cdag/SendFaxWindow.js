/**
 * Created by agupta on 10/12/2016.
 */
Ext.define('Atlas.authohrization.view.cdag.SendFaxWindow', {
    xtype: 'authorization-sendfaxwindow',

    extend: 'Ext.window.Window',
    title: 'Send Fax',
    viewModel: 'sendfaxwindowmodel',
    controller: 'sendfaxwindowcontroller',
    width: 800,
    height: 400,
    modal: true,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex : 0.5,
            itemId: 'fpFaxPrescriber',
            frame : true,
            items: [
                {
                    xtype: 'fieldset',
                    title : 'Fax To Prescriber',
                    defaults: {
                        labelWidth: 120
                    },
                    items : [
                        {
                            xtype : 'textfield',
                            fieldLabel : 'Attention To',
                            itemId : 'winPresAttentionTo',
                            allowBlank: false,
                            width : '95%'
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel : 'Fax Number',
                            itemId : 'winPresFaxNumber',
                            width : '95%',
                            allowBlank: false,
                            minValue: 0,
                            minLength: 10,
                            maxLength: 10,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            allowDecimals: false,
                            hideTrigger: true
                        },
                        {
                            xtype : 'combobox',
                            forceSelection: true,
                            fieldLabel : 'Your request',
                            itemId : 'winPresRequestMsg',
                            displayField : 'label',
                            valueField : 'value',
                            width : '95%',
                            allowBlank: false,
                            store : {
                                fields : [
                                    {name : 'label'},
                                    {name : 'value'}
                                    ],
                                data : [
                                    {label : 'has been approved.', value : '1'},
                                    {label : 'requires additional information.', value : '2'},
                                    {label : 'is closed.', value : '3'},
                                    {label : 'is not on the formulary.', value : '4'}

                                ]
                            },
                            listeners : {
                                select : 'winPresRequestMsg_Select'
                            }
                        },
                        {
                            xtype : 'textfield',
                            fieldLabel : 'Plan covers',
                            itemId : 'winPlanCovers',
                            width : '95%',
                            disabled : true
                        },
                        {
                            xtype : 'textarea',
                            fieldLabel : 'Additional Notes',
                            itemId : 'winPresAdditionalNotes',
                            allowBlank: false,
                            width : '95%'
                        },
                        {
                            xtype : 'checkbox',
                            fieldLabel : 'Include Incoming Fax',
                            itemId : 'winPresIncomingFax',
                            disabled : true
                        }
                    ]
                }
            ],
            dockedItems: {
                dock: 'bottom',
                xtype: 'toolbar',
                items: [
                    {
                        xtype: 'button',
                        text : 'Preview',
                        itemId : 'btnPresPreview',
                        iconCls : 'fa fa-file-o',
                        handler : 'btnPresPreview_Click'
                    },
                    {
                        xtype: 'button',
                        text : 'Send Fax',
                        itemId : 'btnPresSendFax',
                        iconCls : 'fa fa-print',
                        handler : 'btnPresSendFax_Click'
                    }
                ]
            }
        },
        {
            xtype: 'form',
            flex : 0.5,
            itemId: 'fpFaxPharmacy',
            frame : true,
            items: [
                {
                    xtype: 'fieldset',
                    title : 'Fax To Pharmacy',
                    defaults: {
                        labelWidth: 120
                    },
                    items : [
                        {
                            xtype : 'textfield',
                            fieldLabel : 'Attention To',
                            itemId : 'winPharAttentionTo',
                            allowBlank: false,
                            width : '95%'
                        },
                        {
                            xtype: 'numberfield',
                            fieldLabel : 'Fax Number',
                            itemId : 'winPharFaxNumber',
                            width : '95%',
                            allowBlank: false,
                            minValue: 0,
                            minLength: 10,
                            maxLength: 10,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            allowDecimals: false,
                            hideTrigger: true
                        },
                        {
                            xtype : 'textarea',
                            fieldLabel : 'Additional Notes',
                            itemId : 'winPharAdditionalNotes',
                            allowBlank: false,
                            width : '95%'
                        },
                        {
                            xtype : 'checkbox',
                            fieldLabel : 'Include Incoming Fax',
                            itemId : 'winPharIncomingFax',
                            disabled: true
                        }
                    ]
                }
            ],
            dockedItems: {
                dock: 'bottom',
                xtype: 'toolbar',
                items: [
                    {
                        xtype: 'button',
                        text : 'Preview',
                        itemId : 'btnPharPreview',
                        iconCls : 'fa fa-file-o',
                        handler : 'btnPharPreview_Click'
                    },
                    {
                        xtype: 'button',
                        text : 'Send Fax',
                        itemId : 'btnPharSendFax',
                        iconCls : 'fa fa-print',
                        handler : 'btnPharSendFax_Click'
                    }
                ]
            }
        },
        {
            xtype : 'panel',
            itemId : 'hdnContainer',
            hidden : true,
            items : [
                {xtype: 'hidden', itemId: 'hidDocId'},
                {xtype: 'hidden', itemId: 'hidJobNum'}
            ]
        }
    ]
});