Ext.define('Atlas.view.auth.RxPrescriberPassword', {
    extend: 'Ext.window.Window',
    title: 'Forgot Password',
    width: 500,
    height: 300,
    closable: false,
    autoShow: true,
    modal: true,
    layout: 'center',
    viewModel: {
        stores: {
            questions: {
                model: 'Atlas.common.model.RxAuthQuestion',
                // listeners: {
                //     load: 'onQuestionLoad'
                // },
                autoLoad: true
            }
        },
        data: {
            start: null
        }
    },
    controller: 'auth-rxprescriberpassword',
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
                    bind: '{statusMessage}',
                    flex: 1
                }
            ]
        }],
    defaultButton: 'resetButton',
    items: [
        {
            xtype: 'form',
            minWidth: 460,
            defaults: {
                xtype: 'textfield',
                anchor: '100%',
                msgTarget: 'side',
                minWidth: 450,
                labelWidth: 160
            },
            layout: 'anchor',
            items: [
                {
                    fieldLabel: 'State License Number',
                    name: 'lic',
                    emptyText: 'Enter license number',
                    allowBlank: false
                },
                {
                    xtype: 'numberfield',
                    fieldLabel: 'NPI',
                    name: 'npi',
                    emptyText: 'Enter your NPI',
                    listeners: {
                        blur: 'getForgotPasswordQuestions'
                    }
                },
                {
                    fieldLabel: 'DEA Number',
                    name: 'dea',
                    emptyText: 'Enter DEA',
                    listeners: {
                        blur: 'getForgotPasswordQuestions'
                    }
                },
                {
                    xtype: 'combobox',
                    name: 'question1',
                    reference: 'question1',
                    fieldLabel: 'Security Question 1',
                    bind: {
                        store: '{questions}'
                    },
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'value',
                    allowBlank: false,
                    readOnly: true
                },
                {
                    fieldLabel: 'Answer 1',
                    name: 'answer1',
                    emptyText: 'Your answer to question 1',
                    allowBlank: false
                },
                {
                    xtype: 'combobox',
                    name: 'question2',
                    reference: 'question2',
                    fieldLabel: 'Security Question 2',
                    bind: {
                        store: '{questions}'
                    },
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'value',
                    allowBlank: false,
                    readOnly: true
                },
                {
                    fieldLabel: 'Answer 2',
                    name: 'answer2',
                    emptyText: 'Your answer to question 2',
                    allowBlank: false
                }
            ]
        }
    ]
});