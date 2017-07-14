Ext.define('Atlas.portals.view.hpmember.SecretQASetup', {
    extend: 'Ext.window.Window',
    xtype: 'hpmember-secretqasetup',
    controller: 'secretqasetupcontroller',
    title: 'Secret Question/Answer Setup',
    modal: true,
    closable: false,
    onEsc: Ext.emptyFn, // prevent esc from closing window
    width: 600,

    viewModel: {
        stores: {
            secretQuestions: {
                type: 'provider-listitem',
                pListName: 'SecretQuestions',
                includeAll: false,
                autoLoad: true,
                sorter: 'name'
            }
        },
        data: {
            hideCancelButton: true
        }
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',

        defaults: {
            xtype: 'button'
        },

        items: [
            '->',
            {
                text: 'Save Secret Answers',
                handler: 'onSaveClick'
            },
            {
                text: 'Clear',
                handler: 'onClearClick'
            },
            {
                text: 'Cancel',
                handler: 'onCancelClick',
                bind: {
                    hidden: '{hideCancelButton}'
                }
            },
            '->']
    }],

    items: [{
        xtype: 'form',
        reference: 'secretQAFrom',
        defaults: {
            padding: 10,
            width: 550
        },
        fieldDefaults: {
            msgTarget: 'side' // if set to side, the validation indicators show up to the far right
        },
        items: [
            {
                xtype: 'displayfield',
                value: 'Answer any two of the following questions (answers are case insensitive)'
            },
            {
                xtype: 'combobox',
                name: 'q1',
                fieldLabel: 'Question #1',
                displayField: 'name',
                valueField: 'id',
                forceSelection: true,
                allowBlank: false,
                queryMode: 'local',
                autoLoad: true,
                bind: {
                    store: '{secretQuestions}'
                }
            },
            {
                xtype: 'textfield',
                name: 'a1',
                fieldLabel: 'Answer #1',
                allowBlank: false
            },
            {
                xtype: 'combobox',
                name: 'q2',
                reference: 'q2',
                fieldLabel: 'Question #2',
                displayField: 'name',
                valueField: 'id',
                forceSelection: true,
                allowBlank: false,
                queryMode: 'local',
                autoLoad: true,
                bind: {
                    store: '{secretQuestions}'
                }
            },
            {
                xtype: 'textfield',
                name: 'a2',
                fieldLabel: 'Answer #2',
                allowBlank: false
            },
            {
                xtype: 'checkbox',
                name: 'remember',
                uncheckedValue: false,
                boxLabel: 'Remember me on this computer'
            }
        ]
    }]
});