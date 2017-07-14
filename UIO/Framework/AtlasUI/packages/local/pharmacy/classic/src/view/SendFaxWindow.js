/**
 * Created by rsalekin on 11/9/2016.
 */
Ext.define('Atlas.pharmacy.view.SendFaxWindow', {
    extend: 'Ext.window.Window',
    xtype: 'pharmacy-sendfaxwindow',
    name: 'sendfaxwindow',
    title: 'Send Fax',
    controller: 'sendfax',
    width: 400,
    height: 450,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'form',
            itemId: 'formSendFax',
            flex: 1,
            height: '100%',
            width: '100%',
            layout: 'hbox',
            align: 'stretch',
            items: [
                {
                    xtype: 'fieldset',
                    flex: 1,
                    height: '100%',
                    width: '100%',
                    defaults: {
                        labelWidth: 110,
                        width: '100%'
                    },
                    title: 'Fax Cover Sheet and Document',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'displayfield',
                            itemId: 'lblOrg',
                            fieldLabel: 'Fax to',
                            labelWidth: 120
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'txtTo',
                            fieldLabel: 'To',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'txtFrom',
                            fieldLabel: 'From',
                            allowBlank: false
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'txtFaxNum',
                            fieldLabel: 'Fax',
                            allowBlank: false,
                            maskRe: /[0-9]/,
                            maxLength: 12,
                            enforceMaxLength: 12,
                            minLength: 12,
                            vtype: 'fax',
                            plugins: {
                                ptype: 'faxnumberformatter'
                            }
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'txtDate',
                            fieldLabel: 'Date',
                            value: new Date(),
                            disabled: true
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'txtPages',
                            fieldLabel: 'Number of Pages',
                            value: 4,
                            maskRe: /[0-9]/,
                            maxLength: 2,
                            enforceMaxLength: 2
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'txtRe',
                            fieldLabel: 'Re'
                        },
                        {
                            xtype: 'textarea',
                            itemId: 'txtMessage',
                            fieldLabel: 'Message'
                        },
                        {
                            xtype: 'checkboxfield',
                            itemId: 'chkAttachment',
                            fieldLabel: 'Attach Blank EFT Form',
                            labelWidth: 140,
                            checked: true
                        }
                    ]
                }
            ],
            dockedItems: {
                dock: 'bottom',
                xtype: 'toolbar',
                items: [
                    '->',
                    {
                        xtype: 'button',
                        itemId: 'btnView',
                        iconCls: 'fa fa-file-o',
                        text: 'Preview',
                        handler: 'onPreviewFax'
                    },
                    {
                        xtype: 'button',
                        itemId: 'btnSend',
                        iconCls: 'fa fa-send-o',
                        text: 'Send',
                        handler: 'onSendFax'
                    },
                    {
                        xtype: 'button',
                        text: 'Cancel',
                        iconCls: 'fa fa-close',
                        handler: function (btn) {
                            btn.up('window').close()
                        }
                    }
                ]
            }
        }
    ]
});