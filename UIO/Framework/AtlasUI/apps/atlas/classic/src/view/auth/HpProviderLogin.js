Ext.define('Atlas.view.auth.HpProviderLogin', {
    extend: 'Ext.window.Window',
    title: '<img style="float: left;" src="resources/images/login_icon.png" width="32" height="32"/><div style="padding: 8px 0 0 40px;">Meridian Provider Portal Secured Services Login</div>',
    reference: 'loginWindow',
    width: 500,
    height: 250,
    closable: false,
    autoShow: true,
    modal: true,
    layout: 'center',
    viewModel: {
        data: {
            start: 'hpprovider',
            status: 'Please enter information'
        }
    },
    listeners:{
        boxready: 'onBoxReady',
        beforeclose: 'onBeforeClose'
    },
    controller: 'auth-hpproviderlogin',
    dockedItems: [
        {
            xtype: 'toolbar',
            enableFocusableContainer: false,
            dock: 'bottom',
            items: [
                {
                    text: 'Register',
                    reference: 'registerButton',
                    handler: 'onRegister',
                    tabIndex: 4
                },
                '->',
                {
                    text: 'Forgot Password',
                    bind: {
                        disabled: '{!username.value}'
                    },
                    reference: 'forgotButton',
                    handler: 'onForgot',
                    tabIndex: 5
                },
                '->',
                {
                    text: 'Login',
                    reference: 'login',
                    bind: {
                        disabled: '{!username.value}'
                    },
                    handler: 'onLogin',
                    tabIndex: 3
                }
            ]
        }, {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'label',
                    cls: 'login-label',
                    bind: {
                        text: '{status}'
                    }
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
                    emptyText: 'username',
                    tabIndex: 1,
                    listeners: {
                        afterrender: function(field) {
                            field.focus(true);
                        }
                    }
                },
                {
                    fieldLabel: 'Password',
                    name: 'pwd',
                    emptyText: 'password',
                    inputType: 'password',
                    tabIndex: 2
                },
                {
                    xtype: 'combo',
                    reference: 'stateCombo',
                    fieldLabel: 'State',
                    store: {
                        fields: ['name'],
                        data: [
                            { name: 'IL' },
                            { name: 'MI' }
                        ]
                    },
                    displayField: 'name',
                    valueField: 'name',
                    name: 'stateCombo',
                    editable: false,
                    selectOnFocus: false,
                    tabIndex: 3
                }
            ]
        }
    ]
});