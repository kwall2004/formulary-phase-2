Ext.define('Atlas.view.auth.HpMemberSecretQAValidate', {
    extend: 'Ext.window.Window',
    xtype: 'hpmember-secretqavalidate',
    title: 'Secret Question/Answer Validation',
    width: 600,
    closable: false,
    onEsc: Ext.emptyFn, // prevent esc from closing window
    autoShow: true,
    modal: true,
    layout: 'center',
    viewModel: {
        data: {
            start: null
        }
    },
    controller: 'auth-hpmembersecretqavalidation',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    text: 'Validate Secret Answers',
                    reference: 'validateButton',
                    handler: 'onValidate'
                },
                '->',
                {
                    text: 'Clear',
                    reference: 'clearButton',
                    handler: 'onClear'
                },
                {
                    text: 'Cancel',
                    reference: 'cancelButton',
                    handler: 'onCancel'
                }
            ]
        }],
    defaultButton: 'validateButton',
    items: [
        {
            xtype: 'form',
            reference: 'validateForm',
            defaults: {
                xtype: 'textfield',
                allowBlank: false
            },
            layout: 'anchor',
            items: [
                {
                    xtype: 'displayfield',
                    value: 'Answer your selected questions (answers are case in-sensitive)'
                },
                {
                    bind: {
                        fieldLabel: '{Q1}'
                    },
                    padding: 5,
                    width: 510,
                    labelAlign: 'top',
                    name: 'answer1',
                    reference: 'answer1',
                    inputType: 'password',
                    listeners: {
                        afterrender: function(field) {
                            field.focus(true);
                        }
                    }
                },
                {
                    bind: {
                        fieldLabel: '{Q2}'
                    },
                    padding: 5,
                    width: 510,
                    labelAlign: 'top',
                    name: 'answer2',
                    reference: 'answer2',
                    inputType: 'password'
                },
                {
                    xtype: 'checkbox',
                    name: 'remember',
                    uncheckedValue: false,
                    boxLabel: 'Remember me on this computer'
                }
            ]
        }
    ]

});