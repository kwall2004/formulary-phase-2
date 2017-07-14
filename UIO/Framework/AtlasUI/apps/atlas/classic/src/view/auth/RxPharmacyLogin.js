Ext.define('Atlas.view.auth.RxPharmacyLogin', {
    extend: 'Ext.window.Window',
    title: 'Rx Pharmacy Services Login',
    reference: 'loginWindow',
    width: 500,
    height: 210,
    closable: false,
    autoShow: true,
    modal: true,
    layout: 'center',
    viewModel: {
        data: {
            start: 'rxpharmacy'
        }
    },
    listeners:{
        boxready: 'onBoxReady',
        beforeclose: 'onBeforeClose'
    },
    controller: 'auth-rxpharmacylogin',
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
                '->',
                {
                    text: 'Forgot Password',
                    reference: 'forgotButton',
                    bind: {
                        disabled: '{!username.value}'
                    },
                    handler: 'onForgot'
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
                    reference: 'username',  // component's name in the ViewModel
                    publishes: 'value', // value is not published by default
                    name: 'un',
                    emptyText: 'username'
                },
                {
                    fieldLabel: 'Password',
                    reference: 'password',
                    name: 'pwd',
                    emptyText: 'password',
                    inputType: 'password'
                }
            ]
        }
    ]

});
