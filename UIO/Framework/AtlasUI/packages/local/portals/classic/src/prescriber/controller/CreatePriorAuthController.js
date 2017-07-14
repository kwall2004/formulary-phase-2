Ext.define('Atlas.portals.prescriber.controller.CreatePriorAuthController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.portalsPrescriberCreatePriorAuthController',

    listen: {
        controller: {
            'fileattachmentwindowcontroller': {
                fileUploaded: 'onFileUploaded'
            }
        }
    },

    init: function() {
        var prescriberMasterModel = Ext.create('Atlas.portals.prescriber.model.PrescriberUserMaster', {}),
            user = Ext.first('viewport').getViewModel().getData().user,
            form = this.lookupReference('priorAuthForm'),
            vm = this.getViewModel(),
            keyType = this.getView().keyType,
            keyValue = this.getView().keyValue,
            viewOnly = this.getView().viewOnly,
            authStatus = this.getView().authStatus,
            me = this;

        if (viewOnly) { vm.set('viewOnly', true); vm.set('submitDisabled', true); }
        if (authStatus && authStatus.toLowerCase() === 'approved') {
            vm.set('viewOnly', false);
            vm.set('submitDisabled', true);
        }
        if ((!keyType && !keyValue) || keyType === 'ClaimId') {
            vm.set('submitDisabled', true);
        }

        this.loadGenders();
        this.loadHeight();

        if (!keyType && !keyValue) {
            prescriberMasterModel.getProxy().setExtraParam('pSessionID', user.retSessionID);
            prescriberMasterModel.getProxy().setExtraParam('pUserName', user.un);
            prescriberMasterModel.load({
                success: function (prescriber) {
                    form.loadRecord(prescriber);
                    me.initialFormatPhone();
                }
            });
            return;
        }

        this.getPriorAuth(keyType, keyValue, false);
    },

    onMemberSelected: function(combo, record) {
        var genderCombo = this.lookupReference('MemberGender'),
            gender = record.get('gender') === 'M' ? 'Male' : 'Female';

        genderCombo.setValue(gender);
        this.lookupReference('memberDOB').setValue(record.get('dob'));
        this.lookupReference('RecipientId').setValue(record.get('recipientID'));
        this.lookupReference('MemberId').setValue(record.get('memberID'));
        this.loadMemberAllergies(record.get('recipientID'));
    },

    showMemberWindow: function() {
        Ext.create('Ext.window.Window', {
            title: 'Member Access',
            modal: true,
            reference: 'memberAccessWindow',
            items: {
                xtype: 'portalsprescribermemberaccesswindow'
            }
        }).show();
    },

    onMedicationSelected: function(combo, record) {
        this.lookupReference('Strength').setValue(record.get('Strength'));
        this.lookupReference('GCNSeqNo').setValue(record.get('GCN_SEQNO'));
        this.lookupReference('NDC').setValue(record.get('NDC'));
    },

    loadMemberAllergies: function(recipientId) {
        var user = Ext.first('viewport').getViewModel().getData().user,
            memberAllergiesStore = this.getViewModel().getStore('memberAllergies');

        memberAllergiesStore.getProxy().setExtraParam('pSessionID', user.retSessionID);
        memberAllergiesStore.getProxy().setExtraParam('pRecipientId', recipientId);
        memberAllergiesStore.load();
    },

    loadGenders: function() {
        var genderCombo = this.lookupReference('MemberGender'),
            genderStore = {};

        genderStore = new Ext.data.ArrayStore({
            fields: ['text', 'value'],
            data: [['Male', '1'], ['Female', '2']]
        });

        genderCombo.setStore(genderStore);
    },

    loadHeight: function() {
        var ftCombo = this.lookupReference('heightFt'),
            inCombo = this.lookupReference('heightIn'),
            ftStore = {},
            inStore = {};

        ftStore = new Ext.data.ArrayStore({
            fields: ['value'],
            data: [['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9'],['10']]
        });
        inStore = new Ext.data.ArrayStore({
            fields: ['value'],
            data: [['0'],['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9'],['10'],['11']]
        });

        ftCombo.setStore(ftStore);
        inCombo.setStore(inStore);
    },

    formatHeight: function() {
        var ft = this.lookupReference('heightFt').value ? this.lookupReference('heightFt').value.toString() : '0',
            inch = this.lookupReference('heightIn').value ? this.lookupReference('heightIn').value.toString() : '0',
            height = ft.toString() + '.' + inch.toString();

        this.lookupReference('MemberHt').setValue(height);
    },

    addAllergy: function() {
        var allergyModel = Ext.create('Atlas.member.model.MemberDrugAllergies', {
                Editable: true
            }),
            grid = this.lookupReference('allergyGrid');

        grid.editingPlugin.cancelEdit();
        grid.getStore().insert(0, allergyModel);
        grid.editingPlugin.startEdit(0, 0);
    },

    removeAllergy: function() {
        var grid = this.lookupReference('allergyGrid'),
            allergyStore = grid.getStore(),
            selections = grid.getSelectionModel().getSelected().items;

        grid.editingPlugin.cancelEdit();
        if (!selections || selections.length === 0) {
            Ext.Msg.alert('Information', 'Please select a row.');
            return;
        }

        for (var i = 0, r; r = selections[i]; i++) {
            if (!r.get('Editable')) { return; }
            allergyStore.remove(r);
        }
    },

    setAllergenType: function(combo, record) {
        var id = record.get('DAM_CONCEPT_ID'),
            type = record.get('DAM_CONCEPT_ID_TYP'),
            desc = record.get('DAM_CONCEPT_ID_TYP_DESC'),
            grid = this.lookupReference('allergyGrid'),
            selections = grid.getSelectionModel().getSelected().items;

        for (var i = 0, r; r = selections[i]; i++) {
            r.set('DAM_CONCEPT_ID', id);
            r.set('DAM_CONCEPT_ID_TYP', type);
            r.set('DAM_CONCEPT_ID_TYP_DESC', desc);
        }
    },

    addTherapy: function() {
        var therapyModel = Ext.create('Atlas.portals.prescriber.model.PreviousTherapy', {}),
            grid = this.lookupReference('therapyGrid');

        grid.editingPlugin.cancelEdit();

        if (grid.getStore().count() === 3) {
            Ext.Msg.alert('Information', 'You can add a maximum of 3 therapies.');
            return;
        }
        grid.getStore().insert(0, therapyModel);
        grid.editingPlugin.startEdit(0, 0);
    },

    maybeEditAllergy: function(context, row) {
        return row.record.get('Editable');
    },

    cancelAllergyUpdate: function(context, row) {
        if (row.record.get('CONCEPT_ID_DESC')) { return; }
        this.removeAllergy();
    },

    updateTherapy: function(context, row) {
        var therapyStore = this.getViewModel().getStore('previousTherapies'),
            index = row.rowIdx,
            record = row.record;

        record.set('FailureDate', this.formatDate(new Date(record.get('FailureDate'))));
        record.set('Editable', false);
        therapyStore.removeAt(index);
        therapyStore.insert(index, record);
    },

    cancelTherapyUpdate: function(context, row) {
        if (row.record.get('Medication')) { return; }
        this.removeTherapy();
    },

    removeTherapy: function() {
        var grid = this.lookupReference('therapyGrid'),
            therapyStore = grid.getStore(),
            selections = grid.getSelectionModel().getSelected().items;

        grid.editingPlugin.cancelEdit();
        if (!selections || selections.length === 0) {
            Ext.Msg.alert('Information', 'Please select a row.');
            return;
        }

        for (var i = 0, r; r = selections[i]; i++) {
            therapyStore.remove(r);
        }
    },

    addAttachment: function() {
        Ext.create('Ext.window.Window', {
            title: 'Add Attachment',
            height: 150,
            width: 500,
            closable: true,
            modal: true,
            reference: 'fileAttachmentWindow',
            controller: 'fileattachmentwindowcontroller',
            items: {
                xtype: 'form',
                margin: '10 0 0 0',
                reference: 'fileForm',
                defaults: {
                    allowBlank: false,
                    labelWidth: 150,
                    flex: 1,
                    width: '90%',
                    msgTarget: 'side'
                },
                items: [
                    {
                        xtype: 'textfield',
                        reference: 'fileDescription',
                        fieldLabel: 'Description'
                    },
                    {
                        xtype: 'filefield',
                        reference: 'file',
                        name: 'attachmentFile',
                        fieldLabel: 'File',
                        emptyText: 'Select a file',
                        regex: new RegExp('\.(pdf)$'),
                        regexText: 'Only .PDF files are allowed.',
                        buttonText: '',
                        buttonConfig: {
                            iconCls: 'x-fa fa-upload'
                        }
                    }
                ]
            },
            bbar: {
                xtype: 'toolbar',
                items: [
                    '->',
                    {
                        xtype: 'button',
                        text: 'Save',
                        iconCls: 'x-fa fa-paperclip',
                        handler: 'saveAttachment'
                    },
                    {
                        xtype: 'button',
                        text: 'Reset',
                        handler: 'resetControls'
                    }
                ]
            }
        }).show();
    },

    onFileUploaded: function(document) {
        var fileAttachmentModel = Ext.create('Atlas.portals.prescriber.model.FileAttachment', {}),
            fileAttachmentStore = this.getViewModel().getStore('fileAttachments');

        Ext.Msg.alert('Success', 'Uploaded file: ' + document.fileName + ', Size: ' + document.size + ' bytes');

        fileAttachmentModel.set('FaxAttach', document.fileName);
        fileAttachmentModel.set('AttcDescr', document.description);
        fileAttachmentModel.set('DocumentID', document.docId);
        fileAttachmentModel.set('AttcDate', this.formatDate(new Date()));
        fileAttachmentStore.insert(0, fileAttachmentModel);
    },

    openAttachment: function(grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex),
            documentModel = Ext.create('Atlas.common.model.shared.Document', {}),
            user = Ext.first('viewport').getViewModel().getData().user;

        documentModel.getProxy().setExtraParams({});
        documentModel.getProxy().setExtraParam('pSessionID', user.retSessionID);
        documentModel.getProxy().setExtraParam('pDocumentID', record.get('DocumentID'));
        documentModel.load({
            callback: function(document) {
                var imageData = this.getProxy().getReader().metaData.pData;

                if (!imageData) {
                    Ext.MessageBox.alert('Error', 'Document data not found.', function(){});
                    return;
                }
                Atlas.common.utility.Utilities.displayDocument('pdf', imageData);
            }
        })
    },

    handleSave: function() {
        this.savePriorAuth('Save');
    },

    handleSubmit: function() {
        this.savePriorAuth('Submit');
    },

    savePriorAuth: function(mode) {
        var priorAuthForm = this.lookupReference('priorAuthForm'),
            priorAuthModel = Ext.create('Atlas.portals.prescriber.model.PriorAuthDataP', {}),
            user = Ext.first('viewport').getViewModel().getData().user,
            priorAuthObject = priorAuthForm.getValues(),
            allergies = this.mapAllergyData(this.getViewModel().getStore('memberAllergies').getRange()),
            therapies = this.mapStoreToJson(this.getViewModel().getStore('previousTherapies').getRange()),
            documents = this.mapStoreToJson(this.getViewModel().getStore('fileAttachments').getRange()),
            me = this;

        if (!priorAuthForm.isValid()) { return; }
        priorAuthObject.PresPhone = priorAuthObject.PresPhone.replace(/[^a-zA-Z0-9 ]/g, "");
        priorAuthObject.PresFax = priorAuthObject.PresFax.replace(/[^a-zA-Z0-9 ]/g, "");
        priorAuthModel.phantom = false;
        priorAuthModel.getProxy().url = 'portal/rx/priorauthdatap';
        priorAuthModel.getProxy().setExtraParams({});
        priorAuthModel.getProxy().setExtraParam('pSessionID', user.retSessionID);
        priorAuthModel.getProxy().setExtraParam('pMode', mode);
        priorAuthModel.getProxy().setExtraParam('ttPriorAuthData', priorAuthObject);
        priorAuthModel.getProxy().setExtraParam('ttDrugAllergies', {ttDrugAllergies: allergies});
        priorAuthModel.getProxy().setExtraParam('ttPrevTherapy', {ttPrevTherapy: therapies});
        priorAuthModel.getProxy().setExtraParam('ttAttachments', {ttAttachments: documents});
        priorAuthModel.save({
            success: function(rec, operation) {
                var authId = this.getProxy().getReader().metaData.opAuthId,
                    message = Ext.JSON.decode(operation._response.responseText).message[0];

                if (message.code === 0) {
                    if (mode === 'Save') {
                        Ext.Msg.alert('Success', 'Record saved successfully.');
                        me.lookupReference('therapyGrid').setDisabled(false);
                        me.getViewModel().set('submitDisabled', false);
                    } else {
                        Ext.Msg.alert('Success', 'Prior Auth submitted successfully.');
                        me.lookupReference('therapyGrid').setDisabled(true);
                    }

                    me.lookupReference('AuthId').setValue(authId);
                    me.getPriorAuth('AuthID', authId, true);
                    return;
                }
                Ext.Msg.alert('Fail', message.message);
            }, failure: function() {
                Ext.Msg.alert('Fail', 'Record could not be saved.');
            }
        });
    },

    getPriorAuth: function(type, id, afterSave) {
        var user = Ext.first('viewport').getViewModel().getData().user,
            priorAuthModel = Ext.create('Atlas.portals.prescriber.model.PriorAuthDataP', {}),
            me = this;

        priorAuthModel.getProxy().setExtraParams({});
        priorAuthModel.getProxy().setExtraParam('pSessionID', user.retSessionID);
        priorAuthModel.getProxy().setExtraParam('pKeyType', type);
        priorAuthModel.getProxy().setExtraParam('pKeyValue', id);
        priorAuthModel.load({
            callback: function(priorAuth) {
                var allergies = this.getProxy().getReader().metaData.ttDrugAllergies.ttDrugAllergies,
                    therapies = this.getProxy().getReader().metaData.ttPrevTherapy.ttPrevTherapy,
                    attachments = this.getProxy().getReader().metaData.ttAttachments.ttAttachments;

                me.bindPageSections(priorAuth, allergies, therapies, attachments, type, afterSave);
            }
        })
    },

    bindPageSections: function(priorAuth, allergies, therapies, attachments, type, afterSave) {
        var priorAuthForm = this.lookupReference('priorAuthForm'),
            allergyStore = this.getViewModel().getStore('memberAllergies'),
            therapyStore = this.getViewModel().getStore('previousTherapies'),
            attachmentStore = this.getViewModel().getStore('fileAttachments');

        if (!priorAuth) { return; }

        priorAuthForm.loadRecord(priorAuth);
        this.lookupReference('MemberName').setRawValue(priorAuth.get('MemberName'));
        this.getViewModel().set('authStatus', priorAuth.get('authStatus'));
        if (priorAuth.get('MemberHt')) {
            this.lookupReference('heightFt').setValue(priorAuth.get('MemberHt').toString().split('.')[0]);
            this.lookupReference('heightIn').setValue(priorAuth.get('MemberHt').toString().split('.')[1]);
        }
        if (type === 'ClaimId') {
            this.lookupReference('PresContactPerson').setValue(priorAuth.get('PrescriberName'));
        } else {
            this.lookupReference('PresContactPerson').setValue(
                priorAuth.get('PresContactPerson') ? priorAuth.get('PresContactPerson') : priorAuth.get('PrescriberName')
            );
        }

        allergyStore.loadData(this.formatAllergyData(allergies));
        therapyStore.loadData(therapies);
        attachmentStore.loadData(attachments);

        if (afterSave && priorAuth.get('authStatus') !== '00' && priorAuth.get('authStatus') !== '03') {
            this.lookupReference('saveButton').setDisabled(true);
            this.lookupReference('submitButton').setDisabled(true);
            this.lookupReference('cancelButton').setDisabled(true);
        }

        this.initialFormatPhone();
    },

    clearControls: function() {
        var allergyStore = this.getViewModel().getStore('memberAllergies'),
            therapyStore = this.getViewModel().getStore('previousTherapies');

        this.lookupReference('priorAuthForm').reset();
        allergyStore.remove(allergyStore.getRange());
        therapyStore.remove(therapyStore.getRange());
    },

    formatAllergyData: function(records) {
      var array = [],
          temp = {};

      for (var i = 0; i < records.length; i++) {
          temp = {
              DAM_CONCEPT_ID: records[i].AllergenId,
              CONCEPT_ID_DESC: records[i].AllergenDesc,
              DAM_CONCEPT_ID_TYP: records[i].AllergenTypeId,
              DAM_CONCEPT_ID_TYP_DESC: records[i].AllergenTypeDesc,
              Editable: records[i].Editable
          }
          array.push(temp);
      }

      return array;
    },

    mapAllergyData: function(records) {
        var jsonArray = [],
            temp = {};

        for (var i = 0; i < records.length; i++) {
            temp = {
                Allergen: records[i].data['DAM_CONCEPT_ID'],
                AllergenType: records[i].data['DAM_CONCEPT_ID_TYP'],
                Editable: records[i].data['Editable']
            }
            jsonArray.push(temp);
        }

        return jsonArray;
    },

    mapStoreToJson: function(records) {
        var jsonArray = [];

        for (var i = 0; i < records.length; i++) {
            jsonArray.push(records[i].getData());
        }

        return jsonArray;
    },

    formatDate: function(date) {
        return date.getFullYear().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getDate().toString();
    },

    initialFormatPhone: function() {
        this.formatPhone(this.lookupReference('PresPhone'));
        this.formatPhone(this.lookupReference('PresFax'));
        this.formatPhone(this.lookupReference('MemberPhone'));
    },

    formatPhone: function(input) {
        var value = input.value,
            filteredValues = '"`!@#$%^&*()_+|~-=\QWERT YUIOP{}ASDFGHJKL:ZXCVBNM<>?qwertyuiop[]asdfghjkl;zxcvbnm,./\\\'',
            i = 0,
            returnString = '';

        if (value.charAt(0) == '+') { return false; }
        for (i = 0; i < value.length; i++) {
            var c = value.charAt(i);
            if ((filteredValues.indexOf(c) == -1) & (returnString.length <= 13)) {
                if (returnString.length == 0) returnString += '(';
                if (returnString.length == 4) returnString += ')';
                if (returnString.length == 5) returnString += '-';
                if (returnString.length == 9) returnString += '-';
                returnString += c;
            }
        }

        input.setValue(returnString);
        return false;
    }
});