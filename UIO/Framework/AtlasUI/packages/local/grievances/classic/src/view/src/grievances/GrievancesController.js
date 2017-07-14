/**
 * Created by agupta on 11/22/2016.
 */

Ext.define('Atlas.grievances.view.grievances.GrievancesController', {
    //extend: 'Atlas.common.view.AppBaseController',
    extend: 'Ext.app.ViewController',
    alias: 'controller.grievancescontroller',

    listen: {
        controller: {
            '*': {
                parentEventGetGrievanceDetails: 'getGrievanceDetails'
            },
            '#common-fileUploadController': {
                successfulUpload: 'onUploadAttachment'
            }
        }
    },

    formatTimeHHMMA: function (d) {
        function z(n) {
            return (n < 10 ? '0' : '') + n
        }

        var h = d.getHours();
        return (h % 12 || 12) + ':' + z(d.getMinutes()) + ' ' + (h < 12 ? 'AM' : 'PM');
    },

    btnAdd_Click: function () {
        var view = this.getView();
        view.down('#GrievanceForm').reset();
        view.down('#lblInitiatedDate').setValue(Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y'));
        view.down('#cbxStatus').setValue('O');//Initial Status is always Open.
        view.down('#lblDaysOpen').setValue('0');
        view.down('#tmResLetterSent').setValue('12:00 AM');
    },

    onViewGrievancesClick: function (pAtlasId) {
        var view = this.getView();
        var searchWindow = new Ext.create({
            xtype: 'grievances-ViewAllGrievancesGrid',
            autoShow: true,
            modal: true,
            atlasId: typeof(pAtlasId) == "string"? pAtlasId : ''
        });
        view.add(searchWindow);
        view.atlasId="";
        /*Ext.create('Ext.window.Window', {
         title: 'Grievances',

         items:[{
         xtype:'grievances-ViewAllGrievancesGrid'
         }]
         }).show();*/
    },

    btnDispRecipID_Click: function (component, eOpts) {
        var me = this,
            vm = me.getViewModel(),
            view = this.getView();
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar'),
            id = view.down('#lblRecipID').getValue();
        //Make sure you specify atlasId, as it serves as unique identifier to opened tab.
        this.fireEvent('openView', 'merlin', 'member', 'MemberToolbar', {
            atlasId: id,
            RID: id,
            menuId: menuId
        });
    },

    btnDispPrescID_Click: function (component, eOpts) {
        var me = this,
            vm = me.getViewModel(),
            view = this.getView();
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/prescriber/PrescriberToolbar'),
            id = view.down('#cbxInitPrescriber').getValue();

        me.fireEvent('openView', 'merlin', 'prescriber', 'PrescriberToolbar', {
            atlasId: id,
            ncpdpId: id,
            menuId: menuId
        }, null);
    },

    btnDispPharmacyID_Click: function (component, eOpts) {
        var view = this.getView();
        this.routeTo(view.down('#cbxInitPhar').getValue(), 'merlin/pharmacy/Pharmacy');
    },


    btnDispPrescID1_Click: function (component, eOpts) {
        /*var view = this.getView();
         this.fireEvent('openView', 'merlin', 'prescriber', 'PrescriberToolbar', {
         NPI: view.down('#cbxReptPrescriber').getValue()
         });*/

        var me = this,
            vm = me.getViewModel(),
            view = this.getView();
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/prescriber/PrescriberToolbar'),
            id = view.down('#cbxReptPrescriber').getValue();

        me.fireEvent('openView', 'merlin', 'prescriber', 'PrescriberToolbar', {
            atlasId: id,
            ncpdpId: id,
            menuId: menuId
        }, null);
    },

    btnDispPharmacyID1_Click: function (component, eOpts) {
        var view = this.getView();
        this.routeTo(view.down('#cbxInitPhar').getValue(), 'merlin/pharmacy/Pharmacy');
    },

    saveData: function () {
        //debugger;
        var view = this.getView(),
            me = this;
        var pFieldList = ""; //Comma Separated list of fields..
        var pFields = ""; //Values of the fields..
        var result;
        var message;
        var pGrievanceId = 0; //input parameter
        var oGrievanceId = 0; //output parameter
        var oSystemId;
        view.mask('Saving Data....');
        if (view.down('#hiddenGrievanceId').getValue().toString() != 0) {
            pGrievanceId = view.down('#hiddenGrievanceId').getValue();
        }

        //InputOutputDictionary ioDict = new InputOutputDictionary();
        var sInitType = "";
        var sInitId = "";
        if (view.down('#radInitTypeMember').checked == true) {
            sInitType = "Member";
            sInitId = view.down('#cbxInitMember').getValue();
        }
        else if (view.down('#radInitTypePrescriber').checked == true) {
            sInitType = "Prescriber";
            sInitId = view.down('#cbxInitPrescriber').getValue();
        }
        else if (view.down('#radInitTypePharmacy').checked == true) {
            sInitType = "Pharmacy";
            sInitId = view.down('#cbxInitPhar').getValue();
        }
        var sReptType = "";
        var sReptId = "";
        if (view.down('#radReptTypeMember').checked == true) {
            sReptType = "Member";
            sReptId = view.down('#cbxReptMember').getValue();
        }
        else if (view.down('#radReptTypePrescriber').checked == true) {
            sReptType = "Prescriber";
            sReptId = view.down('#cbxReptPrescriber').getValue();
        }
        else if (view.down('#radReptTypePharmacy').checked == true) {
            sReptType = "Pharmacy";
            sReptId = view.down('#cbxReptPhar').getValue();
        }
        else if (view.down('#radReptTypePBM').checked == true) {
            sReptType = "PBM";
            sReptId = view.down('#txtPBM').getValue();
        }

        pFieldList += 'InitType' + ',';
        pFields += sInitType + '|';
        //ioDict.Add("InitType", sInitType);

        pFieldList += 'InitiatedById' + ',';
        pFields += sInitId + '|';
        //ioDict.Add("InitiatedById", sInitId);

        pFieldList += 'ReptType' + ',';
        pFields += sReptType + '|';
        //ioDict.Add("ReptType", sReptType);

        pFieldList += 'ReportingOnId' + ',';
        pFields += sReptId + '|';
        //ioDict.Add("ReportingOnId", sReptId);

        pFieldList += 'LOB' + ',';
        pFields += (view.down('#cbxLOB').getValue() != null ? view.down('#cbxLOB').getValue() : '') + '|';
        //ioDict.Add("LOB", view.down('#cbxLOB').getValue());

        pFieldList += 'AckLetterDueDate' + ',';
        pFields += view.down('#lblAckLetterDue').getValue() + '|';
        //ioDict.Add("AckLetterDueDate",  view.down('#lblAckLetterDue').getValue());

        var ackLetterSent = (view.down('#dtAckLetterSent').getValue() == null ? "" : view.down('#dtAckLetterSent').getValue());
        if (ackLetterSent == "") {
            pFieldList += 'AckLetterSentDate' + ',';
            pFields += view.down('#lblAckLetterDue').getValue() + '|';
            //ioDict.Add("AckLetterSentDate", "");
        }
        else {
            pFieldList += 'AckLetterSentDate' + ',';
            pFields += Ext.Date.format(ackLetterSent, 'm/d/Y') + '|';
            //ioDict.Add("AckLetterSentDate", Convert.ToDateTime(ackLetterSent.ToString()).ToString("d"));
        }
        pFieldList += 'ResLetterDueDate' + ',';
        pFields += view.down('#lblResLetterDue').getValue() + '|';
        //ioDict.Add("ResLetterDueDate", view.down('#lblResLetterDue').getValue());
        var resLetterSent = (view.down('#dtResLetterSent').getValue() == null ? "" : view.down('#dtResLetterSent').getValue());
        if (resLetterSent != '') {
            //resLetterSent += (view.down('#tmResLetterSent').getValue() == "00:00:00" ? " 12:00:00 AM" : " " + view.down('#tmResLetterSent').getValue());
            resLetterSent = Ext.Date.format(resLetterSent, 'm/d/Y') + ' ' + view.down('#tmResLetterSent').getRawValue();
        }
        if (resLetterSent == "") {
            pFieldList += 'resLetterSentDatetime' + ',';
            pFields += '' + '|';
            //ioDict.Add("resLetterSentDatetime", "");
        }
        else {
            pFieldList += 'resLetterSentDatetime' + ',';
            pFields += resLetterSent + '|';

            pFieldList += 'ResLetterSentDate' + ',';
            pFields += resLetterSent + '|';


            //ioDict.Add("resLetterSentDatetime", resLetterSent);
        }
        var FollowUpDate = (view.down('#dtFollowupDate').getValue() == null ? "" : view.down('#dtFollowupDate').getValue());
        if (FollowUpDate == "") {
            pFieldList += 'FollowUpDate' + ',';
            pFields += '' + '|';
            //ioDict.Add("FollowUpDate", "");
        }
        else {
            pFieldList += 'FollowUpDate' + ',';
            pFields += Ext.Date.format(FollowUpDate, 'm/d/Y') + '|';
            //ioDict.Add("FollowUpDate", Convert.ToDateTime(FollowUpDate.ToString()).ToString("d"));
        }
        pFieldList += 'AssignedTo' + ',';
        pFields += (view.down('#cbxUsers').getValue() != null ? view.down('#cbxUsers').getValue() : '') + '|';
        //ioDict.Add("AssignedTo", cbxUsers.SelectedItem.Text.ToString());

        pFieldList += 'Stat' + ',';
        pFields += (view.down('#cbxStatus').getValue() != null ? view.down('#cbxStatus').getValue() : '') + '|';
        //ioDict.Add("Stat", cbxStatus.SelectedItem.Value.ToString());

        var sCurrentDate = Atlas.common.utility.Utilities.getLocalDateTime();
        var sCurrentUser = Atlas.user.un;
        if (pGrievanceId <= 0) //insert
        {
            pFieldList += 'CreatedDate' + ',';
            pFields += Ext.Date.format(sCurrentDate, 'm/d/Y') + '|';
            //ioDict.Add("CreatedDate", sCurrentDate);

            pFieldList += 'CreatedBy' + ',';
            pFields += sCurrentUser + '|';
            //ioDict.Add("CreatedBy", sCurrentUser);
        }
        if (view.down('#cbxStatus').getValue().toUpperCase() == 'C') //Closed Grievance
        {
            pFieldList += 'ClosedDate' + ',';
            pFields += Ext.Date.format(sCurrentDate, 'm/d/Y') + '|';
            //ioDict.Add("ClosedDate", sCurrentDate);

            pFieldList += 'ClosedBy' + ',';
            pFields += sCurrentUser + '|';
            //ioDict.Add("ClosedBy", sCurrentUser);
        }
        if (view.down('#cbxStatus').getValue().toUpperCase() == 'E') //Extension Requested Grievance
        {
            pFieldList += 'ExtReqDate' + ',';
            pFields += Ext.Date.format(sCurrentDate, 'm/d/Y') + '|';
            //ioDict.Add("ExtReqDate", sCurrentDate);

            pFieldList += 'ExtReqBy' + ',';
            pFields += sCurrentUser + '|';
            //ioDict.Add("ExtReqBy", sCurrentUser);
        }
        var IncidentDate = (view.down('#dtIncidentDate').getValue() == null ? "" : view.down('#dtIncidentDate').getValue());
        if (IncidentDate == "") {
            pFieldList += 'IncidentDate' + ',';
            pFields += '' + '|';
            //ioDict.Add("IncidentDate", "");
        }
        else {
            pFieldList += 'IncidentDate' + ',';
            pFields += Ext.Date.format(IncidentDate, 'm/d/Y') + '|';
            //ioDict.Add("IncidentDate", Convert.ToDateTime(IncidentDate.ToString()).ToString("d"));
        }

        if (pGrievanceId <= 0) //insert
        {
            var InitiatedDate = Atlas.common.utility.Utilities.getLocalDateTime();
            pFieldList += 'grievanceInitDatetime' + ',';
            pFields += Ext.Date.format(InitiatedDate, 'm/d/Y H:i:s') + '|';
            //ioDict.Add("grievanceInitDatetime", InitiatedDate);
        }
        pFieldList += 'NotificationMethod' + ',';
        pFields += (view.down('#cbxNotificationMenthod').getValue() != null ? view.down('#cbxNotificationMenthod').getValue() : '') + '|';
        //ioDict.Add("NotificationMethod", view.down('#cbxNotificationMenthod').getValue());

        pFieldList += 'Category' + ',';
        pFields += view.down('#cbxCategory').getValue() + '|';
        //ioDict.Add("Category", view.down('#cbxCategory').getValue());

        pFieldList += 'Type' + ',';
        pFields += (view.down('#cbxType').getValue() != null ? view.down('#cbxType').getValue() : '') + '|';
        //ioDict.Add("Type", view.down('#cbxType').getValue());

        pFieldList += 'Level' + ',';
        pFields += (view.down('#cbxLevel').getValue() != null ? view.down('#cbxLevel').getValue() : '') + '|';
        //ioDict.Add("Level", view.down('#cbxLevel').getValue());

        var ComplianceCommDate = (view.down('#dtComplianceCommDate').getValue() == null ? "" : view.down('#dtComplianceCommDate').getValue());
        if (ComplianceCommDate == "") {
            pFieldList += 'ComplianceCommDate' + ',';
            pFields += '' + '|';
            //ioDict.Add("ComplianceCommDate", "");
        }
        else {
            pFieldList += 'ComplianceCommDate' + ',';
            pFields += Ext.Date.format(ComplianceCommDate, 'm/d/Y') + '|';
            //ioDict.Add("ComplianceCommDate", Convert.ToDateTime(ComplianceCommDate.ToString()).ToString("d"));
        }
        pFieldList += 'Resolution' + ',';
        pFields += (view.down('#cbxResolution').getValue() != null ? view.down('#cbxResolution').getValue() : '') + '|';
        //ioDict.Add("Resolution", view.down('#cbxResolution').getValue());

        pFieldList += 'Disposition' + ',';
        pFields += (view.down('#cbxDispostion').getValue() != null ? view.down('#cbxDispostion').getValue() : '') + '|';
        //ioDict.Add("Disposition", view.down('#cbxDispostion').getValue());

        var GrievanceCommDate = (view.down('#dtGrievanceCommitteDate').getValue() == null ? "" : view.down('#dtGrievanceCommitteDate').getValue());
        if (GrievanceCommDate == "") {
            pFieldList += 'GrievanceCommDate' + ',';
            pFields += '' + '|';
            //ioDict.Add("GrievanceCommDate", "");
        }
        else {
            pFieldList += 'GrievanceCommDate' + ',';
            pFields += Ext.Date.format(GrievanceCommDate, 'm/d/Y') + '|';
            //ioDict.Add("GrievanceCommDate", Convert.ToDateTime(GrievanceCommDate.ToString()).ToString("d"));
        }
        pFieldList += 'extensionApplied' + ',';
        pFields += (view.down('#cbxExtRqst').getValue() != null ? view.down('#cbxExtRqst').getValue() : '') + '|';
        //ioDict.Add("extensionApplied", view.down('#cbxExtRqst').getValue());

        pFieldList += 'methodOfResponse';
        pFields += (view.down('#cbxResponse').getValue() != null ? view.down('#cbxResponse').getValue() : '');
        //ioDict.Add("methodOfResponse", view.down('#cbxResponse').getValue());

        //pFieldList = ioDict.FieldList;
        //pFields = ioDict.FieldValues;

        //MaintenanceBll objGrievanceBll = new MaintenanceBll();
        //objGrievanceBll.setGrievance(PBMUser.SessionID, pGrievanceId, pFieldList, pFields, out oGrievanceId, out oSystemId, out result, out message);
        var setGrievanceModel = Ext.create('Atlas.grievances.model.SetGrievanceModel');
        setGrievanceModel.getProxy().setExtraParam('pGrievanceID', pGrievanceId);
        setGrievanceModel.getProxy().setExtraParam('pFields', pFieldList);
        setGrievanceModel.getProxy().setExtraParam('pValues', pFields);
        setGrievanceModel.phantom = false;
        setGrievanceModel.save({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var objRespSetGrievance = Ext.decode(operation.getResponse().responseText);

                var sMessage = "";
                var NotesSubject = "";
                //Email List For Showing Success Message.
                var sEmailUsers = "";
                var sCurrAssignedTo = view.down('#cbxUsers').getValue() != null ? view.down('#cbxUsers').getValue().toString().trim() : '';
                if (sCurrAssignedTo != view.down('#hiddenOldAssignedTo').getValue().toString().trim()) //Change in assignment.
                {
                    sEmailUsers = sCurrAssignedTo;
                }
                if (view.down('#hiddenGrievanceId').getValue().toString() <= 0) //Insert
                {
                    //Admin usernames
                    var modelGrievanceAdmin = Ext.create('Atlas.common.model.shared.ListModel');
                    modelGrievanceAdmin.getProxy().setExtraParam('pListName', 'GrievanceAdmins');
                    modelGrievanceAdmin.load({
                        scope: this,
                        failure: function (record, operation) {
                        },
                        success: function (record, operation) {
                        },
                        callback: function (record, operation, success) {
                            var objRespGrievanceAdmin = Ext.decode(operation.getResponse().responseText);
                            if (objRespGrievanceAdmin.message[0].code == 0) {
                                objRespGrievanceAdmin.data.forEach(function (item, index) {
                                    if (sEmailUsers == '') {
                                        sEmailUsers = item.name;
                                    }
                                    else {
                                        sEmailUsers = sEmailUsers + "," + item.name;
                                    }

                                });
                                //sEmailUsers = sEmailUsers.replace(/,/g, '');
                                if (sEmailUsers.length > 0) {
                                    sMessage = 'Grievance Successfully Created. Email Notification Sent To: ' + sEmailUsers;
                                }
                                else {
                                    sMessage = "Grievance Successfully Created.";
                                }
                                NotesSubject = "Grievance Created";
                            }
                        }
                    });
                }
                else {
                    //sEmailUsers = sEmailUsers.replace(/,/g, '');
                    if (sEmailUsers.length > 0) {
                        sMessage = 'Grievance Successfully Updated. Email Notification Sent To: ' + sEmailUsers;
                    }
                    else {
                        sMessage = "Grievance Successfully Updated.";
                    }
                    NotesSubject = "Grievance Updated";
                }
                Ext.defer(function () {
                    if (objRespSetGrievance.message[0].code == 0) {
                        var NotesText = view.down('#txtNotes').getValue();

                        //Now update the Notes.
                        if (NotesText.length > 0) {

                            var pFieldListNotes = "ParentSystemID,Subject,Note,CreateUser,CreateDate,CreateTime";
                            //var sinceMidnight = Atlas.common.utility.Utilities.getLocalDateTime() - new Date();
                            var secs = (Atlas.common.utility.Utilities.getLocalDateTime() - (new Date((Atlas.common.utility.Utilities.getLocalDateTime()).setHours(0, 0 , 0 , 0))))/(1000);
                            var pFieldValuesNotes = objRespSetGrievance.metadata.pSystemID.toString() + "|" + NotesSubject + "|" + NotesText + "|" + Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y') + "|" + secs;

                            //objNotesBean = Notes.SetNotes(Session["SessionID"].ToString(), System.Convert.ToDecimal(oSystemId), "A", pFieldListNotes, pFieldValuesNotes);
                            var modelSetNotes = Ext.create('Atlas.common.model.Notes');
                            //var date = new Date();
                            //var milliseconds = date.getTime();
                            //var seconds = milliseconds / 1000;
                            modelSetNotes.getProxy().setExtraParam('psystemId', objRespSetGrievance.metadata.pSystemID);
                            modelSetNotes.getProxy().setExtraParam('pMode', 'A');
                            modelSetNotes.getProxy().setExtraParam('pFieldList', pFieldListNotes);
                            modelSetNotes.getProxy().setExtraParam('pFields', pFieldValuesNotes);
                            modelSetNotes.phantom = false;
                            modelSetNotes.save({
                                scope: this,
                                failure: function (record, operation) {
                                },
                                success: function (record, operation) {
                                },
                                callback: function (record, operation, success) {
                                }
                            });
                        }
                        // var sFileName = view.down('#fuCtrl').getValue();
                        // if (sFileName.length > 0) //If there is a file to upload.
                        // {
                        //     var isErrorFile = UploadFile("GrievanceId", oGrievanceId.ToString());
                        //     if (!isErrorFile) {
                        //         Ext.Msg.alert("Fail", "Failure");
                        //         view.down('#hiddenGrievanceId').setValue(''); //Reset the Grievance Id.
                        //         this.getGrievanceSummary(); //Reload the grid.
                        //         this.getGrievanceDetails(objRespSetGrievance.metadata.pGrievanceRID.toString());
                        //     }
                        // }
                        // else {
                        //     //END Upload files
                        //
                        //     //Show success message.
                        Ext.Msg.alert("PBM", sMessage);

                        view.down('#hiddenGrievanceId').setValue(''); //Reset the Grievance Id.
                        me.getGrievanceSummary(); //Reload the grid.
                        me.getGrievanceDetails(objRespSetGrievance.metadata.pGrievanceRID.toString());
                        // }
                    }
                    view.unmask();
                    view.down("#btnAddAttachment").setDisabled(false);
                }, 1000);


            }
        });

    },
//vm.getStore('faxandattachments').reload();
    getGrievanceDetails: function (grievanceId) {
        //debugger;

        var view = this.getView(),
            me = this;
        var vm = this.getViewModel();
        this.resetCtrlValues();
        view.down('#btnSave').setText('Save Grievance');
        view.mask('Loading...');
        var modelGrievanceDetail = Ext.create('Atlas.grievances.model.GrievanceDetailsModel');
        modelGrievanceDetail.getProxy().setExtraParam('pGrievanceID', grievanceId);
        modelGrievanceDetail.load(
            {
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    var objRespGrievanceDetail = Ext.decode(operation.getResponse().responseText);
                    if (objRespGrievanceDetail.message[0].code == 0) {
                        view.down('#radInitTypeMember').setDisabled(false);
                        view.down('#radInitTypePrescriber').setDisabled(false);
                        view.down('#radInitTypePharmacy').setDisabled(false);
                        view.down('#radReptTypeMember').setDisabled(false);
                        view.down('#radReptTypePrescriber').setDisabled(false);
                        view.down('#radReptTypePharmacy').setDisabled(false);
                        view.down('#radReptTypePBM').setDisabled(false);

                        var sStatus = objRespGrievanceDetail.data[0].Stat;
                        var sCreatedBy = objRespGrievanceDetail.data[0].CreatedBy;
                        var sAssignedTo = objRespGrievanceDetail.data[0].AssignedTo.toString().toLowerCase();
                        var sCurrentUser = Atlas.user.un.toLowerCase();
                        var bUpdateAccess = true;
                        if (sStatus == 'D') {
                            bUpdateAccess = false;
                        }
                        else {
                            var bGrievanceAdmin = false;
                            var modelList = Ext.create('Atlas.common.model.shared.ListModel');
                            modelList.getProxy().setExtraParam('pListName', 'GrievanceAdmins');
                            modelList.load({
                                scope: this,
                                failure: function (record, operation) {
                                },
                                success: function (record, operation) {
                                },
                                callback: function (record, operation, success) {
                                    var objRespModelList = Ext.decode(operation.getResponse().responseText);
                                    objRespModelList.data.forEach(function (item, index) {
                                        if (item.name == sCurrentUser) {
                                            bGrievanceAdmin = true;
                                        }
                                    });
                                    if (bGrievanceAdmin == false) {
                                        bUpdateAccess = false;
                                        if (sAssignedTo.trim().length > 0) //Has current assignment.
                                        {
                                            //If the current user is NOT the assigned one, DENY access.
                                            if (sAssignedTo.toLowerCase() != sCurrentUser) {
                                                bUpdateAccess = false;
                                            }
                                            else {
                                                bUpdateAccess = true;
                                            }

                                        }
                                        if (bUpdateAccess != true) //No assignment available.
                                        {
                                            //If the current user is NOT the one who created it also, DENY access.
                                            if (sCreatedBy.toLowerCase() != sCurrentUser) {
                                                bUpdateAccess = false;
                                            }
                                            else {
                                                bUpdateAccess = true;
                                            }

                                        }
                                    }
                                }
                            });
                        }

                        if (bUpdateAccess == false) {
                            view.down('#btnSave').setDisabled(true);
                        }
                        else {
                            view.down('#btnSave').setDisabled(false);
                        }
                        var type = "Init";

                        view.down('#hiddenGrievanceId').setValue(objRespGrievanceDetail.data[0].GrievanceID);
                        var sInitType = objRespGrievanceDetail.data[0].InitType.toLowerCase();
                        var sInitId = objRespGrievanceDetail.data[0].initiatedByID;
                        var sReptType = objRespGrievanceDetail.data[0].ReptType.toLowerCase();
                        var sReptId = objRespGrievanceDetail.data[0].ReportingOnId;
                        this.getMemberInfo('MemberId', sInitId, type);
                        switch (sInitType) {
                            case "member":
                                view.down('#cbxInitMember').setValue(sInitId);
                                view.down('#radInitTypeMember').setValue(true);
                                view.down('#radInitTypePrescriber').setValue(false);
                                view.down('#radInitTypePharmacy').setValue(false);

                                break;
                            case "prescriber":
                                view.down('#cbxInitPrescriber').setValue(sInitId);
                                view.down('#radInitTypeMember').setValue(false);
                                view.down('#radInitTypePrescriber').setValue(true);
                                view.down('#radInitTypePharmacy').setValue(false);

                                break;
                            case "pharmacy":
                                view.down('#cbxInitPhar').setValue(sInitId);
                                view.down('#radInitTypeMember').setValue(false);
                                view.down('#radInitTypePrescriber').setValue(false);
                                view.down('#radInitTypePharmacy').setValue(true);

                                break;
                        }
                        switch (sReptType) {
                            case "member":
                                view.down('#cbxReptMember').setValue(sReptId);
                                view.down('#radReptTypeMember').setValue(true);
                                view.down('#radReptTypePrescriber').setValue(false);
                                view.down('#radReptTypePharmacy').setValue(false);
                                view.down('#radReptTypePBM').setValue(false);
                                break;
                            case "prescriber":
                                view.down('#cbxReptPrescriber').setValue(sReptId);
                                view.down('#radReptTypeMember').setValue(false);
                                view.down('#radReptTypePrescriber').setValue(true);
                                view.down('#radReptTypePharmacy').setValue(false);
                                view.down('#radReptTypePBM').setValue(false);

                                break;
                            case "pharmacy":
                                view.down('#cbxReptPhar').setValue(sReptId);
                                view.down('#radReptTypeMember').setValue(false);
                                view.down('#radReptTypePrescriber').setValue(false);
                                view.down('#radReptTypePharmacy').setValue(true);
                                view.down('#radReptTypePBM').setValue(false);

                                break;
                            case "pbm":
                                view.down('#txtPBM').setValue(sReptId);
                                view.down('#radReptTypeMember').setValue(false);
                                view.down('#radReptTypePrescriber').setValue(false);
                                view.down('#radReptTypePharmacy').setValue(false);
                                view.down('#radReptTypePBM').setValue(true);
                                break;
                        }

                        view.down('#hiddenOldGrievanceStatus').setValue(objRespGrievanceDetail.data[0].Stat);
                        view.down('#cbxStatus').setValue(sStatus);
                        if (sInitType == "pharmacy") {
                            view.down('#lblInitFirstName').setValue('');
                            view.down('#lblInitPharmacyName').setValue(objRespGrievanceDetail.data[0].InitiatorFName.toUpperCase());
                        }
                        else {
                            view.down('#lblInitFirstName').setValue(objRespGrievanceDetail.data[0].InitiatorFName.toUpperCase());
                            view.down('#lblInitPharmacyName').setValue('');
                        }

                        if (sReptType == "pharmacy") {
                            view.down('#lblReptFirstName').setValue('');
                            view.down('#lblReptPharmacyName').setValue(objRespGrievanceDetail.data[0].ReptFName.toUpperCase());
                        }
                        else {
                            view.down('#lblReptFirstName').setValue(objRespGrievanceDetail.data[0].ReptFName.toUpperCase());
                            view.down('#lblReptPharmacyName').setValue('');
                        }

                        view.down('#lblInitLastName').setValue(objRespGrievanceDetail.data[0].InitiatorLName.toUpperCase());
                        view.down('#lblInitDOB').setValue(objRespGrievanceDetail.data[0].InitiatorDOB);
                        // view.down('#lblInitDOB').setValue(this.GetFormattedDate(objRespGrievanceDetail.data[0].InitiatorDOB));
                        var sInitGender = objRespGrievanceDetail.data[0].InitiatorGender;
                        if (sInitGender == 'M') {
                            sInitGender = "MALE";
                        }
                        else if (sInitGender == 'F') {
                            sInitGender = "FEMALE";
                        }
                        view.down('#lblInitGender').setValue(sInitGender);
                        view.down('#lblInitAddress').setValue(objRespGrievanceDetail.data[0].InitiatorAddress.toUpperCase());

                        view.down('#lblReptLastName').setValue(objRespGrievanceDetail.data[0].ReptLName.toUpperCase());
                        view.down('#lblReptDOB').setValue(this.GetFormattedDate(objRespGrievanceDetail.data[0].ReptDOB));
                        var sReptGender = objRespGrievanceDetail.data[0].ReptGender;
                        if (sReptGender == 'M') {
                            sReptGender = "MALE";
                        }
                        else if (sReptGender == 'F') {
                            sReptGender = "FEMALE";
                        }

                        view.down('#lblReptGender').setValue(sReptGender);
                        view.down('#lblReptAddress').setValue(objRespGrievanceDetail.data[0].ReptAddress.toUpperCase());
                        var sIncidentDate = me.getDateMDY(objRespGrievanceDetail.data[0].IncidentDate, '-');
                        view.down('#dtIncidentDate').setValue(sIncidentDate);
                        var sInitDate = objRespGrievanceDetail.data[0].grievanceInitDatetime;
                        sInitDate = (sInitDate != null) ? (sInitDate.length > 0 ? sInitDate : '') : '';
                        var arrInitiatedDateTime = sInitDate.split('T');
                        var date = (arrInitiatedDateTime[0] != undefined && arrInitiatedDateTime[0] != '') ? me.getDateMDY(arrInitiatedDateTime[0], '-') : '';
                        var time = (arrInitiatedDateTime[1] != undefined && arrInitiatedDateTime[1] != '') ? me.getFormattedTime(arrInitiatedDateTime[1], true) : '';
                        sInitDate = date + ' ' + time;
                        if (sInitDate != '') {
                            view.down('#lblInitiatedDate').setValue(sInitDate);
                        }
                        view.down('#cbxNotificationMenthod').setValue(objRespGrievanceDetail.data[0].NotificationMethod);

                        //view.down('#StoreGrievanceCategory').removeAll(); -------------------------------------------- need to implement
                        //getCategory(sInitType, sReptType);
                        var vm = this.getViewModel();
                        var storeCategory = vm.getStore('StoreGrievanceCategory');
                        storeCategory.getProxy().setExtraParam('pReptBy', sInitType);
                        storeCategory.getProxy().setExtraParam('pReptOn', sReptType);
                        storeCategory.load({
                            scope: this,
                            failure: function (record, operation) {
                            },
                            success: function (record, operation) {
                            },
                            callback: function (record, operation, success) {
                                view.down('#cbxCategory').setValue(objRespGrievanceDetail.data[0].CategoryID);
                                view.down('#cbxCategory').setValue(objRespGrievanceDetail.data[0].CategoryDesc);
                            }
                        });

                        this.getGrievanceType();
                        view.down('#cbxType').setValue(objRespGrievanceDetail.data[0].TYPE);
                        view.down('#cbxType').setRawValue(objRespGrievanceDetail.data[0].TypeDesc);

                        view.down('#cbxLevel').setValue(objRespGrievanceDetail.data[0].Level);
                        var sComplianceCommDate = me.getDateMDY(objRespGrievanceDetail.data[0].ComplianceCommDate, '-');
                        view.down('#dtComplianceCommDate').setValue(sComplianceCommDate);
                        view.down('#cbxResolution').setValue(objRespGrievanceDetail.data[0].Resolution);
                        view.down('#cbxDispostion').setValue(objRespGrievanceDetail.data[0].Disposition);
                        var sGrievanceCommDate = me.getDateMDY(objRespGrievanceDetail.data[0].GrievanceCommDate, '-');
                        view.down('#dtGrievanceCommitteDate').setValue(sGrievanceCommDate);
                        //No of days open.
                        view.down('#lblDaysOpen').setValue('');

                        Ext.defer(function () {
                            view.down('#cbxLOB').setValue(objRespGrievanceDetail.data[0].LOB);
                        }, 1000);

                        var sAckLetterDue = me.getDateMDY(objRespGrievanceDetail.data[0].AckLetterDueDate, '-');
                        view.down('#lblAckLetterDue').setValue(sAckLetterDue);

                        var sAckLetterSent = me.getDateMDY(objRespGrievanceDetail.data[0].AckLetterSentDate, '-');
                        view.down('#dtAckLetterSent').setValue(sAckLetterSent);

                        var sResLetterDue = me.getDateMDY(objRespGrievanceDetail.data[0].ResLetterDueDate, '-');
                        view.down('#lblResLetterDue').setValue(sResLetterDue);

                        var sResLetterSent = objRespGrievanceDetail.data[0].resLetterSentDatetime;
                        sResLetterSent = (sResLetterSent != null) ? (sResLetterSent.length > 0 ? sResLetterSent : '') : '';
                        //view.down('#dtResLetterSent').setValue(this.GetFormattedDate(sResLetterSent));
                        var arrResLtrSentDateTime = sResLetterSent.split('T');
                        var dateResLtrSent = (arrResLtrSentDateTime[0] != undefined && arrResLtrSentDateTime[0] != '') ? me.getDateMDY(arrResLtrSentDateTime[0], '-') : '';
                        var timeResLtrSent = (arrResLtrSentDateTime[1] != undefined && arrResLtrSentDateTime[1] != '') ? me.getFormattedTime(arrResLtrSentDateTime[1], false) : '12:00 am';

                        view.down('#dtResLetterSent').setValue(dateResLtrSent);
                        view.down('#tmResLetterSent').setValue(timeResLtrSent);

                        var sExtRequest = objRespGrievanceDetail.data[0].extensionApplied;
                        sExtRequest = (sExtRequest.length > 0 ? sExtRequest : "");
                        view.down('#cbxExtRqst').setValue(sExtRequest);

                        var sMethodResponse = objRespGrievanceDetail.data[0].methodOfResponse;
                        sMethodResponse = (sMethodResponse.length > 0 ? sMethodResponse : "");
                        view.down('#cbxResponse').setValue(sMethodResponse);
                        if (sStatus == 'O' || sExtRequest == 'Yes' || sExtRequest == 'yes' || sExtRequest == 'YES') {
                            if (sInitDate.length > 0) {
                                var dtInitDate;
                                //if (DateTime.TryParse(sInitDate, out dtInitDate)){ //Check if valid date.
                                //TimeSpan ts = DateTime.Today - dtInitDate;
                                //int iDays = ts.Days;


                                // var  formatter = new SimpleDateFormat("dd/MM/yyyy");
                                //
                                var today = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y');
                                var days = Math.floor(Math.abs((((new Date(today)).getTime() - new Date(sInitDate).getTime())) / (1000 * 3600 * 24)));
                                view.down('#lblDaysOpen').setValue((days).toString());
                            }
                        }

                        var sFollowupDate = me.getDateMDY(objRespGrievanceDetail.data[0].FollowupDate, '-');
                        view.down('#dtFollowupDate').setValue(sFollowupDate);

                        view.down('#cbxUsers').setValue(objRespGrievanceDetail.data[0].AssignedTo);
                        view.down('#cbxUsers').setValue(objRespGrievanceDetail.data[0].AssignedTo);
                        view.down('#hiddenOldAssignedTo').setValue(objRespGrievanceDetail.data[0].AssignedTo);
                        view.down('#cbxStatus').setValue(objRespGrievanceDetail.data[0].Stat);

                        //Get the Notes log.
                        var sSystemId = objRespGrievanceDetail.data[0].SystemID;
                        var strNotes = '';
                        var modelNotes = Ext.create('Atlas.common.model.Notes');
                        modelNotes.getProxy().setExtraParam('pParentSystemID', sSystemId);
                        modelNotes.load({
                            scope: this,
                            failure: function (record, operation) {
                            },
                            success: function (record, operation) {
                            },
                            callback: function (record, operation, success) {
                                var objRespNotes = Ext.decode(operation.getResponse().responseText);
                                objRespNotes.data.forEach(function (item, index) {
                                    strNotes += item.CreateUser + ' - ' + Atlas.common.utility.Utilities.formatDate (new Date(item.CreateDate), 'm/d/Y') + ' ' + item.CreateTime + ': ' + item.Subject + ' - ' + item.Note + '\n';
                                });
                                view.down('#txtNotesHistory').setValue(strNotes);
                                this.loadAttachment('GrievanceId', view.down('#hiddenGrievanceId').getValue());
                                view.unmask();
                                view.down('#btnAddAttachment').setDisabled(false);
                            }
                        });
                    }
                }
            }
        );

    },

    getFormattedTime: function (time, includeSeconds) {
        var arrTime = time.split(':');
        var hours = parseInt(arrTime[0]) == 0 ? "12" : parseInt(arrTime[0]) > 12 ? parseInt(arrTime[0]) - 12 : arrTime[0];
        var minutes = (parseInt(arrTime[1]) < 10 ? "0" : "") + parseInt(arrTime[1]);
        var seconds = arrTime[2].split('.')[0];
        var ampm = parseInt(arrTime[0]) < 12 ? "AM" : "PM";
        var formattedTime = '';
        if(includeSeconds == true){
            formattedTime = hours + ":" + minutes + ":"  + seconds + " " + ampm;
        }
        else{
            formattedTime = hours + ":" + minutes + " " + ampm;
        }

        return formattedTime;
    },

    getDateMDY: function (strDate, delimeter) {
        var result = '';
        if (strDate != null && strDate != '' && strDate != undefined) {
            var arr = strDate.split(delimeter);
            if (arr.length == 3) {
                result = arr[1] + '/' + arr[2] + '/' + arr[0];
            }
        }
        return result;
    },


    showGrieAddAttachmentPopUp: function (button, event, myParam) {
        var me = this,
            view = me.getView();
        var winAddAttach = Ext.create('Ext.window.Window', {
            title: 'Add Attachment',
            floating: true,
            layout: {type: 'fit', align: 'stretch'},
            modal: true,
            closable: true,
            draggable: true,
            resizable: true,
            width: 500,
            height: 300,
            autoShow: false,
            items: [
                {
                    xtype: 'merlin.fileuploader',
                    width: '100%',
                    height: '100%',
                    keyType: 'imageCredentialing',
                    fileType: 'pdf'
                }
            ]
        });

        view.add(winAddAttach);
        winAddAttach.show();
    },

    onUploadAttachment: function (arrayDocumentId) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            keyType = 'GrievanceId',
            keyValue = view.down('#hiddenGrievanceId').getValue(),
            panelFileUpload = view.down('#fileUploadGrid'),
            fileStore = panelFileUpload.getViewModel().getStore('fileStore');

        for (var idx = 0, length = arrayDocumentId.length; idx < length; idx = idx + 1) {
            var saveAction = [{
                "Save": {"key": '', "value": ''}
            }];

            var params = {
                pcPlanID: '',
                pcKeyType: keyType,
                pcKeyValue: keyValue,
                pcKeyAction: 'A',
                pcDocIDList: arrayDocumentId[idx],
                pcDescrData: fileStore.getAt(idx).get('description')
            };

            var setAttachmentList = Atlas.common.utility.Utilities.saveData([], 'shared/rx/attachmentlist/update', '', [false], params,
                saveAction, null);
        }

        vm.getStore('StoreAttachment').reload();
    },

    loadAttachment: function (keyType, keyValue) {
        var vm = this.getViewModel(),
            storeAttachment = vm.getStore('StoreAttachment');
        storeAttachment.getProxy().setExtraParam('pcKeyType', keyType);
        storeAttachment.getProxy().setExtraParam('pcKeyValue', keyValue);
        storeAttachment.load();
    },

    deleteAttachment: function (docId) {
        var me = this,
            vm = this.getViewModel(),
            view = this.getView(),
            setAttachment = Ext.create('Atlas.pharmacy.model.AttachmentList');
        setAttachment.phantom = false;
        setAttachment.save({
            params: {
                pcPlanID: '',
                pcKeyType: 'GrievanceId',
                pcKeyValue: view.down('#hiddenGrievanceId').getValue(),
                pcKeyAction: 'D',
                pcDocIDList: docId,
                pcDescrData: 'anything'
            },
            callback: function (record, operation, success) {
                if (success) {
                    me.loadAttachment('GrievanceId', view.down('#hiddenGrievanceId').getValue());
                }
            }
        });
    },


    getGrievanceType: function () {
        // debugger;
        var view = this.getView();
        view.down('#cbxType').setValue('');
        if (view.down('#cbxCategory').getValue() != '' && view.down('#cbxCategory').getValue() != '0') {
            var vm = this.getViewModel();
            var storeGrievanceType = vm.getStore('StoreGrievanceType');
            storeGrievanceType.getProxy().setExtraParam('pcCategory', view.down('#cbxCategory').getValue());
            storeGrievanceType.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    // if (typeId != '') {
                    //     view.down('#cbxType').setValue(typeId);
                    //     view.down('#cbxType').setRawValue(typeDesc);
                    // }
                }
            });
        }
    },

    getGrievanceSummary: function () {
        var view = this.getView();
        var vm = this.getViewModel();
        var storeGrievances = vm.getStore('StoreGrievances');
        storeGrievances.getProxy().setExtraParam('pStat', view.down('#hiddenStatus').getValue());
        storeGrievances.load();
    },

    checkExtension: function (value) {
        if (value.match("\.pdf$") != null) {
            return true;
        }
        else {
            return false;
        }
    },

    validateSave: function () {
        var view = this.getView();
        //Intiated By is required.
        if (view.down('#radInitTypeMember').checked == false && view.down('#radInitTypePrescriber').checked == false &&
            view.down('#radInitTypePharmacy').checked == false) {
            Ext.Msg.alert('Validation Error', 'Reporting By is required.');
            return false;
        }
        else {
            if (view.down('#radInitTypeMember').checked == true) {
                if (view.down('#cbxInitMember').getValue() == '' || view.down('#cbxInitMember').getValue() == '') {
                    Ext.Msg.alert('Validation Error', 'Reporting By Member is required.');
                    return false;
                }
            }
            else if (view.down('#radInitTypePrescriber').checked == true) {
                if (view.down('#cbxInitPrescriber').getValue() == '' || view.down('#cbxInitPrescriber').getValue() == '') {
                    Ext.Msg.alert('Validation Error', 'Reporting By Prescriber is required.');
                    return false;
                }
            }
            else if (view.down('#radInitTypePharmacy').checked == true) {
                if (view.down('#cbxInitPhar').getValue() == '' || view.down('#cbxInitPhar').getValue() == '') {
                    Ext.Msg.alert('Validation Error', 'Reporting By Pharmacy is required.');
                    return false;
                }
            }

        }
        //Reporting On is required.
        if (view.down('#radReptTypeMember').checked == false && view.down('#radReptTypePrescriber').checked == false &&
            view.down('#radReptTypePBM').checked == false && view.down('#radReptTypePharmacy').checked == false) {
            Ext.Msg.alert('Validation Error', 'Reporting On is required.');
            return false;
        }
        else {
            if (view.down('#radReptTypeMember').checked == true) {
                if (view.down('#cbxReptMember').getValue() == '' || view.down('#cbxReptMember').getValue() == '') {
                    Ext.Msg.alert('Validation Error', 'Reporting On Member is required.');
                    return false;
                }
            }
            else if (view.down('#radReptTypePrescriber').checked == true) {
                if (view.down('#cbxReptPrescriber').getValue() == '' || view.down('#cbxReptPrescriber').getValue() == '') {
                    Ext.Msg.alert('Validation Error', 'Reporting On Prescriber is required.');
                    return false;
                }
            }
            else if (view.down('#radReptTypePharmacy').checked == true) {
                if (view.down('#cbxReptPhar').getValue() == '' || view.down('#cbxReptPhar').getValue() == '') {
                    Ext.Msg.alert('Validation Error', 'Reporting On Pharmacy is required.');
                    return false;
                }
            }
        }

        //If there is a status change then remarks is required.
        var statusVal = view.down('#cbxStatus').getValue();
        if (statusVal != view.down('#hiddenOldGrievanceStatus').value) {
            if (view.down('#txtNotes').getValue() == "") {
                Ext.Msg.alert('Validation Error', 'Notes is required.');
                return false;
            }
        }

        // if (view.down('#fuCtrl').getValue() != '') {
        //     if (this.checkExtension(view.down('#fuCtrl').getValue()) == false) {
        //         Ext.Msg.alert('Validation Error', 'Please select only PDF files for upload.');
        //         return false;
        //     }
        //     else {
        //         if (view.down('#txtDescription').getValue() == '') {
        //             Ext.Msg.alert('Validation Error', 'Attachment description is required.');
        //             return false;
        //         }
        //     }
        // }

        if (!view.down('#GrievanceForm').getForm().isValid()) {
            Ext.Msg.alert('Validation Error', 'Please fix all the validation errors before saving the data.');
            return false;
        }

        return true;
    },

    bindDropDowns: function () {
        var vm = this.getViewModel();
        var store = vm.getStore('StoreUsers');
        store.getProxy().setExtraParam('pShowActive', 'Yes');
        store.load();
    },

    btnSave_Click: function () {
        if (this.validateSave()) {
            this.saveData();
        }
    },

    enableDisableType: function (sInitOrRept, sType, objRad, param) {
        //debugger;
        var checked = sInitOrRept.checked;
        var initReptValue = param.params.initRept;
        var type = param.params.type;
        var view = this.getView();
        if (checked == true) {
            //Reset the Category and Type Dropdowns.
            //view.down('#StoreGrievanceCategory').removeAll(); //--------------------------------------------- need to implement
            //view.down('#StoreGrievanceType').removeAll();
            view.down('#cbxCategory').setValue('');
            view.down('#cbxType').setValue('');

            //Allow Blank Initialization
            view.down('#cbxInitMember').allowBlank = true;
            view.down('#cbxInitPrescriber').allowBlank = true;
            view.down('#cbxInitPhar').allowBlank = true;
            view.down('#cbxReptMember').allowBlank = true;
            view.down('#cbxReptPrescriber').allowBlank = true;
            view.down('#cbxReptPhar').allowBlank = true;

            if (checked == true) {

                view.down('#cbxCategory').markInvalid('');
                //view.down('#cbxInitMember').markInvalid('');
                //Keep all radio buttons enabled initially.
                view.down('#radInitTypeMember').setDisabled(false);
                view.down('#radInitTypePrescriber').setDisabled(false);
                view.down('#radInitTypePharmacy').setDisabled(false);
                view.down('#radReptTypeMember').setDisabled(false);
                view.down('#radReptTypePrescriber').setDisabled(false);
                view.down('#radReptTypePharmacy').setDisabled(false);
                view.down('#radReptTypePBM').setDisabled(false);

                if (initReptValue == "Init") {
                    //Reset Controls..
                    view.down('#lblInitFirstName').setValue('');
                    view.down('#lblInitLastName').setValue('');
                    view.down('#lblInitDOB').setValue('');
                    view.down('#lblInitGender').setValue('');
                    view.down('#lblInitAddress').setValue('');
                    view.down('#lblInitPharmacyName').setValue('');

                    switch (type) {
                        case "MEMBER":
                            view.down('#cbxInitMember').setDisabled(false);
                            view.down('#cbxInitMember').allowBlank = false;
                            view.down('#cbxInitMember').focus();
                            view.down('#cbxInitPrescriber').setDisabled(true);
                            view.down('#cbxInitPrescriber').setValue('');
                            view.down('#cbxInitPhar').setDisabled(true);
                            view.down('#cbxInitPhar').setValue('');

                            break;
                        case "PRESCRIBER":
                            view.down('#cbxInitMember').setDisabled(true);
                            view.down('#cbxInitMember').setValue('');
                            view.down('#cbxInitPrescriber').setDisabled(false);
                            view.down('#cbxInitPrescriber').allowBlank = false;
                            view.down('#cbxInitPrescriber').focus();
                            view.down('#cbxInitPhar').setDisabled(true);
                            view.down('#cbxInitPhar').setValue('');
                            //Disable Invalid Combinations.
                            view.down('#radReptTypePrescriber').setValue(false);
                            view.down('#radReptTypePharmacy').setValue(false);
                            view.down('#radReptTypePrescriber').setDisabled(true);
                            view.down('#radReptTypePharmacy').setDisabled(true);
                            view.down('#cbxReptPrescriber').setValue('');
                            view.down('#cbxReptPhar').setValue('');


                            break;
                        case "PHARMACY":
                            view.down('#cbxInitMember').setDisabled(true);
                            view.down('#cbxInitMember').setValue('');
                            view.down('#cbxInitPrescriber').setDisabled(true);
                            view.down('#cbxInitPrescriber').setValue('');
                            view.down('#cbxInitPhar').setDisabled(false);
                            view.down('#cbxInitPhar').allowBlank = false;
                            view.down('#cbxInitPhar').focus();
                            //Disable Invalid Combinations.
                            view.down('#radReptTypePrescriber').setValue(false);
                            view.down('#radReptTypePharmacy').setValue(false);
                            view.down('#radReptTypePrescriber').setDisabled(true);
                            view.down('#radReptTypePharmacy').setDisabled(true);
                            view.down('#cbxReptPrescriber').setValue('');
                            view.down('#cbxReptPhar').setValue('');


                            break;
                        default:
                    } //switch

                } //sInitOrRept = Init
                else if (initReptValue == "Rept") {
                    //Reset Controls..
                    view.down('#lblReptFirstName').setValue('');
                    view.down('#lblReptLastName').setValue('');
                    view.down('#lblReptDOB').setValue('');
                    view.down('#lblReptGender').setValue('');
                    view.down('#lblReptAddress').setValue('');
                    view.down('#lblReptPharmacyName').setValue('');
                    view.down('#cbxLOB').setValue('');
                    view.down('#cbxLOB').setDisabled(false);

                    switch (type) {
                        case "MEMBER":
                            view.down('#cbxReptMember').setDisabled(false);
                            view.down('#cbxReptMember').allowBlank = false;
                            view.down('#cbxReptMember').focus();
                            view.down('#cbxReptPrescriber').setDisabled(true);
                            view.down('#cbxReptPrescriber').setValue('');
                            view.down('#cbxReptPhar').setDisabled(true);
                            view.down('#cbxReptPhar').setValue('');
                            view.down('#txtPBM').setValue('');
                            view.down('#txtPBM').setDisabled(true);
                            break;
                        case "PRESCRIBER":
                            view.down('#cbxReptMember').setDisabled(true);
                            view.down('#cbxReptMember').setValue('');
                            view.down('#cbxReptPrescriber').setDisabled(false);
                            view.down('#cbxReptPrescriber').allowBlank = false;
                            view.down('#cbxReptPrescriber').focus();
                            view.down('#cbxReptPhar').setDisabled(true);
                            view.down('#cbxReptPhar').setValue('');
                            view.down('#txtPBM').setValue('');
                            view.down('#txtPBM').setDisabled(true);

                            //Disable Invalid Combinations.
                            view.down('#radInitTypePrescriber').setValue(false);
                            view.down('#radInitTypePharmacy').setValue(false);
                            view.down('#radInitTypePrescriber').setDisabled(true);
                            view.down('#radInitTypePharmacy').setDisabled(true);
                            view.down('#cbxInitPrescriber').setValue('');
                            view.down('#cbxInitPhar').setValue('');

                            break;
                        case "PHARMACY":
                            view.down('#cbxReptMember').setDisabled(true);
                            view.down('#cbxReptMember').setValue('');
                            view.down('#cbxReptPrescriber').setDisabled(true);
                            view.down('#cbxReptPrescriber').setValue('');
                            view.down('#cbxReptPhar').setDisabled(false);
                            view.down('#cbxReptPhar').allowBlank = false;
                            view.down('#cbxReptPhar').focus();
                            view.down('#txtPBM').setValue('');
                            view.down('#txtPBM').setDisabled(true);

                            //Disable Invalid Combinations.
                            view.down('#radInitTypePrescriber').setValue(false);
                            view.down('#radInitTypePharmacy').setValue(false);
                            view.down('#radInitTypePrescriber').setDisabled(true);
                            view.down('#radInitTypePharmacy').setDisabled(true);
                            view.down('#cbxInitPrescriber').setValue('');
                            view.down('#cbxInitPhar').setValue('');

                            break;
                        case "PBM":
                            view.down('#cbxReptMember').setDisabled(true);
                            view.down('#cbxReptMember').setValue('');
                            view.down('#cbxReptPrescriber').setDisabled(true);
                            view.down('#cbxReptPrescriber').setValue('');
                            view.down('#cbxReptPhar').setDisabled(true);
                            view.down('#cbxReptPhar').setValue('');
                            view.down('#txtPBM').setDisabled(false);

                            break;
                        default:
                    } //switch

                } //sInitOrRept = Rept
            } //objRad.getValue()


            if (checked == true) { //Only when radio button is checked then..
                if (
                    (view.down('#radInitTypeMember').checked == true || view.down('#radInitTypePrescriber').checked == true ||
                    view.down('#radInitTypePharmacy').checked == true) &&
                    (view.down('#radReptTypeMember').checked == true || view.down('#radReptTypePrescriber').checked == true ||
                    view.down('#radReptTypePBM').checked == true || view.down('#radReptTypePharmacy').checked == true)
                ) {

                    var sReptBy, sReptOn;
                    sReptBy = "";
                    sReptOn = "";

                    if (view.down('#radInitTypeMember').getValue() == true)
                        sReptBy = "MEMBER";
                    else if (view.down('#radInitTypePrescriber').getValue() == true)
                        sReptBy = "PRESCRIBER";
                    else if (view.down('#radInitTypePharmacy').getValue() == true)
                        sReptBy = "PHARMACY";

                    if (view.down('#radReptTypeMember').getValue() == true)
                        sReptOn = "MEMBER";
                    else if (view.down('#radReptTypePrescriber').getValue() == true)
                        sReptOn = "PRESCRIBER";
                    else if (view.down('#radReptTypePharmacy').getValue() == true)
                        sReptOn = "PHARMACY";
                    else if (view.down('#radReptTypePBM').getValue() == true)
                        sReptOn = "PBM";

                    if (sReptBy != "" && sReptOn != "") {
                        var vm = this.getViewModel();
                        var storeCategory = vm.getStore('StoreGrievanceCategory');
                        storeCategory.getProxy().setExtraParam('pReptBy', sReptBy);
                        storeCategory.getProxy().setExtraParam('pReptOn', sReptOn);
                        storeCategory.load();

                        //Ext.net.DirectMethods.getCategory(sReptBy, sReptOn, {eventMask: {showMask: true}});
                    } //sReptBy and sReptOn Check.

                } //If Both sets of radio buttons are selected check.
            } //Only when Radio button checked.
        }
    },

    resetCtrlValues: function () {
        var view = this.getView();

        view.down('#cbxInitMember').allowBlank = true;
        view.down('#cbxInitPrescriber').allowBlank = true;
        view.down('#cbxInitPhar').allowBlank = true;
        view.down('#cbxReptMember').allowBlank = true;
        view.down('#cbxReptPrescriber').allowBlank = true;
        view.down('#cbxReptPhar').allowBlank = true;

        view.down('#radInitTypeMember').setDisabled(false);
        view.down('#radInitTypePrescriber').setDisabled(false);
        view.down('#radInitTypePharmacy').setDisabled(false);
        view.down('#radReptTypeMember').setDisabled(false);
        view.down('#radReptTypePrescriber').setDisabled(false);
        view.down('#radReptTypePharmacy').setDisabled(false);
        view.down('#radReptTypePBM').setDisabled(false);

        view.down('#radInitTypeMember').setValue(false);
        view.down('#radInitTypePrescriber').setValue(false);
        view.down('#radInitTypePharmacy').setValue(false);
        view.down('#cbxInitMember').setValue('');
        view.down('#cbxInitPrescriber').setValue('');
        view.down('#cbxInitPhar').setValue('');
        view.down('#cbxInitMember').setDisabled(true);
        view.down('#cbxInitPrescriber').setDisabled(true);
        view.down('#cbxInitPhar').setDisabled(true);
        view.down('#lblInitFirstName').setValue('');
        view.down('#lblInitLastName').setValue('');
        view.down('#lblInitDOB').setValue('');
        view.down('#lblInitGender').setValue('');
        view.down('#lblInitAddress').setValue('');
        view.down('#lblInitPharmacyName').setValue('');
        view.down('#radReptTypeMember').setValue(false);
        view.down('#radReptTypePrescriber').setValue(false);
        view.down('#radReptTypePharmacy').setValue(false);
        view.down('#radReptTypeMember').setValue(false);
        view.down('#radReptTypePBM').setValue(false);
        view.down('#cbxReptMember').setValue('');
        view.down('#cbxReptPrescriber').setValue('');
        view.down('#cbxReptPhar').setValue('');
        view.down('#cbxReptMember').setDisabled(true);
        view.down('#cbxReptPrescriber').setDisabled(true);
        view.down('#txtPBM').setDisabled(true);
        view.down('#cbxReptPhar').setDisabled(true);
        view.down('#lblReptFirstName').setValue('');
        view.down('#lblReptLastName').setValue('');
        view.down('#lblReptDOB').setValue('');
        view.down('#lblReptGender').setValue('');
        view.down('#lblReptAddress').setValue('');
        view.down('#lblReptPharmacyName').setValue('');
        view.down('#dtIncidentDate').setValue('');
        view.down('#txtPBM').setValue('');
        view.down('#tmResLetterSent').setValue('12:00 AM');

        if (view.down('#hiddenGrievanceId').getValue() != '') { //Update Mode
            view.down('#lblInitiatedDate').setValue('');
        }
        else {//insert mode.
            view.down('#lblInitiatedDate').setValue(Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y'));
        }
        view.down('#cbxNotificationMenthod').setValue('');
        view.down('#cbxNotificationMenthod').setRawValue('');
        view.down('#cbxCategory').setValue('');
        view.down('#cbxCategory').setRawValue('');
        view.down('#cbxType').setValue('');
        view.down('#cbxType').setRawValue('');
        view.down('#cbxLevel').setValue('');
        view.down('#cbxLevel').setRawValue('');
        view.down('#dtComplianceCommDate').setValue('');
        view.down('#cbxResolution').setValue('');
        view.down('#cbxResolution').setRawValue('');
        view.down('#cbxDispostion').setValue('');
        view.down('#cbxDispostion').setRawValue('');
        view.down('#dtGrievanceCommitteDate').setValue('');
        view.down('#cbxLOB').setDisabled(false);
        view.down('#cbxLOB').setValue('');
        view.down('#cbxLOB').setRawValue('');
        view.down('#lblDaysOpen').setValue('0');
        view.down('#lblAckLetterDue').setValue('');
        view.down('#dtAckLetterSent').setValue('');
        view.down('#lblResLetterDue').setValue('');
        view.down('#dtResLetterSent').setValue('');
        view.down('#dtFollowupDate').setValue('');
        view.down('#cbxUsers').setValue('');
        view.down('#cbxUsers').setRawValue('');
        view.down('#cbxResponse').setValue('');
        view.down('#cbxResponse').setRawValue('');
        view.down('#cbxExtRqst').setValue('');
        view.down('#cbxExtRqst').setRawValue('');
        view.down('#cbxStatus').setValue('O');//Initial Status is always Open.
        view.down('#cbxStatus').setRawValue('Open');
        view.down('#txtNotes').setValue('');
        view.down('#txtNotesHistory').setValue('');

        view.down('#hiddenGrievanceId').setValue('');
        view.down('#hiddenOldGrievanceStatus').setValue('');
        view.down('#hiddenOldAssignedTo').setValue('');
        view.down('#btnSave').setDisabled(false); //Enable Save Button.

        //Reset Upload Section
        //view.down('#BasicForm').reset();
    },

    resetInitReptFields: function (InitRept) {
        var view = this.getView();
        if (InitRept == "Init") {
            view.down('#lblInitFirstName').setValue('');
            view.down('#lblInitLastName').setValue('');
            view.down('#lblInitDOB').setValue('');
            view.down('#lblInitGender').setValue('');
            view.down('#lblInitAddress').setValue('');
            view.down('#lblInitPharmacyName').setValue('');
        }
        else if (InitRept == "Rept") {
            view.down('#lblReptFirstName').setValue('');
            view.down('#lblReptLastName').setValue('');
            view.down('#lblReptDOB').setValue('');
            view.down('#lblReptGender').setValue('');
            view.down('#lblReptAddress').setValue('');
            view.down('#lblReptPharmacyName').setValue('');
        }
    },

    providertypeahead_Select: function (combo, record, param) {
        var initReptValue = param.params.initRept;
        this.resetInitReptFields(initReptValue);
        var view = this.getView();
        var fieldList = "ncpdpid,name,locCity,locState,locAddress1,locAddress2,locZip,locCrossStreet,mailAddress1,mailCity,mailState,mailZip," +
            "locPhone,locPhoneExt,locFax,locEmail,contactLastname,contactFirstname,contactTitle,contactPhone,contactFax,contactExt,ContactEmail," +
            "legalBusinessName,primDispTypeCode,secDispTypeCode,tertDispTypeCode,dispClassCode,fedTaxId,@Excluded";
        var modelPharmacy = Ext.create('Atlas.pharmacy.model.PharmacyMasterData');
        modelPharmacy.getProxy().setExtraParam('pKeyValue', record.data.ncpdpId);
        modelPharmacy.getProxy().setExtraParam('pKeyType', 'ncpdpId');
        modelPharmacy.getProxy().setExtraParam('pFieldList', fieldList);
        modelPharmacy.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var objRespPharmacy = Ext.decode(operation.getResponse().responseText);
                if (objRespPharmacy.message[0].code == 0) {
                    if (objRespPharmacy.data.length > 0) {
                        var sZip = objRespPharmacy.data[0].locZip.length > 5 ? objRespPharmacy.data[0].locZip.substring(0, 5) + '-' + objRespPharmacy.data[0].locZip.substring(5, objRespPharmacy.data[0].locZip.length) : objRespPharmacy.data[0].locZip;
                        var address = objRespPharmacy.data[0].locAddress1.toUpperCase() + ' ' + objRespPharmacy.data[0].locAddress2.toUpperCase() + ' ' + objRespPharmacy.data[0].locCity.toUpperCase() + ' ' + objRespPharmacy.data[0].locState.toUpperCase() + ' ' + sZip;
                        if (initReptValue == 'Init') {
                            view.down('#lblInitAddress').setValue(address);
                            view.down('#lblInitPharmacyName').setValue(objRespPharmacy.data[0].name.toUpperCase());
                            view.down('#lblRecipID').setValue('NA');
                        }
                        else if (initReptValue == 'Rept') {
                            view.down('#lblReptAddress').setValue(address);
                            view.down('#lblReptPharmacyName').setValue(objRespPharmacy.data[0].name.toUpperCase());
                        }
                    }
                }
            }
        });
    },

    prescribertypeahead_Select: function (combo, record, param) {
        var initReptValue = param.params.initRept;
        this.resetInitReptFields(initReptValue);
        var view = this.getView();
        var fieldList =
            "npi,firstname,lastname,degree,deaNum,licstate,locaddr1,locaddr2,loccity,locfax,locname,locphone,locstate," +
            "loczip,specialty,AuthFax.ContactInfo,FWAPrescriberLockFlag,prescriberLockNote,middlename";
        var modelPrescriberMasterDataModel = Ext.create('Atlas.portals.rxmember.model.PrescriberInfoStoreModel');
        modelPrescriberMasterDataModel.getProxy().setExtraParam('pKeyValue', record.data.npi);
        modelPrescriberMasterDataModel.getProxy().setExtraParam('pKeyType', 'npi');
        modelPrescriberMasterDataModel.getProxy().setExtraParam('pFieldList', fieldList);
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
                        var sZip = objRespPrescriberMasterDataModel.data[0].loczip.length > 5 ? objRespPrescriberMasterDataModel.data[0].loczip.substring(0, 5) + '-' + objRespPrescriberMasterDataModel.data[0].loczip.substring(5, objRespPrescriberMasterDataModel.data[0].loczip.length) : objRespPrescriberMasterDataModel.data[0].loczip;
                        var address = objRespPrescriberMasterDataModel.data[0].locaddr1.toUpperCase() + ' ' + objRespPrescriberMasterDataModel.data[0].locaddr2.toUpperCase() + ' ' + objRespPrescriberMasterDataModel.data[0].loccity.toUpperCase() + ' ' + objRespPrescriberMasterDataModel.data[0].locstate.toUpperCase() + ' ' + sZip;
                        if (initReptValue == 'Init') {
                            view.down('#lblInitFirstName').setValue(objRespPrescriberMasterDataModel.data[0].firstname);
                            view.down('#lblInitLastName').setValue(objRespPrescriberMasterDataModel.data[0].lastname);
                            view.down('#lblInitAddress').setValue(address);
                            view.down('#lblRecipID').setValue('NA');
                        }
                        else if (initReptValue == 'Rept') {
                            view.down('#lblReptFirstName').setValue(objRespPrescriberMasterDataModel.data[0].firstname);
                            view.down('#lblReptLastName').setValue(objRespPrescriberMasterDataModel.data[0].lastname);
                            view.down('#lblReptAddress').setValue(address);
                        }
                    }
                }
            }
        });

    },

    membertypeahead_Select: function (combo, record, param) {
        var initReptValue = param.params.initRept;
        this.resetInitReptFields(initReptValue);
        this.getMemberInfo('MemberId', record.data.memberID, initReptValue);
    },

    GetFormattedDate: function (date) {

        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + (d.getDate()),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [month, day, year].join('/');
    },

    getMemberInfo: function (keyType, keyValue, initRep) {
        var view = this.getView();
        var initReptValue = initRep;
        var sIncidentDate = view.down('#dtIncidentDate').getValue() == null ? '' : view.down('#dtIncidentDate').getValue();
        var modelDMRMember = Ext.create('Atlas.grievances.model.DMRMemberModel');
        modelDMRMember.getProxy().setExtraParam('pID', keyValue);
        modelDMRMember.getProxy().setExtraParam('pType', keyType);
        modelDMRMember.getProxy().setExtraParam('pDOS', sIncidentDate);
        modelDMRMember.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var objDMRMember = Ext.decode(operation.getResponse().responseText);
                if (objDMRMember.data.length > 0) {
                    var sZip = objDMRMember.data[0].zipCode.length > 5 ? objDMRMember.data[0].zipCode.substring(0, 5) + '-' + objDMRMember.data[0].zipCode.substring(5, objDMRMember.data[0].zipCode.length) : objDMRMember.data[0].zipCode;
                    var address = objDMRMember.data[0].Address1.toUpperCase() + ' ' + objDMRMember.data[0].Address2.toUpperCase() + ' ' + objDMRMember.data[0].city.toUpperCase() + ' ' + objDMRMember.data[0].state.toUpperCase() + ' ' + sZip;

                    if (initReptValue == 'Init') {
                        view.down('#lblRecipID').setValue(objDMRMember.data[0].recipientId);
                        view.down('#lblInitFirstName').setValue(objDMRMember.data[0].FirstName);
                        view.down('#lblInitLastName').setValue(objDMRMember.data[0].LastName);
                        //view.down('#lblInitDOB').setValue(this.GetFormattedDate(objDMRMember.data[0].BirthDate));
                         view.down('#lblInitDOB').setValue(objDMRMember.data[0].BirthDate);
                        view.down('#lblInitGender').setValue(objDMRMember.data[0].Gender == 'M' ? 'MALE' : 'FEMALE');
                        view.down('#lblInitAddress').setValue(address);
                        view.down('#cbxLOB').setDisabled(false);
                        view.down('#cbxLOB').setValue('');
                        view.down('#cbxLOB').setRawValue('');
                        if (sIncidentDate != '') {
                            if (objDMRMember.metadata.ttMemberLOB.ttMemberLOB.length > 0) {
                                var iRecCount = objDMRMember.metadata.ttMemberLOB.ttMemberLOB.length;
                                if (iRecCount > 1) {//If member has subscription to more than one LOB, then default to Medicaid. User can change this.
                                    view.down('#cbxLOB').setValue(1);
                                    view.down('#cbxLOB').setRawValue('Medicaid');
                                }
                                else if (iRecCount == 1) {//If member has subscription to ONLY one LOB, then default it.
                                    var sLOB = objDMRMember.metadata.ttMemberLOB.ttMemberLOB[0].carrierLOBId.toString(); //Has to be value from DB. !!!!!
                                    view.down('#cbxLOB').setValue(sLOB);
                                    view.down('#cbxLOB').setDisabled(true);
                                }
                            }
                        }
                    }
                    else if (initReptValue == 'Rept') {
                        view.down('#lblReptFirstName').setValue(objDMRMember.data[0].FirstName);
                        view.down('#lblReptLastName').setValue(objDMRMember.data[0].LastName);
                        view.down('#lblReptDOB').setValue(this.GetFormattedDate(objDMRMember.data[0].BirthDate));
                        view.down('#lblReptGender').setValue(objDMRMember.data[0].Gender == 'M' ? 'MALE' : 'FEMALE');
                        view.down('#lblReptAddress').setValue(address);
                    }
                }
                else {
                    view.down('#lblRecipID').setValue('NA');
                }
            }
        });
    },

    init: function () {
        var view = this.getView();
        this.resetCtrlValues();
        this.bindDropDowns();
        if(view.isredirect)
        this.onViewGrievancesClick(view.atlasId);
    },

    routeTo: function (atlasId, route) {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute(route),
            viewRoute = route.split('/'),
            atlasId = atlasId;

        me.fireEvent('openView', viewRoute[0], viewRoute[1], viewRoute[2], {
            menuId: menuId,
            atlasId: atlasId
        });
    },

    onLeaveDatefield:function(myDatefield){
        Atlas.common.view.AutoFormatDate.autoFormatDate(myDatefield);
    },

    cbxType_Select : function(combo, record){
        var me = this,
            view = this.getView(),
            ackDays = record.data.AckLetterDays,
            resDays = record.data.ResLetterDays,
            initDate = view.down('#lblInitiatedDate').getValue();
        if(ackDays.length <= 0 || ackDays == 0){
            ackDays = 5;
        }
        if(resDays.length <= 0 || resDays == 0){
            resDays = 15;
        }
        if(initDate.length > 0){
            var dtAck =  me.addDays(new Date(initDate), ackDays);
            var dtRes = me.addDays(new Date(initDate), resDays);
            view.down('#lblAckLetterDue').setValue((Ext.Date.format(dtAck, 'm/d/Y')));
            view.down('#lblResLetterDue').setValue((Ext.Date.format(dtRes, 'm/d/Y')));
        }

    },

    addDays : function(dt , noOfDays) {
        dt.setTime(dt.getTime() + (noOfDays * (1000 * 60 * 60 * 24)));
        return dt;
    }
});