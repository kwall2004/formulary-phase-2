Ext.define('Atlas.view.auth.RxMemberPassword', {
    extend: 'Ext.window.Window',
    title: 'Forgot Password',
    width: 450,
    height: 300,
    closable: true,
    autoShow: true,
    modal: true,
    layout: 'center',
    viewModel: {
        stores: {
            listItems: {
                model: 'Atlas.portals.rxmember.model.CarriersPortal'
            }
        },
        data: {
            start: null
        }
    },
    controller: 'auth-rxmemberpassword',
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
                    reference: 'registrationStatus'
                }
            ]
        },
        {
            xtype: 'label',
            dock: 'top',
            cls: 'login-label',
            reference: 'regSuccessMsg'
        }
    ],
    defaultButton: 'resetButton',
    items: [
        {
            xtype: 'form',
            cls: 'card-panel',
            reference: 'forgotPasswordForm',
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                msgTarget: 'side',
                labelWidth: 180
            },
            layout: 'anchor',
            items: [
                {
                    name: 'userName',
                    fieldLabel: 'User Name',
                    allowBlank: false,
                    emptyText: 'Username'
                },
                {
                    vtype: 'email',
                    name: 'emailAddress',
                    fieldLabel: 'Email Address',
                    allowBlank: false,
                    emptyText: 'Email'
                },
                {
                    fieldLabel: 'Member ID',
                    name: 'memberid',
                    allowBlank: false,
                    emptyText: 'Member Id'
                },
                {
                    xtype: 'combo',
                    reference: 'planList',
                    name: 'planList',
                    fieldLabel: 'Select Plan',
                    allowBlank: false,
                    flex: 1,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'value',
                    listeners: {
                        beforerender: 'getListItems'
                    }
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Birth Date',
                    name: 'DOB',
                    format: 'm/d/Y',
                    msgTarget: 'side',
                    allowBlank: false,
                    emptyText: 'Date of Birth'
                },
                {
                    fieldLabel: 'New Password',
                    inputType: 'password',
                    name: 'password',
                    itemId: 'password',
                    allowBlank: false,
                    listeners: {
                        validitychange: function (field) {
                            field.next().validate();
                        },
                        blur: function (field) {
                            field.next().validate();
                        }
                    }
                }, {
                    fieldLabel: 'Confirm New Password',
                    inputType: 'password',
                    allowBlank: false,
                    name: 'confirmPassword',
                    initialPassField: 'password' // id of the initial password field
                }
            ]
        }
    ]

});