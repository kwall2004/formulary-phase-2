Ext.define('Atlas.view.auth.HpMemberValidation', {
    extend: 'Ext.window.Window',
    title: 'Membership Validation',
    width: 400,
    height: 240,
    closable: false,
    autoShow: true,
    modal: true,
    layout: 'center',
    viewModel: {
        stores:{
            questions: {
                model: 'Atlas.common.model.RxAuthQuestion',
                listeners:{
                    load: 'onQuestionLoad'
                },
                autoLoad: true
            }
        }
    },
    controller: 'auth-hpmembervalidation',
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
                    text: 'Validate',
                    reference: 'validateButton',
                    handler: 'onValidate'
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
                labelWidth: 100
            },
            layout: 'anchor',
            items: [
                {
                    xtype: 'combobox',
                    reference: 'question1',
                    fieldLabel: 'Security Question 1',
                    bind: {
                        store: '{questions}'
                    },
                    disabled: true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'value'
                },
                {
                    fieldLabel: 'Answer 1',
                    name: 'answer1',
                    allowBlank: false,
                    emptyText: 'Your answer to question 1'
                },
                {
                    xtype: 'combobox',
                    reference: 'question2',
                    fieldLabel: 'Security Question 2',
                    disabled: true,
                    bind: {
                        store: '{questions}'
                    },
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'value'
                },
                {
                    fieldLabel: 'Answer 2',
                    name: 'answer2',
                    allowBlank: false,
                    emptyText: 'Your answer to question 2'
                }
            ]
        }
    ]

});