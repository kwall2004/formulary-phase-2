Ext.define('Atlas.view.auth.HpMemberPassword', {
    extend: 'Ext.window.Window',
    title: 'Forgot Password',
    width: 600,
    closable: false,
    autoShow: true,
    modal: true,
    layout: 'center',
    viewModel: {
        data: {
            start: null
        }
    },
    controller: 'auth-hpmemberpassword',
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
            reference: 'resetForm',
            defaults: {
                xtype: 'textfield',
                allowBlank: false
            },
            layout: 'anchor',
            items: [
                {
                    fieldLabel: 'User Id',
                    name: 'userId',
                    reference: 'userId',
                    hidden: true
                },
                {
                    fieldLabel: 'Member Id',
                    name: 'memberId',
                    labelWidth: 110,
                    reference: 'memberId',
                    bind:{
                        value: '{username}'
                    },
                    readOnly: true
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Birth Date',
                    name: 'birthdate',
                    labelWidth: 110,
                    emptyText: 'Date of Birth'
                },
                {
                    fieldLabel: 'Q1-id - SHOULD BE HIDDEN',
                    name: 'question1',
                    reference: 'question1',
                    hidden: true,
                    allowBlank: true
                },
                {
                    fieldLabel: 'Q2-id - SHOULD BE HIDDEN',
                    name: 'question2',
                    reference: 'question2',
                    hidden: true,
                    allowBlank: true
                },
                {
                    fieldLabel: 'Your first question is...',
                    margin: '25 7 0 0',
                    padding: 5,
                    width: 510,
                    labelAlign: 'top',
                    name: 'answer1',
                    reference: 'answer1',
                    inputType: 'password'
                },
                {
                    fieldLabel: 'Your next question is...',
                    padding: 3,
                    width: 510,
                    labelAlign: 'top',
                    name: 'answer2',
                    reference: 'answer2',
                    inputType: 'password'
                }
            ]
        }
    ]

});