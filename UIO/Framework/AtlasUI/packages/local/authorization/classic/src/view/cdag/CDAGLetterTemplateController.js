/**
 * Created by agupta on 10/18/2016.
 */
Ext.define('Atlas.authorization.view.cdag.CDAGLetterTemplateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.cdaglettertemplatecontroller',
    letterAuthId: null,
    letterLobId: null,
    linkedAppeal: null,
    linkedLetterID: null,
    LetterFullName: null,
    approvedTimeFrame: '',
    sendLetterFlag: 'U',

    listen: {
        controller: {
            '*': {
                updateCDAGAuthLetter: 'updateCDAGAuthLetter',
                parentSendFax: 'sendFax'
            }
        }
    },

    updateCDAGAuthLetter: function (authId, letterFunction, notes) {
        if (authId == this.letterAuthId) {
            switch (letterFunction) {
                case 'saveLetter_CDAGDenialLetters':
                    this.saveLetter_CDAGDenialLetters(notes);
                    break;
                case 'saveLetter_CDAGApprovalLetter':
                    this.saveLetter_CDAGApprovalLetter(notes);
                    break;
                case 'saveLetter_CDAGAppovalHIXLetter':
                    this.saveLetter_CDAGAppovalHIXLetter(notes);
                    break;
                case 'saveLetter_CDAGAdditonalInfoReqLtr':
                    this.saveLetter_CDAGAdditonalInfoReqLtr(notes);
                    break;
                case 'saveLetter_CDAGCaseNotificationLtr':
                    this.saveLetter_CDAGCaseNotificationLtr(notes);
                    break;
                case 'saveLetter_CDAGInterventionLetter':
                    this.saveLetter_CDAGInterventionLetter(notes);
                    break;
                case 'saveLetter_CDAGAppealAckLetter':
                    this.saveLetter_CDAGAppealAckLetter(notes);
                    break;
                case 'saveLetter_CDAGMemberAppealLtr':
                    this.saveLetter_CDAGMemberAppealLtr(notes);
                    break;
                case 'saveLetter_CDAGProviderAppealLtr':
                    this.saveLetter_CDAGProviderAppealLtr(notes);
                    break;
            }
        }
    },

    denialSelectHandler: function (combo) {
        var view = this.getView(),
            DenialText = view.down('#cmbDenialReason').getValue();

        var modelDenialLan = Ext.create('Atlas.authorization.model.cdag.ParseDenialLanguageModel');
        modelDenialLan.getProxy().setExtraParam('pAuthID', this.letterAuthId);
        modelDenialLan.getProxy().setExtraParam('pDenialLanguage', DenialText);
        modelDenialLan.getProxy().setExtraParam('pLOB', '');

        modelDenialLan.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var objResponse = Ext.decode(operation.getResponse().responseText),
                    denialLaunguage = objResponse.metadata.pOutput;

                if (denialLaunguage != undefined && denialLaunguage != null) {
                    denialLaunguage = denialLaunguage.replace(/@NewLine@/g, '\r\n');
                }
                else {
                    denialLaunguage = '';
                }

                view.down('#txtReason').setValue(denialLaunguage);
            }
        });
    },

    sendFax: function (pcpFax, prescriberFax, memberFax, page1, page2, page3) {
        var me = this,
            view = this.getView(),
            docID = view.down('#hiddenDocumentID').getValue(),
            letter = this.LetterFullName,
            systemId = view.down('#hiddenSystemID').getValue(),
            parentSystemID = view.down('#hiddenAuthSystemID').getValue(),
            LOB = this.letterLobId;

        var sentLetterAttach = false,
            submitJobDoc,
            pDescription,
            pProgramName = 'faxDocument.p',
            pParametersPCP = docID + '|' + page1,
            pParametersPrescriber = docID + '|' + page2,
            pParametersMember = docID + '|' + page3,
            currentLetterForm;

        for (var item in view.items.items) {
            if (item == 0 || view.items.items[item].hidden) {
                continue;
            }
            currentLetterForm = view.items.items[item].itemId;

            if (currentLetterForm == 'fpCDAGDenialLetters') {
                sentLetterAttach = true;
            }

            if ((this.letterLobId != '2') && (currentLetterForm == 'fpCDAGDenialLetters' || currentLetterForm == 'fpCDAGProviderAppealLtr' || currentLetterForm == 'fpCDAGMemberAppealLtr' || currentLetterForm == 'fpCDAGAppealAckLetter')) {
                pProgramName = 'faxLetterDocument';
                pParametersPCP = docID + '|' + page1 + '|' + (currentLetterForm == 'fpCDAGDenialLetters' ? 'Denial' : 'Appeal') + '|' + systemId;
                pParametersPrescriber = docID + '|' + page2 + '|' + (currentLetterForm == 'fpCDAGDenialLetters' ? 'Denial' : 'Appeal')+ '|' + systemId;
                pParametersMember = docID + '|' + page3 + '|' + (currentLetterForm == 'fpCDAGDenialLetters' ? 'Denial' : 'Appeal') + '|' + systemId;
            }

            if (pcpFax != '') {
                pDescription = "AuthID: " + this.letterAuthId + " " + letter + " to PCP";
                submitJobDoc = Atlas.common.utility.Utilities.submitJobViewDoc(pDescription, pProgramName, pParametersPCP, '2', 'Fax', true, pcpFax);
                if (submitJobDoc != null && submitJobDoc != undefined && submitJobDoc.code == 0) {
                    this.setNotes(letter + " is faxed to PCP " + pcpFax);
                }
            }
            if (prescriberFax != '') {
                pDescription = "AuthID: " + this.letterAuthId + " " + letter + " to Prescriber";
                submitJobDoc = Atlas.common.utility.Utilities.submitJobViewDoc(pDescription, pProgramName, pParametersPrescriber, '2', 'Fax', true, prescriberFax);
                if (submitJobDoc != null && submitJobDoc != undefined && submitJobDoc.code == 0) {
                    this.setNotes(letter + " is faxed to Prescriber " + prescriberFax);
                }
            }
            if (memberFax != '') {
                pDescription = "AuthID: " + this.letterAuthId + " " + letter + " to Member";
                submitJobDoc = Atlas.common.utility.Utilities.submitJobViewDoc(pDescription, pProgramName, pParametersMember, '2', 'Fax', true, memberFax);
                if (submitJobDoc != null && submitJobDoc != undefined && submitJobDoc.code == 0) {
                    this.setNotes(letter + " is faxed to Member " + memberFax);
                }
            }

            if (submitJobDoc != null && submitJobDoc != undefined && submitJobDoc.jobNumber != 0) {
                this.setJobQueueData(submitJobDoc.jobNumber, 'parentSystemID', parentSystemID, systemId, sentLetterAttach);
            }

            Ext.Msg.alert("Fax", "Please check your fax status in Job Queue. Notes has been automatically created." , function (btn) {
                me.getView().down('cdagwinfax').destroy();
            });

            break;
        }
    },

    setJobQueueData: function (jobNumber, fieldList, fieldValue, systemId, sentLetterAttach) {
        var authID = this.letterAuthId,
            me = this;

        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}],
            saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/jobqueuedata/update', null, [true], {
                    pJobNum: jobNumber,
                    pFieldList: fieldList,
                    pFieldValues: fieldValue
                },
                saveAction, null);

        if (saveData.code == 0 && sentLetterAttach) {
            var modelGetAuthLetterDetailMasterData = Ext.create('Atlas.authorization.model.cdag.AuthLetterDetailMasterModel');
            modelGetAuthLetterDetailMasterData.getProxy().setExtraParam('pSystemID', systemId);
            modelGetAuthLetterDetailMasterData.getProxy().setExtraParam('pFieldList', 'DocumentId');
            modelGetAuthLetterDetailMasterData.load(
                {
                    scope: this,
                    failure: function (record, operation) {
                    },
                    success: function (record, operation) {
                    },
                    callback: function (record, operation, success) {
                        var objRespGetAuthLetterDetailMasterData = Ext.decode(operation.getResponse().responseText);
                        if (objRespGetAuthLetterDetailMasterData.message[0].code == 0 && objRespGetAuthLetterDetailMasterData.metadata != "0") {
                            var saveAction = [{"Save": {"key": "mode", "value": "Update"}}],
                                saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                                        pcPlanID: 'HPM',
                                        pcKeyType: 'PriorAuthID',
                                        pcKeyValue: authID,
                                        pcKeyAction: 'A',
                                        pcDocIDList: objRespGetAuthLetterDetailMasterData.metadata,
                                        pcDescrData: 'Letter Faxed'
                                    },
                                    saveAction, null);
                            me.fireEvent('refreshNotesAttachment', me.letterAuthId);
                        }
                    }
                });
        }
    },

    btnFax_Click: function () {
        var vm = this.getViewModel(),
            CDAGLetterParameters = vm.get('CDAGLetterParameters');

        var winFax = Ext.create({
            xtype: 'cdagwinfax',
            LetterFaxDetail: {
                'PrescriberFax': CDAGLetterParameters.PrescriberFax,
                'PCPFax': CDAGLetterParameters.PCPFax
            },
            modal: true
        });

        this.getView().add(winFax);
        winFax.show();
    },

    onLetterAction: function (btn) {
        var view = this.getView(),
            authId = this.letterAuthId,
            fp = '',
            notesAction = '',
            Letter = view.down('#cbxLetters').rawValue;

        var cdagWinNotes = Ext.first('cdagwinnotes');

        if (cdagWinNotes != null) {
            return;
        }

        view.down('#hiddenAction').setValue('Save Letter');

        if (btn.itemId == 'btnSave') {
            for (var item in view.items.items) {
                if(item == 0 || view.items.items[item].hidden) {
                    continue;
                }
                var currentLetterForm = view.items.items[item].itemId;

                if (!view.down('#' + currentLetterForm).isValid()) {
                    Ext.Msg.alert('Error', 'Please enter all required fields before saving.');
                    return false;
                }
                break;
            }
            view.down('#hiddenAction').setValue('Save Letter');
            notesAction = ' is Saved';
        }
        else if (btn.itemId == 'btnApprove') {
            view.down('#hiddenAction').setValue('Approve Letter');
            notesAction = ' is Approved';
        }
        else if (btn.itemId == 'btnReset') {
            view.down('#hiddenAction').setValue('Reset Approve');
            notesAction = ' is Reset to Not Approved';
        }
        else if (btn.itemId == 'btnSend') {
            view.down('#hiddenAction').setValue('Send Letter');
            notesAction = ' is Sent';
        }
        else if (btn.itemId == 'btnDelete') {
            view.down('#hiddenAction').setValue('Delete Letter');
            notesAction = ' is Deleted';
        }
        else {
            return;
        }

        switch (view.down('#hdnLetterName').getValue()) {
            case 'D Medicare':
                fp = view.down('#fpCDAGDenialLetters');
                Letter = fp.down('#cbxLetters').getRawValue();
                break;
            case 'QuickenPADenial':
                fp = view.down('#fpCDAGDenialLetters');
                Letter = fp.down('#cbxLetters').getRawValue();
                break;
            case 'D Medicaid':
                fp = view.down('#fpCDAGDenialLetters');
                Letter = fp.down('#cbxLetters').getRawValue();
                break;

            case 'R Medicaid':
                fp = view.down('#fpCDAGProviderAppealLtr');
                Letter = fp.down('#cbxLetters').getRawValue();
                break;

            case 'D Commercial':
                fp = view.down('#fpCDAGDenialLetters');
                Letter = fp.down('#cbxLetters').getRawValue();
                break;

            case 'NextLevelPADenial':
                fp = view.down('#fpCDAGDenialLetters');
                Letter = fp.down('#cbxLetters').getRawValue();
                break;

            case 'ChoicePADenial':
                fp = view.down('#fpCDAGDenialLetters');
                Letter = fp.down('#cbxLetters').getRawValue();
                break;

            case 'MedicareApproval':
                Letter = 'Medicare Auth Approval Letter';
                break;

            case 'NextLevelPAApproval':
                Letter = view.down('#hiddenLetterType').getValue();
                break;

            case 'AdditionalInfoRequest':
                Letter = 'Medicare Additional Info Request Letter';
                break;

            case 'CaseNotification':
                Letter = 'Medicare Case Notification Letter';
                break;

            case 'NextLevelProviderAppeal':
            case 'ProviderAppeal':
            case 'R Commercial':
            case 'ProviderRedetermination':
            case 'R Medicare':
                fp = view.down('#fpCDAGProviderAppealLtr');
                Letter = fp.down('#cbxLetters').getRawValue();
                break;

            case 'MemberRedetermination':
            case 'A Medicare':
            case 'MemberAppeal':
            case 'NextLevelMemberAppeal':
            case 'A Commercial':
            case 'A Medicaid':
            case 'ChoiceMemberAppeal':
                fp = view.down('#fpCDAGMemberAppealLtr');
                Letter = fp.down('#cbxLetters').getRawValue();
                break;

            case 'Appeal Acknowledgement Medicaid':
            case 'Level 2 Appeal Acknowledgement Medicaid':
                fp = view.down('#fpCDAGAppealAckLetter');
                Letter = fp.down('#txtAplLetters').getValue();
                break;

            case 'Medicare Case Notification Medicare':
                Letter = 'Medicare Case Notification Letter';
                break;

            case 'HIX Auth Approval Commercial':
            case 'ChoicePAApproval':
                Letter = 'Meridian Choice Auth Approval Letter';
                break;

            case 'NextLevel Auth Approval Medicaid':
                Letter = 'NextLevel Auth Approval Letter';
                break;
            case 'QuickenPAApproval':
                Letter = 'Quicken Auth Approval Letter';
                break;
            case 'Medicare Additional Info Request Medicare':
                Letter = 'Medicare Additional Info Request Medicare';
                break;

            case 'Intervention':
                Letter = 'Intervention Letter';
                break;

            case 'Intervention Medicaid':
                Letter = 'Intervention Medicaid Letter';
                break;
        }

        var winNotes = Ext.create({
            xtype: 'cdagwinnotes',
            modal: true,
            extraParams: {
                'pTxtNotes': Letter + notesAction,
                'pLetterName': view.down('#hdnLetterName').getValue(),
                'letterAuthId': authId
            }
        });

        if (this.LetterFullName == undefined || this.LetterFullName == null || this.LetterFullName == '') {
            this.LetterFullName = Letter;
        }

        this.getView().add(winNotes);
        winNotes.show();
    },

    letterSelectHandler: function (combobox) {
        var view = this.getView();

        var letterID = combobox.getValue();
        if ((letterID == '8' && (view.down('#lblLOB').getValue() == 'Medicare')) || letterID == '19') {
            view.down('#cbxMHPPhysicians').setValue('pharmacist');
        }
        else {
            view.down('#cbxMHPPhysicians').setValue('');
        }
        if (this.letterLobId == '1' || this.letterLobId == '3') {
            var r = view.down('#cmbDenialReason').getStore().find('Reason', 'D' + combobox.getValue());
            if (r == -1) {
                view.down('#txtReason').setValue('');
                return '';
            }
            view.down('#cmbDenialReason').setValue(view.down('#cmbDenialReason').getStore().data.items[r].data.DenialText);
            view.down('#cmbDenialReason').fireEvent('select');
        }
    },

    showResult: function (btn) {
        this.getView().down('#winNotes').hide();
    },

    getDocumentDetails: function (DocumentID) {
        if (DocumentID != '' && DocumentID != 'undefined') {
            Atlas.common.utility.Utilities.viewDocument(DocumentID);
        }
    },

    viewDocHandler: function () {
        var view = this.getView(),
            documentID = view.down('#hiddenDocumentID').getValue(),
            pDescription = '',
            pProgramName = '',
            pParameters = view.down('#hiddenSystemID').getValue();

        if (documentID != 0) {
            this.getDocumentDetails(documentID);
        }
        else {
            if (!view.down('#fpCDAGDenialLetters').hidden) {
                pDescription = view.down('#fpCDAGDenialLetters').down('#cbxLetters').getRawValue().toLowerCase();

                if (this.letterLobId == '1') {
                    pProgramName = 'printDenialLetter.p';
                }
                else if (this.letterLobId == '2') {
                    pProgramName = 'medicareDenialLetter.p';
                }
                else {
                    Ext.Msg.alert('Message', 'Auth Letters for ' + view.down('#lblLOB').getValue() + ' members are not available at this time.');
                }
            }
            else if (!view.down('#fpCDAGProviderAppealLtr').hidden) {
                pDescription = view.down('#fpCDAGProviderAppealLtr').down('#cbxLetters').getRawValue().toLowerCase();

                if (this.letterLobId == '1') {
                    pProgramName = 'printDenialLetter.p';
                }
                else if (this.letterLobId == '2') {
                    if (pDescription.indexOf('upheld') != -1) {
                        pProgramName = 'medicareAppealDenialLetter.p';
                    }
                    else if (pDescription.indexOf('overturned') != -1) {
                        pProgramName = 'medicareAppealApprovalLettter.p';
                    }
                }
                else {
                    Ext.Msg.alert('Message', 'Auth Letters for ' + view.down('#lblLOB').getValue() + ' members are not available at this time.');
                }
            }
            else if (!view.down('#fpCDAGMemberAppealLtr').hidden) {
                pDescription = view.down('#fpCDAGMemberAppealLtr').down('#cbxLetters').getRawValue().toLowerCase();

                if (this.letterLobId == '1') {
                    pProgramName = 'printDenialLetter.p';
                }
                else if (this.letterLobId == '2') {
                    if (pDescription.indexOf('upheld') != -1) {
                        pProgramName = 'medicareAppealDenialLetter.p';
                    }
                    else if (pDescription.indexOf('overturned') != -1) {
                        pProgramName = 'medicareAppealApprovalLettter.p';
                    }
                }
                else {
                    Ext.Msg.alert('Message', 'Auth Letters for ' + view.down('#lblLOB').getValue() + ' members are not available at this time.');
                }
            }
            else if (!view.down('#fpCDAGCaseNotificationLtr').hidden) {
                pDescription = 'Medicare Case Notification Letter';

                if (this.letterLobId == '1') {
                    pProgramName = 'paCaseStatusNotice.p';
                }
                else {
                    Ext.Msg.alert('Message', 'Case Notification Letters for ' + view.down('#lblLOB').getValue() + ' members are not available at this time.');
                }
            }
            else if (!view.down('#fpCDAGApprovalLetter').hidden) {
                pDescription = 'Medicare Auth Approval Letter';
                pProgramName = 'PAapprovalLetter.p';
            }
            else if (!view.down('#fpCDAGAdditonalInfoReqLtr').hidden) {
                pDescription = 'Medicare Additional Info Request Letter';
                pProgramName = 'medicareAddInfoLetter.p';
            }
            else if (!view.down('#fpCDAGAppealAckLetter').hidden) {
                pDescription = view.down('#fpCDAGAppealAckLetter').down('#txtAplLetters').getValue();
                pProgramName = 'printAppealAckLetter.p';
            }
            else if (!view.down('#fpCDAGInterventionLetter').hidden) {
                pDescription = 'Intervention Letter';
                pProgramName = 'PAinterventionLetter.p';
            }
            else if (!view.down('#fpCDAGAppovalHIXLetter').hidden) {
                Ext.Msg.alert('Message', 'Document ID is not available.');
            }

            if (pProgramName != '') {
                var submitJobDoc = Atlas.common.utility.Utilities.submitJobViewDoc(pDescription, pProgramName, pParameters, '1', 'Report', false, '');

                if (submitJobDoc != null && submitJobDoc != undefined) {
                    this.getDocumentDetails(submitJobDoc.ID);
                }
            }
        }
    },

    letterSelectHandler_fpCDAGProviderAppealLtr : function (combobox) {
        var view = this.getView();
        var fp = view.down('#fpCDAGProviderAppealLtr');
        switch (combobox.getValue()) {
            case '1':

                fp.down('#txtApprovedTime').show();
                fp.down('#txtApprovedTime').setFieldLabel('Approved Time Frame');
                fp.down('#txtApprovedTime').setValue(this.approvedTimeFrame);
                fp.down('#txtApprovedTime').allowBlank = false;
                fp.down('#txtReason').hide();
                fp.down('#txtReason').allowBlank = true;
                //Ext.getCmp('TemplatePanel1').setHeight(313);
                //parent.window.resizeTemplateWindow(345);
                break;

            case '2':

                fp.down('#txtReason').show();
                fp.down('#txtReason').setFieldLabel('Denial Reason');
                fp.down('#txtReason').allowBlank = false;
                fp.down('#txtApprovedTime').hide();
                fp.down('#txtApprovedTime').allowBlank = true;
                //fp.down('#TemplatePanel1').setHeight(423);
                //parent.window.resizeTemplateWindow(455);

                break;
        }
    },

    letterSelectHandler_fpCDAGMemberAppealLtr: function(combobox){
        var view = this.getView();
        var fp = view.down('#fpCDAGMemberAppealLtr');
        switch (combobox.getValue()) {
            case '1':
                fp.down('#txtApprovedTime').show();
                fp.down('#txtApprovedTime').setFieldLabel('Approved Time Frame');
                fp.down('#txtApprovedTime').setValue(this.approvedTimeFrame);
                fp.down('#txtApprovedTime').allowBlank = false;
                fp.down('#txtReason').hide();
                fp.down('#txtPhyBoard').hide();
                fp.down('#txtMeetingDetail').hide();
                fp.down('#txtReason').allowBlank = true;
                fp.down('#txtPhyBoard').allowBlank = true;
                fp.down('#txtMeetingDetail').allowBlank = true;
                //fp.down('#TemplatePanel1').setHeight(308);
                //parent.window.resizeTemplateWindow(340);
                break;

            case '2':

                fp.down('#txtReason').show();
                fp.down('#txtReason').setFieldLabel('Denial Reason');
                fp.down('#txtReason').allowBlank = false;
                fp.down('#txtApprovedTime').hide();
                fp.down('#txtPhyBoard').hide();
                fp.down('#txtMeetingDetail').hide();
                fp.down('#txtApprovedTime').allowBlank = true;
                fp.down('#txtPhyBoard').allowBlank = true;
                fp.down('#txtMeetingDetail').allowBlank = true;
                //fp.down('#TemplatePanel1').setHeight(423);
                //parent.window.resizeTemplateWindow(455);

                break;

            case '3':

                if (view.down('#lblLOB').getValue() == 'Medicaid') {

                    fp.down('#txtPhyBoard').show();
                    fp.down('#txtMeetingDetail').show();
                    fp.down('#txtApprovedTime').show();
                    fp.down('#txtPhyBoard').setFieldLabel('Committee Members');
                    fp.down('#txtMeetingDetail').setFieldLabel('Committee Meeting Date');
                    fp.down('#txtApprovedTime').setFieldLabel('Approved Time Frame');
                    fp.down('#txtApprovedTime').setValue(this.approvedTimeFrame);
                    fp.down('#txtPhyBoard').allowBlank = false;
                    fp.down('#txtMeetingDetail').allowBlank = false;
                    fp.down('#txtApprovedTime').allowBlank = false;
                    fp.down('#txtReason').hide();
                    fp.down('#txtReason').allowBlank = true;
                    //fp.down('#TemplatePanel1').setHeight(358);
                    //parent.window.resizeTemplateWindow(390);

                }
                else {

                    fp.down('#txtPhyBoard').hide();
                    fp.down('#txtMeetingDetail').hide();
                    fp.down('#txtApprovedTime').hide();
                    fp.down('#txtReason').hide();
                    fp.down('#txtPhyBoard').allowBlank = true;
                    fp.down('#txtMeetingDetail').allowBlank = true;
                    fp.down('#txtApprovedTime').allowBlank = true;
                    fp.down('#txtReason').allowBlank = true;
                    //fp.down('#TemplatePanel1').setHeight(273);
                    //parent.window.resizeTemplateWindow(305);

                    Ext.Msg.alert('Warning', 'There is no Level 2 Medicare Appeal Letter.');
                }

                break;

            case '4':

                if (view.down('#lblLOB').getValue() == 'Medicaid') {

                    fp.down('#txtPhyBoard').show();
                    fp.down('#txtMeetingDetail').show();
                    fp.down('#txtReason').show();
                    fp.down('#txtPhyBoard').setFieldLabel('Committee Members');
                    fp.down('#txtMeetingDetail').setFieldLabel('Committee Meeting Date');
                    fp.down('#txtReason').setFieldLabel('Denial Reason');
                    fp.down('#txtPhyBoard').allowBlank = false;
                    fp.down('#txtMeetingDetail').allowBlank = false;
                    fp.down('#txtReason').allowBlank = false;
                    fp.down('#txtApprovedTime').hide();
                    fp.down('#txtApprovedTime').allowBlank = true;
                    //fp.down('#TemplatePanel1').setHeight(478);
                    //parent.window.resizeTemplateWindow(510);

                }
                else {

                    fp.down('#txtPhyBoard').hide();
                    fp.down('#txtMeetingDetail').hide();
                    fp.down('#txtReason').hide();
                    fp.down('#txtApprovedTime').hide();
                    fp.down('#txtPhyBoard').allowBlank = true;
                    fp.down('#txtMeetingDetail').allowBlank = true;
                    fp.down('#txtReason').allowBlank = true;
                    fp.down('#txtApprovedTime').allowBlank = true;
                    //fp.down('#TemplatePanel1').setHeight(273);
                    //parent.window.resizeTemplateWindow(305);

                    Ext.Msg.alert('Warning', 'There is no Level 2 Medicare Appeal Letter.');
                }
                break;
        }
    },

    linkedAppealSelectHandler_fpCDAGProviderAppealLtr : function(combobox){
        var view = this.getView();
        var fp = view.down('#fpCDAGProviderAppealLtr');
        var letterCombo = fp.down('#cbxLetters');
        var store = combobox.getStore();
        var sysID = combobox.getValue();

        var index = store.find('SystemID', sysID.toString());
        var status = '';//store.getAt(index).get('Status');
        store.data.items.forEach(function(item, index){
            if(item.data.OutreachEntity == sysID){
                status = item.data.AppealStatus;
            }
        });
        switch (status) {
            case 'Denied - Overturned':
                letterCombo.setValue('1');
                this.letterSelectHandler_fpCDAGProviderAppealLtr(letterCombo);
                break;

            case 'Denied - Upheld':
                letterCombo.setValue('2');
                this.letterSelectHandler_fpCDAGProviderAppealLtr(letterCombo);
                break;
        }
    },

    LinkedAppealSelectHandler_fpCDAGMemberAppealLtr : function(combobox){
        var view = this.getView();
        var fp = view.down('#fpCDAGMemberAppealLtr');
        var letterCombo = fp.down('#cbxLetters');
        var store = combobox.getStore();
        var sysID = combobox.getValue();

        var index = store.find('SystemID', sysID.toString());
        var status = '';//store.getAt(index).get('Status');
        var type = '';//store.getAt(index).get('Type');
        store.data.items.forEach(function(item, index){
            if(item.data.OutreachEntity == sysID){
                status = item.data.AppealStatus;
                type = item.data.DeterminationType;
            }
        });
        switch (status) {
            case 'Denied - Overturned':
                if (type == 'M1') {
                    letterCombo.setValue('1');
                    this.letterSelectHandler_fpCDAGMemberAppealLtr(letterCombo);

                }
                else if (type == 'M2') {
                    letterCombo.setValue('3');
                    this.letterSelectHandler_fpCDAGMemberAppealLtr(letterCombo);
                }
                break;
            case 'Denied - Upheld':
                if (type == 'M1') {
                    letterCombo.setValue('2');
                    this.letterSelectHandler_fpCDAGMemberAppealLtr(letterCombo);

                }
                else if (type == 'M2') {
                    letterCombo.setValue('4');
                    this.letterSelectHandler_fpCDAGMemberAppealLtr(letterCombo);
                }
                break;
        }
    },

    loadTemplateValues_DM_CDAGDenialLetter: function (authID, systemId, lob) {
        var view = this.getView(),
            vm = this.getViewModel(),
            me = this,
            storeLetter = vm.getStore('storeLetter'),
            storeReason = vm.getStore('storeDenialReason'),
            storePhysician = vm.getStore('storeDenyingPhysican'),
            CDAGLetterParameters = vm.get('CDAGLetterParameters');

        view.down('#cbxLetters').allowBlank = false;
        view.down('#txtReason').allowBlank = false;

        //view.mask('Loading...');

        storeLetter.getProxy().setExtraParam('pListName', 'DenialLetters');
        storeLetter.load({
            callback: function (record, operation, success) {

                storeReason.getProxy().setExtraParam('pAuthID', authID);
                storeReason.getProxy().setExtraParam('pLOB', lob);
                storeReason.load({
                    callback: function (record, operation, success) {

                        storePhysician.getProxy().setExtraParam('pSignatureGroup', 'denyingphysician');
                        storePhysician.load({
                            callback: function (record, operation, success) {

                                if (systemId != undefined && systemId != '') {

                                    var fieldList = '';
                                    if (lob == 'Medicare') {
                                        fieldList = 'letterid,reason,freeText2,denialLanTemplate,assignTo,serviceDate[2]';
                                    }
                                    else if (lob == 'Medicaid' || lob == 'Commercial') {
                                        fieldList = 'letterid,serviceDate[2],reason,assignTo';
                                    }

                                    var decSystemId = 0;
                                    var data = {};
                                    if (systemId != '') {
                                        decSystemId = systemId;
                                    }
                                    if (decSystemId != 0 && fieldList != '') {
                                        var modelAuthLetterDetail = Ext.create('Atlas.authorization.model.cdag.AuthLetterDetailMasterModel');
                                        modelAuthLetterDetail.getProxy().setExtraParam('pSystemID', decSystemId);
                                        modelAuthLetterDetail.getProxy().setExtraParam('pFieldList', fieldList);
                                        modelAuthLetterDetail.load({
                                            scope: this,
                                            failure: function (record, operation) {
                                            },
                                            success: function (record, operation) {
                                            },
                                            callback: function (record, operation, success) {
                                                var objResp = Ext.decode(operation.getResponse().responseText.replace("[2]",""));

                                                if (record.length != 0 && view.down('#hiddenSystemID').getValue() != '') {
                                                    view.down('#cbxLetters').setValue(objResp.data[0].letterid);
                                                    view.down('#cbxAssignTo').setRawValue(objResp.data[0].assignTo);

                                                    if (lob == "Medicare") {
                                                        view.down('#txtFreeText2').setValue(objResp.data[0].freeText2.replace(/@NewLine@/g, '\r\n'));
                                                        view.down('#cmbDenialReason').setValue(objResp.data[0].denialLanTemplate != null ? objResp.data[0].denialLanTemplate : '');
                                                    }
                                                    view.down('#txtReason').setValue(objResp.data[0].reason.replace(/@NewLine@/g, '\r\n'));

                                                    if ((data.LetterID == '8' && lob == 'Medicare') || data.LetterID == '19') {
                                                        view.down('#cbxMHPPhysicians').setValue(CDAGLetterParameters.MHPPhysicians);
                                                    }
                                                }

                                                //view.unmask();
                                            }
                                        });
                                    }
                                    else {
                                        //view.unmask();
                                    }
                                }
                                else {
                                    //view.unmask();
                                }
                            }
                        });
                    }
                });
            }
        });
    },

    loadTemplateValues_DM_CDAGApprovalLetter: function (authId, systemId) {
        var view = this.getView();
        var fp = view.down('#fpCDAGApprovalLetter');
        //view.mask('Loading...');
        if (systemId != '' && systemId != undefined) {
            var fieldList = "freeText1,freeText2,assignTo";
            var modelGetAuthLetterDetailMasterData = Ext.create('Atlas.authorization.model.cdag.AuthLetterDetailMasterModel');
            modelGetAuthLetterDetailMasterData.getProxy().setExtraParam('pSystemID', systemId);
            modelGetAuthLetterDetailMasterData.getProxy().setExtraParam('pFieldList', fieldList);
            modelGetAuthLetterDetailMasterData.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    var objRespGetAuthLetterDetailMasterData = Ext.decode(operation.getResponse().responseText);
                    if(record.length != 0) {
                        fp.down('#txtTimeFrame').setValue(objRespGetAuthLetterDetailMasterData.data[0].freeText1.replace(/@NewLine@/g, '\r\n'));
                        fp.down('#txtYear').setValue(objRespGetAuthLetterDetailMasterData.data[0].freeText2);
                        view.down('#cbxAssignTo').setRawValue(objRespGetAuthLetterDetailMasterData.data[0].assignTo);
                    }
                    //view.unmask();
                }
            });
        }
        else {
            fp.down('#txtYear').setValue(Atlas.common.utility.Utilities.getLocalDateTime().getFullYear() + 1);
            //view.unmask();
        }
    },

    loadTemplateValues_DM_CDAGAppovalHIXLetter: function (systemId, approvedTimeRange) {
        var view = this.getView();
        var fp = view.down('#fpCDAGAppovalHIXLetter');
        //view.mask('Loading...');
        if (systemId != undefined && systemId != '') {
            var fieldList = 'freeText1,freeText2,freeText3,assignto';
            var modelGetAuthLetterDetailMasterData = Ext.create('Atlas.authorization.model.cdag.AuthLetterDetailMasterModel');
            modelGetAuthLetterDetailMasterData.getProxy().setExtraParam('pSystemID', systemId);
            modelGetAuthLetterDetailMasterData.getProxy().setExtraParam('pFieldList', fieldList);
            modelGetAuthLetterDetailMasterData.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    var objRespGetAuthLetterDetailMasterData = Ext.decode(operation.getResponse().responseText);
                    if(record.length != 0) {
                        fp.down('#txtTimeFrame').setValue(objRespGetAuthLetterDetailMasterData.data[0].freeText1);
                        fp.down('#txtRefills').setValue(objRespGetAuthLetterDetailMasterData.data[0].freeText2);
                        fp.down('#txtFreeText').setValue(objRespGetAuthLetterDetailMasterData.data[0].freeText3.replace(/@NewLine@/g, '\r\n'));
                    }
                    //view.unmask();
                }
            });
        }
        else {
            //view.unmask();
        }
    },
    loadTemplateValues_DM_CDAGAppovalQuickenLetter: function (systemId, approvedTimeRange) {
        var view = this.getView();
        var fp = view.down('#fpCDAGAppovalHIXLetter');
        //view.mask('Loading...');
        if (systemId != undefined && systemId != '') {
            var fieldList = 'freeText1,freeText2,freeText3,assignto,DateFree1,DateFree2';
            var modelGetAuthLetterDetailMasterData = Ext.create('Atlas.authorization.model.cdag.AuthLetterDetailMasterModel');
            modelGetAuthLetterDetailMasterData.getProxy().setExtraParam('pSystemID', systemId);
            modelGetAuthLetterDetailMasterData.getProxy().setExtraParam('pFieldList', fieldList);
            modelGetAuthLetterDetailMasterData.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    var objRespGetAuthLetterDetailMasterData = Ext.decode(operation.getResponse().responseText);
                    if(record.length != 0) {
                        fp.down('#dtFromDate').setValue(new Date(objRespGetAuthLetterDetailMasterData.data[0].DateFree1));
                        fp.down('#dtToDate').setValue(new Date(objRespGetAuthLetterDetailMasterData.data[0].DateFree2));
                        fp.down('#txtRefills').setValue(objRespGetAuthLetterDetailMasterData.data[0].freeText2);
                        fp.down('#txtFreeText').setValue(objRespGetAuthLetterDetailMasterData.data[0].freeText3.replace(/@NewLine@/g, '\r\n'));
                    }
                    //view.unmask();
                }
            });
        }
        else {
            //view.unmask();
        }
    },
    loadTemplateValues_DM_CDAGAdditonalInfoReqLtr: function (authId, systemId, authSystemID) {
        var me = this;
        var view = this.getView();
        var fp = view.down('#fpCDAGAdditonalInfoReqLtr');
        //view.mask('Loading...');
        //<editor-fold desc='Load cmbRequestType Combobox">
        var requestTypeStore = this.getViewModel().getStore('storePriorAuthRequestType');
        requestTypeStore.getProxy().setExtraParam('pListName', 'PriorAuthRequestType');
        requestTypeStore.load();
        //<editor-fold desc="Load cmbLinkedDetermination Combobox">
        var linkedDeterminationStore = this.getViewModel().getStore('storeDetermination');
        linkedDeterminationStore.getProxy().setExtraParam('pAuthID', authId);
        linkedDeterminationStore.getProxy().setExtraParam('pIncCanceled', true);
        linkedDeterminationStore.load({
            scope: this,
            failure: function (record, operation) {

            },
            success: function (record, operation) {

            },
            callback: function (record, operation, success) {
                var objRespLinkedDeterminationStore = Ext.decode(operation.getResponse().responseText);
                if (objRespLinkedDeterminationStore.message[0].code != 0) {
                    //Ext.Msg.alert("Error", objRespLinkedDeterminationStore.message[0].message);
                }
                else {
                    objRespLinkedDeterminationStore.data.forEach(function (item, index) {
                        if (item.DeterminationType == 'CD' || item.DeterminationType == 'DMR') {
                            item.OutreachEntity = authSystemID;
                            return item;
                        }
                    });
                }
            }
        });

        var data;
        if (systemId != undefined && systemId != '') {
            var fieldList = 'freeText1,freeText2,freeText3,assignto,ParentSystemID';

            var decSystemId = 0;
            var data = {};
            decSystemId = systemId;
            if (decSystemId != 0 && fieldList != '') {
                var modelAuthLetterDetail = Ext.create('Atlas.authorization.model.cdag.AuthLetterDetailMasterModel');
                modelAuthLetterDetail.getProxy().setExtraParam('pSystemID', decSystemId);
                modelAuthLetterDetail.getProxy().setExtraParam('pFieldList', fieldList);
                modelAuthLetterDetail.load({
                    scope: this,
                    failure: function (record, operation) {
                    },
                    success: function (record, operation) {
                    },
                    callback: function (record, operation, success) {
                        var objResp = Ext.decode(operation.getResponse().responseText);

                        if (record.length != 0 && view.down('#hiddenSystemID').getValue() != '') {
                            fp.down('#cmbRequestType').setValue(objResp.data[0].freeText1);
                            fp.down('#cmbLinkedDetermination').setValue(objResp.data[0].ParentSystemID);
                            fp.down('#cmbFiler').setValue(objResp.data[0].freeText2);
                            fp.down('#txtReqDocs').setValue(objResp.data[0].freeText3.replace(/@NewLine@/g, '\r\n'));
                            view.down('#cbxAssignTo').setRawValue(objResp.data[0].assignTo);
                        }
                        //view.unmask();
                    }
                });
            }
            else {
                //view.unmask();
            }
        }
        else {
            //view.unmask();
        }
    },

    loadTemplateValues_DM_CDAGCaseNotificationLtr: function (authId, systemId, authSystemID) {
        var me = this;
        var view = this.getView();
        var fp = view.down('#fpCDAGCaseNotificationLtr');
        //view.mask('Loading...');
        //<editor-fold desc='Load cmbRequestType Combobox">
        var caseTypeStore = this.getViewModel().getStore('storePriorAuthRequestType');
        caseTypeStore.getProxy().setExtraParam('pListName', 'CaseNotificationLetterType');
        caseTypeStore.load();
        //<editor-fold desc="Load cmbLinkedDetermination Combobox">
        var linkedDeterminationStore = this.getViewModel().getStore('storeDetermination');
        linkedDeterminationStore.getProxy().setExtraParam('pAuthID', authId);
        linkedDeterminationStore.getProxy().setExtraParam('pIncCanceled', true);
        linkedDeterminationStore.load({
            scope: this,
            failure: function (record, operation) {

            },
            success: function (record, operation) {

            },
            callback: function (record, operation, success) {
                var objRespLinkedDeterminationStore = Ext.decode(operation.getResponse().responseText);
                if (objRespLinkedDeterminationStore.message[0].code != 0) {
                    //Ext.Msg.alert("Error", objRespLinkedDeterminationStore.message[0].message);
                }
                else {
                    objRespLinkedDeterminationStore.data.forEach(function (item, index) {
                        if (item.DeterminationType == 'CD' || item.DeterminationType == 'DMR') {
                            item.OutreachEntity = authSystemID;
                            return item;
                        }
                    });
                }
            }
        });

        var data;
        if (systemId != undefined && systemId != '') {
            var fieldList = 'freeText1,DateFree1,ParentSystemID';

            var decSystemId = 0;
            var data = {};
            decSystemId = systemId;
            if (decSystemId != 0 && fieldList != '') {
                var modelAuthLetterDetail = Ext.create('Atlas.authorization.model.cdag.AuthLetterDetailMasterModel');
                modelAuthLetterDetail.getProxy().setExtraParam('pSystemID', decSystemId);
                modelAuthLetterDetail.getProxy().setExtraParam('pFieldList', fieldList);
                modelAuthLetterDetail.load({
                    scope: this,
                    failure: function (record, operation) {
                    },
                    success: function (record, operation) {
                    },
                    callback: function (record, operation, success) {
                        var objResp = Ext.decode(operation.getResponse().responseText);

                        if (record.length != 0 && view.down('#hiddenSystemID').getValue() != '') {
                            fp.down('#cmbCaseType').setValue(objResp.data[0].freeText1);
                            fp.down('#cmbCaseType').setRawValue(objResp.data[0].freeText1);
                            fp.down('#dateReview').setValue(objResp.data[0].DateFree1);
                            fp.down('#cmbLinkedDetermination').setValue(objResp.data[0].ParentSystemID);
                        }

                        //view.unmask();
                    }
                });
            }
        }
        else {
            //view.unmask();
        }

    },

    loadTemplateValues_DM_CDAGInterventionLetter: function (authId, systemId) {
        var me = this;
        var view = this.getView();
        var fp = view.down('#fpCDAGInterventionLetter');
        //view.mask('Loading...');

        if (systemId != '') {
            var fieldList = 'freeText1,freeText2,assignTo';

            var decSystemId = 0;
            var data = {};
            decSystemId = systemId;
            if (systemId != undefined && systemId != '') {
                var modelAuthLetterDetail = Ext.create('Atlas.authorization.model.cdag.AuthLetterDetailMasterModel');
                modelAuthLetterDetail.getProxy().setExtraParam('pSystemID', decSystemId);
                modelAuthLetterDetail.getProxy().setExtraParam('pFieldList', fieldList);
                modelAuthLetterDetail.load({
                    scope: this,
                    failure: function (record, operation) {
                    },
                    success: function (record, operation) {
                    },
                    callback: function (record, operation, success) {

                        data.CoveredMeds = record.data.freeText1 != '' ? record.data.freeText1 : '';
                        data.Year = record.data.freeText2 != '' ? record.data.freeText2 : '';
                        data.AssignTo = record.data.assignTo != '' ? record.data.assignTo : '';

                        fp.down('#txtCoveredMeds').setValue(data.CoveredMeds.replace(/@NewLine@/g, '\r\n'));
                        fp.down('#txtYear').setValue(data.Year);
                        //view.unmask();
                    }
                });
            }
            else {
                //view.unmask();
            }
        }
        else {
            //view.unmask();
        }
    },

    loadTemplateValues_DM_CDAGAppealAckLetter: function (authId, systemId) {
        var me = this;
        var view = this.getView();
        var fp = view.down('#fpCDAGAppealAckLetter');
        //view.mask('Loading...');

        if (systemId != '') {
            var fieldList = 'LetterType,createDate,assignto,freeText1';

            var decSystemId = 0;
            var data = {};
            decSystemId = systemId;
            if (systemId != undefined && systemId != '') {
                var modelAuthLetterDetail = Ext.create('Atlas.authorization.model.cdag.AuthLetterDetailMasterModel');
                modelAuthLetterDetail.getProxy().setExtraParam('pSystemID', decSystemId);
                modelAuthLetterDetail.getProxy().setExtraParam('pFieldList', fieldList);
                modelAuthLetterDetail.load({
                    scope: this,
                    failure: function (record, operation) {
                    },
                    success: function (record, operation) {
                    },
                    callback: function (record, operation, success) {

                        data.LetterName = record.data.LetterType != '' ? record.data.LetterType : '';
                        data.DateCreated = record.data.createDate != '' ? record.data.createDate : '';
                        data.TimeFrame = record.data.freeText1 != '' ? record.data.freeText1 : '';
                        data.AssignTo = record.data.assignTo != '' ? record.data.assignTo : '';

                        if (view.down('#hiddenSystemID').getValue() != '') {
                            fp.down('#txtAplLetters').setValue(data.LetterName);
                            fp.down('#dtAppealCreated').setValue(data.DateCreated);
                            fp.down('#txtAppealTimeFrame').setValue(data.TimeFrame);
                            view.down('#cbxAssignTo').setRawValue(data.AssignTo);
                        }
                        //view.unmask();
                    }
                });
            }
            else {
                //view.unmask();
            }
        }
        else {
            //view.unmask();
        }
    },

    loadTemplateValues_DM_CDAGMemberAppealLtr: function (authId, systemId, approvedTimeRange) {
        var me = this,
            vm = this.getViewModel(),
            LettersStore = vm.getStore('storeMbrAppealLetters'),
            LOB = this.letterLobId,
            linkedDeterminationStore = vm.getStore('storeLinkedAppealMember');

        var view = this.getView();
        var fp = view.down('#fpCDAGMemberAppealLtr');
        var selAppealType = this.linkedAppeal;
        var selLetterID = this.linkedLetterID;

        //view.mask('Loading...');

        LettersStore.getProxy().setExtraParam('pListName', 'MemberAppealLetters');
        LettersStore.load({
            callback: function (record, operation, success) {
                if (success && selLetterID != null) {
                    fp.down('#cbxLetters').setValue(selLetterID);
                    me.letterSelectHandler_fpCDAGMemberAppealLtr(fp.down('#cbxLetters'));
                }

                linkedDeterminationStore.getProxy().setExtraParam('pAuthID', authId);
                linkedDeterminationStore.getProxy().setExtraParam('pIncCanceled', true);
                linkedDeterminationStore.load({
                    callback: function (record, operation, success) {
                        if (success && selAppealType != null) {
                            fp.down('#cmbLinkedAppeal').setValue(selAppealType);
                        }

                        if (systemId != undefined && systemId != '') {
                            var fieldList = 'letterid,reason,freeText2,boardCertified,FreeText3,ParentSystemID';
                            var decSystemId = 0;
                            var data = {};
                            decSystemId = systemId;
                            if (decSystemId != 0) {
                                var modelAuthLetterDetail = Ext.create('Atlas.authorization.model.cdag.AuthLetterDetailMasterModel');
                                modelAuthLetterDetail.getProxy().setExtraParam('pSystemID', decSystemId);
                                modelAuthLetterDetail.getProxy().setExtraParam('pFieldList', fieldList);
                                modelAuthLetterDetail.load({
                                    scope: this,
                                    failure: function (record, operation) {
                                    },
                                    success: function (record, operation) {
                                    },
                                    callback: function (record, operation, success) {

                                        data.LetterID = record.data.letterid != '' ? record.data.letterid : '';
                                        data.DenialReason = record.data.reason != '' ? record.data.reason.replace(/@NewLine@/g, '\r\n') : '';
                                        data.ApprovalTimeFrame = record.data.freeText2 != '' ? record.data.freeText2 : '';
                                        data.BoardMembers = record.data.boardCertified != '' ? record.data.boardCertified : '';
                                        data.BoardMeetingDate = record.data.FreeText3 != '' ? record.data.FreeText3 : '';
                                        data.LinkedAppeal = record.data.ParentSystemID != '' ? record.data.ParentSystemID : '';

                                        fp.down('#cbxLetters').setValue(data.LetterID);
                                        fp.down('#cmbLinkedAppeal').setValue(data.LinkedAppeal);
                                        fp.down('#txtReason').setValue(data.DenialReason);
                                        fp.down('#txtApprovedTime').setValue(approvedTimeRange == '' ? data.ApprovalTimeFrame : approvedTimeRange);
                                        fp.down('#txtPhyBoard').setValue(data.BoardMembers);
                                        fp.down('#txtMeetingDetail').setRawValue(data.BoardMeetingDate);

                                        switch (data.LetterID) {
                                            case '1':
                                                fp.down('#txtApprovedTime').show();
                                                fp.down('#txtApprovedTime').setFieldLabel('Approved Time Frame');
                                                fp.down('#txtApprovedTime').allowBlank = false;
                                                break;

                                            case '2':
                                                fp.down('#txtReason').show();
                                                fp.down('#txtReason').setFieldLabel('Denial Reason:');
                                                fp.down('#txtReason').allowBlank = false;
                                                break;

                                            case '3':
                                                if (LOB == '1') {
                                                    fp.down('#txtPhyBoard').show();
                                                    fp.down('#txtMeetingDetail').show();
                                                    fp.down('#txtApprovedTime').show();
                                                    fp.down('#txtPhyBoard').setFieldLabel('Committee Members');
                                                    fp.down('#txtMeetingDetail').setFieldLabel('Committee Meeting Date');
                                                    fp.down('#txtApprovedTime').setFieldLabel('Approved Time Frame');
                                                    fp.down('#txtPhyBoard').allowBlank = false;
                                                    fp.down('#txtMeetingDetail').allowBlank = false;
                                                    fp.down('#txtApprovedTime').allowBlank = false;
                                                }
                                                break;

                                            case '4':
                                                if (LOB == '1') {
                                                    fp.down('#txtPhyBoard').show();
                                                    fp.down('#txtMeetingDetail').show();
                                                    fp.down('#txtReason').show();
                                                    fp.down('#txtPhyBoard').setFieldLabel('Committee Members:');
                                                    fp.down('#txtMeetingDetail').setFieldLabel('Committee Meeting Date:');
                                                    fp.down('#txtReason').setFieldLabel('Denial Reason:');
                                                    fp.down('#txtPhyBoard').allowBlank = false;
                                                    fp.down('#txtMeetingDetail').allowBlank = false;
                                                    fp.down('#txtReason').allowBlank = false;
                                                }

                                                break;
                                        }

                                        //view.unmask();
                                    }
                                });
                            }
                            else {
                                //view.unmask();
                            }
                        }
                        else {
                            //view.unmask();
                        }
                    }
                });
            }
        });
    },

    loadTemplateValues_DM_CDAGProviderAppealLtr: function (authId, systemId, approvedTimeRange) {
        var me = this,
            vm = this.getViewModel(),
            LettersStore = vm.getStore('storePvdAppealLetters'),
            linkedDeterminationStore = vm.getStore('storeLinkedAppealProvider');

        var view = this.getView();
        var fp = view.down('#fpCDAGProviderAppealLtr');
        var selAppealType = this.linkedAppeal;
        var selLetterID = this.linkedLetterID;
        var approvedTimeFrame = this.approvedTimeFrame;

        //view.mask('Loading...');

        LettersStore.getProxy().setExtraParam('pListName', 'ProviderAppealLetters');
        LettersStore.load({
            callback: function (record, operation, success) {
                if (success && selLetterID != null) {
                    fp.down('#cbxLetters').setValue(selLetterID);
                    me.letterSelectHandler_fpCDAGProviderAppealLtr(fp.down('#cbxLetters'));
                }

                linkedDeterminationStore.getProxy().setExtraParam('pAuthID', authId);
                linkedDeterminationStore.getProxy().setExtraParam('pIncCanceled', true);
                linkedDeterminationStore.load({
                    callback: function (record, operation, success) {
                        if (success && selAppealType != null) {
                            fp.down('#cmbLinkedAppeal').setValue(selAppealType);
                        }

                        if (systemId != undefined && systemId != '') {
                            var fieldList = 'letterid,reason,freeText2,ParentSystemID';
                            var decSystemId = 0;
                            var data = {};
                            decSystemId = systemId;
                            if (decSystemId != 0) {
                                var modelAuthLetterDetail = Ext.create('Atlas.authorization.model.cdag.AuthLetterDetailMasterModel');
                                modelAuthLetterDetail.getProxy().setExtraParam('pSystemID', decSystemId);
                                modelAuthLetterDetail.getProxy().setExtraParam('pFieldList', fieldList);
                                modelAuthLetterDetail.load({
                                    scope: this,
                                    failure: function (record, operation) {
                                    },
                                    success: function (record, operation) {
                                    },
                                    callback: function (record, operation, success) {

                                        data.LetterID = record.data.letterid != '' ? record.data.letterid : '';
                                        data.DenialReason = record.data.reason != '' ? record.data.reason.replace(/@NewLine@/g, '\r\n') : '';
                                        data.ApprovalTimeFrame = record.data.freeText2 != '' ? record.data.freeText2 : '';
                                        data.LinkedAppeal = record.data.ParentSystemID != '' ? record.data.ParentSystemID : '';
                                        //return data;

                                        fp.down('#cbxLetters').setValue(data.LetterID);
                                        fp.down('#cmbLinkedAppeal').setValue(data.LinkedAppeal);
                                        fp.down('#txtReason').setValue(data.DenialReason);
                                        fp.down('#txtApprovedTime').setValue(approvedTimeRange == '' ? data.ApprovalTimeFrame : approvedTimeRange);

                                        switch (data.LetterID) {
                                            case '1':
                                                fp.down('#txtApprovedTime').show();
                                                fp.down('#txtApprovedTime').setFieldLabel('Approved Time Frame');
                                                fp.down('#txtApprovedTime').allowBlank = false;
                                                //fp.down('#TemplatePanel1').setHeight(318); ----------------------------------------------------- need to implement
                                                //parent.window.resizeTemplateWindow(350);
                                                break;

                                            case '2':
                                                fp.down('#txtReason').show();
                                                fp.down('#txtReason').setFieldLabel('Denial Reason:');
                                                fp.down('#txtReason').allowBlank = false;
                                                //fp.down('#TemplatePanel1').setHeight(423); ----------------------------------------------------- need to implement
                                                //parent.window.resizeTemplateWindow(455);
                                                break;
                                        }

                                        //view.unmask();
                                    }
                                });
                            }
                            else {
                                //view.unmask();
                            }
                        }
                        else {
                            //view.unmask();
                        }
                    }
                });
            }
        });
    },

    docReadyHandler_CDAGDenialLetters: function (tSystemId, tDocId, tapprovedUser, tSentUser, tAuthId) {
        var view = this.getView(),
            LOB,
            vm = this.getViewModel(),
            CDAGLetterParameters = vm.get('CDAGLetterParameters');

        view.down('#cbxMHPPhysicians').hide();
        view.down('#lblService').setValue(CDAGLetterParameters.Medication);

        if (CDAGLetterParameters.LOB == '2') {
            LOB = 'Medicare';
            view.down('#CriteriaComposite').hide();
            view.down('#txtFreeText2').show();
            view.down('#txtFreeText2').setFieldLabel('Optional Language');
            view.down('#txtFreeText').hide();
            view.down('#cmbDenialReason').show();
            view.down('#cmbDenialReason').setFieldLabel('Reason for Denial');
        }
        else if (CDAGLetterParameters.LOB == '1') {
            LOB = 'Medicaid';
            view.down('#txtFreeText2').hide();
            view.down('#cmbDenialReason').hide();
        }
        else if (CDAGLetterParameters.LOB == '3') {
            LOB = 'Commercial';
            view.down('#txtFreeText2').hide();
            view.down('#cmbDenialReason').hide();
        }

        view.down('#txtServiceDate').setValue(CDAGLetterParameters.ServiceDate);
        view.down('#txtServiceDate').allowBlank = false;
        this.setControlsVisibility('fpCDAGDenialLetters');
        this.loadTemplateValues_DM_CDAGDenialLetter(CDAGLetterParameters.AuthID, tSystemId, LOB);
    },

    docReadyHandler_CDAGApprovalLetter: function (tSystemId, tDocId, tapprovedUser, tSentUser, tAuthId) {
        var view = this.getView();
        var fp = view.down('#fpCDAGApprovalLetter');

        var vm = this.getViewModel(),
            CDAGLetterParameters = vm.get('CDAGLetterParameters');

        fp.down('#lblService').setValue(CDAGLetterParameters.Medication);
        this.setControlsVisibility('fpCDAGApprovalLetter');
        if (tSystemId != '') {
            this.loadTemplateValues_DM_CDAGApprovalLetter(CDAGLetterParameters.AuthID, tSystemId);
            fp.down('#txtYear').allowBlank = false;
            fp.down('#txtTimeFrame').allowBlank = false;
        }
        else {
            fp.down('#txtYear').setValue((Atlas.common.utility.Utilities.getLocalDateTime()).getFullYear() + 1);
        }
    },

    docReadyHandler_CDAGAppovalHIXLetter: function (tSystemId, tDocId, tapprovedUser, tSentUser, tAuthId) {
        var view = this.getView(),
            fp = view.down('#fpCDAGAppovalHIXLetter');
        var dateParams;
        var approvedTimeRange;

        var vm = this.getViewModel(),
            CDAGLetterParameters = vm.get('CDAGLetterParameters');

        fp.down('#lblService').setValue(CDAGLetterParameters.Medication);

        if (dateParams != '' && dateParams != undefined) {
            var splitParams = dateParams.split('|');
            var fromDate = new Date(splitParams[0]);
            var toDate = new Date(splitParams[1]);

            approvedTimeRange = (fromDate.getMonth() + 1) + '/' + fromDate.getDate() + '/' + fromDate.getFullYear() + ' to ' + (toDate.getMonth() + 1) + '/' + toDate.getDate() + '/' + toDate.getFullYear();
        }
        else {
            approvedTimeRange = '';
        }

        if (CDAGLetterParameters.LOB == '1') {
            view.down('#lblLOB').setValue('Medicaid');
            view.down('#hiddenLetterType').setValue('NextLevel Auth Approval Letter');
        }
        else if(CDAGLetterParameters.LetterName=="QuickenPAApproval" || CDAGLetterParameters.LetterName=="Quicken Auth Approval Commercial")
        {
            view.down('#lblLOB').setValue('Commerical');
            view.down('#hiddenLetterType').setValue('Quicken Auth Approval Letter');
        }
        else {
            view.down('#lblLOB').setValue('Commerical');
            view.down('#hiddenLetterType').setValue('Meridian Choice Auth Approval Letter');
        }
        this.setControlsVisibility('fpCDAGAppovalHIXLetter');
        view.down('#txtRefills').allowBlank = false;
        view.down('#txtFreeText').allowBlank = false;
        // view.down('#txtTimeFrame').allowBlank = false;
        if(CDAGLetterParameters.LetterName=="QuickenPAApproval"|| CDAGLetterParameters.LetterName=="Quicken Auth Approval Commercial")
        {
            fp.down('#txtTimeFrame').setHidden(true);
            fp.down('#txtTimeFrame').allowBlank=true;
            fp.down('#dtFromDate').allowBlank=false;
            fp.down('#dtToDate').allowBlank=false;
            fp.down('#dtFromDate').setHidden(false);
            fp.down('#dtToDate').setHidden(false);
            this.loadTemplateValues_DM_CDAGAppovalQuickenLetter(tSystemId, approvedTimeRange);
        }
        else
        {
            fp.down('#txtTimeFrame').setHidden(false);
            fp.down('#txtTimeFrame').allowBlank=false;
            fp.down('#dtFromDate').allowBlank=true;
            fp.down('#dtToDate').allowBlank=true;
            fp.down('#dtFromDate').setHidden(true);
            fp.down('#dtToDate').setHidden(true);
            this.loadTemplateValues_DM_CDAGAppovalHIXLetter(tSystemId, approvedTimeRange);
        }
    },

    docReadyHandler_CDAGAdditonalInfoReqLtr: function (tSystemId, tDocId, tapprovedUser, tSentUser, tAuthId) {
        var vm = this.getViewModel(),
            CDAGLetterParameters = vm.get('CDAGLetterParameters');

        this.setControlsVisibility('fpCDAGAdditonalInfoReqLtr');
        this.loadTemplateValues_DM_CDAGAdditonalInfoReqLtr(CDAGLetterParameters.AuthID, tSystemId, CDAGLetterParameters.SystemID);
    },

    docReadyHandler_CDAGCaseNotificationLtr: function (tSystemId, tDocId, tapprovedUser, tSentUser, tAuthId) {
        var vm = this.getViewModel(),
            CDAGLetterParameters = vm.get('CDAGLetterParameters');

        if (CDAGLetterParameters.LOB != '2') {
            Ext.Msg.alert("Warning", "Case Notification letters are not available for this line of business.");
            var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
        }

        this.setControlsVisibility('fpCDAGCaseNotificationLtr');
        this.loadTemplateValues_DM_CDAGCaseNotificationLtr(CDAGLetterParameters.AuthID, tSystemId, CDAGLetterParameters.SystemID);
    },

    docReadyHandler_CDAGInterventionLetter: function (tSystemId, tDocId, tapprovedUser, tSentUser, tAuthId) {
        var vm = this.getViewModel(),
            fp = this.getView().down('#fpCDAGInterventionLetter'),
            CDAGLetterParameters = vm.get('CDAGLetterParameters');

        fp.down('#lblService').setValue(CDAGLetterParameters.Medication);

        this.setControlsVisibility('fpCDAGInterventionLetter');
        this.loadTemplateValues_DM_CDAGInterventionLetter(CDAGLetterParameters.AuthID, tSystemId);
    },

    docReadyHandler_CDAGAppealAckLetter: function (tSystemId, tDocId, tapprovedUser, tSentUser, tAuthId) {
        var vm = this.getViewModel(),
            fp = this.getView().down('#fpCDAGAppealAckLetter'),
            CDAGLetterParameters = vm.get('CDAGLetterParameters');

        fp.down('#lblService').setValue(CDAGLetterParameters.Medication);
        this.setControlsVisibility('fpCDAGAppealAckLetter');
        this.loadTemplateValues_DM_CDAGAppealAckLetter(CDAGLetterParameters.AuthID, tSystemId);
    },

    docReadyHandler_CDAGMemberAppealLtr: function (tSystemId, tDocId, tapprovedUser, tSentUser, tAuthId, tLetterID, tExtraParams, tParentSysID) {
        var view = this.getView();
        var fp = view.down('#fpCDAGMemberAppealLtr');
        var dateParams;
        var approvedTimeRange;

        var vm = this.getViewModel(),
            CDAGLetterParameters = vm.get('CDAGLetterParameters');

        fp.down('#lblService').setValue(CDAGLetterParameters.Medication);
        if (dateParams != '' && dateParams  != undefined) {
            var splitParams = dateParams.split('|');
            var fromDate = new Date(splitParams[0]);
            var toDate = new Date(splitParams[1]);

            approvedTimeRange = (fromDate.getMonth() + 1) + '/' + fromDate.getDate() + '/' + fromDate.getFullYear() + ' to ' + (toDate.getMonth() + 1) + '/' + toDate.getDate() + '/' + toDate.getFullYear();
        }
        else {
            approvedTimeRange = '';
        }

        this.setControlsVisibility('fpCDAGMemberAppealLtr');
        this.loadTemplateValues_DM_CDAGMemberAppealLtr(CDAGLetterParameters.AuthID, tSystemId, approvedTimeRange);
    },

    docReadyHandler_CDAGProviderAppealLtr: function (tSystemId, tDocId, tapprovedUser, tSentUser, tAuthId, tLetterID, tExtraParams, tParentSysID) {
        var view = this.getView();
        var fp = view.down('#fpCDAGProviderAppealLtr');
        var authID;
        var dateParams;
        var approvedTimeRange;

        var vm = this.getViewModel(),
            CDAGLetterParameters = vm.get('CDAGLetterParameters');

        fp.down('#lblService').setValue(CDAGLetterParameters.Medication);

        if (dateParams != '' && dateParams  != undefined) {
            var splitParams = dateParams.split('|');
            var fromDate = new Date(splitParams[0]);
            var toDate = new Date(splitParams[1]);

            approvedTimeRange = (fromDate.getMonth() + 1) + '/' + fromDate.getDate() + '/' + fromDate.getFullYear() + ' to ' + (toDate.getMonth() + 1) + '/' + toDate.getDate() + '/' + toDate.getFullYear();
        }
        else {
            approvedTimeRange = '';
        }

        if (CDAGLetterParameters.LOB != '1' && CDAGLetterParameters.LOB != '2' && CDAGLetterParameters.LOB != '3') {
            Ext.Msg.alert("Warning", "Provider Appeal letters are not available for this line of business.");
        }

        this.setControlsVisibility('fpCDAGProviderAppealLtr');
        this.loadTemplateValues_DM_CDAGProviderAppealLtr(CDAGLetterParameters.AuthID, tSystemId, approvedTimeRange);

    },

    saveLetter_CDAGDenialLetters: function (winTxtNotes) {
        var view = this.getView();
        var fp = view.down('#fpCDAGDenialLetters');
        var year = fp.down('#txtYear').getValue() != '' ? fp.down('#txtYear').getValue() : '';
        var Service = view.down('#lblService').getValue();
        var LetterID = view.down('#cbxLetters').getValue();
        var Criteria = view.down('#cbxCri').getValue() == null ? '' : view.down('#cbxCri').getValue();
        var FreeText = view.down('#txtFreeText').getValue();
        var Reason = view.down('#txtReason').getValue();
        var FreeText2 = view.down('#txtFreeText2').getValue();
        var ServiceDate = view.down('#txtServiceDate').getValue() == '' || view.down('#txtServiceDate').getValue() == null ? '' : Ext.Date.format(view.down('#txtServiceDate').getValue(), 'm/d/Y');
        var DenyingPhysician = view.down('#cbxMHPPhysicians').getValue() == null ? '' : view.down('#cbxMHPPhysicians').getValue();
        var DenialReasonTemplate = this.letterLobId == '2' && view.down('#cmbDenialReason').getValue() != null ? view.down('#cmbDenialReason').getValue() : '';

        var LetterName = view.down('#cbxLetters').rawValue,
            whereType = "LetterName = '" + LetterName + "' ",
            Notes = winTxtNotes,
            PASystemID = view.down('#hiddenAuthSystemID').getValue(),
            SystemID = view.down('#hiddenSystemID').getValue() == '' ? 0 : view.down('#hiddenSystemID').getValue(),
            letterProgramName = this.letterLobId == '1' ? 'printDenialLetter.p' : 'medicareDenialLetter.p',
            Action = view.down('#hiddenAction').getValue(),
            fields = "",
            fieldLists = "",
            AssignTo = view.down('#cbxAssignTo').getValue();

        if (Action == 'Save Letter') {
            fields = "authID,letterID,letterType,Service[1],YearFree1,criteriaUsed,FreeText1,Reason,serviceDate[2],AssignTo,FreeText2,denialLanTemplate,ParentSystemID";
            fieldLists = this.letterAuthId + "|" + LetterID + "|" + "D" + "|" + Service + "|" + year + "|" + Criteria + "|" + FreeText + "|" + Reason +
                "|" + ServiceDate + "|" + AssignTo + "|" + FreeText2 + "|" + DenialReasonTemplate + "|" + PASystemID;
        }
        else if (Action == 'Send Letter') {
            this.sendLetterFlag = this.letterLobId == '2' ? 'U' : 'S';
        }

        this.setAuthLetter(whereType, Notes, SystemID, letterProgramName, Action, fields, fieldLists, AssignTo, true, false, this.letterLobId);

        var modelSetPAMAster = Ext.create('Atlas.authorization.model.cdag.SetPAMAsterModel');
        modelSetPAMAster.getProxy().setExtraParam('pAuthID', this.letterAuthId);
        modelSetPAMAster.getProxy().setExtraParam('pFields', 'denyingPhysician');
        modelSetPAMAster.getProxy().setExtraParam('pFieldList', DenyingPhysician);
        modelSetPAMAster.getProxy().setExtraParam('pMode', 'U');
        modelSetPAMAster.phantom = false;
        modelSetPAMAster.save();
    },

    saveLetter_CDAGApprovalLetter: function (winTxtNotes) {
        var view = this.getView();
        var fp = view.down('#fpCDAGApprovalLetter');
        var year = fp.down('#txtYear').getValue() != '' ? fp.down('#txtYear').getValue() : '';
        var timeFrame = fp.down('#txtTimeFrame').getValue() != '' ? fp.down('#txtTimeFrame').getValue() : '';

        var LetterName = 'Medicare Auth Approval',
            whereType = "LetterName = '" + LetterName + "' ",
            Notes = winTxtNotes,
            PASystemID = view.down('#hiddenAuthSystemID').getValue(),
            SystemID = view.down('#hiddenSystemID').getValue() == '' ? 0 : view.down('#hiddenSystemID').getValue(),
            letterProgramName = 'PAapprovalLetter.p',
            Action = view.down('#hiddenAction').getValue(),
            fields = "",
            fieldLists = "",
            AssignTo = view.down('#cbxAssignTo').getValue();

        if (Action == 'Save Letter') {
            fields = "authID,letterType,FreeText1,FreeText2,AssignTo,ParentSystemID";
            fieldLists = this.letterAuthId + "|" + "Medicare Auth Approval" + "|" + timeFrame + "|" + year + "|" + AssignTo + "|" + PASystemID;
        }

        this.setAuthLetter(whereType, Notes, SystemID, letterProgramName, Action, fields, fieldLists, AssignTo, false, false, '');
    },

    validateDateRange: function (datefield , isValid) {
        var view = this.getView(),
            fp = view.down('#fpCDAGAppovalHIXLetter'),
            winDtFrom = fp.down('#dtFromDate'),
            winDtTo = fp.down('#dtToDate'),
            winDtFromValue = winDtFrom.getValue(),
            winDtToValue = winDtTo.getValue();

        if (datefield.itemId == 'dtFromDate') {
            if (winDtFromValue != '' && winDtFromValue != null) {
                winDtTo.setMinValue(Ext.Date.format(winDtFromValue, 'm/d/Y'));
            }
        }
        else {
            if (winDtToValue != '' && winDtToValue != null) {
                winDtFrom.setMaxValue(Ext.Date.format(winDtToValue, 'm/d/Y'));
            }
        }
    },
    saveLetter_CDAGAppovalHIXLetter: function (winTxtNotes) {
        var view = this.getView();
        var fp = view.down('#fpCDAGAppovalHIXLetter');
        var letterType = '';
        var refills = fp.down('#txtRefills').getValue();
        var freeText = fp.down('#txtFreeText').getValue();
        var timeFrame = fp.down('#txtTimeFrame').getValue();
        var DateFree1=Ext.Date.format(fp.down('#dtFromDate').getValue(), 'm/d/Y');
        var DateFree2=Ext.Date.format(fp.down('#dtToDate').getValue(), 'm/d/Y');

        if (this.letterLobId == '1') {
            letterType = "NextLevel Auth Approval";
        }
        else if(view.down('#hdnLetterName').getValue()=='QuickenPAApproval')
        {
            letterType = "Quicken Auth Approval";
        }
        else {
            letterType = "HIX Auth Approval";
        }

        var whereType = "LetterName = '" + letterType + "' ",
            Notes = winTxtNotes,
            PASystemID = view.down('#hiddenAuthSystemID').getValue(),
            SystemID = view.down('#hiddenSystemID').getValue() == '' ? 0 : view.down('#hiddenSystemID').getValue(),
            letterProgramName = 'PAapprovalLetter.p',
            Action = view.down('#hiddenAction').getValue(),
            fields = "",
            fieldLists = "",
            AssignTo = view.down('#cbxAssignTo').getValue();

        if (Action == 'Save Letter' && letterType=="Quicken Auth Approval") {
            timeFrame= DateFree1 +' Until '+ DateFree2;
            fields = 'authID,letterType,FreeText1,FreeText2,FreeText3,DateFree1,DateFree2,AssignTo,ParentSystemID';
            fieldLists = this.letterAuthId + '|' + letterType + '|' + timeFrame + '|' + refills + '|' + freeText + '|' + DateFree1+ '|' + DateFree2 + '|' + AssignTo + '|' + PASystemID;
        }
        else if (Action == 'Save Letter') {
            fields = 'authID,letterType,FreeText1,FreeText2,FreeText3,AssignTo,ParentSystemID';
            fieldLists = this.letterAuthId + '|' + letterType + '|' + timeFrame + '|' + refills + '|' + freeText + '|' + AssignTo + '|' + PASystemID;
        }

        this.setAuthLetter(whereType, Notes, SystemID, letterProgramName, Action, fields, fieldLists, AssignTo, false, true, '');
    },

    saveLetter_CDAGAdditonalInfoReqLtr: function (winTxtNotes) {
        var view = this.getView();
        var fp = view.down('#fpCDAGAdditonalInfoReqLtr');
        var requestType = fp.down('#cmbRequestType').getValue() == null ? '' : fp.down('#cmbRequestType').getValue();
        var filer = fp.down('#cmbFiler').getValue();
        var reqDocs = fp.down('#txtReqDocs').getValue();
        var letterType = 'Medicare Additional Info Request';

        var whereType = "LetterName = '" + letterType + "' ",
            Notes = winTxtNotes,
            PASystemID = fp.down('#cmbLinkedDetermination').getValue(),
            SystemID = view.down('#hiddenSystemID').getValue() == '' ? 0 : view.down('#hiddenSystemID').getValue(),
            letterProgramName = 'medicareAddInfoLetter.p',
            Action = view.down('#hiddenAction').getValue(),
            fields = "",
            fieldLists = "",
            AssignTo = view.down('#cbxAssignTo').getValue();

        if (Action == 'Save Letter') {
            fields = 'authID,letterType,FreeText1,Freetext2,Freetext3,AssignTo,ParentSystemID';
            fieldLists = this.letterAuthId + "|" + "Medicare Additional Info Request" + "|" + requestType + "|" + filer + "|" + reqDocs + "|" + AssignTo + "|" + PASystemID;
        }
        else if (Action == 'Send Letter') {
            this.sendLetterFlag = 'S';
        }

        this.setAuthLetter(whereType, Notes, SystemID, letterProgramName, Action, fields, fieldLists, AssignTo, false, false, '');
    },

    saveLetter_CDAGCaseNotificationLtr: function (winTxtNotes) {
        var view = this.getView();
        var fp = view.down('#fpCDAGCaseNotificationLtr');
        var caseType = fp.down('#cmbCaseType').getValue();
        var reviewDate = fp.down('#dateReview').getValue() == '' || fp.down('#dateReview').getValue() == null ? '' : Ext.Date.format(fp.down('#dateReview').getValue(), 'm/d/Y');
        var letterType = 'Medicare Case Notification';

        var whereType = "LetterName = '" + letterType + "' ",
            Notes = winTxtNotes,
            PASystemID = view.down('#cmbLinkedDetermination').getValue(),
            SystemID = view.down('#hiddenSystemID').getValue() == '' ? 0 : view.down('#hiddenSystemID').getValue(),
            letterProgramName = 'paCaseStatusNotice.p',
            Action = view.down('#hiddenAction').getValue(),
            fields = "",
            fieldLists = "",
            AssignTo = view.down('#cbxAssignTo').getValue();

        if (Action == 'Save Letter') {
            fields = 'authID,letterType,FreeText1,DateFree1,AssignTo,ParentSystemID';
            fieldLists = this.letterAuthId + "|" + "Medicare Case Notification" + "|" + caseType + "|" + reviewDate + "|" + AssignTo + "|" + PASystemID;
        }

        this.setAuthLetter(whereType, Notes, SystemID, letterProgramName, Action, fields, fieldLists, AssignTo, false, false, '');
    },

    saveLetter_CDAGInterventionLetter: function (winTxtNotes) {
        var view = this.getView();
        var fp = view.down('#fpCDAGInterventionLetter');
        var coveredMeds = fp.down('#txtCoveredMeds').getValue();
        var year = fp.down('#txtYear').getValue();
        var letterType = 'PA Intervention';

        var whereType = "LetterName = '" + letterType + "' ",
            Notes = winTxtNotes,
            PASystemID = view.down('#hiddenAuthSystemID').getValue(),
            SystemID = view.down('#hiddenSystemID').getValue() == '' ? 0 : view.down('#hiddenSystemID').getValue(),
            letterProgramName = 'PAinterventionLetter.p',
            Action = view.down('#hiddenAction').getValue(),
            fields = "",
            fieldLists = "",
            AssignTo = view.down('#cbxAssignTo').getValue();

        if (Action == 'Save Letter') {
            fields = 'authID,letterType,FreeText1,FreeText2,AssignTo,ParentSystemID';
            fieldLists = this.letterAuthId + "|" + "Intervention" + "|" + coveredMeds + "|" + year + "|" + AssignTo + "|" + PASystemID;
        }

        this.setAuthLetter(whereType, Notes, SystemID, letterProgramName, Action, fields, fieldLists, AssignTo, false, false, '');
    },

    saveLetter_CDAGAppealAckLetter: function (winTxtNotes) {
        var view = this.getView();
        var fp = view.down('#fpCDAGAppealAckLetter');
        var service = fp.down('#lblService').getValue();
        var serviceDate = fp.down('#dtAppealCreated').getValue() == '' || fp.down('#dtAppealCreated').getValue() == null ? '' : Ext.Date.format(fp.down('#dtAppealCreated').getValue(), 'm/d/Y');
        var letterType = fp.down('#txtAplLetters').getValue() == '' ? '' : fp.down('#txtAplLetters').getValue();
        var timeFrame = fp.down('#txtAppealTimeFrame').getValue() == '' ? '' : fp.down('#txtAppealTimeFrame').getValue();

        var whereType = "LetterName = '" + letterType + "' ",
            Notes = winTxtNotes,
            PASystemID = view.down('#hiddenAuthSystemID').getValue(),
            SystemID = view.down('#hiddenSystemID').getValue() == '' ? 0 : view.down('#hiddenSystemID').getValue(),
            letterProgramName = 'printAppealAckLetter.p',
            Action = view.down('#hiddenAction').getValue(),
            fields = "",
            fieldLists = "",
            AssignTo = view.down('#cbxAssignTo').getValue();

        if (Action == 'Save Letter') {
            fields = 'authID,letterType,Service[1],assignto,freeText1';
            fieldLists = this.letterAuthId + "|" + letterType + "|" + service + "|" + AssignTo + "|" + timeFrame;
        }

        this.setAuthLetter(whereType, Notes, SystemID, letterProgramName, Action, fields, fieldLists, AssignTo, false, false, '', true);
    },

    saveLetter_CDAGMemberAppealLtr: function (winTxtNotes) {
        var view = this.getView();
        var fp = view.down('#fpCDAGMemberAppealLtr');
        var letterM = '';
        var letterID = fp.down('#cbxLetters').getValue();
        var service = fp.down('#lblService').getValue();
        var appovedTimeFrame = fp.down('#txtApprovedTime').getValue();
        var denialReason = fp.down('#txtReason').getValue();
        var phyBoard = fp.down('#txtPhyBoard').getValue();
        var meetingDate = view.down('#txtMeetingDetail').getValue();
        var planGroupID = view.down('#lblPlanGroupID').getValue();
        var year = (Atlas.common.utility.Utilities.getLocalDateTime().getFullYear() + 1);

        if (meetingDate == null) {
            meetingDate = '';
        }

        var letterType = fp.down('#cbxLetters').rawValue;

        var whereType = "LetterName = '" + letterType + "' ",
            Notes = winTxtNotes,
            PASystemID = fp.down('#cmbLinkedAppeal').getValue(),
            SystemID = view.down('#hiddenSystemID').getValue() == '' ? 0 : view.down('#hiddenSystemID').getValue(),
            letterProgramName = '',
            Action = view.down('#hiddenAction').getValue(),
            fields = "",
            fieldLists = "",
            AssignTo = view.down('#cbxAssignTo').getValue();

        if (letterID == '1' || letterID == '2') {
            letterM = 'M1';
        }
        else {
            letterM = 'M2';
        }

        if (this.letterLobId == '1') {
            letterProgramName = 'printDenialLetter.p';
        }
        if (this.letterLobId == '2') {
            var LetterName = fp.down('#cbxLetters').getRawValue().toLowerCase();

            if (LetterName.indexOf('upheld') > -1) {
                letterProgramName = "medicareAppealDenialLetter.p";
            }
            else if (LetterName.indexOf('overturned') > -1) {
                letterProgramName = "medicareAppealApprovalLettter.p";
            }
        }

        if (Action == 'Save Letter') {
            fields = 'authID,letterID,letterType,Service[1],Reason,AssignTo,boardCertified,FreeText3,FreeText2,Spare1,planGroupID,YearFree1,ParentSystemID';
            fieldLists = this.letterAuthId + "|" + letterID + "|" + "A" + "|" + service + "|" + denialReason + "|" + AssignTo + "|" + phyBoard +
                "|" + meetingDate + "|" + appovedTimeFrame + "|" + letterM + "|" + planGroupID + "|" + year + "|" + PASystemID;
        }

        this.setAuthLetter(whereType, Notes, SystemID, letterProgramName, Action, fields, fieldLists, AssignTo, false, false, '');
    },

    saveLetter_CDAGProviderAppealLtr: function (winTxtNotes) {
        var view = this.getView();
        var fp = view.down('#fpCDAGProviderAppealLtr');
        var letterID = fp.down('#cbxLetters').getValue();
        var service = fp.down('#lblService').getValue();
        var appovedTimeFrame = fp.down('#txtApprovedTime').getValue();
        var denialReason = fp.down('#txtReason').getValue();
        var planGroupID = view.down('#lblPlanGroupID').getValue();
        var year = (Atlas.common.utility.Utilities.getLocalDateTime().getFullYear() + 1);
        var serviceDate = view.down('#hiddenServiceDate').getValue();

        var letterType = fp.down('#cbxLetters').rawValue;

        var whereType = "LetterName = '" + letterType + "' ",
            Notes = winTxtNotes,
            PASystemID = fp.down('#cmbLinkedAppeal').getValue(),
            SystemID = view.down('#hiddenSystemID').getValue() == '' ? 0 : view.down('#hiddenSystemID').getValue(),
            letterProgramName = '',
            Action = view.down('#hiddenAction').getValue(),
            fields = "",
            fieldLists = "",
            AssignTo = view.down('#cbxAssignTo').getValue();

        if (this.letterLobId == '1') {
            letterProgramName = 'printDenialLetter.p';
        }
        if (this.letterLobId == '2') {
            var LetterName = fp.down('#cbxLetters').getRawValue().toLowerCase();

            if (LetterName.indexOf('upheld') > -1) {
                letterProgramName = "medicareAppealDenialLetter.p";
            }
            else if (LetterName.indexOf('overturned') > -1) {
                letterProgramName = "medicareAppealApprovalLettter.p";
            }
        }

        if (Action == 'Save Letter') {
            fields = 'authID,letterID,letterType,Service[1],Reason,AssignTo,Spare1,freeText2,planGroupID,YearFree1,ParentSystemID,serviceDate[1]';
            fieldLists = this.letterAuthId + "|" + letterID + "|" + "R" + "|" + service + "|" + denialReason + "|" + AssignTo + "|" + "PA" +
                "|" +  appovedTimeFrame + "|" + planGroupID + "|" + year + "|" + PASystemID + "|" + serviceDate;
        }

        this.setAuthLetter(whereType, Notes, SystemID, letterProgramName, Action, fields, fieldLists, AssignTo, false, false, '');
    },

    setAuthLetter: function (letterWhereClause, notes, letterSystemID, letterProgramName, letterAction, fieldList, fieldValue, assignTo, sentLetterAttach, onlyExternalPrinting, lob, AppealAckLetter) {
        var me = this,
            mode,
            view = this.getView(),
            authID = this.letterAuthId;

        view.mask('Saving Letter...');

        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];

        var modelQueryDb = Ext.create('Atlas.common.model.shared.QueryDb');
        modelQueryDb.getProxy().setExtraParam('pBuffer', 'LetterMaster');
        modelQueryDb.getProxy().setExtraParam('pWhere', letterWhereClause);
        modelQueryDb.getProxy().setExtraParam('pField', 'LetterNameId');
        modelQueryDb.getProxy().setExtraParam('pOrderBy', '');
        modelQueryDb.getProxy().setExtraParam('pAscDesc', '');
        modelQueryDb.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var objResp = Ext.decode(operation.getResponse().responseText);
                if (objResp.message[0].code == 0 && objResp.data.length > 0) {
                    var letterNameID = objResp.data[0].LetterNameId;

                    if (letterNameID != null && letterNameID != undefined) {
                        letterNameID = letterNameID.toString();

                        var modelList = Ext.create('Atlas.common.model.shared.ListDetailModel');
                        modelList.getProxy().setExtraParam('pListName', 'ExternalPritingSolution');

                        modelList.load({
                            scope: this,
                            failure: function (record, operation) {
                            },
                            success: function (record, operation) {
                            },
                            callback: function (record, operation, success) {
                                if (success) {
                                    var objResp = Ext.decode(operation.getResponse().responseText);
                                    var isExternalPritingSolution = false;
                                    objResp.data.forEach(function (item, index) {
                                        var ltrIds = item.ListItem.split(',');
                                        var charStrs = item.charString.split(',');
                                        var isIdExists = ltrIds.indexOf(letterNameID) > -1;
                                        var isLOBIdExists = charStrs[0] == '' ? true : (charStrs.indexOf(lob) > -1);

                                        if (isIdExists && (lob == '' || isLOBIdExists)) {
                                            isExternalPritingSolution = true;
                                        }
                                    });

                                    if (!onlyExternalPrinting || (onlyExternalPrinting && isExternalPritingSolution)) {
                                        switch (letterAction) {
                                            case "Save Letter" : {
                                                if (isExternalPritingSolution) {
                                                    mode = 'U';
                                                }
                                                else {
                                                    mode = letterSystemID == 0 ? 'A' : 'U';
                                                    if (mode == 'A') {
                                                        fieldList = fieldList + ',CreateUser,CreateDateTime';
                                                        fieldValue = fieldValue + '|' + Atlas.user.un + '|' + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y H:i:s');
                                                    }
                                                }
                                                break;
                                            }
                                            case "Approve Letter": {
                                                fieldList = isExternalPritingSolution ? "AssignTo" : "ApprovedUser,ApprovedDate,AssignTo";
                                                fieldValue = isExternalPritingSolution ? assignTo : Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y H:i:s') + "|" + assignTo;
                                                mode = isExternalPritingSolution ? "A" : "U";
                                                view.down('#hiddenApprovedUser').setValue(Atlas.user.un);
                                                break;
                                            }
                                            case "Reset Approve": {
                                                fieldList = isExternalPritingSolution ? "AssignTo" : "ApprovedUser,ApprovedDate,AssignTo,DocumentID";
                                                fieldValue = isExternalPritingSolution ? Atlas.user.un : "" + "|" + "" + "|" + Atlas.user.un + "|" + "0";
                                                mode = isExternalPritingSolution ? "R" : "U";
                                                view.down('#hiddenApprovedUser').setValue('');
                                                break;
                                            }
                                            case "Send Letter": {
                                                fieldList = isExternalPritingSolution ? "AssignTo" : "sentUser,sentDate,AssignTo,DocumentSource";
                                                fieldValue = isExternalPritingSolution ? "" : Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y H:i:s') + "|" + "" + "|" + "Outbound";
                                                mode = isExternalPritingSolution ? "S" : me.sendLetterFlag;
                                                view.down('#hiddenSentUser').setValue(Atlas.user.un);
                                                break;
                                            }
                                            case "Delete Letter": {
                                                fieldList = "";
                                                fieldValue = "";
                                                mode = "D";
                                                break;
                                            }
                                        }

                                        var saveData = Atlas.common.utility.Utilities.saveData([{}], 'claims/rx/authletterdetail/update', null, [true], {
                                                pSystemID: letterSystemID,
                                                pFields: fieldList,
                                                pFieldList: fieldValue,
                                                pMode: mode
                                            },
                                            saveAction, ['pRetSystemID']);

                                        if (saveData.code == 0) {
                                            if (saveData.pRetSystemID != "") {
                                                view.down('#hiddenSystemID').setValue(saveData.pRetSystemID);
                                                var modelGetAuthLetterDetailMasterData = Ext.create('Atlas.authorization.model.cdag.AuthLetterDetailMasterModel');
                                                modelGetAuthLetterDetailMasterData.getProxy().setExtraParam('pSystemID', saveData.pRetSystemID);
                                                modelGetAuthLetterDetailMasterData.getProxy().setExtraParam('pFieldList', 'DocumentId');
                                                modelGetAuthLetterDetailMasterData.load({
                                                    callback: function (record, operation, success) {
                                                        var objRespGetAuthLetterDetailMasterData = Ext.decode(operation.getResponse().responseText);
                                                        view.down('#hiddenDocumentID').setValue(objRespGetAuthLetterDetailMasterData.message[0].code == 0 ? objRespGetAuthLetterDetailMasterData.metadata : '');
                                                    }
                                                });
                                            }

                                            if (!isExternalPritingSolution) {
                                                if (letterAction == 'Approve Letter' && letterProgramName != '') {
                                                    saveData = Atlas.common.utility.Utilities.saveData([{}], 'claims/rx/authletterdocument/update', null, [true], {
                                                            pSystemID: letterSystemID,
                                                            pLetterProgramName: letterProgramName
                                                        },
                                                        saveAction, null);
                                                }
                                                else if (letterAction == 'Send Letter' || AppealAckLetter) {
                                                    var modelGetAuthLetterDetailMasterData = Ext.create('Atlas.authorization.model.cdag.AuthLetterDetailMasterModel');
                                                    modelGetAuthLetterDetailMasterData.getProxy().setExtraParam('pSystemID', letterSystemID);
                                                    modelGetAuthLetterDetailMasterData.getProxy().setExtraParam('pFieldList', 'DocumentId');
                                                    modelGetAuthLetterDetailMasterData.load(
                                                        {
                                                            scope: this,
                                                            failure: function (record, operation) {
                                                            },
                                                            success: function (record, operation) {
                                                            },
                                                            callback: function (record, operation, success) {
                                                                var objRespGetAuthLetterDetailMasterData = Ext.decode(operation.getResponse().responseText);
                                                                view.down('#hiddenDocumentID').setValue(objRespGetAuthLetterDetailMasterData.message[0].code == 0 ? objRespGetAuthLetterDetailMasterData.metadata : '');

                                                                var docID = objRespGetAuthLetterDetailMasterData.metadata.pFields;
                                                                if (docID != 0) {
                                                                    if (sentLetterAttach) {
                                                                        saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                                                                                pcPlanID: 'HPM',
                                                                                pcKeyType: 'PriorAuthID',
                                                                                pcKeyValue: authID,
                                                                                pcKeyAction: 'A',
                                                                                pcDocIDList: docID,
                                                                                pcDescrData: 'Letter Sent'
                                                                            },
                                                                            saveAction, null);
                                                                    }
                                                                    else if (AppealAckLetter) {
                                                                        if (mode == 'D') {
                                                                            saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/deldocument/update', null, [true], {
                                                                                    pDocumentID: docID
                                                                                },
                                                                                saveAction, null);
                                                                        }
                                                                        else if (mode == 'A') {
                                                                            saveData = Atlas.common.utility.Utilities.saveData([{}], 'claims/rx/authletterdocument/update', null, [true], {
                                                                                    pSystemID: letterSystemID,
                                                                                    pLetterProgramName: 'printAppealAckLetter.p'
                                                                                },
                                                                                saveAction, null);

                                                                            saveData = Atlas.common.utility.Utilities.saveData([{}], 'claims/rx/authletterdetail/update', null, [true], {
                                                                                    pSystemID: letterSystemID,
                                                                                    pFields: fieldList,
                                                                                    pFieldList: fieldValue,
                                                                                    pMode: 'U'
                                                                                },
                                                                                saveAction, null);
                                                                        }

                                                                    }
                                                                }
                                                                view.down('#hiddenDocumentID').setValue(docID);
                                                            }
                                                        }
                                                    );
                                                }
                                            }

                                            me.setNotes(notes);
                                        }
                                        else {
                                            Ext.Msg.alert('Error', saveData.message, function (btn) {
                                                var cdagWinNotes = view.down('cdagwinnotes');

                                                if (cdagWinNotes != null) {
                                                    cdagWinNotes.destroy();
                                                }

                                                var win2 = Ext.WindowManager.getActive();
                                                if (win2) {
                                                    win2.close();
                                                }
                                            });
                                        }
                                    }
                                    else {
                                        Ext.Msg.alert('Error', 'Letter Template Not Turned On.', function (btn) {
                                            var cdagWinNotes = view.down('cdagwinnotes');

                                            if (cdagWinNotes != null) {
                                                cdagWinNotes.destroy();
                                            }

                                            var win2 = Ext.WindowManager.getActive();
                                            if (win2) {
                                                win2.close();
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            }
        });
    },

    setNotes: function (Notes) {
        var view = this.getView(),
            vm = this.getViewModel(),
            Action = view.down('#hiddenAction').getValue(),
            SystemID = view.down('#hiddenAuthSystemID').getValue(),
            pFieldList = 'ParentSystemID,Subject,Note,CreateUser',
            pFieldValues = SystemID + "|" + "Save Letter" + "|" + Notes + "|" + Atlas.user.un;

        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
        Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/notes/update', null, [true], {
                psystemId: '0',
                pMode: 'A',
                pFieldList: pFieldList,
                pFields: pFieldValues
            },
            saveAction, null);

        var cdagWinNotes = view.down('cdagwinnotes');

        if (cdagWinNotes != null) {
            cdagWinNotes.destroy();
        }

        this.fireEvent('parent_LoadGridValues', this.letterAuthId);
        this.fireEvent('refreshNotesAttachment', this.letterAuthId);

        if (Action == 'Delete Letter') {
            var win2 = Ext.WindowManager.getActive();
            if (win2) {
                win2.close();
            }
        }
        else {
            for (var item in view.items.items) {
                if(item == 0 || view.items.items[item].hidden) {
                    continue;
                }
                this.setControlsVisibility(view.items.items[item].itemId);
                Ext.defer(function () {
                    view.unmask();
                }, 1000);

                break;
            }
        }
    },

    setControlsVisibility: function (fpName) {
        var view = this.getView();
        var systemID;
        var approvedUser;
        var sentUser;
        systemID = view.down('#hiddenSystemID').getValue();
        approvedUser = view.down('#hiddenApprovedUser').getValue();
        sentUser = view.down('#hiddenSentUser').getValue();

        var vm = this.getViewModel(),
            CDAGLetterParameters = vm.get('CDAGLetterParameters');

        switch (fpName) {
            case 'fpCDAGDenialLetters':
                var fp = view.down('#fpCDAGDenialLetters');
                if (approvedUser != '') {
                    view.down('#btnSave').setDisabled(true);
                    view.down('#btnApprove').setDisabled(true);
                    view.down('#btnReset').show();
                    view.down('#cbxAssignTo').hide();
                    fp.down('#cbxLetters').setDisabled(true);
                    fp.down('#cbxCri').setDisabled(true);
                    fp.down('#txtYear').setDisabled(true);
                    fp.down('#txtFreeText').setReadOnly(true);
                    fp.down('#txtReason').setReadOnly(true);
                    fp.down('#txtFreeText2').setReadOnly(true);
                    fp.down('#txtServiceDate').setDisabled(true);
                    fp.down('#cmbDenialReason').setDisabled(true);
                    fp.down('#txtFreeText').addCls('readonly-opacity');
                    fp.down('#txtReason').addCls('readonly-opacity');
                    fp.down('#txtFreeText2').addCls('readonly-opacity');
                }
                else {
                    view.down('#btnSave').setDisabled(false);
                    view.down('#btnReset').hide();
                    view.down('#cbxAssignTo').show();
                    fp.down('#cbxLetters').setDisabled(false);
                    fp.down('#cbxCri').setDisabled(false);
                    fp.down('#txtYear').setDisabled(false);
                    fp.down('#txtFreeText').setReadOnly(false);
                    fp.down('#txtReason').setReadOnly(false);
                    fp.down('#txtFreeText2').setReadOnly(false);
                    fp.down('#txtServiceDate').setDisabled(false);
                    fp.down('#cmbDenialReason').setDisabled(false);
                    fp.down('#txtFreeText').removeCls('readonly-opacity');
                    fp.down('#txtReason').removeCls('readonly-opacity');
                    fp.down('#txtFreeText2').removeCls('readonly-opacity');
                }
                break;
            case 'fpCDAGApprovalLetter':
                var fp = view.down('#fpCDAGApprovalLetter');
                if (approvedUser != '') {
                    view.down('#btnSave').setDisabled(true);
                    view.down('#btnApprove').setDisabled(true);
                    view.down('#btnReset').show();
                    view.down('#cbxAssignTo').hide();
                    fp.down('#txtYear').setDisabled(true);
                    fp.down('#txtTimeFrame').setDisabled(true);
                }
                else {
                    view.down('#btnSave').setDisabled(false);
                    view.down('#btnReset').hide();
                    view.down('#cbxAssignTo').show();
                    fp.down('#txtYear').setDisabled(false);
                    fp.down('#txtTimeFrame').setDisabled(false);
                }
                break;
            case 'fpCDAGAppovalHIXLetter':
                var fp = view.down('#fpCDAGAppovalHIXLetter');
                if (approvedUser != '') {
                    view.down('#btnSave').setDisabled(true);
                    view.down('#btnApprove').setDisabled(true);
                    view.down('#btnReset').show();
                    view.down('#cbxAssignTo').hide();
                    fp.down('#txtRefills').setDisabled(true);
                    fp.down('#txtFreeText').setReadOnly(true);
                    fp.down('#txtTimeFrame').setDisabled(true);
                    fp.down('#txtFreeText').addCls('readonly-opacity');
                }
                else {
                    view.down('#btnSave').enable();
                    view.down('#btnReset').hide();
                    view.down('#cbxAssignTo').show();
                    fp.down('#txtRefills').enable();
                    fp.down('#txtFreeText').setReadOnly(false);
                    fp.down('#txtTimeFrame').enable();
                    fp.down('#txtFreeText').removeCls('readonly-opacity');
                }
                break;
            case 'fpCDAGAdditonalInfoReqLtr':
                var fp = view.down('#fpCDAGAdditonalInfoReqLtr');
                if (approvedUser != '') {
                    view.down('#btnSave').setDisabled(true);
                    view.down('#btnApprove').setDisabled(true);
                    view.down('#btnReset').show();
                    view.down('#cbxAssignTo').hide();
                    fp.down('#cmbRequestType').setDisabled(true);
                    fp.down('#cmbLinkedDetermination').setDisabled(true);
                    fp.down('#cmbFiler').setDisabled(true);
                    fp.down('#txtReqDocs').setDisabled(true);
                }
                else {
                    view.down('#btnSave').setDisabled(false);
                    view.down('#btnReset').hide();
                    view.down('#cbxAssignTo').show();
                    fp.down('#cmbRequestType').setDisabled(false);
                    fp.down('#cmbLinkedDetermination').setDisabled(false);
                    fp.down('#cmbFiler').setDisabled(false);
                    fp.down('#txtReqDocs').setDisabled(false);
                }
                break;

            case 'fpCDAGCaseNotificationLtr':
                var fp = view.down('#fpCDAGCaseNotificationLtr');
                if (approvedUser != '') {
                    view.down('#btnSave').setDisabled(true);
                    view.down('#btnApprove').setDisabled(true);
                    view.down('#btnReset').show();
                    view.down('#cbxAssignTo').hide();
                    fp.down('#cmbCaseType').setDisabled(true);
                    fp.down('#dateReview').setDisabled(true);
                    fp.down('#cmbLinkedDetermination').setDisabled(true);

                }
                else {
                    view.down('#btnSave').setDisabled(false);
                    view.down('#btnReset').hide();
                    view.down('#cbxAssignTo').show();
                    fp.down('#cmbCaseType').setDisabled(false);
                    fp.down('#dateReview').setDisabled(false);
                    fp.down('#cmbLinkedDetermination').setDisabled(false);
                }
                break;

            case 'fpCDAGInterventionLetter':
                var fp = view.down('#fpCDAGInterventionLetter');
                if (approvedUser != '') {
                    view.down('#btnSave').setDisabled(true);
                    view.down('#btnApprove').setDisabled(true);
                    view.down('#btnReset').show();
                    view.down('#cbxAssignTo').hide();
                    fp.down('#txtCoveredMeds').setDisabled(true);
                    fp.down('#txtYear').setDisabled(true);
                }
                else {
                    view.down('#btnSave').setDisabled(false);
                    view.down('#btnReset').hide();
                    fp.down('#txtCoveredMeds').setDisabled(false);
                    fp.down('#txtYear').setDisabled(false);
                    view.down('#cbxAssignTo').show();
                }
                break;

            case 'fpCDAGAppealAckLetter':
                var fp = view.down('#fpCDAGAppealAckLetter');
                if (approvedUser != '') {
                    view.down('#btnSave').setDisabled(true);
                    view.down('#btnApprove').setDisabled(true);
                    view.down('#btnReset').show();
                    view.down('#cbxAssignTo').hide();
                    fp.down('#txtAplLetters').setDisabled(true);
                    fp.down('#dtAppealCreated').setDisabled(true);
                    fp.down('#txtAppealTimeFrame').setDisabled(true);
                }
                else {
                    view.down('#btnSave').setDisabled(false);
                    view.down('#btnReset').hide();
                    view.down('#cbxAssignTo').show();
                    fp.down('#txtAplLetters').setDisabled(false);
                    fp.down('#dtAppealCreated').setDisabled(false);
                    fp.down('#txtAppealTimeFrame').setDisabled(false);
                }
                break;

            case 'fpCDAGProviderAppealLtr':
                var fp = view.down('#fpCDAGProviderAppealLtr');
                if (approvedUser != '') {
                    view.down('#btnSave').setDisabled(true);
                    view.down('#btnApprove').setDisabled(true);
                    view.down('#btnReset').show();
                    view.down('#cbxAssignTo').hide();
                    fp.down('#cbxLetters').setDisabled(true);
                    fp.down('#cmbLinkedAppeal').setDisabled(true);
                    fp.down('#txtApprovedTime').setDisabled(true);
                    fp.down('#txtReason').setReadOnly(true);
                    fp.down('#txtReason').addCls('readonly-opacity');
                }
                else {
                    view.down('#btnSave').setDisabled(false);
                    view.down('#btnReset').hide();
                    view.down('#cbxAssignTo').show();
                    fp.down('#cbxLetters').setDisabled(false);
                    fp.down('#cmbLinkedAppeal').setDisabled(false);
                    fp.down('#txtApprovedTime').setDisabled(false);
                    fp.down('#txtReason').setReadOnly(false);
                    fp.down('#txtReason').removeCls('readonly-opacity');
                }
                break;

            case 'fpCDAGMemberAppealLtr':
                var fp = view.down('#fpCDAGMemberAppealLtr');
                if (approvedUser != '') {
                    view.down('#btnSave').setDisabled(true);
                    view.down('#btnApprove').setDisabled(true);
                    view.down('#btnReset').show();
                    view.down('#cbxAssignTo').hide();
                    fp.down('#cbxLetters').setDisabled(true);
                    fp.down('#cmbLinkedAppeal').setDisabled(true);
                    fp.down('#txtApprovedTime').setDisabled(true);
                    fp.down('#txtReason').setReadOnly(true);
                    fp.down('#txtPhyBoard').setDisabled(true);
                    fp.down('#txtMeetingDetail').setDisabled(true);
                    fp.down('#txtReason').addCls('readonly-opacity');
                }
                else {
                    view.down('#btnSave').setDisabled(false);
                    view.down('#btnReset').hide();
                    fp.down('#cbxLetters').setDisabled(false);
                    fp.down('#cmbLinkedAppeal').setDisabled(false);

                    if (fp.down('#txtApprovedTime')) {
                        fp.down('#txtApprovedTime').setDisabled(false);
                        fp.down('#txtReason').setReadOnly(false);
                        fp.down('#txtPhyBoard').setDisabled(false);
                        fp.down('#txtMeetingDetail').setDisabled(false);
                        fp.down('#txtReason').removeCls('readonly-opacity');
                    }
                    view.down('#cbxAssignTo').show();
                }
                break;
        }


        if (systemID != '') {
            view.down('#btnView').setDisabled(false);
            view.down('#btnDelete').setDisabled(false);
        }
        else {
            view.down('#btnView').setDisabled(true);
            view.down('#btnDelete').setDisabled(true);
        }

        if (approvedUser == '' && systemID != '') {
            view.down('#btnFax').setDisabled(true);

            view.down('#btnApprove').setDisabled(false);
            view.down('#btnApprove').show();
        }

        if (sentUser == '' && systemID != '' && approvedUser != '') {
            view.down('#btnSend').setDisabled(false);
            view.down('#btnFax').setDisabled(false);
            view.down('#btnDelete').setDisabled(false);
        }
        else {
            view.down('#btnSend').setDisabled(true);
            view.down('#btnReset').hide();
            view.down('#btnFax').setDisabled(true);
            if (sentUser != '' && CDAGLetterParameters.DisableAfterDecision == true) {
                view.down('#btnDelete').setDisabled(true);
            }
        }

        this.markAuthReadOnly();

    },

    markAuthReadOnly: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            CDAGLetterParameters = vm.get('CDAGLetterParameters');

        if (CDAGLetterParameters.IsAuthFromOldModule == 'true' || CDAGLetterParameters.IsAuthFromOldModule == true) {
            view.down('#btnSave').setDisabled(true);
            view.down('#btnApprove').setDisabled(true);
            view.down('#btnReset').setDisabled(true);
            view.down('#btnFax').setDisabled(true);
            view.down('#btnSend').setDisabled(true);
            view.down('#btnDelete').setDisabled(true);
        }
    },

    setFaxNumbers: function (pcpFax, preFax) {
        var view = this.getView();
        if (pcpFax) {
            /*var pcpPieces = pcpFax.split('-');  -------------------------- need to implement
             view.down('#txtFax1').setValue(pcpPieces[0]);
             view.down('#txtFax2').setValue(pcpPieces[1]);
             view.down('#txtFax3').setValue(pcpPieces[2]);*/
        }
        if (preFax) {
            /* var pcpPieces = preFax.split('-');  -------------------------- need to implement
             view.down('#txtFax4').setValue(pcpPieces[0]);
             view.down('#txtFax5').setValue(pcpPieces[1]);
             view.down('#txtFax6').setValue(pcpPieces[2]);*/
        }
    },

    hideAllMiddleFs: function () {
        var view = this.getView();
        view.down('#fpCDAGDenialLetters').hide();
        view.down('#fpCDAGProviderAppealLtr').hide();
        view.down('#fpCDAGMemberAppealLtr').hide();
        view.down('#fpCDAGCaseNotificationLtr').hide();
        view.down('#fpCDAGApprovalLetter').hide();
        view.down('#fpCDAGAdditonalInfoReqLtr').hide();
        view.down('#fpCDAGAppealAckLetter').hide();
        view.down('#fpCDAGInterventionLetter').hide();
        view.down('#fpCDAGAppovalHIXLetter').hide();
    },

    init: function () {
        this.hideAllMiddleFs();

        var view = this.getView(),
            vm = this.getViewModel(),
            viewready = vm.get('viewready'),
            letterParameters = view.extraParams[0],
            EnableTimeFrame = false,
            winTitle;

        vm.set('RefreshCDAGMain', false);

        /*if (viewready == null || viewready == 'undefined') {
            return;
        }*/

        var storeAssignTo = this.getViewModel().getStore('storeAssignTo');
        storeAssignTo.getProxy().setExtraParam('pQueueListID', 2);
        storeAssignTo.load();

        if (letterParameters.LOB == 'Medicare') {
            letterParameters.LOB = '2';
        }
        else if (letterParameters.LOB == 'Medicaid') {
            letterParameters.LOB = '1';
        }
        else if (letterParameters.LOB == 'Commercial') {
            letterParameters.LOB = '3';
        }

        vm.set('CDAGLetterParameters', letterParameters);

        view.down('#lblAuthID').setValue(letterParameters.AuthID);
        view.down('#lblRecpientID').setValue(letterParameters.RecipientID);
        view.down('#lblMember').setValue(letterParameters.MemberName);
        view.down('#lblPrescriberID').setValue(letterParameters.NPI);
        view.down('#lblLOB').setValue(letterParameters.LOBName);
        view.down('#lblPrescriber').setValue(letterParameters.PrescriberName);
        view.down('#lblPlanGroupID').setValue(letterParameters.MemberGroupID);
        view.down('#lblPlan').setValue(letterParameters.MemberGroupName);
        view.down('#lblPCPID').setValue(letterParameters.PCPID);
        view.down('#lblPCP').setValue(letterParameters.PCPName);
        view.down('#cbxAssignTo').setRawValue(letterParameters.AssignTo);
        view.down('#cbxAssignTo').setValue(letterParameters.AssignTo);
        view.down('#hiddenKey').setValue(letterParameters.AuthID);
        view.down('#hiddenSystemID').setValue(letterParameters.pSystemID);
        view.down('#hiddenDocumentID').setValue(letterParameters.pDocID);
        view.down('#hiddenApprovedUser').setValue(letterParameters.pApprovedUser);
        view.down('#hiddenSentUser').setValue(letterParameters.pSentUser);
        view.down('#hiddenAuthSystemID').setValue(letterParameters.SystemID);
        view.down('#hiddenServiceDate').setValue(letterParameters.ServiceDate);
        this.setFaxNumbers(letterParameters.PCPFax, letterParameters.PrescriberFax);

        var authId = letterParameters.AuthID,
            action = letterParameters.Action,
            timeFrame = letterParameters.timeFrame,
            letterId = letterParameters.letterId,
            appealType = letterParameters.appealType;

        if (appealType != undefined) {
            EnableTimeFrame = true;
            this.linkedAppeal = appealType;
            this.linkedLetterID = letterId;
            this.approvedTimeFrame = timeFrame;
        }

        this.letterAuthId = authId;
        this.letterLobId = letterParameters.LOB.toString();
        this.LetterFullName = letterParameters.LetterFullName;

        if (action == 'create') {
            var letterName = letterParameters.LetterName;
            view.down('#hdnLetterName').setValue(letterName);

            switch (letterName) {
                case 'MedicareDenial':
                    winTitle = 'Create Medicare Denial Letter';
                    view.down('#fpCDAGDenialLetters').show();
                    this.docReadyHandler_CDAGDenialLetters();
                    break;
                case 'MedicaidPADenial':
                    winTitle = 'Create Medicaid PA Denial Letter';
                    view.down('#fpCDAGDenialLetters').show();
                    this.docReadyHandler_CDAGDenialLetters();
                    break;
                case 'ProviderRedetermination':
                    winTitle = 'Create Provider Redetermination Letter';
                    view.down('#fpCDAGProviderAppealLtr').show();
                    this.docReadyHandler_CDAGProviderAppealLtr();
                    break;
                case 'QuickenPADenial':
                    winTitle = 'Create Denial Letter';
                    view.down('#fpCDAGDenialLetters').show();
                    this.docReadyHandler_CDAGDenialLetters();
                    break;
                case 'ProviderAppeal':
                    winTitle = 'Create Provider Appeal Letter';
                    view.down('#fpCDAGProviderAppealLtr').show();
                    this.docReadyHandler_CDAGProviderAppealLtr();
                    break;
                case 'MemberRedetermination':
                    winTitle = 'Create Member Redetermination Letter';
                    view.down('#fpCDAGMemberAppealLtr').show();
                    this.docReadyHandler_CDAGMemberAppealLtr();
                    break;
                case 'MemberAppeal':
                    winTitle = 'Create Member Appeal Letter';
                    view.down('#fpCDAGMemberAppealLtr').show();
                    this.docReadyHandler_CDAGMemberAppealLtr();
                    break;
                case 'CaseNotification':
                    winTitle = 'Create Case Notification Letter';
                    view.down('#fpCDAGCaseNotificationLtr').show();
                    this.docReadyHandler_CDAGCaseNotificationLtr();
                    break;
                case 'MedicareApproval':
                    winTitle = 'Create Medicare Approval Letter';
                    view.down('#fpCDAGApprovalLetter').show();
                    this.docReadyHandler_CDAGApprovalLetter();
                    break;
                case 'AdditionalInfoRequest':
                    winTitle = 'Create Medicare Additional Information Request Letter';
                    view.down('#fpCDAGAdditonalInfoReqLtr').show();
                    this.docReadyHandler_CDAGAdditonalInfoReqLtr();
                    break;
                case 'Intervention':
                    winTitle = 'Create Intervention Letter';
                    view.down('#fpCDAGInterventionLetter').show();
                    this.docReadyHandler_CDAGInterventionLetter();
                    break;
                case 'ChoicePADenial':
                    winTitle = 'Create Choice PA Denial Letter';
                    view.down('#fpCDAGDenialLetters').show();
                    this.docReadyHandler_CDAGDenialLetters();
                    break;
                case 'ChoicePAApproval':
                    winTitle = 'Create Choice PA Approval Letter';
                    view.down('#fpCDAGAppovalHIXLetter').show();
                    this.docReadyHandler_CDAGAppovalHIXLetter();
                    break;

                case 'ChoiceMemberAppeal':
                    winTitle = 'Create Choice Member Appeal Letter';
                    view.down('#fpCDAGMemberAppealLtr').show();
                    this.docReadyHandler_CDAGMemberAppealLtr();
                    break;

                case 'QuickenPAApproval':
                    winTitle = 'Create PA Approval Letter';
                    view.down('#fpCDAGAppovalHIXLetter').show();
                    this.docReadyHandler_CDAGAppovalHIXLetter();
                    break;

                case 'QuickenMemberAppeal':
                    winTitle = 'Create Member Appeal Letter';
                    view.down('#fpCDAGMemberAppealLtr').show();
                    this.docReadyHandler_CDAGMemberAppealLtr();
                    break;

                case 'QuickenProviderAppeal':
                    winTitle = 'Create Provider Appeal Letter';
                    view.down('#fpCDAGProviderAppealLtr').show();
                    this.docReadyHandler_CDAGProviderAppealLtr();
                    break;

                case 'NextLevelPADenial':
                    winTitle = 'Create NextLevel PA Denial Letter';
                    view.down('#fpCDAGDenialLetters').show();
                    this.docReadyHandler_CDAGDenialLetters();
                    break;

                case 'NextLevelPAApproval':
                    winTitle = 'Create NextLevel Approval Letter';
                    view.down('#fpCDAGAppovalHIXLetter').show();
                    this.docReadyHandler_CDAGAppovalHIXLetter();
                    break;
                case 'NextLevelMemberAppeal':
                    winTitle = 'Create NextLevel Member Appeal Letter';
                    view.down('#fpCDAGMemberAppealLtr').show();
                    this.docReadyHandler_CDAGMemberAppealLtr();
                    break;
                case 'NextLevelProviderAppeal':
                    winTitle = 'Create NextLevel Provider Appeal Letter';
                    view.down('#fpCDAGProviderAppealLtr').show();
                    this.docReadyHandler_CDAGProviderAppealLtr();
                    break;
            }
            view.title = winTitle;
        }
        else if (action == 'update') {

            view.down('#hdnLetterName').setValue(letterParameters.LetterName);
            var systemID = letterParameters.pSystemID;
            var approvedUser = letterParameters.pApprovedUser;
            var sentUser = letterParameters.pSentUser;
            var createUser = letterParameters.pCreateUser;
            var docID = letterParameters.pDocID;
            var carrier = letterParameters.pCarrier;
            var letterType = letterParameters.pLetterType;
            switch (letterType) {
                case ('D Medicare'):
                    winTitle = 'Update Medicare Denial Letter';
                    view.down('#fpCDAGDenialLetters').show();
                    this.docReadyHandler_CDAGDenialLetters(systemID, docID, approvedUser, sentUser, authId);
                    break;

                case ('D Medicaid'):
                    if (carrier != "NextLevel") {
                        winTitle = 'Update Medicaid Denial Letter';
                        view.down('#fpCDAGDenialLetters').show();
                    }
                    else {
                        winTitle = 'Update NextLevel Denial Letter';
                        view.down('#fpCDAGDenialLetters').show();
                    }
                    this.docReadyHandler_CDAGDenialLetters(systemID, docID, approvedUser, sentUser, authId);
                    break;

                case ('R Medicare'):
                    winTitle = 'Update Provider Redetermination Letter';
                    view.down('#fpCDAGProviderAppealLtr').show();
                    this.docReadyHandler_CDAGProviderAppealLtr(systemID, docID, approvedUser, sentUser, authId);
                    break;

                case ('R Medicaid'):
                    if (carrier != "NextLevel") {
                        winTitle = 'Update Provider Appeal Letter';
                        view.down('#fpCDAGProviderAppealLtr').show();
                        this.docReadyHandler_CDAGProviderAppealLtr(systemID, docID, approvedUser, sentUser, authId);
                    }
                    else {
                        winTitle = 'Update NextLevel Provider Appeal Letter';
                        view.down('#fpCDAGProviderAppealLtr').show();
                        this.docReadyHandler_CDAGProviderAppealLtr(systemID, docID, approvedUser, sentUser, authId);
                    }
                    break;

                case ('A Medicare'):
                    winTitle = 'Update Member Redetermination Letter';
                    view.down('#fpCDAGMemberAppealLtr').show();
                    this.docReadyHandler_CDAGMemberAppealLtr(systemID, docID, approvedUser, sentUser, authId);
                    break;

                case ('A Medicaid'):
                    if (carrier != "NextLevel") {
                        winTitle = 'Update Member Appeal Letter';
                        view.down('#fpCDAGMemberAppealLtr').show();
                        this.docReadyHandler_CDAGMemberAppealLtr(systemID, docID, approvedUser, sentUser, authId);
                    }
                    else {
                        winTitle = 'Update NextLevel Member Appeal Letter';
                        view.down('#fpCDAGMemberAppealLtr').show();
                        this.docReadyHandler_CDAGMemberAppealLtr(systemID, docID, approvedUser, sentUser, authId);
                    }
                    break;

                case ('Medicare Case Notification Medicare'):
                    winTitle = 'Update Case Notification Letter';
                    view.down('#fpCDAGCaseNotificationLtr').show();
                    this.docReadyHandler_CDAGCaseNotificationLtr(systemID, docID, approvedUser, sentUser, authId);
                    break;

                case ('Medicare Auth Approval Medicare'):
                    winTitle = 'Update Medicare Approval Letter';
                    view.down('#fpCDAGApprovalLetter').show();
                    this.docReadyHandler_CDAGApprovalLetter(systemID, docID, approvedUser, sentUser, authId);
                    //view.height = 550;
                    break;

                case ('Medicare Additional Info Request Medicare'):
                    winTitle = 'Update Medicare Approval Letter';
                    view.down('#fpCDAGAdditonalInfoReqLtr').show();
                    this.docReadyHandler_CDAGAdditonalInfoReqLtr(systemID, docID, approvedUser, sentUser, authId);
                    break;

                case ('Appeal Acknowledgement Medicaid'):
                    winTitle = 'Update Medicaid Appeal Acknowledgement Letter';
                    view.down('#fpCDAGAppealAckLetter').show();
                    this.docReadyHandler_CDAGAppealAckLetter(systemID, docID, approvedUser, sentUser, authId);
                    //view.height = 500;

                    break;

                case ('Urgent Appeal Acknowledgement Medicaid'):
                    winTitle = 'Update Medicaid Urgent Appeal Acknowledgement Letter';
                    view.down('#fpCDAGAppealAckLetter').show();
                    this.docReadyHandler_CDAGAppealAckLetter(systemID, docID, approvedUser, sentUser, authId);
                    break;

                case ('Level 2 Appeal Acknowledgement Medicaid'):
                    winTitle = 'Update Medicaid Level 2 Appeal Acknowledgement Letter';
                    view.down('#fpCDAGAppealAckLetter').show();
                    this.docReadyHandler_CDAGAppealAckLetter(systemID, docID, approvedUser, sentUser, authId);
                    break;

                case ('Appeal Acknowledgement Commercial'):
                    winTitle = 'Update Choice Appeal Acknowledgement Letter';
                    view.down('#fpCDAGAppealAckLetter').show();
                    this.docReadyHandler_CDAGAppealAckLetter(systemID, docID, approvedUser, sentUser, authId);
                    break;

                case ('Urgent Appeal Acknowledgement Commercial'):
                    winTitle = 'Update Choice Urgent Appeal Acknowledgement Letter';
                    view.down('#fpCDAGAppealAckLetter').show();
                    this.docReadyHandler_CDAGAppealAckLetter(systemID, docID, approvedUser, sentUser, authId);
                    break;

                case ('Intervention Medicaid'):
                    winTitle = 'Update Intervention Letter';
                    view.down('#fpCDAGInterventionLetter').show();
                    this.docReadyHandler_CDAGInterventionLetter(systemID, docID, approvedUser, sentUser, authId);
                    break;

                case ('Intervention Medicare'):
                    winTitle = 'Update Intervention Letter';
                    view.down('#fpCDAGInterventionLetter').show();
                    this.docReadyHandler_CDAGInterventionLetter(systemID, docID, approvedUser, sentUser, authId);
                    break;

                case ('HIX Auth Approval Commercial'):
                    winTitle = 'Update Choice Approval Letter';
                    view.down('#fpCDAGAppovalHIXLetter').show();
                    this.docReadyHandler_CDAGAppovalHIXLetter(systemID, docID, approvedUser, sentUser, authId);
                    break;

                case ('Quicken Auth Approval Commercial'):
                    winTitle = 'Update PA Approval Letter';
                    view.down('#fpCDAGAppovalHIXLetter').show();
                    this.docReadyHandler_CDAGAppovalHIXLetter(systemID, docID, approvedUser, sentUser,authId);
                    break;

                case ('D Commercial'):
                    winTitle = 'Update Denial Letter';
                    view.down('#fpCDAGDenialLetters').show();
                    this.docReadyHandler_CDAGDenialLetters(systemID, docID, approvedUser, sentUser, authId);
                    break;

                case ('A Commercial'):
                    winTitle = 'Update Choice Member Appeal Letter';
                    view.down('#fpCDAGMemberAppealLtr').show();
                    this.docReadyHandler_CDAGMemberAppealLtr(systemID, docID, approvedUser, sentUser, authId);
                    break;

                case ('R Commercial'):
                    winTitle = 'Update Provider Appeal Letter';
                    view.down('#fpCDAGProviderAppealLtr').show();
                    this.docReadyHandler_CDAGProviderAppealLtr(systemID, docID, approvedUser, sentUser, authId);
                break;
            }
            view.title = winTitle;
        }
    },

    boxReady: function (view, width, height) {
        this.getViewModel().set('viewready', true);
        //this.init();
    }

});
