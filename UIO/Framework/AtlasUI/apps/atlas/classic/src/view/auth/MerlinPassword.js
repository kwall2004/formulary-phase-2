Ext.define('Atlas.view.auth.MerlinPassword', {
    extend: 'Ext.window.Window',
    title: 'Reset Password',
    width: 350,
    height: 170,
    closable: false,
    autoShow: true,
    modal: true,
    layout: 'center',
    viewModel: {
        data: {
            start: null
        }
    },
    controller: 'auth-merlinpassword',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    text: 'Cancel',
                    reference: 'cancelButton',
                    handler: 'onCancel'
                },
                '->',
                {
                    text: 'Reset',
                    reference: 'reset',
                    bind: {
                        disabled: '{!email.value}'
                    },
                    handler: 'doReset'
                }
            ]
        }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'label',
                    cls: 'login-label',
                    text: 'Please enter information',
                    reference: 'status'
                }
            ]
        }],
    defaultButton: 'resetButton',
    items: [
        {
            xtype: 'form',
            defaults: {
                anchor: '90%',
                xtype: 'textfield',
                labelWidth: 120
            },
            items: [
                {
                    fieldLabel: 'Username',
                    reference: 'username',  // component's name in the ViewModel
                    publishes: 'value', // value is not published by default
                    name: 'un',
                    allowBlank: false,
                    emptyText: 'username',
                    bind: '{username}'
                },
                {
                    fieldLabel: 'Email Id',
                    name: 'email',
                    allowBlank: false,
                    emptyText: 'ex: john@doe.com'
                }
            ]
        }
    ]

});