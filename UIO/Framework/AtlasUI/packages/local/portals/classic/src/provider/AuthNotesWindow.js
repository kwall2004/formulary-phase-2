/**
 * Created by c4539 on 1/9/2017.
 */
Ext.define('Atlas.portals.provider.AuthNotesWindow', {
    extend: 'Ext.Container',
    xtype: 'portalsProviderAuthNotesWindow',
    controller: 'providerportalsauthnoteswindow',
    items: [{
        xtype: 'gridpanel',
        reference: 'notesGridRef',
        height: 200,
        maxHeight: 200,
        minHeight: 200,
        listeners: {
            selectionchange: 'onGridSelectionChange'
        },
        columns: [{
            hidden: true,
            dataIndex: 'noteSeqNumber',
            text: 'Id'
        }, {
            dataIndex: 'createDate',
            text: 'Date'
        }, {
            maxWidth: 150,
            minWidth: 150,
            width: 150,
            dataIndex: 'noteSubject',
            text: 'Subject'
        }, {
            maxWidth: 200,
            minWidth: 200,
            width: 200,
            dataIndex: 'noteText',
            text: 'Note',
            renderer: function(value) {
                if (value.lastIndexOf('n Name: ') >= 0) {
                    return value.substring(0, value.lastIndexOf('n Name: '));
                }

                return value;
            }
        }, {
            maxWidth: 150,
            minWidth: 150,
            width: 150,
            dataIndex: 'noteContact',
            text: 'Contact'
        }, {
            maxWidth: 140,
            minWidth: 140,
            width: 140,
            dataIndex: 'noteOutcome',
            text: 'Outcome'
        }, {
            hidden: true,
            dataIndex: 'createUser',
            text: 'User'
        }]
    }, {
        xtype: 'form',
        reference: 'notesFormPanel',
        bodyPadding: 10,
        bbar: {
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                reference: 'addNotes',
                text: 'Add',
                handler: 'onAddNotesClick'
            }, {
                xtype: 'button',
                reference: 'saveNotes',
                text: 'Save',
                handler: 'onSaveNotesClick',
                disabled: true
            }, {
                xtype: 'button',
                reference: 'cancelNotes',
                text: 'Cancel',
                handler: 'onCancelNotesClick',
                disabled: true
            }]
        },
        items: [{
            xtype: 'combobox',
            anchor: '100%',
            name: 'noteSubject',
            reference: 'noteSubject',
            fieldLabel: 'Subject',
            readOnly: true,
            allowBlank: false,
            displayField: 'listDescription',
            valueField: 'listDescription',
            queryMode: 'local'
        }, {
            xtype: 'combobox',
            anchor: '100%',
            name: 'noteContact',
            reference: 'noteContact',
            fieldLabel: 'Contact',
            readOnly: true,
            allowBlank: false,
            displayField: 'listDescription',
            valueField: 'listDescription',
            queryMode: 'local',
            bind: {
                store: '{contacts}'
            }
        }, {
            xtype: 'container',
            layout: 'hbox',
            items: [{
                xtype: 'textfield',
                name: 'noteName',
                reference: 'noteName',
                fieldLabel: 'Name',
                readOnly: true,
                allowBlank: false,
                flex: 1
            }, {
                xtype: 'textfield',
                name: 'notePhone',
                reference: 'notePhone',
                maxWidth: 230,
                fieldLabel: 'Phone',
                labelAlign: 'right',
                labelPad: 2,
                labelWidth: 75,
                readOnly: true,
                allowBlank: false,
                minLength: 10
            }, {
                xtype: 'textfield',
                anchor: '100%',
                reference: 'noteExtension',
                name: 'noteExtension',
                labelWidth: 50,
                width: 150,
                fieldLabel: 'Ext',
                readOnly: true
            }]
        }, {
            xtype: 'textarea',
            anchor: '100%',
            reference: 'noteNote',
            name: 'noteNote',
            fieldLabel: 'Note',
            readOnly: true,
            allowBlank: false
        }]
    }]
});