/**
 * Created by s6627 on 11/8/2016.
 */

Ext.define('Atlas.casemanagement.view.CaseDetailsController', {
    extend: 'Atlas.common.view.merlin.MenuBaseController',
    alias: 'controller.casedetailscontroller',

    init: function () {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel();
        var menuStore = vm.getStore('menu'),
            proxy = menuStore.getProxy();

        menuStore = vm.getStore('menu'),
            proxy = menuStore.getProxy();

        proxy.setExtraParam('pRootMenu', view.menuId);
        proxy.setExtraParam('pLevels', 1);

        menuStore.on({
            load: 'onMenuLoad',
            scope: me,
            single: true // Remove listener after Load
        });

        var masterrecord={};
        masterrecord.page='MMR';
        vm.set('contactlogmasterrecord',masterrecord);

        menuStore.load();
        view.down('#hiddenKey').setValue("");
        view.down('#hiddenMTMID').setValue("");
        view.down('#hiddenMTMSystemID').setValue("");
        view.down('#hiddenPreRecipientId').setValue("");
        var vm = this.getViewModel();
        vm.set('BckRecPointer', '');
        vm.set('FwdRecPointer', '');
        vm.set('JumpStart', '0');
        vm.set('Direction', 'Fwd');
        vm.set('LoadPagination', 'true');

        //view.down('#hidLetterMenuID').setValue(""); = GetMenuID("Letters/LetterInfo.aspx");
        //view.down('#hidMemMenuID.Value = GetMenuID("Member/MemberInfo.aspx");
    },
    CognitivelyChecked:function(sender, e) {
        var view = this.getView();
        if (view.down('#chkCognitiveImpaired').checked) {
            view.down('#dtDateDetermined').setDisabled(false);
            view.down('#TextCognitiveNotes').setDisabled(false);
        }
        else
        {
            view.down('#dtDateDetermined').setValue('');
            view.down('#TextCognitiveNotes').setValue('');
            view.down('#dtDateDetermined').setDisabled(true);
            view.down('#TextCognitiveNotes').setDisabled(true);
        }
    },
    onMenuLoad: function (store, records, success) {
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            menu = me.lookup('menu'),
            items = [],
            i = 0,
            iLen = records.length,
            defaultMenu = -1,
            route;

        for (; i < iLen; i++) {
            items.push({
                text: records[i].get('menuTitle'),
                route: records[i].get('route')
            });

            if (records[i].get('defaultMenu')) {
                defaultMenu = i;
            }
        }

        menu.getMenu().add(items);

        if (defaultMenu > -1) {
            route = items[defaultMenu].route;
            view.add({
                xclass: Atlas.common.Util.classFromRoute(route),
                title: items[defaultMenu].text,
                route: route,
                closable: false
            });
            view.setActiveTab(0);
        }

        if (vm.get('viewready')) {
            view.unmask();
        }

        vm.set('initialized', true);
        if(view.MTMId != null)
        {
            this.GetMTMCaseInfo(view.MTMId);

        }
    },

    boxReady: function (view, width, height) {
        //Starting with mask and defer any user interations until component is fully loaded, e.g. menus
        var vm = view.lookupViewModel();

        if (!vm.get('initialized')) {
            view.mask('Loading...');
        }

        vm.set('viewready', true);
    },
    btAdvancedSearch: function () {
        var me = this;
        if (!me.getView().down('#AdvSearchWindow')) {
            var win = new Ext.create({
                xtype: 'casemanagementAdvanceSearch',
                viewModel: {
                    parent: me.getViewModel()
                },
                closeAction: 'hide',
                itemId:'AdvSearchWindow',
                autoShow: false,
                floating: true,
                modal: true
            });
            me.getView().add(win);
            win.show();
        }
        else {
            me.getView().down('#AdvSearchWindow').show();
        }
       // this.getView().add(win);
        //var StoreMTMCasesDetailsSearch= me.getViewModel().getStore('StoreMTMCasesDetailsSearch');
        //StoreMTMCasesDetailsSearch.getProxy().setExtraParam('pWhere', 'null');
        //StoreMTMCasesDetailsSearch.getProxy().setExtraParam('pBatchSize', '0');
        //StoreMTMCasesDetailsSearch.getProxy().setExtraParam('ipiJumpStart', 0);
        //StoreMTMCasesDetailsSearch.getProxy().setExtraParam('ipcDirection', '');
        //StoreMTMCasesDetailsSearch.getProxy().setExtraParam('ipcBckRecPointer', '');
        //StoreMTMCasesDetailsSearch.getProxy().setExtraParam('ipcFwdRecPointer', '');
        //StoreMTMCasesDetailsSearch.load();
       // win.show();
    },
    GetDetails: function (f, e) {
        if (e.getKey() == e.ENTER) {
            var MTMID = f.lastValue;
            this.GetMTMCaseInfo(MTMID);
        }
        else {
            return true;
        }
    },
    ResetPage: function () {
        var view = this.getView();
        view.down('#lblStatus').setValue('');
        view.down('#lblCaseManager').setValue('');
        view.down('#lblPlanGroupId').setValue('');
        view.down('#lbldaysopen').setValue('');
        view.down('#btnMRxId').setText('');
        view.down('#lblMemberName').setValue('');
        view.down('#lblKey').setText('');
        view.down('#hdnMTMSystemId').setValue('');
        view.down('#numMTMID').setValue('');
        view.down('#btnAllCases').setDisabled(true);
    },
    GetMTMCaseInfo: function (MTMID) {
        var me = this;
        var view = me.getView();
        var vm = me.getViewModel();
        var StoreMTMCasesDetails = vm.get('StoreMTMCasesDetails');
        if (MTMID != '') {

            view.down('#lblKey').setText(MTMID);
            this.ResetPage();
            this.ResetPage();
            var recCount = 0;
            try {

                view.down('#numMTMID').setValue(MTMID);
                view.down('#hiddenRefreshKey').setValue(MTMID);
                var totalCases = 0;
                StoreMTMCasesDetails.getProxy().setExtraParam('pWhere', "MTMId = " + MTMID);
                StoreMTMCasesDetails.getProxy().setExtraParam('pBatchSize', 500);
                StoreMTMCasesDetails.getProxy().setExtraParam('ipcDirection', 'FWD');
                StoreMTMCasesDetails.getProxy().setExtraParam('ipiJumpStart', 0);
                StoreMTMCasesDetails.getProxy().setExtraParam('ipcBckRecPointer', '');
                StoreMTMCasesDetails.getProxy().setExtraParam('ipcFwdRecPointer', '');
                StoreMTMCasesDetails.load(
                    {
                        failure: function (record, operation) {
                        },
                        success: function (record, operation) {
                        },
                        callback: function (record, operation) {
                            if (record.length <= 0) {
                                Ext.Msg.alert("PBM", "MTM Record not found.");
                                view.down('#lblMemberStatus').setText('');
                                view.down('#lblEnrolledOn').setValue('');
                                view.down('#lblEnrolledBy').setValue('');
                                view.down('#btnAdd').setDisabled(false);
                                view.down('#btnSave').setDisabled(true);
                                view.down('#btnMTMInvitationLetter').setDisabled(true);
                                view.down('#btnCancel').setDisabled(true);
                                view.down('#btnDelete').setDisabled(true);
                                view.down('#pnlCase1').setDisabled(true);
                                view.down('#pnlCase2').setDisabled(true);
                                var StoreContactLog = vm.getStore('StoreContactLog');
                                StoreContactLog.getProxy().setExtraParam('pBatchSize', 0);
                                StoreContactLog.getProxy().setExtraParam('pKeyValue', '');
                                StoreContactLog.getProxy().setExtraParam('pKeyType', '');
                                StoreContactLog.load();
                                view.down('#numMTMID').setValue('');
                                view.down('#lblKey').setText('');
                                view.down('#hdnMTMSystemId').setValue('0');
                                me.Reset();
                            }
                            else {

                                vm.set('caseData',record);
                                view.setTitle('Case Details: ' + record[0].data.memberFullName + ' (Case ID:' + record[0].data.MTMId + ')');
                                var param =record[0].data;

                                    param.page='MMR';
                                    param. key='MTMID';
                                    param.keyvalue=record[0].data.MTMId;
                                    param.keytext=record[0].data.MTMId;
                                    param.plankeyvalue=record[0].data.panGroupId;
                                    param. plankeytext=record[0].data.MTMId;

                                vm.set('masterrecord',param);
                                vm.set('contactlogmasterrecord',param);

                                view.down('#lblKey').setText(record[0].data.MTMId);
                                view.down('#lblStatus').setValue(record[0].data.MTMStatus);
                                view.down('#lbldaysopen').setValue(record[0].data.DaysOpen);
                                view.down('#btnMRxId').setText(record[0].data.RecipientId);

                                /* Start store the Member Recipient ID to go member detail screen */
                                vm.set('MemberRecipientID',record[0].data.RecipientId);
                                /* End Member Recipient ID  */

                                view.down('#lblMemberName').setValue(record[0].data.memberFirstName +' ' +record[0].data.memberLastName);
                                view.down('#hdnMTMSystemId').setValue(record[0].data.systemID);
                                totalCases = parseInt(record[0].data.totalCases);
                                view.down('#lblPlanGroupId').setValue(record[0].data.planGroupId);
                                view.down('#lblCaseManager').setValue(record[0].data.caseManager);
                                if (totalCases > 1)
                                    view.down('#btnAllCases').setDisabled(false);
                                else
                                    view.down('#btnAllCases').setDisabled(true);
                                me.Reset();
                                view.down('#cbxMemberSearch').setValue(record[0].data.RecipientId);
                                view.down('#cbxMemberSearch').setDisabled(true);
                                //me.setMemberRecord();
                                if(record[0].data.EnrollDate!="")
                                    view.down('#lblEnrolledOn').setValue(Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(record[0].data.EnrollDate,'m/d/Y'));
                                view.down('#lblEnrolledBy').setValue(record[0].data.EnrollBy);
                                view.down('#btnDelete').setDisabled(false);
                                if (record[0].data.invitationLetterSendDate != '') {
                                    view.down('#lblInvitationLetterSent').setValue(record[0].data.invitationLetterSendDate);
                                    view.down('#lblCallAttempts').setValue(record[0].data.callAttemptsCount);
                                }

                                //Get the member information.
                                var fieldList =
                                    "recipientID,firstname,middlename,lastname,suffix,gender,birthDate,homephone.ContactInfo,@enrollmentStatus";
                                var StoreMemberMasterData = vm.getStore('StoreMemberMasterData');
                                StoreMemberMasterData.getProxy().setExtraParam('pKeyValue', record[0].data.RecipientId);
                                StoreMemberMasterData.getProxy().setExtraParam('pKeyType', 'recipientID');
                                StoreMemberMasterData.getProxy().setExtraParam('pFieldList', fieldList);
                                StoreMemberMasterData.load(
                                    {
                                        failure: function (record, operation) {
                                        },
                                        success: function (record, operation) {
                                        },
                                        callback: function (recordMember, operation) {
                                            if (recordMember.length > 0 && recordMember[0].data.firstname) {
                                                vm.set('record', recordMember[0])
                                                view.down('#txtMemberFullName').setValue(recordMember[0].data.firstname + " " + recordMember[0].data.lastname);
                                                view.down('#lblMemberStatus').setText(recordMember[0].data.enrollmentStatus);
                                                if (recordMember[0].data.enrollmentStatus == "Active") {
                                                    // view.down('#lblMemberStatus.Icon = Ext.Net.Icon.FlagGreen;
                                                    view.down('#lblMemberStatus').getEl().setStyle("color","green");
                                                }
                                                else {
                                                    // view.down('#lblMemberStatus.Icon = Ext.Net.Icon.FlagRed;
                                                    view.down('#lblMemberStatus').getEl().setStyle("color","red");
                                                }
                                            }
                                        }
                                    });
                                //Get the PlanGroup and populate it.
                                me.loadMemberPlanGroups(record[0].data.RecipientId);
                                view.down('#cbxPlanGroupsUC').setValue(record[0].data.planGroupId);
                                view.down('#hiddenRecipientId').setValue(record[0].data.RecipientId);
                                view.down('#cbxCaseDesc').setValue(record[0].data.DescriptionCode);
                                view.down('#cbxMemberResponse').setValue(record[0].data.memberResponse);
                                if (view.down('#cbxCaseDesc').getValue() == "6")
                                    view.down('#FieldSet2').setDisabled(true);
                                else
                                    view.down('#FieldSet2').setDisabled(false);

                                view.down('#cbxCaseManager').setValue(record[0].data.caseManager);
                                view.down('#dtEffective').setValue(record[0].data.effDate);
                                view.down('#dtTermDate').setValue(record[0].data.termDate);
                                view.down('#cbxStatus').setValue(record[0].data.StatusCode);
                                view.down('#cbxReason').setValue(record[0].data.CloseReasonCode);
                                view.down('#cbxOptOutMethod').setValue(record[0].data.optOutMethod);
                                view.down('#dtCloseDate').setValue(record[0].data.closedDate);
                                view.down('#txtEnrollReason').setValue(record[0].data.EnrollReason);

                                //MTM Case Details.
                                view.down('#dtWaiverDate').setValue(record[0].data.signedMTMWaiverDate);
                                view.down('#dtHIPAA').setValue(record[0].data.signedHIPAADate);
                                view.down('#dtPatientProfile').setValue(record[0].data.patientProfileDate);
                                view.down('#dtRecord').setValue(record[0].data.medicationRecordDate);
                                view.down('#txtMTMChanges').setValue(record[0].data.MTMChanges);
                                view.down('#dtLastContact').setValue(record[0].data.lastContactDate);
                                view.down('#dtFollowUpDate').setValue(record[0].data.followupDate);
                                view.down('#txtGoalForNextContact').setValue(record[0].data.goalForNextContact);

                                //Setting Hidden Variables..
                                view.down('#hiddenMTMID').setValue(MTMID);
                                vm.set('MTMID',MTMID);
                                view.down('#hiddenKey').setValue(MTMID);
                                view.down('#hiddenMTMSystemID').setValue(record[0].data.systemID);
                                view.down('#hiddenTotalCases').setValue(record[0].data.totalCases);
                                view.down('#hiddenDaysOpen').setValue(record[0].data.DaysOpen);
                                if (record[0].data.cognitivelyImpaired=="true") {
                                    view.down('#chkCognitiveImpaired').setValue(true);
                                }

                                view.down('#dtDateDetermined').setValue(record[0].data.DateCogImpDetermined);
                                view.down('#chkReturnedMail').setValue(record[0].data.returnedMail);
                                view.down('#TextCognitiveNotes').setValue(record[0].data.Notes);

                                me.setControls();
                                me.GetContactLogTable(MTMID);
                                //if (record[0].data.StatusCode == "2") {
                                //    view.down('#btnAdd').setDisabled(false);
                                //    view.down('#btnSave').setDisabled(true);
                                //    view.down('#btnMTMInvitationLetter').setDisabled(true);
                                //    view.down('#btnCancel').setDisabled(true);
                                //    view.down('#btnDelete').setDisabled(true);
                                //    view.down('#pnlCase1').setDisabled(true);
                                //    view.down('#pnlCase2').setDisabled(true);
                                //}
                            }
                            me.fireEvent('LoadProblemAAndBarriers');
                            me.fireEvent('LoadMedicationCMRTMR');
                            me.fireEvent('LoadLTC');
                            me.fireEvent('LoadAssessmentsQuestionnaire');
                            me.fireEvent('getContactLog');
                            me.fireEvent('LoadAllergiesData');
                            me.fireEvent('LoadFaxAndAttachmentsFire');
                        }
                    }
                );
            }
            catch (ex) {
                Ext.Msg.alert("Exception", ex.message);
            }

        }
    },
    setControls: function () {
        var view = this.getView();
        view.down('#pnlCase1').setDisabled(false);
        view.down('#plnGrid').setDisabled(false);
        view.down('#pnlCase2').setDisabled(false);
        view.down('#btnSave').setDisabled(false);
        view.down('#btnMTMInvitationLetter').setDisabled(false);
        view.down('#btnAdd').setDisabled(false);
        view.down('#btnCancel').setDisabled(true);
    },
    GetContactLogTable: function (keyValue) {
        var me =this;
        var vm = this.getViewModel();
        var StoreContactLog = vm.getStore('StoreContactLog');
        StoreContactLog.getProxy().setExtraParam('pBatchSize', 0);
        if (keyValue != "") {
            StoreContactLog.getProxy().setExtraParam('pKeyValue', keyValue);
            StoreContactLog.getProxy().setExtraParam('pKeyType', 'MTMID');
        }
        else{
            StoreContactLog.getProxy().setExtraParam('pKeyValue', '');
            StoreContactLog.getProxy().setExtraParam('pKeyType', '');
        }
        StoreContactLog.load();
        me.fireEvent('contactloggridrefresh');

    },
    Reset: function () {
        var view = this.getView();
        var pnlCaseDetail = view.down('#pnlCaseDetail');
        pnlCaseDetail.getForm().reset();
        view.down('#lblEnrolledOn').setValue('');
        view.down('#lblMemberStatus').setText('');
        view.down('#lblEnrolledBy').setValue('');
        view.down('#lblInvitationLetterSent').setValue('');
        view.down('#lblCallAttempts').setValue('');
        view.down('#cbxMemberSearch').setDisabled(false);
        view.down('#cbxStatus').setValue('1');
        view.down('#cbxMemberResponse').setValue('');
        view.down('#hiddenMTMID').setValue('');
        view.down('#hiddenRecipientId').setValue('');

        view.down('#chkCognitiveImpaired').setValue(false);
        view.down('#dtDateDetermined').setValue('');
        view.down('#chkReturnedMail').setValue(false);
        view.down('#TextCognitiveNotes').setValue('');

    },
    cbxCaseDesc_Select: function () {
        var view = this.getView();
        var CaseDesc = view.down('#cbxCaseDesc').getValue();
        if (CaseDesc == '6') {
            view.down('#FieldSet2').setDisabled(true);
        }
        else {
            view.down('#FieldSet2').setDisabled(false);
        }


    },
    loadMemberPlanGroups: function (RecipientId) {
        if (RecipientId != "") {
            var vm = this.getViewModel();
            var StoreMemPlanGroups = vm.getStore('StoreMemPlanGroups');
            StoreMemPlanGroups.getProxy().setExtraParam('pRecipientId', RecipientId);
            StoreMemPlanGroups.load();
        }
    },
    cbxStatus_Select: function () {
        var view = this.getView();
        if (view.down('#cbxStatus').getRawValue() == 'Closed') {
            view.down('#dtCloseDate').setDisabled(false);
            view.down('#cbxReason').setDisabled(false);
        }
        else {
            view.down('#dtCloseDate').setValue('');
            view.down('#cbxReason').setValue('');
            view.down('#cbxOptOutMethod').setValue('');
            view.down('#dtCloseDate').setDisabled(true);
            view.down('#cbxReason').setDisabled(true);
        }
    },

    cbxMemberResponse_Select: function () {
        var view = this.getView();
        view.down('#txtDescription').setValue(view.down('#cbxMemberResponse').getRawValue());
    },

    onRecordSelect: function (grid, rec) {
        var MTMID = rec.data.MTMId;
        this.GetMTMCaseInfo(MTMID);
        var win = Ext.WindowManager.getActive();
        if (win) {
            win.close();
        }
    },
    btnAddNewCaseClick: function () {
        var view = this.getView();
        view.down('#plnGrid').setDisabled(true);
        this.GetContactLogTable("");
        this.Reset();
        view.setTitle('Case Details');
        view.down('#btnAdd').setDisabled(true);
        view.down('#btnSave').setDisabled(false);
        view.down('#btnDelete').setDisabled(true);
        view.down('#btnMTMInvitationLetter').setDisabled(true);
        view.down('#btnCancel').setDisabled(false);
        view.down('#pnlCase1').setDisabled(false);
        view.down('#pnlCase2').setDisabled(false);
        view.down('#numMTMID').setValue('');
        view.down('#lblKey').setText('');
        view.down('#hdnMTMSystemId').setValue('');
        this.ResetPage();
    },
    btnCancelClick: function () {
        var view = this.getView();
        view.down('#plnGrid').setDisabled(false);
        this.Reset();
        view.down('#btnAdd').setDisabled(false);
        view.down('#btnSave').setDisabled(true);
        view.down('#btnCancel').setDisabled(true);
        view.down('#pnlCase1').setDisabled(true);
        view.down('#pnlCase2').setDisabled(true);
        this.ResetPage();
    },
    isMTMRecordValid: function () {
        var view = this.getView();
        view.down('#cbxReason').clearInvalid();
        view.down('#dtCloseDate').clearInvalid();
        var valid = view.down('#pnlCaseDetail').getForm().isValid();
        var MemStatus = view.down('#lblMemberStatus').text;

        if (view.down('#cbxStatus').getRawValue() == 'Closed') {
            if (view.down('#cbxReason').getValue() == null || view.down('#cbxReason').getValue() == '') {
                Ext.Msg.alert('PBM', 'Reason to Close is required.');
                valid = false;
                return false;
            }
            if (view.down('#dtCloseDate').getValue() == null || view.down('#dtCloseDate').getValue() == '') {
                Ext.Msg.alert('PBM', 'Close Date is required.');
                valid = false;
                return false;
            }
        }
        if (view.down('#cbxReason').getValue() == '9' && view.down('#cbxOptOutMethod').getValue() == null) {
            Ext.Msg.alert('PBM', 'OptOut Method is required.');
            valid = false;
            return false;
        }

        //If member opted out and if the user has not selected 'Closed' then show an error message.
        if (view.down('#cbxMemberResponse').getValue() == '4') {
            if (view.down('#cbxStatus').getRawValue() != 'Closed') {
                Ext.Msg.alert('PBM', 'If member response is \'Opt Out\' case status should be \'Closed\'.');
                valid = false;
                return false;
            }
        }
        if (view.down('#chkCallAttempted').checked) {
            if (view.down('#txtDescription').getValue() == null || view.down('#txtDescription').getValue() == '') {
                Ext.Msg.alert('PBM', 'Description is mandatory when call is attempted.');
                valid = false;
                return false;
            }
        }
        if (valid) {
            view.down('#btnAdd').setDisabled(false);
            view.down('#btnSave').setDisabled(false);
            // btnMTMFollowupLetter.setDisabled(false);
            view.down('#btnMTMInvitationLetter').setDisabled(false);
            //btnMTMCaseDetails.setDisabled(false);
            view.down('#btnCancel').setDisabled(true);
            view.down('#pnlCase1').setDisabled(false);
            view.down('#pnlCase2').setDisabled(false);

            if (MemStatus == 'Inactive') {
                //Confirmation for save.
                return confirm('Member is inactive. Do you still want to save the MTM Case?');
            }
        }
        else {
            Ext.Msg.alert('PBM', 'Please fix all the validation errors before saving the data.');
        }
        return valid;
    },
    generateFldListAndValues: function (pMTMId) {
        try {
            var view = this.getView();
            var sFldList = '';
            var sFldVals = '';
            if (pMTMId=="0") {
                sFldList = 'EnrollDate,EnrollSource,ReferralSource,EnrollBy,refType';
                sFldVals = Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(new Date(),'m/d/Y') + '|' + 'Manual' + '|'  + Atlas.user.un + '|' +  Atlas.user.un + '|' +  'PBM';
            }
            if (sFldList != '') {
                sFldList = sFldList + ',';
                sFldVals = sFldVals + '|';
            }
            sFldList = sFldList + 'RecipientId,description,memberResponse,caseManager,effDate,termDate,MTMStatus,closedDate,closedReason,EnrollReason,OptOutMethod,planGroupId,lastContactDate,followupDate,goalForNextContact,signedMTMWaiverDate,signedHIPAADate,patientProfileDate,medicationRecordDate,MTMChanges';
            sFldList = sFldList + ',' + 'cognitivelyImpaired,DateCogImpDetermined,returnedMail,Notes.Note';
            sFldVals = sFldVals + view.down('#hiddenRecipientId').getValue() + '|';
            if (view.down('#cbxCaseDesc').getValue() != null) {
                sFldVals = sFldVals + view.down('#cbxCaseDesc').getValue();
            }
            sFldVals = sFldVals + '|';
            if (view.down('#cbxMemberResponse').getValue() != null) {
                sFldVals = sFldVals + view.down('#cbxMemberResponse').getValue();
            }
            sFldVals = sFldVals + '|';
            if (view.down('#cbxCaseManager').getValue() != null) {
                sFldVals = sFldVals + view.down('#cbxCaseManager').getValue();
            }
            sFldVals = sFldVals + '|';
            if (view.down('#dtEffective').getValue() != null) {
                sFldVals = sFldVals + Ext.Date.format(new Date(view.down('#dtEffective').getValue()), 'm/d/Y');
            }
            sFldVals = sFldVals + '|';
            if (view.down('#dtTermDate').getValue() != null) {
                sFldVals = sFldVals + Ext.Date.format(new Date(view.down('#dtTermDate').getValue()), 'm/d/Y');
            }
            sFldVals = sFldVals + '|';
            if (view.down('#cbxStatus').getValue() != null) {
                sFldVals = sFldVals + view.down('#cbxStatus').getValue();
            }
            sFldVals = sFldVals + '|';
            if (view.down('#dtCloseDate').getValue() != null) {
                sFldVals = sFldVals + Ext.Date.format(new Date(view.down('#dtCloseDate').getValue()), 'm/d/Y');
            }
            sFldVals = sFldVals + '|';
            if (view.down('#cbxReason').getValue() != null) {
                sFldVals = sFldVals + view.down('#cbxReason').getValue();
            }
            sFldVals = sFldVals + '|';
            if (view.down('#txtEnrollReason').getValue() != null) {
                sFldVals = sFldVals + view.down('#txtEnrollReason').getValue();
            }
            sFldVals = sFldVals + '|';
            if (view.down('#cbxOptOutMethod').getValue() != null) {
                sFldVals = sFldVals + view.down('#cbxOptOutMethod').getValue();
            }
            sFldVals = sFldVals + '|';
            if (view.down('#cbxPlanGroupsUC').getValue() != null) {
                sFldVals = sFldVals + view.down('#cbxPlanGroupsUC').getValue();
            }
            sFldVals = sFldVals + '|';
            if (view.down('#dtLastContact').getValue() != null) {
                sFldVals = sFldVals + Ext.Date.format(new Date(view.down('#dtLastContact').getValue()), 'm/d/Y');
            }
            sFldVals = sFldVals + '|';
            if (view.down('#dtFollowUpDate').getValue() != null) {
                sFldVals = sFldVals +Ext.Date.format(new Date(view.down('#dtFollowUpDate').getValue()), 'm/d/Y');
            }
            sFldVals = sFldVals + '|';
            if (view.down('#txtGoalForNextContact').getValue() != null) {
                sFldVals = sFldVals + view.down('#txtGoalForNextContact').getValue();
            }
            sFldVals = sFldVals + '|';
            if (view.down('#dtWaiverDate').getValue() != null) {
                sFldVals = sFldVals + Ext.Date.format(new Date(view.down('#dtWaiverDate').getValue()), 'm/d/Y');
            }
            sFldVals = sFldVals + '|';
            if (view.down('#dtHIPAA').getValue() != null) {
                sFldVals = sFldVals + Ext.Date.format(new Date(view.down('#dtHIPAA').getValue()), 'm/d/Y');
            }
            sFldVals = sFldVals + '|';
            if (view.down('#dtPatientProfile').getValue() != null) {
                sFldVals = sFldVals + Ext.Date.format(new Date(view.down('#dtPatientProfile').getValue()), 'm/d/Y');
            }
            sFldVals = sFldVals + '|';
            if (view.down('#dtRecord').getValue() != null) {
                sFldVals = sFldVals + Ext.Date.format(new Date(view.down('#dtRecord').getValue()), 'm/d/Y');
            }
            sFldVals = sFldVals + '|';
            if (view.down('#txtMTMChanges').getValue() != null) {
                sFldVals = sFldVals + view.down('#txtMTMChanges').getValue();
            }
            sFldVals = sFldVals + '|';
            if (view.down('#chkCognitiveImpaired').getValue() != null) {
                sFldVals = sFldVals + view.down('#chkCognitiveImpaired').getValue();
            }
            sFldVals = sFldVals + '|';
            if (view.down('#dtDateDetermined').getValue() != null) {
                sFldVals = sFldVals +  Ext.Date.format(new Date(view.down('#dtDateDetermined').getValue()), 'm/d/Y');
            }
            sFldVals = sFldVals + '|';
            if (view.down('#chkReturnedMail').getValue() != null) {
                sFldVals = sFldVals + view.down('#chkReturnedMail').getValue();
            }
            sFldVals = sFldVals + '|';
            if (view.down('#TextCognitiveNotes').getValue() != null) {
                sFldVals = sFldVals + view.down('#TextCognitiveNotes').getValue();
            }
            return sFldList + '@' + sFldVals;
        }
        catch (ex) {
            throw ex;
        }
    },
    btnSaveClick: function () {
        var view = this.getView();
        if (this.isMTMRecordValid()) {
            try {
                var sSuccessMessage = "";
                var pFieldList = ""; //Comma Separated list of fields..
                var pFieldValues = ""; //Values of the fields..
                var pMTMId = "0";
                var result;
                var oMTMId = 0;
                var message;
                var sAction = "";
                var oSystemId;
                var pgId = view.down('#cbxPlanGroupsUC').getValue();
                //Building the FieldList and corresponding values.

                if (view.down('#hiddenMTMID').getValue().length <= 0 || view.down('#hiddenMTMID').getValue().trim() == "0") {
                }
                else {
                    pMTMId = view.down('#hiddenMTMID').getValue().trim();
                }
                if (pMTMId == "0") {
                    sAction = "A";
                }
                else {
                    sAction = "U";
                }
                var fields = this.generateFldListAndValues(pMTMId);
                var _fldList = fields.split('@')[0];
                var _fldVals = fields.split('@')[1];
                var extraParameters = {
                    'pMode': sAction,
                    'pFields': _fldList,
                    'pValues': _fldVals,
                    'pMTMId': pMTMId
                };
                var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                var returnField = ['oMTMId', 'oSystemId'];
                var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/mtmcase/update', null, [false], extraParameters,
                    saveAction, returnField);
                if (testReturn.code == 0) {
                    if (pMTMId == "0") //Insert
                    {
                        sSuccessMessage = "MTM Record Successfully Created.";
                    }
                    else {
                        sSuccessMessage = "MTM Record Successfully Updated.";
                    }
                    view.down('#hiddenMTMID').setValue(testReturn.oMTMId);
                    view.down('#hiddenMTMSystemID').setValue(testReturn.oSystemId);

                    //Save the Contact Log Entry
                    var CallAttempted = view.down('#chkCallAttempted').getValue();
                    var Reason1 = view.down('#cbxReason1').getValue();
                    var Description = view.down('#txtDescription').getValue();
                    if (CallAttempted == true || (Reason1 != ""&& Reason1 != null)) {
                        this.ContactLogSave(view.down('#hiddenMTMID').getValue(), view.down('#hiddenRecipientId').getValue(), CallAttempted, Reason1, Description, view.down('#cbxPlanGroupsUC').getValue());
                        this.GetContactLogTable(view.down('#hiddenMTMID').getValue());
                    }
                    if (view.down('#hiddenMTMSystemID').getValue().length > 0) {
                        view.down('#btnDelete').setDisabled(false);
                    }
                    this.GetMTMCaseInfo(view.down('#hiddenMTMID').getValue());
                    Ext.Msg.alert("PBM", sSuccessMessage);
                }
            }
            catch (ex) {
                Ext.Msg.alert("Exception", ex.message);
            }
        }
    },
    ContactLogSave: function (MTMID, RecipientId, CallAttempted, reason, Description, planGroupId) {
        try {
            var reason2 ="";
            reason2 = reason;
           // if(reason)
             //   reason.Split(' ')[0];
            var callStatus = "";
            var reason1 = "";
            if (RecipientId == "") {
                return;
            }
            callStatus = "C";
            if (CallAttempted == true) {
                reason1 = "P5C";
            }
            else if (reason2 != "") //If call attempted is not checked and if just reason code is entered, then make it reason1.
            {
                reason1 = reason2;
                reason2 = "";
            }

            //Note: Change the hardcoded P5C reasoncode if the user wants some other reason code for 'Call Attempted'.
            var fieldList = "MTMID,description,recipientID,callStatus,LastModifiedUser,CallDateTime,contactUser,contactType,subject,updatedBy,updatedDatetime,planGroupId";
            var fieldValues = MTMID + "|" + Description + "|" + RecipientId + "|" + callStatus + "|" + Atlas.user.un + "|" + Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(new Date(),'m/d/Y H:i:s') + "|" + Atlas.user.un + "|P|MTM Member Contacted" + "|" + Atlas.user.un + "|" + Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y H:i:s') + "|" + planGroupId;
            var ttContactReasonCodeList = [];
            var ttContactReasonCodett = {};
            if (reason1 != "") {
                var ttContactReasonCode = {};
                ttContactReasonCode.CodeType = "Reason1";
                ttContactReasonCode.CodeValue = reason1;
                ttContactReasonCodeList.push(ttContactReasonCode)
            }
            if (reason2 != "") {
                var ttContactReasonCode = {};
                ttContactReasonCode.CodeType = "Reason2";
                ttContactReasonCode.CodeValue = reason2;
                ttContactReasonCodeList.push(ttContactReasonCode)
            }
            ttContactReasonCodett.ttContactReasonCode = ttContactReasonCodeList;
            var extraParameters = {
                'pKeyValue': '0',
                'pKeyType': 'CaseNum',
                'pFieldList': fieldList,
                'pFields': fieldValues,
                'ttContactReasonCode': ttContactReasonCodett
            };
            var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
            var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/contactlogdata/update', null, [false], extraParameters,
                saveAction, null);
        }
        catch (ex) {
            Ext.Msg.alert("Exception", ex.message);
        }
    },
    cbxMember_Select: function (combo, record) {
        var view = this.getView();
        var vm = this.getViewModel();
        vm.set('record',record);
        if(record.data.tMemStatus == 'Inactive')
        {
            Ext.Msg.alert('PBM', 'Case record could not be created for Inactive Members.');
            return false;
        }
        var RID=view.down('#cbxMemberSearch').getValue();
        view.down('#hiddenRecipientId').setValue(RID);
        var fieldList =
            "recipientID,firstname,middlename,lastname,suffix,gender,birthDate,homephone.ContactInfo,@enrollmentStatus";
        var StoreMemberMasterData = vm.getStore('StoreMemberMasterData');
        StoreMemberMasterData.getProxy().setExtraParam('pKeyValue', RID);
        StoreMemberMasterData.getProxy().setExtraParam('pKeyType', 'recipientID');
        StoreMemberMasterData.getProxy().setExtraParam('pFieldList', fieldList);
        StoreMemberMasterData.load(
            {
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (recordMember, operation) {
                    if (recordMember.length > 0) {
                        view.down('#txtMemberFullName').setValue(recordMember[0].data.firstname + " " + recordMember[0].data.lastname);
                        view.down('#lblMemberStatus').setText(recordMember[0].data.enrollmentStatus);
                        view.down('#lblMemberName').setValue(recordMember[0].data.firstname + ' ' + recordMember[0].data.lastname);
                        view.down('#btnMRxId').setText(RID);

                        if (recordMember[0].data.enrollmentStatus == "Active") {
                            // view.down('#lblMemberStatus.Icon = Ext.Net.Icon.FlagGreen;
                            view.down('#lblMemberStatus').getEl().setStyle("color","green");
                        }
                        else {
                            // view.down('#lblMemberStatus.Icon = Ext.Net.Icon.FlagRed;
                            view.down('#lblMemberStatus').getEl().setStyle("color","red");
                        }
                    }
                }
            });
        var StoreMemPlanGroups = vm.getStore('StoreMemPlanGroups');
        StoreMemPlanGroups.getProxy().setExtraParam('pRecipientId', RID);
        StoreMemPlanGroups.getProxy().setExtraParam('pDate', Atlas.common.utility.Utilities.getLocalDateTime());
        StoreMemPlanGroups.load(
            {
                callback: function (recordPlan, operation) {
                    if (recordPlan.length > 0) {
                        view.down('#cbxPlanGroupsUC').setValue(recordPlan[0].data.planGroupId);


                    }
                }
            });
    },
    btnDeleteClick:function()
    {
        var view=this.getView();
        Ext.Msg.confirm('Confirm', 'Are you sure you would like to delete MTM record <b>' + view.down('#hiddenMTMID').getValue() + '</b>?', function (btn) {
            if (btn == 'yes') {
                try
                {
                    var sSuccessMessage = "";
                    var pFieldList = ""; //Comma Separated list of fields..
                    var pFieldValues = ""; //Values of the fields..
                    var pMTMId = "0";

                    var result;
                    var oMTMId = 0;
                    var message;

                    var sAction = "D";
                    var oSystemId;

                    if (view.down('#hiddenMTMID').getValue().length <= 0 || view.down('#hiddenMTMID').getValue().trim() == "0") {
                    }
                    else {
                        pMTMId = view.down('#hiddenMTMID').getValue().trim();
                    }
                    if (pMTMId=="0")
                    {
                        Ext.Msg.alert("PBM", "Invalid MTM Record.");
                        return;
                    }
                    pFieldList = "RecipientId";
                    pFieldValues =view.down('#hiddenRecipientId').getValue();
                    var extraParameters = {
                        'pMode': sAction,
                        'pFields': pFieldList,
                        'pValues': pFieldValues,
                        'pMTMId': pMTMId
                    };
                    var saveAction = [{"Save": {"key": "mode", "value": "A"}}];
                    var returnField = ['oMTMId', 'oSystemId'];
                    var testReturn = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/mtmcase/update', null, [false], extraParameters,
                        saveAction, returnField);
                    if (testReturn.code == 0) {
                        sSuccessMessage = "MTM Record (Id: " +  view.down('#hiddenMTMID').getValue() + ") Successfully Deleted.";
                        view.down('#hiddenMTMID').setValue("");
                        view.down('#hiddenMTMSystemID').setValue("");
                        view.down('#btnDelete').setDisabled(true);
                        Ext.Msg.alert("PBM", sSuccessMessage);
                        this.GetContactLogTable("");
                        this.ResetPage();
                        this.Reset();
                        view.down('#btnAdd').setDisabled(false);
                        view.down('#btnSave').setDisabled(true);
                        view.down('#btnCancel').setDisabled(true);
                        view.down('#pnlCase1').setDisabled(false);
                        view.down('#pnlCase2').setDisabled(false);
                        // btnMTMFollowupLetter.setDisabled(true);
                        view.down('#btnMTMInvitationLetter').setDisabled(true);
                        view.down('#lblEnrolledOn').setValue('');
                        view.down('#lblEnrolledBy').setValue('');
                        view.down('#numMTMID').setValue('');
                        view.down('#lblKey').setText('');
                        view.down('#hdnMTMSystemId').setValue('');
                    }
                }
                catch (ex) {
                    Ext.Msg.alert("Exception", ex.message);
                }
            }

        },this);
    },
    btnGoToMember:function()
    {
        var me = this, vm= me.getViewModel();
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar'), id = vm.get('MemberRecipientID');
        //Make sure you specify atlasId, as it serves as unique identifier to opened tab.
        this.fireEvent('openView', 'merlin', 'member', 'MemberToolbar', {
            atlasId: id,
            RID:id,
            menuId: menuId,
            recordCase:null
        });

    },
    setMemberRecord:function() {
        var vm = this.getViewModel();
        var view=this.getView();
        var StoreMemberMasterExt = vm.getStore('StoreMemberMasterExt')
        StoreMemberMasterExt.getProxy().setExtraParam('pWhere', 'wrdidx contains ' + view.down('#cbxMemberSearch').getValue());
        StoreMemberMasterExt.load(
            {
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (recordMember, operation) {
                    vm.set('record', recordMember[0])
                }
            });
    },
    btnExportToExcelActionPlan:function()
    {
        var view = this.getView();
        var store=view.down('#MTMGridPanel').getStore();
        //store.getProxy().setExtraParam('pBatchSize', '');
        Atlas.common.utility.Utilities.exportToExcel(store);
    },
    btnReset_Click:function()
    {
        var view = this.getView();
        var vm =this.getViewModel();
        view.down('#fromDate').setValue('');
        view.down('#ExportToExcel').setDisabled(true);
        view.down('#toDate').setValue('');
        view.down('#cbxMemberSearchAdvance').setValue('');
        view.down('#cbxStatusAdv').setValue('');
        view.down('#cbxCaseManagerAdv').setValue('');
        view.down('#cbxCaseDescAdv').setValue('');
        var gridPagingToolbar = this.getView().down('#gridPagingToolbar');
        var StoreMTMCasesDetailsSearch = vm.get('StoreMTMCasesDetailsSearch');
        var PagingToolbarStore = vm.getStore('PagingToolbarStore');
        StoreMTMCasesDetailsSearch.removeAll();
        PagingToolbarStore.removeAll();
        gridPagingToolbar.onLoad();
    },
    onLeaveDate:function(myDatefield){
        Atlas.common.view.AutoFormatDate.autoFormatDate(myDatefield);
    },
    validateDateRange: function (datefield , isValid) {
        var view = this.getView(),
            winDtFrom = view.down('#fromDate'),
            winDtTo = view.down('#toDate'),
            winDtFromValue = winDtFrom.getValue(),
            winDtToValue = winDtTo.getValue();

        if (datefield.itemId == 'fromDate') {
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
    btnAllCasesClick:function()
    {
        var view=this.getView();
        if(view.down('#cbxMemberSearch').getValue() != null&&view.down('#cbxMemberSearch').getValue() != '')
        {
            var me = this,
                vm = me.getViewModel(),
                menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar');

            me.fireEvent('openView', 'merlin', 'member', 'MemberToolbar', {
                atlasId:parseInt(vm.get('MemberRecipientID'))+1,
                menuId: menuId,
                recordCase:vm.get('record'),
                subTabs:['member-mtm'],
                subTabsOpen:true

            }, null);
            //window.parent.parent.showMemberInfo(#{hidMemMenuID}.getValue(),#{cbxMemberSearch}.getValue());
        }

    },
    getSelectedPageData: function (pagingtoolbar, page, eOpts) {
        var vm = this.getViewModel(),
            prevPage = pagingtoolbar.store.currentPage,
            direction = '',
            bckRecPointer = vm.get('BckRecPointer'),
            fwdRecPointer = vm.get('FwdRecPointer'),
            jumpStart = 0,
            pageDiff = page - prevPage,
            isJump = false;

        if (pageDiff != 1 || pageDiff != -1){
            isJump = true;
        }

        if (isJump) {
            direction = 'Fwd';
            jumpStart = (page - 1) * 25;
            bckRecPointer = '';
            fwdRecPointer = '';
        }
        else if (prevPage > page) {
            direction = 'Bck';
        }
        else {
            direction = 'Fwd';
        }

        this.onLoadData(jumpStart, direction, bckRecPointer, fwdRecPointer);

        return true;
    },
    onLoadData: function (jumpStart, direction, bckRecPointer, fwdRecPointer) {

        var vm = this.getViewModel(),
            gridPagingToolbar = this.getView().down('#gridPagingToolbar'),
            LoadPagination = vm.get('LoadPagination');
        var view = this.getView();
        var validate = false;
        if (view.down('#formAdvance').isValid()) {
            if (view.down('#fromDate').getValue() != null && view.down('#fromDate').getValue() != '') {
                validate = true;
            }
            if (view.down('#toDate').getValue() != null && view.down('#toDate').getValue() != '') {
                validate = true;
            }
            if (view.down('#cbxMemberSearchAdvance').getValue() != null && view.down('#cbxMemberSearchAdvance').getValue() != '') {
                validate = true;
            }
            if (view.down('#cbxCaseManagerAdv').getValue() != null && view.down('#cbxCaseManagerAdv').getValue() != '') {
                validate = true;
            }
            if (view.down('#cbxStatusAdv').getValue() != null && view.down('#cbxStatusAdv').getValue() != '') {
                validate = true;
            }
            if (view.down('#cbxCaseDescAdv').getValue() != null && view.down('#cbxCaseDescAdv').getValue() != '') {
                validate = true;
            }
            if (!validate) {
                Ext.Msg.alert('PBM', 'At least one search criteria is required.');
            }
            else {
                var StoreMTMCasesDetailsSearch = vm.getStore('StoreMTMCasesDetailsSearch');
                var searchFilter = "";
                if (view.down('#cbxMemberSearchAdvance').getValue() != null && view.down('#cbxMemberSearchAdvance').getValue() != '') {
                    searchFilter = searchFilter + 'recipientID = ' + view.down('#cbxMemberSearchAdvance').getValue();
                }
                if (view.down('#cbxStatusAdv').getValue() != null && view.down('#cbxStatusAdv').getValue() != '') {
                    if (searchFilter == "") {
                        searchFilter = "MTMStatus =  '"+ view.down('#cbxStatusAdv').getValue()+"'";
                    }
                    else {
                        searchFilter = searchFilter + " AND MTMStatus = '" + view.down('#cbxStatusAdv').getValue()+"'";
                    }

                }
                if (view.down('#cbxCaseDescAdv').getValue() != null && view.down('#cbxCaseDescAdv').getValue() != '') {
                    if (searchFilter == "") {
                        searchFilter = "description = '" + view.down('#cbxCaseDescAdv').getValue()+"'";
                    }
                    else {
                        searchFilter = searchFilter + " AND description = '" + view.down('#cbxCaseDescAdv').getValue()+"'";
                    }
                }
                if (view.down('#cbxCaseManagerAdv').getValue() != null && view.down('#cbxCaseManagerAdv').getValue() != '') {
                    if (searchFilter == "") {
                        searchFilter = "caseManager = '" + view.down('#cbxCaseManagerAdv').getValue()+"'";
                    }
                    else {
                        searchFilter = searchFilter + " AND caseManager = '" + view.down('#cbxCaseManagerAdv').getValue()+"'";
                    }
                }
                if (view.down('#fromDate').getValue() != null && view.down('#fromDate').getValue() != '') {
                    if (searchFilter == "") {
                        searchFilter = 'effDate >= ' + Ext.Date.format(view.down('#fromDate').getValue(), 'm/d/Y');
                    }
                    else {
                        searchFilter = searchFilter + ' AND effDate >= ' + Ext.Date.format(view.down('#fromDate').getValue(), 'm/d/Y');
                    }
                }
                if (view.down('#toDate').getValue() != null && view.down('#toDate').getValue() != '') {
                    if (searchFilter == "") {
                        searchFilter = 'effDate <= ' + Ext.Date.format(view.down('#toDate').getValue(), 'm/d/Y');
                    }
                    else {
                        searchFilter = searchFilter + ' AND effDate <= ' + Ext.Date.format(view.down('#toDate').getValue(), 'm/d/Y');
                    }
                }
                vm.set('BckRecPointer', '');
                vm.set('FwdRecPointer', '');
                vm.set('JumpStart', jumpStart);
                vm.set('Direction', direction);
                var PagingToolbarStore = vm.getStore('PagingToolbarStore');
                StoreMTMCasesDetailsSearch.getProxy().setExtraParam('pWhere', searchFilter);
                StoreMTMCasesDetailsSearch.getProxy().setExtraParam('pBatchSize', '25');
                StoreMTMCasesDetailsSearch.getProxy().setExtraParam('ipiJumpStart', jumpStart);
                StoreMTMCasesDetailsSearch.getProxy().setExtraParam('ipcDirection', direction);
                StoreMTMCasesDetailsSearch.getProxy().setExtraParam('ipcBckRecPointer', bckRecPointer);
                StoreMTMCasesDetailsSearch.getProxy().setExtraParam('ipcFwdRecPointer', fwdRecPointer);
                StoreMTMCasesDetailsSearch.load({
                    callback: function (records, opts, success) {
                        if (success) {

                            if (LoadPagination == 'true') {

                                PagingToolbarStore.removeAll(true);

                                for (var iCnt = 1; iCnt <= opts._resultSet.metadata.opiRecordCount; iCnt++) {
                                    PagingToolbarStore.add({PageNumber: iCnt});
                                }
                                PagingToolbarStore.totalCount = opts._resultSet.metadata.opiRecordCount;
                                gridPagingToolbar.bindStore(PagingToolbarStore);
                                gridPagingToolbar.doRefresh();
                                vm.set('LoadPagination', 'false');
                                vm.set('BckRecPointer', '');
                                vm.set('FwdRecPointer', '');
                            }
                            if (records.length != 0) {
                                view.down('#ExportToExcel').setDisabled(false);
                                if (direction == 'Fwd') {
                                    vm.set('BckRecPointer', records[0].data.RecPointer);
                                    vm.set('FwdRecPointer', records[records.length - 1].data.RecPointer);
                                }
                                else {
                                    vm.set('BckRecPointer', records[records.length - 1].data.RecPointer);
                                    vm.set('FwdRecPointer', records[0].data.RecPointer);
                                }
                            }
                            else {
                                view.down('#ExportToExcel').setDisabled(true);
                            }
                        }
                    }
                });
            }
        }
        else {
            Ext.Msg.alert('PBM', 'Please enter Valid values');
        }
    },
    btnAddSearch_Click: function () {
        var vm = this.getViewModel();
        vm.set('LoadPagination', 'true');
        this.onLoadData('0', 'Fwd', '', '');
    },
    onMenuClick: function (menu, item) {
        var me = this,
            view = me.getView(),
            cards = view.getLayout().getLayoutItems(),
            created = false,
            len = cards.length,
            i = 0;

        //Check if the tab exists
        for (; i < len; i++) {
            if (cards[i].route === item.route) {
                created = true;
                view.setActiveTab(cards[i]);
            }
        }

        if (!created) {
            var setlayout =  {
                type: 'vbox',align: 'stretch'
            };

            var  setview ={
                xclass: Atlas.common.Util.classFromRoute(item.route),
                height : '100%',
                route: item.route,
                title: item.text
            };

            if( item.route.toLowerCase().indexOf("contactlog")<0)
                setview.layout = setlayout;

            view.add(setview);
            view.setActiveTab(len);


            if (item.text == "Contact Log") {
                this.fireEvent('contactloggridrefresh');
            }

        }
    }
})