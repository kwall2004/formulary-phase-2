Ext.define('Atlas.view.auth.HpProviderPassword', {
    extend: 'Ext.window.Window',
    title: 'Forgot Password',
    width: 600,
    closable: false,
    autoShow: true,
    modal: true,
    layout: 'center',

    controller: 'auth-hpproviderpassword',
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
                    reference: 'resetButton',
                    handler: 'onReset'
                },
                {
                    text: 'Clear',
                    reference: 'clearButton',
                    handler: 'onClear'
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
            reference: 'forgotPasswordForm',
            minWidth: 580,
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                msgTarget: 'side',
                minWidth: 500,
                labelWidth: 200
            },
            layout: 'anchor',
            items: [
                {
                    fieldLabel: 'Username',
                    name: 'username',
                    emptyText: 'Enter your username',
                    allowBlank: false,
                    listeners: {
                        blur: 'onUserNameTextfieldBlur'
                    }
                },
                {
                    xtype: 'combo',
                    reference: 'stateCombo',
                    fieldLabel: 'State',
                    store: {
                        fields: ['name'],
                        data: [
                            {name: 'IL'},
                            {name: 'MI'}
                        ]
                    },
                    displayField: 'name',
                    valueField: 'name',
                    name: 'stateCombo',
                    allowBlank: false
                },
                {
                    fieldLabel: 'Email Address',
                    name: 'email',
                    emptyText: 'Enter your email address',
                    allowBlank: false
                },
                {
                    fieldLabel: 'Question 1',
                    name: 'question1',
                    emptyText: 'Enter the answer to Question 1',
                    allowBlank: false,
                    labelAlign: 'top',
                    padding: 5,
                    inputType: 'password'
                },
                {
                    fieldLabel: 'Question 2',
                    name: 'question2',
                    emptyText: 'Enter the answer to Question 2',
                    allowBlank: false,
                    labelAlign: 'top',
                    padding: 5,
                    inputType: 'password'
                }
            ]
        }
    ]

});