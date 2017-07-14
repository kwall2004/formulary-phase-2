/**
 * This Class represents the Credentialing Letters Poppup of the Credentialing Detail Tab
 */
Ext.define('Atlas.pharmacy.view.credentialing.tabs.CredentialingDetailLetters', {
    extend: 'Ext.window.Window',
    alias: 'widget.pharmacy-credentialingdetail-letters-win',
    xtype: 'widget.pharmacy-credentialingdetail-letters-win',
    controller: 'credentialing-popups',
    width: 500,
    title: 'Credentialing Letters',
    modal: true,
    viewModel: {
        stores:{
            letterNameId:{
                model:'Atlas.letter.model.QueryDBModel'
            },
            letterProgramName:{
                model:'Atlas.letter.model.QueryDBModel'
            },
            storeDocument :{
                model: 'Atlas.pharmacy.model.ReturnDocument',
                autoLoad: false
            }
        },
        data: {
            docId: 0,
            letterId: 0,
            keyType: '',
            keyValue: '',
            credLogID: '',
            credType: '',
            keySystemID: 0,
            faxNumber: 0,
            letterNameId: 0,
            letterProgramName: '',
            selectedCredLogRecord: {}
        }
    },
    layout: {
        type: 'fit'
    },
    items: [
        {
            xtype: 'form',
            itemId: 'letterForm',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Letter Type',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        width: 400,
                        labelWidth: 240,
                        padding: 5
                    },

                    items: [
                        {
                            xtype: 'radiogroup',
                            columns: 1,
                            vertical: true,
                            itemId: 'rgLettersType',
                            items: [
                                {
                                    xtype: 'radio',
                                    itemId: 'rdReCred',
                                    boxLabel: 'Recredentialing Letter',
                                    inputValue: 'Recredentialing Letter',
                                    name: 'lettersType'
                                },
                                {
                                    xtype: 'radio',
                                    itemId: 'rdReCredFail',
                                    boxLabel: 'Recredentialing Fail Letter',
                                    inputValue: 'Recredentialing Fail Letter',
                                    name: 'lettersType'
                                },
                                {
                                    xtype: 'radio',
                                    itemId: 'rdWelcome',
                                    boxLabel: 'Welcome Letter',
                                    inputValue: 'Welcome Letter',
                                    name: 'lettersType'
                                },
                                {
                                    xtype: 'radio',
                                    itemId: 'rdReCredWelcome',
                                    disabled: 'true',
                                    boxLabel: 'Recredentialing Welcome Letter',
                                    inputValue: 'Recredentialing Welcome Letter',
                                    name: 'lettersType'
                                },
                                {
                                    xtype: 'radio',
                                    itemId: 'rdRelAddWelcome',
                                    boxLabel: 'Relationship Additions Welcome Letter',
                                    inputValue: 'Relationship Additions Welcome Letter',
                                    name: 'lettersType'
                                },
                                {
                                    xtype: 'radio',
                                    itemId: 'rdCredCriteria',
                                    boxLabel: 'Credentialing Criteria Not Met Letter',
                                    inputValue: 'Credentialing Criteria Not Met Letter',
                                    name: 'lettersType'
                                },

                                {
                                    xtype: 'radio',
                                    itemId: 'rdRefHoldReq',
                                    boxLabel: 'Refresh Hold Request Letter',
                                    inputValue: 'Refresh Hold Request Letter',
                                    name: 'lettersType'
                                },
                                {
                                    xtype: 'radio',
                                    itemId: 'rdRefHoldReqRel',
                                    boxLabel: 'Refresh Hold Request Letter - Relationship',
                                    inputValue: 'Refresh Hold Request Letter - Relationship',
                                    name: 'lettersType'
                                }
                            ],
                            listeners: {
                                change: 'setLettersButton'
                            }
                        },

                        {
                            xtype: 'textfield',
                            itemId: 'txtCritiria1',
                            fieldLabel: 'Criteria Not Met 1',
                            name : 'critNotMet1'

                        },
                        {
                            xtype: 'textfield',
                            itemId: 'txtCritiria2',
                            fieldLabel: 'Criteria Not Met 2',
                            name : 'critNotMet2'
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'dtAppDate',
                            disabled: 'true',
                            fieldLabel: 'Credentialing Committee Approval Date',
                            name : 'commApprovalDte',
                            allowBlank: false
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'dtContEffDate',
                            disabled: 'true',
                            fieldLabel: 'Contract Effective Date',
                            name : 'eonEffDate',
                            allowBlank: false
                        },
                        {
                            xtype: 'relationshiptypeahead',
                            itemId: 'cbxWelAddRelationship',
                            fieldLabel: 'Relationship',
                            displayField: 'name',
                            valueField: 'relationshipID',
                            forceSelection: true,
                            emptyText: '[e.g. CVS MI]',
                            allowBlank: false
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Fax Details',
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'txtFaxNumber',
                            fieldLabel: 'Fax Number'
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
                            itemId: 'btnDocSave',
                            handler: 'saveLetter'
                        },
                        {
                            text: 'Preview',
                            itemId: 'btnPreview',
                            handler: 'previewLetter'
                        },
                        {
                            text: 'Send fax',
                            itemId: 'btnSendFax',
                            handler: 'sendFax'
                        },
                        {
                            text: 'Send',
                            itemId: 'btnSend',
                            handler: 'sendLetter'
                        },
                        {
                            text: 'Cancel',
                            itemId: 'btnFaxCancel',
                            handler : function(btn){
                                btn.up('window').close()
                            }
                        }
                    ]
                }
            ]
        }
    ]
});