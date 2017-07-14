Ext.define('Atlas.finance.view.bank.BankMasterForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.finance-bankmasterform',

    controller: 'finance-bankmasterform',
    viewModel: 'finance-bankmaster',

    recBankAcctMaster: null,
    addOrEdit: null,

    layout: 'hbox',
    reference: 'BankMasterForm',
    defaults: {
        xtype: 'container',
        flex: 1
    },
    items: [
        {
            defaults: {
                xtype: 'textfield',
                flex: 1,
                labelWidth: 110
            },
            items: [
                {
                    xtype: 'combobox',
                    fieldLabel: 'Bank',
                    //name: 'bank',
                    name: 'bankCode',
                    allowBlank: false,
                    reference: 'bankcodecombo',
                    valueField: 'value',
                    displayField: 'name',
                    queryMode: 'local',
                    bind: {
                        store: '{cbxBank}'
                    }
                },
                {
                    fieldLabel: 'Account No',
                    name: 'accountNum',
                    reference: 'refaccountNum',
                    allowBlank: false
                },
                {
                    fieldLabel: 'Account Desc',
                    name: 'AcctDescription',
                    reference: 'refAcctDescription',
                    allowBlank: false
                },
                {
                    fieldLabel: 'Last Check No',
                    name: 'lastCheckNum',
                    xtype: 'numberfield',
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false
                },
                {
                    fieldLabel: 'Last EFT No',
                    name: 'lastEFTnum',
                    xtype: 'numberfield',
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false
                },
                {
                    xtype: 'checkbox',
                    fieldLabel: 'Sungard Memo',
                    name: 'sungardMemoChecks',
                    labelWidth: 115
                }
            ]
        },
        {
            defaults: {
                xtype: 'textfield',
                flex: 1,
                labelWidth: 110
            },
            items: [
                {
                    fieldLabel: 'Company ID',
                    name: 'companyId'
                },
                {
                    fieldLabel: 'Company Name',
                    name: 'companyName'
                },
                {
                    fieldLabel: 'Origin ID',
                    name: 'originId'
                },
                {
                    fieldLabel: 'Origin Name',
                    name: 'originName'
                },
                {
                    fieldLabel: 'Origin DFI',
                    name: 'originDFI'
                }
            ]
        }
    ],

    dockedItems:[{
        xtype:'toolbar',
        dock:'bottom',
        items:[
            '->',
            {xtype: 'button', /*text:'Save',*/ iconCls:'x-fa fa-save', bind: {text: '{title}'}, handler: 'onSaveClick', formBind: true},
            {xtype: 'button', text:'Cancel', iconCls:'x-fa fa-remove', handler: 'onCancelClick'},
            {xtype: 'button', text:'Notes', iconCls:'x-fa fa-sticky-note-o', handler: 'onNotesClick', disabled: true}
        ]
    }]
});