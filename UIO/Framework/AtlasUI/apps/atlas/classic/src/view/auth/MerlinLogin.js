Ext.define('Atlas.view.auth.MerlinLogin', {
    extend: 'Ext.window.Window',
    cls:'loginWindow',
    title: 'Login',
    reference: 'loginWindow',
    width: 500,
    height: 220,
    closable: false,
    autoShow: true,
    layout: 'center',
    viewModel: {
        data: {
            start: 'merlin'
        }
    },
    listeners:{
        boxready: 'onBoxReady',
        beforeclose: 'onBeforeClose'
    },
    controller: 'auth-merlinlogin',
    dockedItems: [
        {
            xtype: 'toolbar',
             cls:'loginToolbar',
            dock: 'bottom',
            items: [
                {
                    text: 'Password Reset',
                    reference: 'resetButton',
                    handler: 'onReset'
                },
                '->',
                {
                    text: 'Login',
                    reference: 'login',
                    bind: {
                        disabled: '{!username.value}'
                    },
                    handler: 'onLogin'
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
    defaultButton: 'login',
    items: [
        {
            xtype: 'form',
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                msgTarget: 'side',
                labelWidth: 100
            },
            layout: 'anchor',
            items: [
                {
                    fieldLabel: 'Username',
                    allowBlank: false,
                    blankText:'Your username is required.',
                    reference: 'username',  // component's name in the ViewModel
                    itemId: 'username',
                    publishes: 'value', // value is not published by default
                    name: 'un',
                    emptyText: 'username'
                },
                {
                    fieldLabel: 'Password',
                    allowBlank: false,
                    reference: 'password',
                    itemId: 'password',
                    blankText:'Your password is required.',
                    name: 'pwd',
                    emptyText: 'password',
                    inputType: 'password'
                },
                {
                    xtype: 'label',
                    cls: 'login-label',
                    text: '* Username and Password are case sensitive.',
                    reference: 'warning'
                }
            ]
        }
    ]

});