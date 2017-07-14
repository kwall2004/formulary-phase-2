/**
 * Created by T4317 on 11/22/2016.
 */
Ext.define('Atlas.claims.view.SendPaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sendpacontroller',
    init: function () {

    },

    onBoxReady: function () {
        var fax = '',
            view = this.getView(),
            vm = this.getViewModel(),
            claimrecord = vm.get('claimrecord');

        var prescriberMasterModel = Ext.create('Atlas.common.model.Prescriber', {});
        prescriberMasterModel.getProxy().setExtraParam('pKeyValue', claimrecord.get('prescriberNPI'));
        prescriberMasterModel.load({
            callback: function (record, operation, success) {
                if (record.get('locfax')) {
                    fax = record.get('locfax').replace(/\D/g, '');
                }
                if (fax.length === 10) {
                    view.down('#faxNumber1').setValue(fax.substring(0, 3));
                    view.down('#faxNumber2').setValue(fax.substring(3, 6));
                    view.down('#faxNumber3').setValue(fax.substring(6));
                }
                view.down('#cbxMedication').setValue(claimrecord.get('NDC'));
                view.down('#cbxMedication').setRawValue(claimrecord.get('NDC'));
                view.down('#cbxPrescriber').setValue(claimrecord.get('prescriberNPI'));
                view.down('#cbxPrescriber').setRawValue(claimrecord.get('prescriberNPI'));
            }
        });
    },

    onPreview: function (button) {
        var parameters = '',
            extraParameters = '',
            view = this.getView(),
            vm = this.getViewModel(),
            claimrecord = vm.get('claimrecord'),
            ndc = view.down('#cbxMedication').getValue(),
            prescriberNPI = view.down('#cbxPrescriber').getValue(),
            description = 'PA Form Fax - ' + prescriberNPI,
            saveAction = [{"Save": {"key": '', "value": ''}}],
            faxNumber = view.down('#faxNumber1').getValue() + '-' + view.down('#faxNumber2').getValue() + '-' + view.down('#faxNumber3').getValue();
        if (!view.down('#faxForm').isValid()) {
            return;
        }

        parameters = prescriberNPI + '|' +
            'MeridianRx' + '|' +
            faxNumber + '|' +
            Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y') + '|' +
            '|' +
            '|' +
            view.down('#message').getValue() + '|' +
            claimrecord.get('keyvalue')  + '|' +
            claimrecord.get('recipientID') + '|' +
            claimrecord.get('planGroupId') + '|' +
            prescriberNPI + '|' +
            ndc;

        extraParameters = {
            pDescription: description,
            pProgramName: 'ltrPAForm.p',
            pParameters: parameters,
            pRunMode: 1,
            pProgramType: 'Report',
            pSaveDocument: false,
            pFaxNumber: faxNumber
        };

        var setsubmitjob = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [false], extraParameters,
            saveAction, ['pData']);

        if (setsubmitjob.code == 0) {
            Atlas.common.utility.Utilities.displayDocument('pdf', setsubmitjob.pData);
            //button.up('window').close();
        }
        else {
            Ext.Msg.alert('Error', setsubmitjob.message);
        }
    },

    onSendFax: function (button) {
        var parameters = '',
            extraParameters = '',
            view = this.getView(),
            vm = this.getViewModel(),
            claimrecord = vm.get('claimrecord'),
            ndc = view.down('#cbxMedication').getValue(),
            prescriberNPI = view.down('#cbxPrescriber').getValue(),
            description = 'PA Form Fax - ' + prescriberNPI,
            saveAction = [{"Save": {"key": '', "value": ''}}],
            faxNumber = view.down('#faxNumber1').getValue() + '-' + view.down('#faxNumber2').getValue() + '-' + view.down('#faxNumber3').getValue();
        if (!view.down('#faxForm').isValid()) {
            return;
        }
        parameters = prescriberNPI + '|' +
            'MeridianRx' + '|' +
            faxNumber + '|' +
            Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y') + '|' +
            '|' +
            '|' +
            view.down('#message').getValue() + '|' +
            claimrecord.get('keyvalue') + '|' +
            // claimrecord.keyvalue + '|' +
            claimrecord.get('recipientID') + '|' +
            claimrecord.get('planGroupId') + '|' +
            prescriberNPI + '|' +
            ndc;

        extraParameters = {
            pDescription: description,
            pProgramName: 'ltrPAForm.p',
            pParameters: parameters,
            pRunMode: 1,
            pProgramType: 'Report',
            pSaveDocument: true,
            pFaxNumber: faxNumber
        };

        var setSubmitReport = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [false], extraParameters,
            saveAction, ['pDocumentID']);


        if (setSubmitReport.code == 0 && setSubmitReport.pDocumentID != 0) {
            extraParameters = {
                pDescription: description,
                pProgramName: 'faxDocument.p',
                pParameters: setSubmitReport.pDocumentID + '|',
                pRunMode: 1,
                pProgramType: 'Fax',
                pSaveDocument: true,
                pFaxNumber: faxNumber
            };
            var setSubmitFax = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [false], extraParameters,
                saveAction, ['pJobNumber']);

            if (setSubmitFax.code == 0 && setSubmitFax.pJobNumber != 0) {
                var ttContactReasonCode = {},
                    contactlogmodel = Ext.create('Atlas.common.model.ContactLogData');
                contactLogField = 'updatedBy,callDateTime,recipientID,NPI,ncpdpId,TransactionID,subject,callStatus,contactType,Contactuser,callDateTime,LastModifiedUser,updatedDatetime',
                    contactLogValue = Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y') + "|" + claimrecord.get('recipientID') + "|" + prescriberNPI + "|" +
                        claimrecord.get('ncpdpID') + "|" + claimrecord.keyvalue + "|" + "Coverage Determination Request Form Faxed" + "|" +
                        "C" + "|" + "F" + "|" + Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y') + "|" + Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y');
                ttContactReasonCode.ttContactReasonCode = [];
                ttContactReasonCode.ttContactReasonCode.push({
                    'CodeType': 'Reason1',
                    'codeValue': 'P3'
                });
                contactlogmodel.phantom = false;
                contactlogmodel.getProxy().setExtraParam('pKeyValue', '0');
                contactlogmodel.getProxy().setExtraParam('pKeyType', 'CaseNum');
                contactlogmodel.getProxy().setExtraParam('pFieldList', contactLogField);
                contactlogmodel.getProxy().setExtraParam('pFields', contactLogValue);
                contactlogmodel.getProxy().setExtraParam('ttContactReasonCode', ttContactReasonCode);
                contactlogmodel.save({
                    scope: this,
                    callback: function (record, operation, response) {
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        if (objResp.message[0].code == 0) {
                            Ext.Msg.alert('Success', 'PA Form has been faxed successfully. Please check your fax status in Job Queue. Job Number:' + setSubmitFax.pJobNumber);
                            button.up('window').close();
                        }
                        else {
                            Ext.Msg.alert('Success', objResp.message[0].message);
                        }
                    }
                });
            }
            else {
                Ext.Msg.alert('Error', setSubmitFax.message);
            }
        }
        else {
            if(setSubmitReport.message)
            {
                Ext.Msg.alert('Error', setSubmitReport.message);
            }
            else {
                Ext.Msg.alert('Error', 'Document not created.');
            }
        }
    },

    onCancel: function (button) {
        button.up('window').close();
    }
});