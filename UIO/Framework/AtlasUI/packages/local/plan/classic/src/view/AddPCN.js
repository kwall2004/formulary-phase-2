Ext.define('Atlas.plan.view.AddPCN', {
    extend: 'Ext.window.Window',
    controller: 'plan-addpcn',
    //viewModel: 'plan-planpcnsetup',
    title: 'Add PCN Details',
    modal: true,

    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },

    items: [
        {
            xtype: 'form',
            itemId: 'addPCNForm',
            defaults: {
                frame: true,
                bodyPadding: 10,
                labelWidth:140,
                width:410,
                margin: 10
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Carrier name',
                name: 'carrierName',
                disabled: true
            }, {
                xtype: 'textfield',
                fieldLabel: 'Account name',
                name: 'carrierAcctName',
                disabled: true
            }, {
                xtype: 'textfield',
                fieldLabel: 'LOB',
                name: 'carrierLOBName',
                disabled: true
            }, {
                xtype: 'textfield',
                fieldLabel: 'PCN Code',
                name: 'pcnCode',
                allowBlank: false,
                reference:'pcnCode'

            }, {
                xtype: 'textfield',
                fieldLabel: 'PCN Desc',
                allowBlank: false,
                name: 'pcnDesc'
            }, {
                xtype: 'textfield',
                fieldLabel: 'RxBIN',
                allowBlank: false,
                name: 'BIN'
            }, {
                fieldLabel: 'DMR LOB Name',
                xtype: 'combo',
                allowBlank: false,
                forceSelection: true,
                name: 'dmrLobName',

                bind: {
                    store: '{planlineofbusiness}'
                },
                reference: 'dmrLobName',
                displayField: 'ListDescription',
                valueField: 'ListItem',
                autoLoadOnValue: true

            }, {
                xtype: 'textfield',
                fieldLabel: 'DMR Customer Code',
                allowBlank: false,
                name: 'dmrCustCode'

            }, {
                fieldLabel: 'Multi Account',
                labelWidth:150,
                xtype: 'checkbox',
                name: 'multiAccount'
            }],

            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                items: ['->', {
                    xtype: 'button',
                    text: 'Save',
                    handler: 'onSaveForm'

                }, {
                    xtype: 'button',
                    text: 'Cancel',
                    handler: 'onCancelClick'
                }]

            }]
        }
    ]
});
