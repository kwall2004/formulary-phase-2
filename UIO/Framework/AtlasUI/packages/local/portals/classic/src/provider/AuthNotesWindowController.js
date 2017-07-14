/**
 * Created by c4539 on 1/9/2017.
 */
Ext.define('Atlas.portals.provider.AuthNotesWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.providerportalsauthnoteswindow',

    init: function() {
        this.loadNotes();
        this.loadNoteSubjects();
        this.loadNoteContacts();
    },

    loadNotes: function() {
        var notesStore = this.getView().getViewModel().getStore('notes'),
            grid = this.lookupReference('notesGridRef'),
            whereClause = '(parentTableName=\\"memberODCDServices\\" AND parentTableSystemID=' +
                this.getView().getViewModel().get('systemId') + ')';

        var IOparamData = '{"ttParameters": [  ' +
            '{     "parameterName": "pSessionID",     "parameterValue": "' + Atlas.user.sessionId + '"   },   ' +
            '{     "parameterName": "pActionType",     "parameterValue": "get"   },   ' +
            '{     "parameterName": "pScreenName",     "parameterValue": "portalNotes"   },   ' +
            '{     "parameterName": "pUserName",     "parameterValue": "' + Atlas.user.un + '" },   ' +
            '{     "parameterName": "pRowid",     "parameterValue": null   },   ' +
            '{     "parameterName": "pRowNum",     "parameterValue": "0"   },   ' +
            '{     "parameterName": "pRows",     "parameterValue": "999"   },   ' +
            '{     "parameterName": "pWhere",     "parameterValue": "' + whereClause +'"   },   ' +
            '{     "parameterName": "pResultWhereStmt",     "parameterValue": "' + "" + '"   },   ' +
            '{     "parameterName": "pSort",     "parameterValue": ""   },   ' +
            '{     "parameterName": "pIncludeFields",     "parameterValue": ""   },   ' +
            '{     "parameterName": "pExcludeFields",     "parameterValue": ""   },   ' +
            '{     "parameterName": "viJSON",     "parameterValue": "{' + '\\"ttnotesMaster' +
            '\\": [\\n]}\\n"   } ' + ']}';

        notesStore.getProxy().setExtraParam('pParamsIO', IOparamData);
        notesStore.load({
            callback: function(response, operation) {
                var results = Ext.JSON.decode(operation._response.responseText).data.ttnotesMaster;
                if (!results) { return; }
                var gridStore = new Ext.data.ArrayStore({});
                gridStore.add(results);
                grid.setStore(gridStore);
            }
        });
    },

    loadNoteSubjects: function() {
        var combo = this.lookupReference('noteSubject');

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'shared/hp/listitemdata6/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pListName: 'ODAGNoteSubjectWeb',
                userState: Atlas.user.providerStateSelected
            }),
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                var subjectStore = new Ext.data.ArrayStore({});
                subjectStore.add(obj.data);
                combo.setStore(subjectStore);
            }
        });
    },

    loadNoteContacts: function() {
        var combo = this.lookupReference('noteContact'),
            contactsStore = this.getView().getViewModel().getStore('contacts');

        contactsStore.getProxy().setExtraParam('pListName', 'grContactWeb');
        contactsStore.load();
    },

    onGridSelectionChange: function(model, selected, eOpts) {
        var form = this.lookupReference('notesFormPanel'),
            notes = '',
            extIndex = 0;

        form.reset();
        this.lookupReference('cancelNotes').disable();
        this.lookupReference('addNotes').enable();
        this.lookupReference('saveNotes').disable();
        form.loadRecord(selected[0]);
        notes = selected[0].data.noteText;
        if (notes.lastIndexOf('n Name: ') >= 0) {
            extIndex = notes.lastIndexOf('n Extension: ') > 0 ? notes.lastIndexOf('n Extension: ') : notes.lastIndexOf('n Extension:');
            this.lookupReference('noteNote').setValue(notes.substring(0, notes.lastIndexOf('n Name: ')));
            this.lookupReference('noteName').setValue(notes.substring(notes.lastIndexOf('n Name: ') + 8, notes.lastIndexOf('n Phone: ')));
            this.lookupReference('notePhone').setValue(notes.substring(notes.lastIndexOf('n Phone: ') + 9, extIndex));
            this.lookupReference('noteExtension').setValue(notes.substring(extIndex + 13, notes.length));
        } else {
            this.lookupReference('noteNote').setValue(notes);
        }
    },

    onAddNotesClick: function() {
        this.lookupReference('notesFormPanel').reset();
        this.lookupReference('noteSubject').focus();
        this.lookupReference('noteSubject').setReadOnly(false);
        this.lookupReference('noteContact').setReadOnly(false);
        this.lookupReference('noteNote').setReadOnly(false);
        this.lookupReference('noteName').setReadOnly(false);
        this.lookupReference('notePhone').setReadOnly(false);
        this.lookupReference('noteExtension').setReadOnly(false);

        this.lookupReference('addNotes').disable();
        this.lookupReference('saveNotes').enable();
        this.lookupReference('cancelNotes').enable();
    },

    onSaveNotesClick: function() {
        var form = this.lookupReference('notesFormPanel'),
            params = form.getValues(),
            notesModel = Ext.create('Atlas.portals.provider.model.NotesMasterApi', {}),
            IOparamData = '',
            vNote = '',
            me = this;

        if (!form.isValid()) {
            Ext.Msg.alert('Notes Validation Error', 'Fields marked are required fields.');
            return;
        }

        vNote = params.noteNote.replace(/[^A-z.,?!@#$%&*+-=0-9]/ig,' ').replace(/\n/g, "\\\\n ").replace(/\//g, "-").replace(/"/g, "-").replace(/'/g, "-");
        vNote = vNote + '\\\\n Name: ' + params.noteName + '\\\\n Phone: ' + params.notePhone + '\\\\n Extension: ' + params.noteExtension;

        IOparamData = '{"ttParameters": [  ' +
            '{     "parameterName": "pSessionID",     "parameterValue": "' + Atlas.user.sessionId + '"   },   ' +
            '{     "parameterName": "pActionType",     "parameterValue": "set"   },   ' +
            '{     "parameterName": "pScreenName",     "parameterValue": "portalNotes"   },   ' +
            '{     "parameterName": "pUserName",     "parameterValue": "' + Atlas.user.un + '"   },   ' +
            '{     "parameterName": "pRowid",     "parameterValue": null   },   ' +
            '{     "parameterName": "pRowNum",     "parameterValue": "0"   },   ' +
            '{     "parameterName": "pRows",     "parameterValue": "999"   },   ' +
            '{     "parameterName": "pWhere",     "parameterValue": "' + '' +'"   },   ' +
            '{     "parameterName": "pResultWhereStmt",     "parameterValue": "' + '' + '"   },   ' +
            '{     "parameterName": "pSort",     "parameterValue": ""   },   ' +
            '{     "parameterName": "pIncludeFields",     "parameterValue": ""   },   ' +
            '{     "parameterName": "pExcludeFields",     "parameterValue": "createdate"   },   ' +
            '{     "parameterName": "viJSON",     "parameterValue": "'+
            '{\\"ttnotesMaster\\":[{ \\"dbaction\\":\\"create\\", '+
            ' \\"parentTableName\\":\\"memberODCDServices\\", '+
            ' \\"parentTableSystemID\\":' + me.getView().getViewModel().get('systemId') + ', '+
            ' \\"noteSeqNumber\\":'+ 0 +', '+
            ' \\"noteContact\\":\\"'+ params.noteContact +'\\", '+
            ' \\"noteSubject\\":\\"'+ params.noteSubject +'\\", '+
            ' \\"noteText\\":\\"'+ vNote +'\\" '+
            ' }\\n]}\\n"   '+
            '} ]}';

        notesModel.getProxy().setExtraParam('pParamsIO', IOparamData);
        notesModel.load({
            callback: function(record) {
                var note = record.get('ttnotesMaster');
                if (!note || note.length === 0) {
                    Ext.Msg.alert('Error', 'An error occurred while saving the record.');
                    return;
                }

                me.loadNotes();
                form.reset();
            }
        });

        this.lookupReference('noteSubject').setReadOnly(true);
        this.lookupReference('noteContact').setReadOnly(true);
        this.lookupReference('noteNote').setReadOnly(true);

        this.lookupReference('addNotes').enable();
        this.lookupReference('cancelNotes').disable();
        this.lookupReference('saveNotes').disable();
    },

    onCancelNotesClick: function() {
        this.lookupReference('notesFormPanel').reset();
        this.lookupReference('cancelNotes').disable();
        this.lookupReference('addNotes').enable();
        this.lookupReference('saveNotes').disable();
    }
});