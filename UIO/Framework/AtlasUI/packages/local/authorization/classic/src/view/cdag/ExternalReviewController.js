/**
 * Created by agupta on 10/15/2016.
 */
Ext.define('Atlas.authorization.view.cdag.ExternalReviewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.externalreviewcontroller',
    selSystemID: null,

    listen: {
        controller: {
            'cdagmaincontroller': {
                AuthIdChanged: 'updateAuthID'
            }
        }
    },

    updateAuthID: function(authID, EventUUID, refreshView) {
        var activeTabTitle = this.getView().up('#cdagTabBar').getActiveTab().title,
            CDAGInstanceUUID = this.getViewModel().get('CDAGInstanceUUID');

        if (activeTabTitle != 'External Review' || EventUUID != CDAGInstanceUUID) {
            return;
        }

        var vm = this.getViewModel(),
            view = this.getView(),
            CDAGTopPanelData = vm.get('CDAGTopPanelData'),
            PrntHidLOB = CDAGTopPanelData.CarrierLobID,
            LastAuthID = vm.get('LastAuthID');

        if (!refreshView && LastAuthID != null && LastAuthID != undefined && LastAuthID == authID) {
            return;
        }

        vm.set('LastAuthID', authID);
        view.down('#hdnPrntHidLOB').setValue(PrntHidLOB);

        var storeCDRD = vm.getStore('storecdrd');
        storeCDRD.getProxy().setExtraParam('pAuthID', authID);
        storeCDRD.getProxy().setExtraParam('pIncCanceled', true);
        storeCDRD.load();

        this.getView().down('#hiddenKey').setValue(authID);

        this.loadGridData(0, authID);

    },

    loadGridData: function (systemID, authID) {

        var view = this.getView(),
            vm = this.getViewModel(),
            me = this,
            grid = this.getView().down('#ExternalReviewGrid'),
            selectedItem = 0,
            storeExternalReviewList = vm.getStore('storeexternalreviewlist');

        view.down('#cbxNotesReason').setValue('');
        view.down('#taNotes').setValue('');

        storeExternalReviewList.getProxy().setExtraParam('pAuthID', authID);
        storeExternalReviewList.load(
            {
                callback: function (records, opts, success) {
                    if (success) {
                        if (records.length != 0)
                        {
                            if (systemID != 0)
                            {
                                selectedItem = grid.getStore().find('SystemID', systemID);
                            }
                            grid.getSelectionModel().select(selectedItem);
                            me.populateFields(records[selectedItem]);
                        }
                        else {
                            vm.set('SelectedGridRecord', '');
                            me.resetFields();
                        }
                    }
                }
            });

        this.setButtonState('');
    },

    gridRowSelected: function(dv, record, item, index, e){
        this.populateFields(record);
    },

    btnDelete_Click: function () {
        var view = this.getView(),
            me = this;
        var selRecordSystemID = view.down('#ExternalReviewGrid').getSelectionModel().getSelected().items.length == 0 ? '0' : view.down('#ExternalReviewGrid').getSelectionModel().getSelected().items[0].data.SystemID;
        if (selRecordSystemID == null || selRecordSystemID == "0" || selRecordSystemID == "") {
            Ext.Msg.alert("Error", "Please select a record to delete.");
            return;
        }

        Ext.Msg.confirm('External Review', 'Are you sure you would like to delete selected record?', function (btn) {
            if (btn == 'yes') {
                var authID = view.down('#hiddenKey').getValue();
                var params = [{
                    "AuthID": authID,
                    "SystemID": selRecordSystemID,
                    "ExternalReviewType": '',
                    "MCRAppealNum": '',
                    "ForwardedDate": '',
                    "ForwardedTime": '',
                    "ForwardedDateAmPm": '',
                    "LetterSentDate": '',
                    "LetterSentTime": '',
                    "LetterSentAmPm": '',
                    "Decision": '',
                    "DecisionDate": '',
                    "DecisionTime": '',
                    "DecisionAmPm": '',
                    "Reason": '',
                    "Notes": '',
                    "ReasonCode": '',
                    "RecordAction": 'DELETE',
                    "LastModified": '',
                    "ParentSystemID": ''
                }];

                me.externalReviewSavedetailDirectMethod(params);

                me.resetFields();
                view.down('#btnCreate').setDisabled(false);
                view.down('#btnEdit').setDisabled(true);
                view.down('#btnSave').setDisabled(true);
                view.down('#btnCancel').setDisabled(true);
                view.down('#btnDelete').setDisabled(true);
                view.down('#ExternalReviewGrid').setDisabled(false);
            }
        });
    },

    btnEdit_Click: function () {
        var view = this.getView();
        var selRecordSystemID = view.down('#ExternalReviewGrid').getSelectionModel().getSelected().items.length == 0 ? '0' : view.down('#ExternalReviewGrid').getSelectionModel().getSelected().items[0].data.SystemID;//e.ExtraParams["SystemID"].ToString();

        if (selRecordSystemID == null || selRecordSystemID == "0" || selRecordSystemID == "") {
            Ext.Msg.alert("Error", "Please select a record to edit.");
            return;
        }
        view.down('#hdnRecordAction').setValue("UPDATE");
        this.setButtonState("Edit");
    },

    setReviewValidation: function () {
        var view = this.getView();
        var isDecisiondateBlankAllowed = true;
        var decision = view.down('#cbxDecision').getValue() != null && view.down('#cbxDecision').getValue() != undefined && view.down('#cbxDecision').getValue() != '';
        var decisiondate = (view.down('#dtDecisionDate').getValue() != null && view.down('#dtDecisionDate').getValue() != undefined && view.down('#dtDecisionDate').getValue() != '') || (view.down('#dtDecisionDate').getValue() == '' && view.down('#tDecisionTime').getValue() != '');
        var dtDecisionDate = (view.down('#dtDecisionDate').getValue() == null || view.down('#dtDecisionDate').getValue() == '' ? '' : view.down('#dtDecisionDate').getValue());
        var tDecisionTime = (view.down('#tDecisionTime').getValue() == null || view.down('#tDecisionTime').getValue() == '' ? '' : view.down('#tDecisionTime').getValue());
        var dtLetterSentDate = (view.down('#dtLetterSentDate').getValue() == null || view.down('#dtLetterSentDate').getValue() == '' ? '' : view.down('#dtLetterSentDate').getValue());
        var tLetterSentTime = (view.down('#tLetterSentTime').getValue() == null || view.down('#tLetterSentTime').getValue() == '' ? '' : view.down('#tLetterSentTime').getValue());

        if (decision != decisiondate) {
            view.down('#cbxDecision').allowBlank = false;
            view.down('#dtDecisionDate').allowBlank = false;
            view.down('#tDecisionTime').allowBlank = false;
            view.down('#cbxDecisionAmPm').allowBlank = false;
            isDecisiondateBlankAllowed = false;
        }
        else {
            view.down('#cbxDecision').allowBlank = true;
            view.down('#dtDecisionDate').allowBlank = true;
            view.down('#tDecisionTime').allowBlank = true;
            view.down('#cbxDecisionAmPm').allowBlank = true;
        }
        //Decision Date
        if ((dtDecisionDate == '' && tDecisionTime != '') || (dtDecisionDate != '' && tDecisionTime == '')) {
            view.down('#tDecisionTime').allowBlank = false;
            view.down('#dtDecisionDate').allowBlank = false;
            view.down('#cbxDecisionAmPm').allowBlank = false;
        }
        else {
            if (isDecisiondateBlankAllowed) {
                view.down('#tDecisionTime').allowBlank = true;
                view.down('#dtDecisionDate').allowBlank = true;
                view.down('#cbxDecisionAmPm').allowBlank = true;
            }
        }

        if ((dtLetterSentDate == '' && tLetterSentTime != '') || (dtLetterSentDate != '' && tLetterSentTime == '')) {
            view.down('#dtLetterSentDate').allowBlank = false;
            view.down('#tLetterSentTime').allowBlank = false;
            view.down('#cbxLetterSentAmPm').allowBlank = false;
        }
        else {
            view.down('#dtLetterSentDate').allowBlank = true;
            view.down('#tLetterSentTime').allowBlank = true;
            view.down('#cbxLetterSentAmPm').allowBlank = true;
        }


        if (!view.down('#formExternalReview').isValid()) {
            Ext.Msg.alert('Review Validation Error', 'Please enter required fields.');
            return false;
        }
        if ((view.down('#cbxReason').getValue() == '1' || view.down('#cbxReason').getValue() == '2') && view.down('#cbxExternalReviewer').getValue() != 'IRE') {
            Ext.Msg.alert('Review Validation Error', 'Reason Auto Forward is only applicable for Independent Review Entity.');
            return false;
        }

        if (!this.checkDateTime(view.down('#dtForwardedDate'), view.down('#tForwardedTime'), view.down('#cbxForwardedDateAmPm')) || !this.checkDateTime(view.down('#dtLetterSentDate'), view.down('#tLetterSentTime'), view.down('#cbxLetterSentAmPm')) || !this.checkDateTime(view.down('#dtDecisionDate'), view.down('#tDecisionTime'), view.down('#cbxDecisionAmPm'))) {
            return false;
        }

        return true;

    },

    btnSave_Click: function () {
        var view = this.getView();
        if (this.setReviewValidation()) {
            if (view.down('#cbxDecision').getValue() != null &&
                view.down('#cbxDecision').getValue() != undefined &&
                view.down('#cbxDecision').getValue() != '' &&
                (view.down('#ExternalReviewGrid').getSelectionModel().hasSelection() ? (view.down('#cbxDecision').getValue() != view.down('#ExternalReviewGrid').getSelectionModel().getSelected().items[0].data.Decision) : true)) {
                Ext.Msg.confirm('Confirm', 'Decision update will override original decision, would you like to proceed?', function (btn) {
                    if (btn == 'yes') {
                        this.externalReviewSavedetail();
                    }
                }, this);
            }
            else {
                this.externalReviewSavedetail();
            }
        }
    },

    populateFields: function (record) {

        if (record == null || record == '' || record == undefined) {
            return;
        }

        var view = this.getView(),
            vm  =this.getViewModel();

        this.resetFields();

        vm.set('SelectedGridRecord', record);

        this.selSystemID = record.data.SystemID;
        this.getView().down('#formExternalReview').loadRecord(record);

        var editDisabled = false;

        var DateForwarded = record.data.DateForwarded;
        var LetterSentDate = record.data.LetterSentDate;
        var DecisionDate = record.data.DecisionDate;
        var PrntHidMedicarePAQueueAccess = vm.get('hidMedicarePAQueueAccess') == null || vm.get('hidMedicarePAQueueAccess') == undefined ? false : vm.get('hidMedicarePAQueueAccess');
        var PrntHidLOB = this.getView().down('#hdnPrntHidLOB').getValue();


        this.loadDecision(record.data.Decision, record.data.DecisionDisplay, view.down('#hdnPlanGroupID').getValue());

        view.down('#cbxExternalReviewer').setValue(record.data.ExternalReviewType);

        if (LetterSentDate != '') {
            var arrLetterSentDate = LetterSentDate.replace('  ', ' ').split(' ');
            view.down('#dtLetterSentDate').setValue(arrLetterSentDate[0]);
            view.down('#tLetterSentTime').setValue(arrLetterSentDate[1].length == 7 ? '0' + arrLetterSentDate[1] : arrLetterSentDate[1]);
            view.down('#cbxLetterSentAmPm').setValue(arrLetterSentDate[2]);
        }
        if (DecisionDate != '') {
            var arrDecisionDate = DecisionDate.replace('  ', ' ').split(' ');
            view.down('#dtDecisionDate').setValue(arrDecisionDate[0]);
            view.down('#tDecisionTime').setValue(arrDecisionDate[1].length == 7 ? '0' + arrDecisionDate[1] : arrDecisionDate[1]);
            view.down('#cbxDecisionAmPm').setValue(arrDecisionDate[2]);
        }
        if (DateForwarded != '') {
            var arrDateForwarded = DateForwarded.replace('  ', ' ').split(' ');
            view.down('#dtForwardedDate').setValue(arrDateForwarded[0]);
            view.down('#tForwardedTime').setValue(arrDateForwarded[1].length == 7 ? '0' + arrDateForwarded[1] : arrDateForwarded[1]);
            view.down('#cbxForwardedDateAmPm').setValue(arrDateForwarded[2]);
        }

        if (record.data.Decision != '') {
            view.down('#btnDelete').setDisabled(true);
            if (!PrntHidMedicarePAQueueAccess || PrntHidLOB != '2') {
                editDisabled = true;
            }
        }
        else {
            view.down('#btnDelete').setDisabled(false);
        }
        view.down('#btnEdit').setDisabled(editDisabled);
    },

    btnCancel_Click: function () {
        this.setButtonState('Cancel');
        this.populateFields(this.getViewModel().get('SelectedGridRecord'));
    },

    btnCreate_Click: function () {
        var planGroupId = 580;
        var view = this.getView();
        view.down('#hdnRecordAction').setValue('ADD');
        this.resetFields();
        this.setButtonState("Add");
        this.loadDecision('', '', planGroupId, true);
    },

    loadDecision: function (itemCode, itemDesc, planGroupId, isCreate) {
        var vm = this.getViewModel();
        var view = this.getView();
        var storeReviewDecision = vm.getStore('storereviewdecision');
        storeReviewDecision.getProxy().setExtraParam('ipiPlangroupId', planGroupId);
        storeReviewDecision.getProxy().setExtraParam('iplChkAccessToUser', false);
        storeReviewDecision.getProxy().setExtraParam('pListName', 'PAExternalReviewDecision');
        storeReviewDecision.load(
            {
                scope: this,
                failure: function (record, operation) {
                    //do something if the load failed
                },
                success: function (record, operation) {

                },
                callback: function (record, operation, success) {
                    /*var cdDecisionList = [];
                     if(record.length>0){
                     record.forEach(function (item, count) {
                     var temp ={
                     Id : '',
                     Name : ''
                     }
                     temp.Id = item.data.ListItem;
                     temp.Name = item.data.ListDescription;
                     cdDecisionList.push(temp);
                     });


                     }
                     storeReviewDecision.loadRawData(cdDecisionList);
                     ;*/

                    if (itemCode != '') {
                        var isFound = false;

                        record.forEach(function (item, count) {

                            if (item.data.ListItem == itemCode) {
                                isFound = true;
                                return false;
                            }
                            //temp.Name = item.data.ListDescription;
                        });
                        if (!isFound) {
                            var temp = {
                                ListItem: itemCode,
                                ListDescription: itemDesc
                            };
                            record.push(temp);
                        }

                    }

                    if (record.length != 0) {
                        storeReviewDecision.loadRawData(record);
                    }

                    if (record.length > 0) {
                        view.down('#cbxDecision').setValue(itemCode);
                    }
                    else {
                        view.down('#cbxDecision').setValue('');
                    }
                    if (isCreate) {
                        view.down('#cbxDecision').setValue('');
                    }
                }
            }
        );
    },

    checkDateTime: function (dControl, tControl, cControl) {
        var format = cControl.getValue();
        var ddate = dControl.getRawValue();
        var time = tControl.getValue();

        if (
            (format != null && format != undefined && format != '') &&
            (ddate != null && ddate != undefined && ddate != '') &&
            (time != null && time != undefined && time != '')
        ) {
            var hours = Number(time.match(/^(\d+)/)[1]);
            var minutes = Number(time.match(/:(\d+)/)[1]);
            if (format == "PM" && hours < 12) hours = hours + 12;
            if (format == "AM" && hours == 12) hours = hours - 12;
            var sHours = hours.toString();
            var sMinutes = minutes.toString();
            if (hours < 10) sHours = "0" + sHours;
            if (minutes < 10) sMinutes = "0" + sMinutes;
            ddate = ddate + " " + sHours + ":" + sMinutes + ":00";
            var date1 = new Date(ddate);
            var date2 = Atlas.common.utility.Utilities.getLocalDateTime();
            if (date1 > date2) {
                Ext.Msg.alert('Validation Error', 'Please enter "' + dControl.fieldLabel.replace('<b>', '').replace('</b>', '') + '" date time less than current date time.');
                dControl.focus();
                return false;
            }
        }
        return true;
    },

    timeChange: function (control, e) {
        var hour = "";
        var min = "";
        var sec = "";
        if ((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
            return;
        }

        var val = control.getValue();

        for (var iCnt = 0; iCnt < val.length; iCnt++) {

            if (val[iCnt] == ":") {
                continue;
            }

            if (iCnt <= 2) {
                hour = hour + val[iCnt];
                if (iCnt == 1) {
                    hour = hour + ":";
                }
            }

            if (iCnt > 2 && iCnt <= 5) {
                min = min + val[iCnt];

                if (iCnt == 4) {
                    min = min + ":";
                }
            }

            if (iCnt > 5) {
                sec = sec + val[iCnt];
            }
        }

        control.setValue(hour + min + sec);
    },

    setButtonState: function (mode) {
        var view = this.getView();
        var lDisabled = true;

        if (mode == "Add") {

            view.down('#btnCreate').setDisabled(true);
            view.down('#btnEdit').setDisabled(true);
            view.down('#btnSave').setDisabled(false);
            view.down('#btnCancel').setDisabled(false);
            view.down('#btnDelete').setDisabled(true);
            view.down('#ExternalReviewGrid').setDisabled(true);
            lDisabled = false;
        }
        else if (mode == "Edit") {
            view.down('#btnCreate').setDisabled(true);
            view.down('#btnEdit').setDisabled(true);
            view.down('#btnSave').setDisabled(false);
            view.down('#btnCancel').setDisabled(false);
            view.down('#btnDelete').setDisabled(true);
            view.down('#ExternalReviewGrid').setDisabled(true);
            lDisabled = false;
        }
        else if (mode == "Cancel" || mode == "Save") {
            view.down('#btnCreate').setDisabled(false);
            view.down('#btnEdit').setDisabled(false);
            view.down('#btnSave').setDisabled(true);
            view.down('#btnCancel').setDisabled(true);
            view.down('#btnDelete').setDisabled(false);
            view.down('#ExternalReviewGrid').setDisabled(false);
            lDisabled = true;
        }
        else {
            view.down('#btnCreate').setDisabled(false);
            view.down('#btnEdit').setDisabled(true);
            view.down('#btnSave').setDisabled(true);
            view.down('#btnCancel').setDisabled(true);
            view.down('#btnDelete').setDisabled(true);
            view.down('#ExternalReviewGrid').setDisabled(false);
            lDisabled = true;
        }

        this.disableFields(lDisabled);

    },

    disableFields: function (lDisabled) {
        var view = this.getView();
        view.down('#cbxExternalReviewer').setDisabled(lDisabled);
        view.down('#txtMedicareAppreal').setDisabled(lDisabled);
        view.down('#cbxNotesReason').setDisabled(lDisabled);
        view.down('#cbxReason').setDisabled(lDisabled);
        view.down('#cbxCDRD').setDisabled(lDisabled);
        view.down('#cbxDecision').setDisabled(lDisabled);
        view.down('#taNotes').setDisabled(lDisabled);
        view.down('#dtForwardedDate').setDisabled(lDisabled);
        view.down('#tForwardedTime').setDisabled(lDisabled);
        view.down('#cbxForwardedDateAmPm').setDisabled(lDisabled);
        view.down('#dtLetterSentDate').setDisabled(lDisabled);
        view.down('#tLetterSentTime').setDisabled(lDisabled);
        view.down('#cbxLetterSentAmPm').setDisabled(lDisabled);
        view.down('#dtDecisionDate').setDisabled(lDisabled);
        view.down('#tDecisionTime').setDisabled(lDisabled);
        view.down('#cbxDecisionAmPm').setDisabled(lDisabled);

        if (!lDisabled) {
            view.down('#formExternalReview').isValid();
        }
    },

    resetFields: function () {
        this.getView().down('#formExternalReview').reset();
    },

    externalReviewSavedetailDirectMethod: function (pramsValues) {
        var view = this.getView();
        var me = this;
        var recordAction = pramsValues[0].RecordAction;
        try {
            var authID = pramsValues[0].AuthID;
            pramsValues[0].LetterSentDate = pramsValues[0].LetterSentDate == '' ? '' : (pramsValues[0].LetterSentDate + ' ' + pramsValues[0].LetterSentTime + ' ' + pramsValues[0].LetterSentAmPm);
            pramsValues[0].DecisionDate = pramsValues[0].DecisionDate == '' ? '' : (pramsValues[0].DecisionDate + ' ' + pramsValues[0].DecisionTime + ' ' + pramsValues[0].DecisionAmPm);
            pramsValues[0].DateForwarded = pramsValues[0].ForwardedDate == '' ? '' : (pramsValues[0].ForwardedDate + ' ' + pramsValues[0].ForwardedTime + ' ' + pramsValues[0].ForwardedDateAmPm);

            if (recordAction == "ADD") {
                pramsValues[0].SystemID = 0;
                pramsValues[0].RecordAction = "A";
            }
            else if (recordAction == "UPDATE") {
                pramsValues[0].RecordAction = "U";
            }
            else if (recordAction == "DELETE") {
                pramsValues[0].RecordAction = "D";
                me.getViewModel().set('SelectedGridRecord', '')
            }
            var setExternalReviewModel = Ext.create('Atlas.authorization.model.cdag.SetExternalReviewModel');
            setExternalReviewModel.getProxy().setExtraParam('pAuthID', authID);
            setExternalReviewModel.getProxy().setExtraParam('ttExternalReviewData', pramsValues[0]);
            setExternalReviewModel.phantom = false;
            setExternalReviewModel.save(
                {
                    scope: this,
                    failure: function (record, operation) {
                    },
                    success: function (record, operation) {
                    },
                    callback: function (record, operation, success) {
                        if (success) {
                            var objResp = Ext.decode(operation.getResponse().responseText);
                            if (objResp.message[0].code != 0) {
                                Ext.Msg.alert('Error', objResp.message[0].message);
                            }
                            else if (objResp.message[0].code == 0) {
                                Ext.Msg.alert('Success', 'Record ' + (pramsValues[0].RecordAction == 'D' ? 'deleted' : 'saved') + ' successfully' , function (btn) {
                                    me.setButtonState('Save');
                                    me.loadGridData(objResp.metadata.pRetSystemId, authID);

                                    me.fireEvent('parentEventGetPA', authID);
                                    me.fireEvent('setAuthDocument', authID);
                                });

                            }
                            view.down('#taNotes').setValue(null);
                            view.down('#cbxNotesReason').setValue(null);
                        }
                    }
                }
            )
        }
        catch (err) {
            X.Msg.alert("Error", err.Message);
        }
    },

    externalReviewSavedetail: function () {
        var view = this.getView(),
            ReasonCode = view.down('#cbxNotesReason').getValue() != null && view.down('#cbxNotesReason').getValue() != undefined ? view.down('#cbxNotesReason').getValue() : '';

        var params = [{
            "AuthID": view.down('#hiddenKey').getValue(),
            "SystemID": view.down('#ExternalReviewGrid').getSelectionModel().getSelected().items.length == 0 ? '0' : view.down('#ExternalReviewGrid').getSelectionModel().getSelected().items[0].data.SystemID,
            "ExternalReviewType": view.down('#cbxExternalReviewer').getValue(),
            "MCRAppealNum": view.down('#txtMedicareAppreal').getValue(),
            "ForwardedDate": Ext.Date.format(view.down('#dtForwardedDate').getValue(), 'm/d/Y'),
            "ForwardedTime": view.down('#tForwardedTime').getValue(),
            "ForwardedDateAmPm": view.down('#cbxForwardedDateAmPm').getValue(),
            "LetterSentDate": Ext.Date.format(view.down('#dtLetterSentDate').getValue(), 'm/d/Y'),
            "LetterSentTime": view.down('#tLetterSentTime').getValue(),
            "LetterSentAmPm": view.down('#cbxLetterSentAmPm').getValue(),
            "Decision": view.down('#cbxDecision').getValue() == null ? '' : view.down('#cbxDecision').getValue(),
            "DecisionDate": Ext.Date.format(view.down('#dtDecisionDate').getValue(), 'm/d/Y'),
            "DecisionTime": view.down('#tDecisionTime').getValue(),
            "DecisionAmPm": view.down('#cbxDecisionAmPm').getValue(),
            "Reason": view.down('#cbxReason').getValue(),
            "Notes": view.down('#taNotes').getValue(),
            "ReasonCode": ReasonCode,
            "RecordAction": view.down('#ExternalReviewGrid').getSelectionModel().getSelected().items.length == 0 ? 'ADD' : view.down('#hdnRecordAction').getValue(),
            "LastModified": view.down('#ExternalReviewGrid').getSelectionModel().getSelected().items.length == 0 ? '' : view.down('#ExternalReviewGrid').getSelectionModel().getSelected().items[0].data.LastModified,
            "ParentSystemID": view.down('#cbxCDRD').getValue()
        }];

        this.externalReviewSavedetailDirectMethod(params);

    }

});