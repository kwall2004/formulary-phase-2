/**
 * Created by agupta on 10/12/2016.
 */
Ext.define('Atlas.authorization.view.cdag.SendFaxWindowController', {
    //extend: 'Atlas.common.view.AppBaseController',
    extend: 'Ext.app.ViewController',
    alias: 'controller.sendfaxwindowcontroller',
    selectedAuthID: null,

    init: function () {
        var view  = this.getView(),
            prescriberName = view.prescriber["prescriberName"],
            authId = view.prescriber["authId"],
            npi = view.prescriber["npi"];

        this.selectedAuthID = authId;
        this.GetPrescriberFaxInfo(npi, prescriberName);
    },

    sendFaxDirectMethod : function(planID, authID, faxNumber, attnName, faxText, faxMessage, faxCovers, faxTo){
        var me = this;
        var view = this.getView();
        var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
        var saveData;
        var pParameters = "";
        if (faxTo == "Prescriber")
        {
            pParameters = planID + "|" +
                authID + "|" +
                faxNumber + "|" +
                attnName + "|" +
                faxText + "|" +
                faxMessage + "|" +
                faxCovers;
        }
        else
        {
            pParameters = planID + "|" +
                authID + "|" +
                faxNumber + "|" +
                attnName + "|" +
                faxText;
        }
        var faxProgram = (faxTo == "Prescriber" ? "printPriorAuthProvider.p" : "printPriorAuthPharmacy.p");

        saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], {
                pDescription: "Outgoing Fax CD Auth ID " + authID,
                pProgramName: faxProgram,
                pParameters: pParameters,
                pRunMode: '1',
                pProgramType: 'Report',
                pSaveDocument: true,
                pFaxNumber: faxNumber
            },
            saveAction, ['pDocumentID']);

        var documentID = saveData.pDocumentID;

        if (saveData.code == 0 && documentID != null && documentID != undefined && documentID != '0') {
            saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/attachmentlist/update', null, [true], {
                    pcPlanID: 'HPM',
                    pcKeyType: 'PriorAuthID',
                    pcKeyValue: authID,
                    pcKeyAction: 'A',
                    pcDocIDList: documentID,
                    pcDescrData: 'Fax'
                },
                saveAction, null);

            if (saveData.code != 0) {
                Ext.Msg.alert('Fax', 'Error in adding fax to attachment list.');
            }
            else {
                saveData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [true], {
                        pDescription: 'Outgoing Fax CD Auth ID ' + authID,
                        pProgramName: 'faxDocument.p',
                        pParameters: documentID + '|',
                        pRunMode: '2',
                        pProgramType: 'Fax',
                        pSaveDocument: true,
                        pFaxNumber: faxNumber
                    },
                    saveAction, ['pJobNumber']);

                if (saveData.code == 0) {
                    Ext.Msg.alert('Fax', 'Please check your fax status in Job Queue.Fax Number is ' + saveData.pJobNumber, function (btn) {
                        view.destroy();
                    });
                }
                else
                {
                    Ext.Msg.alert('Fax', 'Error in fax submission.');
                }
            }
        }
    },

    sendFax : function (attnName, faxNumber, faxText, faxMessage, faxCovers, faxTo) {
        var view = this.getView();
        var authID = this.selectedAuthID;
        if (authID == "") {
            Ext.Msg.alert('Send Fax - Validation', 'Please select an existing PA.');
            return false;
        } else {
            if ((faxTo == 'Prescriber' && (faxMessage == "" || faxMessage == null)) || (faxNumber == null || attnName == "" || faxText == "")) {
                Ext.Msg.alert('Preview Fax - Validation', 'All fields are required.Please enter all required information.');
                return false;
            }
            else if (faxNumber.toString().length != 10) {
                Ext.Msg.alert('Preview Fax - Validation', 'Please enter a valid 10 digit fax number.');
                return false;
            }
            else {
                var planID = "5";
                this.sendFaxDirectMethod(planID, authID, faxNumber, attnName, faxText, faxMessage, faxCovers, faxTo);
            }
        }
    },

    previewFax : function(planID, authID, faxNumber, attnName, faxText, faxMessage, faxCovers, faxTo){
        var pParameters = "";
        var formattedFaxNumber = faxNumber;

        if (faxTo == "Prescriber") {
            pParameters = planID + "|" + authID + "|" + formattedFaxNumber + "|" + attnName + "|" + faxText + "|" + faxMessage + "|" + faxCovers;
        }
        else {
            pParameters = planID + "|" + authID + "|" + formattedFaxNumber + "|" + attnName + "|" + faxText;
        }

        var faxProgram = (faxTo == "Prescriber" ? "printPriorAuthProvider.p" : "printPriorAuthPharmacy.p");

        var documentInfo = Atlas.common.utility.Utilities.submitJobViewDoc('Fax Preview CD Auth ID ' + authID, faxProgram, pParameters, '1', 'Report', false, formattedFaxNumber);

        if (documentInfo.code == 0) {
            Atlas.common.utility.Utilities.displayDocument(documentInfo.type, documentInfo.data)
        }
        else {
            Ext.Msg.alert('Error', documentInfo.message);
        }
    },

    saveFax: function (attnName, faxNumber, faxText, faxMessage, faxCovers, faxTo) {
        var view = this.getView();
        var authID = this.selectedAuthID;
        if (authID == "") {
            Ext.Msg.alert('Preview Fax - Validation', 'Please select an existing PA.');
            return false;
        }
        else {
            if ((faxTo == 'Prescriber' && (faxMessage == "" || faxMessage == null)) || (faxNumber == null || attnName == "" || faxText == "")) {
                Ext.Msg.alert('Preview Fax - Validation', 'All fields are required.Please enter all required information.');
                return false;
            }
            else if (faxNumber.toString().length < 10) {
                Ext.Msg.alert('Preview Fax - Validation', 'Please enter a valid 10 digit fax number.');
                return false;
            }
            else {
                var planID = "5";
                this.previewFax(planID, authID, faxNumber, attnName, faxText, faxMessage, faxCovers, faxTo);
            }
        }
    },

    winPresRequestMsg_Select : function(combo, record){
        var view = this.getView();
        view.down('#winPlanCovers').setValue('');
        if(record.data.value=='4'){
            view.down('#winPlanCovers').setDisabled(false);
        }
        else{
            view.down('#winPlanCovers').setDisabled(true);
        }
    },

    btnPresPreview_Click: function () {
        var view = this.getView();
        this.saveFax(view.down('#winPresAttentionTo').getValue(),view.down('#winPresFaxNumber').getValue(),view.down('#winPresAdditionalNotes').getValue(),view.down('#winPresRequestMsg').getValue(),view.down('#winPlanCovers').getValue(),'Prescriber');
    },

    btnPresSendFax_Click: function () {
        var view = this.getView();
        this.sendFax(view.down('#winPresAttentionTo').getValue(),view.down('#winPresFaxNumber').getValue(),view.down('#winPresAdditionalNotes').getValue(),view.down('#winPresRequestMsg').getValue(),view.down('#winPlanCovers').getValue(),'Prescriber');
    },

    btnPharPreview_Click: function () {
        var view = this.getView();
        this.saveFax(view.down('#winPharAttentionTo').getValue(),view.down('#winPharFaxNumber').getValue(),view.down('#winPharAdditionalNotes').getValue(),'','','Pharmacy');
    },

    btnPharSendFax_Click: function () {
        var view = this.getView();
        this.sendFax(view.down('#winPharAttentionTo').getValue(),view.down('#winPharFaxNumber').getValue(),view.down('#winPharAdditionalNotes').getValue(),'','','Pharmacy');
    },

    GetPrescriberFaxInfo: function (npi, prescriberName) {
        var view = this.getView();

        if (npi == null || npi == '') {
            return;
        }

        view.down('#winPresAttentionTo').setValue(prescriberName);

        var modelPrescriberMasterDataModel = Ext.create('Atlas.letter.model.PrescriberInfoModel');
        modelPrescriberMasterDataModel.getProxy().setExtraParam('pKeyValue', npi);
        modelPrescriberMasterDataModel.getProxy().setExtraParam('pKeyType', 'npi');
        modelPrescriberMasterDataModel.getProxy().setExtraParam('pFieldList', 'locfax');
        modelPrescriberMasterDataModel.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var objRespPrescriberMasterDataModel = Ext.decode(operation.getResponse().responseText);
                if (objRespPrescriberMasterDataModel.message[0].code == 0) {
                    if (objRespPrescriberMasterDataModel.data.length > 0) {
                        view.down('#winPresFaxNumber').setValue(objRespPrescriberMasterDataModel.data[0].locfax);
                    }
                }
            }
        });
    }

});
