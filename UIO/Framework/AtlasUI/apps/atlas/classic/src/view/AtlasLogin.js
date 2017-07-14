Ext.define('Atlas.view.AtlasLogin', {
    extend: 'Ext.window.Window',
    title: 'Choose Start Screen',
    reference: 'login',

    viewModel: {
        data: {
            start: null  //if null then combo is used
        }
    },
    controller: 'atlaslogin',
    height: 240,
    width: 500,
    closable: false,
    autoShow: true,
    layout: 'center',
    modal: true,
    defaultButton: 'login',
    listeners:{
        boxready: 'onBoxReady',
        beforeclose: 'onBeforeClose'
    },
    /*
     dockedItems: [
     {
     xtype: 'toolbar',
     dock: 'bottom',
     items: [
     {
     text: 'Password Reset',
     reference: 'resetButton',
     hidden: true,
     handler: 'onReset'
     },
     {
     text: 'Forgot Password',
     reference: 'forgotButton',
     hidden: true,
     handler: 'onForgot'
     },
     {
     text: 'Register',
     reference: 'registerButton',
     hidden: true,
     handler: 'onRegister'
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
     }],*/

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
                    fieldLabel: 'Start screen',
                    xtype: 'combo',
                    name: 'start',
                    allowBlank: false,
                    listeners: {
                        change: 'onChange'
                    },
                    store: {
                        fields: ['abbr', 'name'],
                        data: [
                            {"abbr": "merlin", "name": "Merlin"},
                            {"abbr": "rxmember", "name": "Member Rx"},
                            {"abbr": "hpmember", "name": "Member MHP"},
                            {"abbr": "rxpharmacy", "name": "Pharmacy Rx"},
                            {"abbr": "hpprovider", "name": "Provider"},
                            {"abbr": "rxprescriber", "name": "Prescriber"}
                        ]
                    },
                    queryMode: 'local',
                    value: '',
                    displayField: 'name',
                    valueField: 'abbr'
                }/*,
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
                 },
                 {
                 xtype: 'checkbox',
                 fieldLabel: 'Remember me',
                 hidden: true,
                 name: 'remember'
                 }*/
            ]
        }
    ]
});