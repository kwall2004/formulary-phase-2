/**
 * This Class represents the Fax Letters Poppup of the Credentialing Checklist Tab
 */
Ext.define('Atlas.pharmacy.view.credentialing.popups.SendMissingLetter', {
    extend: 'Ext.window.Window',
    xtype: 'pharmacy-checklist-sendmissingletter-win',
    width: 500,
    controller: 'credentialingdetail_sendmissinglettercontroller',
    viewModel: 'credentialingdetail_sendmissingletterviewmodel',
    title: 'Fax Letter',
    layout: {
        type: 'fit'
    },
    items: [
        {
            xtype: 'form',
            reference: 'refFaxLetter',
            layout: {
                type: 'vbox',
                align: 'left'
            },
            items: [
                {
                    xtype: 'textfield',
                    bind : '{sendletterarray.faxnumber}',
                    name: 'faxnumber',
                    fieldLabel: 'Fax Number',
                    padding : '10 0 0 10'
                    //,plugins: new Ext.ux.plugin.FormatPhoneNumber()
                },
                {
                    xtype: 'fieldset',
                    title: 'Letter Type',
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    defaults: {
                        width: 400,
                        labelWidth: 240
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            itemId:'rgsendfax',
                            layout: {
                                type: 'vbox',
                                align: 'left'
                            },
                            items: [{
                                name: 'radio',
                                inputValue: 'Missing Information Letter',
                                boxLabel: 'Missing Info Letter',
                                checked: true
                            },{
                                name: 'radio',
                                inputValue: 'Exceeded Time Frame letter',
                                boxLabel: 'Exceeded Timeframe Letter'
                            }],
                            listeners: {
                                change: 'letterchange'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {
                    text: 'Save',
                    itemId:'btnFaxLetterSave',
                    handler: 'btnFaxLetterSaveclick'
                },
                {
                    text: 'Preview',
                    itemId:'btnFaxLetterPreview',
                    handler: 'btnFaxLetterPreviewclick'
                },
                {
                    text: 'Send fax',
                    itemId:'btnFaxLetterSendfax',
                    handler: 'btnFaxLetterSendfaxclick'
                },
                {
                    text: 'Send',
                    itemId:'btnFaxLetterSend',
                    handler: 'btnFaxLetterSendclick'
                },
                {
                    text: 'Cancel',
                    disabled: false,
                    handler: function (btn) {
                        btn.up('window').close()
                    }
                }
            ]
        }
    ]
});