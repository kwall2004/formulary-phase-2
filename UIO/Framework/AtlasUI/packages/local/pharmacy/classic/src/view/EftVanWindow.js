/**
 * Created by rsalekin on 11/9/2016.
 */
Ext.define('Atlas.pharmacy.view.EftVanWindow', {
    extend: 'Ext.window.Window',
    xtype: 'pharmacy-eftvanwindow',
    name: 'eftvanwindow',
    title: 'EFT/VAN Information',
    viewModel: 'eftvanwindow',
    controller: 'eftvanwindow',
    width: 900,
    height: 700,
    modal: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'tabpanel',
            flex: 1,
            height: '100%',
            width: '100%',
            layout: 'vbox',
            align: 'stretch',
            items: [
                {
                    xtype: 'form',
                    itemId: 'formPanelEFT',
                    title: 'EFT Information',
                    height: '100%',
                    width: '100%',
                    layout: 'vbox',
                    align: 'stretch',
                    items: [
                        {
                            xtype: 'panel',
                            flex: 1,
                            height: '100%',
                            width: '100%',
                            layout: 'hbox',
                            align: 'stretch',
                            items: [
                                {
                                    xtype: 'panel',
                                    flex: 5,
                                    height: '100%',
                                    width: '98%',
                                    overflowY: true,
                                    align: 'stretch',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            title: 'EFT Information',
                                            width: '100%',
                                            collapsible: true,
                                            defaults: {
                                                labelWidth: 110
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtTaxID',
                                                    name: 'TaxId',
                                                    fieldLabel: 'Tax ID',
                                                    maskRe: /[0-9]/,
                                                    maxLength: 9,
                                                    enforceMaxLength: 9,
                                                    minLength: 9,
                                                    allowBlank: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtBankName',
                                                    name: 'BankName',
                                                    fieldLabel: 'Bank Name',
                                                    allowBlank: false
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtBankAccountName',
                                                    name: 'BankAccountName',
                                                    fieldLabel: 'Account Name',
                                                    allowBlank: false
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtBankAccount',
                                                    name: 'BankAccountNum',
                                                    fieldLabel: 'Bank Account#',
                                                    maskRe: /[0-9]/,
                                                    maxLength: 16,
                                                    enforceMaxLength: 16,
                                                    allowBlank: false
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtBankRouting',
                                                    name: 'BankRouting',
                                                    fieldLabel: 'Bank Routing#',
                                                    maskRe: /[0-9]/,
                                                    maxLength: 9,
                                                    enforceMaxLength: 9,
                                                    minLength: 9,
                                                    allowBlank: false
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'txtAccountType',
                                                    name: 'accountType',
                                                    fieldLabel: 'Account Type',
                                                    forceSelection: true,
                                                    queryMode: 'local',
                                                    displayField: 'name',
                                                    valueField: 'value',
                                                    allowBlank: true,
                                                    bind: {
                                                        store: '{storeAccountTypleList}'
                                                    }
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cbxEFTStatus',
                                                    name: 'eftStatus',
                                                    fieldLabel: 'Status',
                                                    forceSelection: true,
                                                    queryMode: 'local',
                                                    displayField: 'name',
                                                    valueField: 'value',
                                                    allowBlank: false,
                                                    bind: {
                                                        store: '{storeEFTStatus}'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtBankContact',
                                                    name: 'BankContactName',
                                                    fieldLabel: 'Bank Contact'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtBankPhone',
                                                    fieldLabel: 'Bank Phone',
                                                    maskRe: /[0-9]/,
                                                    maxLength: 14,
                                                    enforceMaxLength: 14,
                                                    minLength: 14,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        'keypress': {
                                                            fn: 'formatPhoneNumber'
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'displayfield',
                                                            text: '',
                                                            width: 130
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            itemId: 'txtBankPhoneExt',
                                                            labelWidth: 50,
                                                            width: 150,
                                                            fieldLabel: 'ext',
                                                            labelAlign: 'right',
                                                            maskRe: /[0-9]/,
                                                            maxLength: 5,
                                                            enforceMaxLength: 5

                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textarea',
                                                    itemId: 'txtBankAddress',
                                                    name: 'BankAddress',
                                                    fieldLabel: 'Address'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtBankCity',
                                                    name: 'BankCity',
                                                    fieldLabel: 'City'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'txtBankState',
                                                    name: 'BankState',
                                                    fieldLabel: 'State',
                                                    forceSelection: true,
                                                    queryMode: 'local',
                                                    displayField: 'name',
                                                    valueField: 'value',
                                                    emptyText: '[Select a State]',
                                                    bind: {
                                                        store: '{storeStates}'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtBankZip',
                                                    name: 'BankZip',
                                                    fieldLabel: 'Zip',
                                                    maskRe: /[0-9]/
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    itemId: 'chkNoPaperEob',
                                                    labelWidth: 150,
                                                    fieldLabel: 'Disable Paper Remittance'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: 'ERA Contact',
                                            width: '100%',
                                            flex: 1,
                                            defaults: {
                                                labelWidth: 110
                                            },
                                            collapsible: true,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtVanContactName',
                                                    name: 'FTPContactName',
                                                    fieldLabel: 'Contact Name'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtVanContactPhone',
                                                    fieldLabel: 'Contact Phone',
                                                    maskRe: /[0-9]/,
                                                    maxLength: 14,
                                                    enforceMaxLength: 14,
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        'keypress': {
                                                            fn: 'formatPhoneNumber'
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'displayfield',
                                                            text: '',
                                                            width: 130
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            itemId: 'txtVanContactExt',
                                                            labelWidth: 50,
                                                            width: 150,
                                                            fieldLabel: 'ext',
                                                            labelAlign: 'right',
                                                            maskRe: /[0-9]/,
                                                            maxLength: 5,
                                                            enforceMaxLength: 5

                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txtVanEmail',
                                                    name: 'FTPContactEmail',
                                                    fieldLabel: 'Contact Email'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    height: '100%',
                                    width: '100%',
                                    flex: 5,
                                    align: 'stretch',
                                    layout: 'vbox',
                                    items: [
                                        {
                                            xtype: 'fieldset',
                                            title: 'Attachment',
                                            width: '100%',
                                            height: '100%',
                                            flex: 1,
                                            layout: 'vbox',
                                            items: [
                                                {
                                                    xtype: 'grid',
                                                    width: '100%',
                                                    height: '100%',
                                                    flex: 1,
                                                    itemId: 'gridEFTAttachment',
                                                    tbar: [
                                                        {
                                                            xtype: 'button',
                                                            text: 'Add',
                                                            itemId: 'btnAddEFTAttachment',
                                                            iconCls: 'fa fa-plus-circle',
                                                            handler: 'btnAddEFTAttachment_Click'
                                                        }
                                                    ],
                                                    columns: {
                                                        items: [
                                                            {
                                                                text: 'FileName',
                                                                dataIndex: 'fileName',
                                                                flex: 4.0
                                                            },
                                                            {
                                                                xtype: 'widgetcolumn',
                                                                hideable: false,
                                                                flex: 0.5,
                                                                widget: {
                                                                    xtype: 'button',
                                                                    text: '',
                                                                    iconCls: 'x-fa fa-paperclip',
                                                                    handler: 'openEFTAttachment'
                                                                }
                                                            },
                                                            {
                                                                xtype: 'widgetcolumn',
                                                                hideable: false,
                                                                flex: 0.5,
                                                                widget: {
                                                                    xtype: 'button',
                                                                    text: '',
                                                                    iconCls: 'x-fa fa-minus-circle',
                                                                    handler: 'deleteEFTAttachment'
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    bind: {
                                                        store: '{storeEFTAttachment}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            title: 'Notes',
                                            itemId: 'fsNotes',
                                            width: '100%',
                                            height: '100%',
                                            layout: 'vbox',
                                            flex: 1,
                                            items: [
                                                {
                                                    xtype: 'pharmacy.notes',
                                                    width: '100%',
                                                    height: '100%',
                                                    flex: 1,
                                                    parentSystemId: ''
                                                }
                                            ]
                                        }
                                    ]
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
                                text: 'Save',
                                iconCls: 'fa fa-save',
                                handler: 'btnSave_Click'
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnDeleteEFT',
                                disabled: true,
                                text: 'Delete',
                                iconCls: 'fa fa-close',
                                handler: 'btnDelete_Click'
                            }
                        ]
                    }
                },
                {
                    xtype: 'panel',
                    title: 'Payment Center Information',
                    height: '100%',
                    width: '100%',
                    overflowY: true,
                    flex: 1,
                    align: 'stretch',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            height: '100%',
                            width: '100%',
                            title: 'Payment Center Information',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblID',
                                    value: 'Payment Center'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblPMName',
                                    value: 'Payment Center AAA'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblPMAddress1',
                                    value: 'Address'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblPMCityState',
                                    value: 'City State'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            height: '100%',
                            width: '100%',
                            title: 'Payment Center Contact Information',
                            layout: 'vbox',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Contact Name',
                                    itemId: 'lblPMContactName'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Contact Title',
                                    itemId: 'lblPMContactTitle'
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Phone',
                                    itemId: 'lblPMPhone',
                                    renderer: function (value) {
                                        return Atlas.common.Util.formatPhone(value);
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Fax',
                                    itemId: 'lblPMFax',
                                    renderer: function (value) {
                                        return Atlas.common.Util.formatfax(value);
                                    }
                                },

                                {
                                    xtype: 'displayfield',
                                    fieldLabel: 'Email',
                                    itemId: 'lblPMEmail'

                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            itemId: 'hdnContainer_EftVan',
            hidden: true,
            items: [
                {xtype: 'hidden', itemId: 'hiddenEPayCenterID'},
                {xtype: 'hidden', itemId: 'hiddenEFTSystemID'}
            ]
        }
    ]
});