/**
 * Created by s6393 on 12/2/2016.
 */
Ext.define('Atlas.pharmacy.view.credentialing.CredentialingPopupsController', {
    extend: 'Atlas.pharmacy.view.credentialing.CredentialingController',
    alias: 'controller.credentialing-popups',
    listen: {
        controller: {
            '*': {
                saverefreshholdrequestrelletter: 'saveRefreshHoldRequestRelLetter'
            }
        }
    },
    init: function () {
        var me = this,
            vm = this.getViewModel();
        if (me.getView().extraParams) {
            var credLettersParams = me.getView().extraParams["pCredLettersParams"];

            if (credLettersParams) {
                vm.set('keyType', credLettersParams.KeyType);
                vm.set('keyValue', credLettersParams.KeyValue);
                vm.set('credLogID', credLettersParams.CredLogID);
                vm.set('credType', credLettersParams.CredType);
                vm.set('keySystemID', credLettersParams.KeySystemID);
                vm.set('faxNumber', credLettersParams.FaxNumber);
                vm.set('selectedCredLogRecord', credLettersParams.SelectedCredLogRecord.data);
                me.getView().down('#rdReCred').setValue(true);
            }
        }
    },

    setLettersButton: function (rgLettersType, newValue, oldValue, eOpts) {
        var me = this,
            vm = this.getViewModel(),
            keyType = vm.get('keyType'),
            credType = vm.get('credType'),
            credLogID = vm.get('credLogID'),
            faxNumber = vm.get('faxNumber'),
            keySystemID = vm.get('keySystemID'),
            record = vm.get('selectedCredLogRecord'),
            letterType = rgLettersType.getValue().lettersType;

        me.getView().down('#txtFaxNumber').setValue(faxNumber);

        if (keySystemID && keySystemID != '' && keySystemID != 0 && keySystemID != '0') {
            if (keyType == 'RID') {
                me.getView().down('#rdRefHoldReq').hide();
                me.getView().down('#rdRefHoldReqRel').show();
            }
            else {
                me.getView().down('#rdRefHoldReqRel').hide();
                me.getView().down('#rdRefHoldReq').show();
            }

            if (credLogID && credLogID != '' && credLogID != '0' && credLogID != 0) {
                me.getView().down('#rdReCred').setDisabled(false);
                me.getView().down('#rdReCredFail').setDisabled(false);
                me.getView().down('#rdWelcome').setDisabled(false);
                me.getView().down('#rdReCredWelcome').setDisabled(false);
                me.getView().down('#rdRelAddWelcome').setDisabled(false);
                me.getView().down('#rdCredCriteria').setDisabled(false);

                if (credType.toUpperCase() == 'RECREDENTIAL') {
                    me.getView().down('#rdReCredWelcome').setDisabled(false);
                }
                else {
                    me.getView().down('#rdReCredWelcome').setDisabled(true);
                }
            }
            else {
                me.getView().down('#rdReCred').setDisabled(true);
                me.getView().down('#rdReCredFail').setDisabled(true);
                me.getView().down('#rdWelcome').setDisabled(true);
                me.getView().down('#rdReCredWelcome').setDisabled(true);
                me.getView().down('#rdRelAddWelcome').setDisabled(true);
                me.getView().down('#rdCredCriteria').setDisabled(true);

            }
        }

        switch (letterType) {
            case 'Welcome Letter':
                me.getView().down('#dtContEffDate').setDisabled(false);
                me.getView().down('#dtAppDate').setDisabled(false);
                me.getView().down('#dtContEffDate').setValue('');
                me.getView().down('#dtAppDate').setValue('');
                me.getView().down('#dtAppDate').clearInvalid();
                me.getView().down('#dtContEffDate').clearInvalid();

                me.getView().down('#txtCritiria1').setDisabled(true);
                me.getView().down('#txtCritiria2').setDisabled(true);
                me.getView().down('#txtCritiria1').setValue('');
                me.getView().down('#txtCritiria2').setValue('');
                me.getView().down('#cbxWelAddRelationship').setValue('');
                me.getView().down('#cbxWelAddRelationship').setDisabled(true);
                me.getView().down('#cbxWelAddRelationship').clearInvalid();

                vm.set('docId', record.WelcomeDocId);
                vm.set('letterId', record.WelcomeLtrId);
                break;

            case 'Recredentialing Letter':
                me.getView().down('#dtContEffDate').setDisabled(true);
                me.getView().down('#dtAppDate').setDisabled(true);
                me.getView().down('#dtContEffDate').setValue('');
                me.getView().down('#dtAppDate').setValue('');
                me.getView().down('#dtAppDate').clearInvalid();
                me.getView().down('#dtContEffDate').clearInvalid();

                me.getView().down('#txtCritiria1').setDisabled(true);
                me.getView().down('#txtCritiria2').setDisabled(true);
                me.getView().down('#txtCritiria1').setValue('');
                me.getView().down('#txtCritiria2').setValue('');
                me.getView().down('#cbxWelAddRelationship').setValue('');
                me.getView().down('#cbxWelAddRelationship').setDisabled(true);
                me.getView().down('#cbxWelAddRelationship').clearInvalid();

                vm.set('docId', record.ReCredDocId);
                vm.set('letterId', record.ReCredLtrId);
                break;

            case 'Recredentialing Fail Letter':
                me.getView().down('#dtContEffDate').setDisabled(true);
                me.getView().down('#dtAppDate').setDisabled(true);
                me.getView().down('#dtContEffDate').setValue('');
                me.getView().down('#dtAppDate').setValue('');
                me.getView().down('#dtAppDate').clearInvalid();
                me.getView().down('#dtContEffDate').clearInvalid();

                me.getView().down('#txtCritiria1').setDisabled(true);
                me.getView().down('#txtCritiria2').setDisabled(true);
                me.getView().down('#txtCritiria1').setValue('');
                me.getView().down('#txtCritiria2').setValue('');
                me.getView().down('#cbxWelAddRelationship').setValue('');
                me.getView().down('#cbxWelAddRelationship').setDisabled(true);
                me.getView().down('#cbxWelAddRelationship').clearInvalid();

                vm.set('docId', record.ReCredfailDocId);
                vm.set('letterId', record.ReCredfailLtrId);
                break;

            case 'Relationship Additions Welcome Letter':
                me.getView().down('#dtContEffDate').setDisabled(true);
                me.getView().down('#dtAppDate').setDisabled(false);
                me.getView().down('#dtContEffDate').setValue('');
                me.getView().down('#dtContEffDate').clearInvalid();

                me.getView().down('#txtCritiria1').setDisabled(true);
                me.getView().down('#txtCritiria2').setDisabled(true);
                me.getView().down('#txtCritiria1').setValue('');
                me.getView().down('#txtCritiria2').setValue('');
                me.getView().down('#cbxWelAddRelationship').setDisabled(false);

                vm.set('docId', record.AddRelWelDocId);
                vm.set('letterId', record.AddRelWelLtrId);
                break;

            case 'Credentialing Criteria Not Met Letter':
                me.getView().down('#dtContEffDate').setDisabled(true);
                me.getView().down('#dtAppDate').setDisabled(true);
                me.getView().down('#dtContEffDate').setValue('');
                me.getView().down('#dtAppDate').setValue('');
                me.getView().down('#dtAppDate').clearInvalid();
                me.getView().down('#dtContEffDate').clearInvalid();

                me.getView().down('#txtCritiria1').setDisabled(false);
                me.getView().down('#txtCritiria2').setDisabled(false);
                me.getView().down('#cbxWelAddRelationship').setValue('');
                me.getView().down('#cbxWelAddRelationship').setDisabled(true);
                me.getView().down('#cbxWelAddRelationship').clearInvalid();

                vm.set('docId', record.CriNotMetDocId);
                vm.set('letterId', record.CriNotMetLtrId);
                break;

            case 'Recredentialing Welcome Letter':
                me.getView().down('#dtContEffDate').setDisabled(true);
                me.getView().down('#dtAppDate').setDisabled(false);
                me.getView().down('#txtCritiria1').setDisabled(true);
                me.getView().down('#txtCritiria2').setDisabled(true);
                me.getView().down('#txtCritiria1').setValue('');
                me.getView().down('#txtCritiria2').setValue('');
                me.getView().down('#dtContEffDate').setValue('');
                me.getView().down('#dtContEffDate').clearInvalid();
                me.getView().down('#cbxWelAddRelationship').setValue('');
                me.getView().down('#cbxWelAddRelationship').setDisabled(true);
                me.getView().down('#cbxWelAddRelationship').clearInvalid();

                vm.set('docId', record.recredWelcomeDocId);
                vm.set('letterId', record.recredWelcomeLtrId);
                break;

            case 'Refresh Hold Request Letter':
                me.getView().down('#dtContEffDate').setDisabled(true);
                me.getView().down('#dtContEffDate').setValue('');
                me.getView().down('#dtContEffDate').clearInvalid();
                me.getView().down('#dtAppDate').setDisabled(true);
                me.getView().down('#dtAppDate').setValue('');
                me.getView().down('#dtAppDate').clearInvalid();
                me.getView().down('#txtCritiria1').setDisabled(true);
                me.getView().down('#txtCritiria2').setDisabled(true);
                me.getView().down('#txtCritiria1').setValue('');
                me.getView().down('#txtCritiria2').setValue('');
                me.getView().down('#cbxWelAddRelationship').setDisabled(false);
                letterType = 'New Pharmacy Missing Cred Info Independent Letter';

                vm.set('docId', record.reqHoldReqDocId);
                vm.set('letterId', record.reqHoldReqLtrId);
                break;

            case 'Refresh Hold Request Letter - Relationship':
                me.getView().down('#dtContEffDate').setDisabled(true);
                me.getView().down('#dtContEffDate').setValue('');
                me.getView().down('#dtContEffDate').clearInvalid();
                me.getView().down('#dtAppDate').setDisabled(true);
                me.getView().down('#dtAppDate').setValue('');
                me.getView().down('#dtAppDate').clearInvalid();
                me.getView().down('#txtCritiria1').setDisabled(true);
                me.getView().down('#txtCritiria2').setDisabled(true);
                me.getView().down('#txtCritiria1').setValue('');
                me.getView().down('#txtCritiria2').setValue('');
                me.getView().down('#cbxWelAddRelationship').setValue('');
                me.getView().down('#cbxWelAddRelationship').setDisabled(true);
                me.getView().down('#cbxWelAddRelationship').clearInvalid();
                letterType = 'New Pharmacy Missing Cred Info Corporate Letter';

                vm.set('docId', record.reqHoldReqCorpDocId);
                vm.set('letterId', record.reqHoldReqCorpLtrId);
                break;
        }

        if (vm.get('docId') == 0 || vm.get('letterId') == 0) {
            me.getView().down('#btnSendFax').setDisabled(true);
            me.getView().down('#btnPreview').setDisabled(true);
            me.getView().down('#btnSend').setDisabled(true);
        }
        else {
            me.getView().down('#btnSendFax').setDisabled(false);
            me.getView().down('#btnPreview').setDisabled(false);
            me.getView().down('#btnSend').setDisabled(false);
        }

        me.getLetterDetails(letterType);
    },

    saveLetter: function () {
        var me = this,
            fields = '',
            values = '',
            view = this.getView(),
            vm = this.getViewModel(),
            credSystemId = vm.get('selectedCredLogRecord').systemID,
            letterType = me.getView().down('#rgLettersType').getValue().lettersType;
        if (!view.down('#letterForm').isValid()) { return; }
        if (vm.get('letterNameId') == 0 || vm.get('letterProgramName') == "") {
            Ext.Msg.alert('Error', 'Letter setup missing.');
        }
        else {
            if (letterType == "Recredentialing Letter") {
                fields = "CreateDate,CreateBy,ParentSystemID,LetterNameID";
                values = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + "|" + Atlas.user.un + "|" + credSystemId + "|" + vm.get('letterNameId');
            }
            else if (letterType == "Recredentialing Fail Letter") {
                fields = "CreateDate,CreateBy,ParentSystemID,LetterNameID";
                values = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + "|" + Atlas.user.un + "|" + credSystemId + "|" + vm.get('letterNameId');
            }
            else if (letterType == "Welcome Letter") {
                fields = "CreateDate,CreateBy,ParentSystemID,FreeText1,FreeText2,LetterNameID";
                values = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + "|" + Atlas.user.un + "|" + credSystemId + "|" + Ext.Date.format(view.down('#dtAppDate').getValue(), 'm/d/Y') + "|" + Ext.Date.format(view.down('#dtContEffDate').getValue(), 'm/d/Y') + "|" + vm.get('letterNameId');
            }

            else if (letterType == "Recredentialing Welcome Letter") {
                fields = "CreateDate,CreateBy,ParentSystemID,FreeText1,LetterNameID";
                values = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + "|" + Atlas.user.un + "|" + credSystemId + "|" + Ext.Date.format(view.down('#dtAppDate').getValue(), 'm/d/Y') + "|" + vm.get('letterNameId');
            }

            else if (letterType == "Relationship Additions Welcome Letter") {
                fields = "CreateDate,CreateBy,ParentSystemID,FreeText1,FreeText5,LetterNameID";
                values = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + "|" + Atlas.user.un + "|" + credSystemId + "|" + Ext.Date.format(view.down('#dtAppDate').getValue(), 'm/d/Y') + "|" + view.down('#cbxWelAddRelationship').getValue() + "|" + vm.get('letterNameId');
            }
            else if (letterType == "Credentialing Criteria Not Met Letter") {
                fields = "CreateDate,CreateBy,ParentSystemID,FreeText3,FreeText4,LetterNameID";
                values = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + "|" + Atlas.user.un + "|" + credSystemId + "|" + view.down('#txtCritiria1').getValue() + "|" + view.down('#txtCritiria2').getValue() + "|" + vm.get('letterNameId');
            }

            else if (letterType == "Refresh Hold Request Letter") {
                letterType = "New Pharmacy Missing Cred Info Independent Letter";
                fields = "CreateDate,CreateBy,ParentSystemID,FreeText1,FreeText2,LetterNameID";
                values = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + "|" + Atlas.user.un + "|" + vm.get('keySystemID') + "|" + vm.get('keyValue') + "|" + view.down('#cbxWelAddRelationship').getValue() + "|" + vm.get('letterNameId');
            }

            else if (letterType == "Refresh Hold Request Letter - Relationship") {


                var win = Ext.create({
                    xtype: 'pharmacy-addpharmacy-win'
                });
                win.show(this);
            }

            me.saveLetterDetail(letterType, fields, values);
        }
    },

    saveRefreshHoldRequestRelLetter: function (ncpdpIds) {
        var me = this,
            vm = this.getViewModel();
        if(vm){
            var letterType = "New Pharmacy Missing Cred Info Corporate Letter",
                fields = "CreateDate,CreateBy,ParentSystemID,FreeText1,FreeText2,LetterNameID",
                values = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + "|" + Atlas.user.un + "|" + vm.get('keySystemID') + "|" + ncpdpIds + "|" + vm.get('keyValue') + "|" + vm.get('letterNameId');

            me.saveLetterDetail(letterType, fields, values);
        }
    },

    saveLetterDetail: function (letterType, fields, values) {
        var me = this,
            view = this.getView(),
            vm = this.getViewModel(),
            credSystemId = vm.get('selectedCredLogRecord').systemID;

        var saveAction = [{
            "Save": {"key": '', "value": ''}
        }];
        var extraParameters = {
            pLetterID: 0,
            pMode: 'A',
            pFields: fields,
            pValues: values
        };
        var setLetterDetail = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdetail/update', null, [false], extraParameters,
            saveAction, ['pretLetterID']);


        if (setLetterDetail.code == 0) {
            if (setLetterDetail.pretLetterID) {
                vm.set('letterId', setLetterDetail.pretLetterID);
                extraParameters = {
                    pLetterID: setLetterDetail.pretLetterID,
                    pLetterProgramName: vm.get('letterProgramName')
                };
                var setletterdocument = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdocument/update', null, [false], extraParameters,
                    saveAction, ['DocID']);

                if (setletterdocument.code == 0) {
                    var storeDocument = vm.getStore("storeDocument");
                    storeDocument.load({
                        scope: this,
                        params: {
                            pLetterID: setLetterDetail.pretLetterID,
                            pFields: "DocID"
                        },
                        callback: function (record, operation) {
                            var status = operation.getResultSet().message[0];
                            if (record) {
                                var paramRecord = me.getView().extraParams["pRecord"];
                                vm.set("docId", record[0].data.DocID);
                                vm.set("letterId", setLetterDetail.pretLetterID);
                                var attachmentList = me.setAttachmentlist('A', letterType + ' Generated');
                                if (attachmentList.message == 'Successful') {
                                    me.getView().down("#btnPreview").setDisabled(false);
                                    me.getView().down("#btnSend").setDisabled(false);
                                    me.getView().down("#btnSendFax").setDisabled(false);
                                    Ext.Msg.alert('Success', 'Letter has been generated successfully.');
                                }
                                else {
                                    Ext.Msg.alert('Error', attachmentList.message);
                                }
                            }

                        }
                    });
                }
            }
        }
    },

    getLetterDetails: function (letterName) {
        var storeLetterNameId = this.getViewModel().getStore('letterNameId');
        storeLetterNameId.getProxy().setExtraParam('pBuffer', 'LetterMaster');
        storeLetterNameId.getProxy().setExtraParam('pWhere', "LetterName = '" + letterName + "' ");
        storeLetterNameId.getProxy().setExtraParam('pField', 'LetterNameId');
        storeLetterNameId.getProxy().setExtraParam('pSessionId', Atlas.user.sessionId);
        storeLetterNameId.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var objResp = Ext.decode(operation.getResponse().responseText);
                if (objResp.message[0].code == 0) {
                    this.getViewModel().set('letterNameId', objResp.data[0].LetterNameId);
                    var storeLetterProgramName = this.getViewModel().getStore('letterProgramName');
                    storeLetterProgramName.getProxy().setExtraParam('pBuffer', 'LetterMaster');
                    storeLetterProgramName.getProxy().setExtraParam('pWhere', "LetterName = '" + letterName + "' ");
                    storeLetterProgramName.getProxy().setExtraParam('pField', 'LetterProgramName');
                    storeLetterProgramName.getProxy().setExtraParam('pSessionId', Atlas.user.sessionId);
                    storeLetterProgramName.load({
                        scope: this,
                        failure: function (record, operation) {
                        },
                        success: function (record, operation) {
                        },
                        callback: function (record, operation, success) {
                            var objResp = Ext.decode(operation.getResponse().responseText);
                            if (objResp.message[0].code == 0) {
                                this.getViewModel().set('letterProgramName', objResp.data[0].LetterProgramName);
                            }
                        }
                    });
                }
            }
        });
    },

    setAttachmentlist: function (action, desc) {
        var me = this,
            vm = this.getViewModel();

        var saveAction = [{
            "Save": {"key": '', "value": ''}
        }];
        var extraParameters = {
            pcPlanID: '',
            pcKeyType: vm.get('keyType'),
            pcKeyValue: vm.get('keyValue'),
            pcKeyAction: action,
            pcDocIDList: vm.get('docId'),
            pcDescrData: desc + " Generated"
        };

        var setattachmentlist = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', '', [false], extraParameters,
            saveAction, null);

        return setattachmentlist;
    },

    previewLetter: function () {
        var me = this,
            vm = this.getViewModel(),
            documentID = vm.get('docId'),
            modelViewPDF = Ext.create('Atlas.common.model.shared.ViewPDF');
        modelViewPDF.getProxy().setExtraParam('pDocumentID', documentID);
        modelViewPDF.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var objResp = Ext.decode(operation.getResponse().responseText);
                if (objResp.message[0].code == 0) {
                    //Atlas.common.utility.Utilities.displayDocument('pdf', documentID);
                    Atlas.common.utility.Utilities.viewDocument(documentID,'pdf');
                }
                else {
                    Ext.Msg.alert('Message', 'PDF Document is being generated. Please try again later.');
                }
            }
        });
    },

    sendFax: function (btn) {
        var me = this,
            vm = me.getViewModel(),
            letterType = me.getView().down('#rgLettersType').getValue().lettersType,
            faxNumber = me.getView().down('#txtFaxNumber').getValue();

        if (letterType == "Refresh Hold Request Letter") {
            letterType = "New Pharmacy Missing Cred Info Independent Letter";
        }
        else if (letterType == "Refresh Hold Request Letter - Relationship") {
            letterType = "New Pharmacy Missing Cred Info Corporate Letter";
        }

        var attachmentList = me.setAttachmentlist('A', letterType + ' Faxed');

        if (attachmentList.message == 'Successful') {
            var saveAction = [{
                "Save": {"key": '', "value": ''}
            }];
            var extraParameters = {
                pDescription: letterType + ' sent to ' + faxNumber,
                pProgramName: "faxDocument.p",
                pParameters: vm.get('docId') + '|',
                pRunMode: 2,
                pProgramType: 'Fax',
                pSaveDocument: true,
                pFaxNumber: faxNumber
            };

            var setsubmitjob = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [false], extraParameters,
                saveAction, ['pDocumentID']);

            if (setsubmitjob.code == 0) {
                var fields = 'sentBy,sentDate,AssignTo',
                    values = Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + "|",
                    extraParameters = {
                        pLetterID: vm.get('letterId'),
                        pMode: 'U',
                        pFields: fields,
                        pValues: values
                    };

                var setLetterDetail = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdetail/update', null, [false], extraParameters,
                    saveAction, ['pretLetterID']);

                if (setLetterDetail.code == 0) {
                    Ext.Msg.alert('Fax', 'Please check your fax status in Job Queue.');
                    btn.up('window').close();
                }
            }
            else {
                Ext.Msg.alert('Error', setsubmitjob.message);
            }
        }
        else {
            Ext.Msg.alert('Error', attachmentList.message);
        }
    },

    sendLetter: function (btn) {
        var me = this,
            vm = me.getViewModel(),
            letterType = me.getView().down('#rgLettersType').getValue().lettersType;

        if (letterType == "Refresh Hold Request Letter") {
            letterType = "New Pharmacy Missing Cred Info Independent Letter";
        }
        else if (letterType == "Refresh Hold Request Letter - Relationship") {
            letterType = "New Pharmacy Missing Cred Info Corporate Letter";
        }

        var fields = 'sentBy,sentDate,AssignTo',
            values = Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime() , 'm/d/Y') + "|",
            saveAction = [{
                "Save": {"key": '', "value": ''}
            }],
            extraParameters = {
                pLetterID: vm.get('letterId'),
                pMode: 'U',
                pFields: fields,
                pValues: values
            };

        var setLetterDetail = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdetail/update', null, [false], extraParameters,
            saveAction, ['pretLetterID']);

        if (setLetterDetail.code == 0) {
            var attachmentList = me.setAttachmentlist('A', letterType + ' Sent');

            if (attachmentList.message == 'Successful') {
                Ext.Msg.alert('Success', 'Letter has been sent successfully.');
                btn.up('window').close();
            }
            else {
                Ext.Msg.alert('Error', attachmentList.message);
            }
        }
        else {
            Ext.Msg.alert('Error', setLetterDetail.message);
        }
    }
});