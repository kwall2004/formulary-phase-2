Ext.define('Atlas.view.auth.RxPrescriberLogin', {
    extend: 'Ext.window.Window',
    title: 'Rx Prescriber Login',
    reference: 'loginWindow',
    width: 500,
    height: 180,
    closable: false,
    autoShow: true,
    modal: true,
    layout: 'center',
    viewModel: {
        data: {
            start: 'rxprescriber'
        }
    },
    listeners:{
        boxready: 'onBoxReady',
        beforeclose: 'onBeforeClose'
    },
    controller: 'auth-rxprescriberlogin',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    text: 'Register',
                    reference: 'registerButton',
                    handler: 'onRegister'
                },
                {
                    text: 'Download Guide',
                    reference: 'downloadButton',
                    handler: 'onDownload'
                },
                '->',
                {
                    text: 'Forgot Password',
                    reference: 'forgotButton',
                    handler: 'onForgot'
                },
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
                    reference: 'username',  // component's name in the ViewModel
                    publishes: 'value', // value is not published by default
                    name: 'un',
                    emptyText: 'username'
                },
                {
                    fieldLabel: 'Password',
                    name: 'pwd',
                    emptyText: 'password',
                    inputType: 'password'
                }
            ]
        }
    ]

});