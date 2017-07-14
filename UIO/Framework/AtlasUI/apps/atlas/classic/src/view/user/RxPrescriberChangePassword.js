Ext.define('Atlas.view.user.RxPrescriberChangePassword', {
    extend: 'Ext.window.Window',
    title: 'Change Password',
    width: 450,
    height: 200,
    closable: false,
    autoShow: true,
    modal: true,
    layout: 'center',

    controller: 'user-rxprescriberchangepassword',
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
                    text: 'Change',
                    reference: 'changeButton',
                    handler: 'onChange'
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
                xtype: 'textfield',
                anchor: '100%',
                msgTarget: 'side',
                minWidth: 420,
                labelWidth: 150
            },
            layout: 'anchor',
            items: [
                {
                    fieldLabel: 'Password',
                    name: 'pass',
                    itemId: 'pass',
                    allowBlank: false,
                    inputType: 'password',
                    listeners: {
                        validitychange: function (field) {
                            field.next().validate();
                        },
                        blur: function (field) {
                            field.next().validate();
                        }
                    }
                }, {
                    fieldLabel: 'Confirm Password',
                    allowBlank: false,
                    name: 'pass-cfrm',
                    vtype: 'password',
                    initialPassField: 'pass', // id of the initial password field
                    inputType: 'password'
                }
            ]
        }
    ]

});
