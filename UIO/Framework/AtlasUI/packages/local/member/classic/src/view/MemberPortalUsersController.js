/**
 * Created by T4317 on 7/27/2016.
 */
Ext.define('Atlas.member.view.MemberPortalUsersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memberportalusers',

    onBeforeStoreLoad: function (store, operation, options) {
    },
    onStoreLoad: function (store, records, successful, operation, eOpts) {
        var response = Ext.decode(operation.getResponse().responseText);
        //this.getViewModel().getStore('auditDetail').loadRawData(records);
    },
    onMemberSelection: function (combo, record) {
        //debugger;
        combo.setRawValue(record.data.MemberInfo);

        var me = this,
            curViewModel = this.getViewModel();
        curViewModel.set('recipientID', record.data.recipientID);
        this.formatSSN(curViewModel, '');
        this.formatPWChgDate(curViewModel, '');
        this.formatLastLoginDate(curViewModel, '');

        this.toggleFormForEdit(false);
        //this.toggleMember(false);
        this.toggleMember(true);
        this.hideMemberRegistered(true, null);

        //curViewModel.set('fmtSearchDisplay', record.data.recipientID + " " + record.data.firstName + " " + record.data.middleName+ " " + record.data.lastName);

        if ((record.data.recipientID > 0)) {

            var memberUserMasterModel = Ext.create('Atlas.member.model.MemberUserMaster', {});
            memberUserMasterModel.getProxy().setExtraParam('ipiRecipientId', record.data.recipientID);

            memberUserMasterModel.load(
                {
                    scope: me,
                    failure: function (record2, operation) {

                        //curViewModel.set('listRec', record);
                        curViewModel.set('listRec', null);
                        curViewModel.set('mbrUserMasterRec', null);
                        curViewModel.set('fmtLast4SSN', null);
                        curViewModel.set('fmtPWChgDate', null);
                        curViewModel.set('fmtLastLoginDate', null);

                        var fmtMsg = "User Not Registered.";
                        // Disable Edit and Save
                        this.disableButtonsByType(curViewModel.data.cDisableAll);
                        me.showPopUp(fmtMsg);

                    },
                    success: function (record2, operation) {


                        if (record2.data.recipientID.length > 0) {
                            var fmtMsg = "User Not Registered.";
                            // Disable Edit and Save
                            this.disableButtonsByType(curViewModel.data.cDisableAll);
                            this.showPopUp(fmtMsg);
                        }
                        else {

                            curViewModel.set('listRec', record);
                            curViewModel.set('mbrUserMasterRec', record2);
                            this.formatSSN(curViewModel, curViewModel.data.listRec.data.ssn);
                            this.formatPWChgDate(curViewModel, curViewModel.data.mbrUserMasterRec.data.passwordChangeDate);
                            this.formatLastLoginDate(curViewModel, curViewModel.data.mbrUserMasterRec.data.Lastlogin);
                            this.toggleMember(true);
                            //CreateDateTime
                            this.hideMemberRegistered(false, curViewModel.data.mbrUserMasterRec.data.CreateDateTime);
                        }

                    },
                    callback: function (record, operation, success) {

                    }
                });

        }
        else {
            alert("Member Does Not Have valid Recipient Id...");
            curViewModel.set('listRec', null);
            curViewModel.set('mbrUserMasterRec', null);
            // Disable Edit and Save
            this.disableButtonsByType(curViewModel.data.cDisableAll);
        }
    },
    onSave: function (button) {

        var me = this;

        var curView, curViewModel, manualForm, fldEmailContainer, fldEmail, cbxActive;
        curView = this.getView();
        curViewModel = this.getViewModel();
        manualForm = curView.query('#mpuForm')[0];
        fldEmail = manualForm.getForm().findField('email');
        fldEmailContainer = curView.query('#fcemail')[0];

        cbxActive = manualForm.getForm().findField('active');

        console.log("cbxActive : " + (cbxActive.value.toString()));

        var fldUtil = Ext.create('Atlas.common.view.AtlasEditsUtil');

        if (fldUtil.validEmail(fldEmail.value.toString())) {
            var wFields = "Email,Active";
            var wFieldData = fldEmail.value.toString() + "|" + cbxActive.value.toString();


            var updateModel = curViewModel.get('mbrUserMasterRec');

            updateModel.getProxy().setExtraParam('pRecipientId', curViewModel.data.listRec.data.recipientID);
            updateModel.getProxy().setExtraParam('pFields', wFields);
            updateModel.getProxy().setExtraParam('pValues', wFieldData);

            updateModel.save(
                {
                    scope: me,
                    failure: function (record, operation) {
                        alert("#2 Failed Update in MemberUserMasterUpdate.");
                    },
                    success: function (record, operation) {

                        //console.log("-----------------------");
                        //console.log("success: pResult" + record.data.pResult);
                        //console.log("-----------------------");

                    },
                    callback: function (record, operation, success) {
                        //do something whether the load succeeded or failed
                    }
                });

            this.clearActiveErrors(curView);
            this.clearErrors(curView);
            this.toggleFormForEdit(false);
        }
        else {

            this.setFieldContainerError(fldEmailContainer, "Invalid Email Found");
            fldEmail.selectText();
            this.toggleFormForEdit(true);
        }

    },
    clearErrors: function (curView) {
        var manualForm = curView.query('#mpuForm')[0];
        var fieldContainers = manualForm.query('fieldcontainer');
        fieldContainers.forEach(function (container) {
            var errUI = container.down('#errorBox');
            if (errUI) {
                errUI.setText("", false);
                errUI.setVisible(false);
            }
        });
    },
    setFieldContainerError: function (container, msg) {
        var errUI = container.down('#errorBox');
        errUI.setText(msg, false);
        errUI.show();

    },
    onEditUser: function (button) {

        this.toggleFormForEdit(true);

    },
    toggleFormForEdit: function (enableControls) {

        var curView, curViewModel, manualForm, fldEmail, cbxActive, imgEmail, imgActive;
        curView = this.getView();
        curViewModel = this.getViewModel();
        manualForm = curView.query('#mpuForm')[0];
        fldEmail = manualForm.getForm().findField('email');

        var toggleImageLock = enableControls ? "resources/images/unlocked.png" : "resources/images/locked.png";
        var fldEmailContainer = curView.query('#fcemail')[0];

        imgEmail = fldEmailContainer.down('#hldemail').down('#imgemail');
        imgEmail.el.dom.src = toggleImageLock;

        cbxActive = manualForm.getForm().findField('active');
        var fldActiveContainer = curView.query('#fcactive')[0];
        imgActive = fldActiveContainer.down('#hldactive').down('#imgactive');
        imgActive.el.dom.src = toggleImageLock;

        if (enableControls) {
            fldEmail.setDisabled(false);
            fldEmail.selectText();
            cbxActive.setDisabled(false);
            this.disableButtonsByType(curViewModel.data.cDisableEdit);
        }
        else {
            fldEmail.setDisabled(true);
            cbxActive.setDisabled(true);
            this.disableButtonsByType(curViewModel.data.cDisableSave);
        }

    },
    disableButtonsByType: function (wType) {

        var curView, curViewModel, btnEditUser, btnSave, btnCancel, btnSetResetPw;
        curViewModel = this.getViewModel()
        curView = this.getView();
        btnSave = curView.query('#btnSave')[0];
        btnEditUser = curView.query('#btnEditUser')[0];
        btnCancel = curView.query('#btnCancel')[0];
        btnSetResetPw = curView.query('#btnSetResetPw')[0];

        if (wType == curViewModel.data.cDisableAll) {
            btnSave.setDisabled(true);
            btnEditUser.setDisabled(true);
            btnCancel.setDisabled(true);
            btnSetResetPw.setDisabled(true)

        }
        else {
            if (wType == curViewModel.data.cDisableSave) {
                btnEditUser.setDisabled(false);
                btnSave.setDisabled(true);
                btnCancel.setDisabled(true);
                btnSetResetPw.setDisabled(false)
            }
            else {
                if (wType == curViewModel.data.cDisableEdit) {
                    btnEditUser.setDisabled(true);
                    btnSave.setDisabled(false);
                    btnCancel.setDisabled(false);
                    btnSetResetPw.setDisabled(true)
                }
            }
        }

    },
    onSetResetPw: function (wType) {
        var proxy;

        var me = this;
        console.log("--onSetResetPw--");
        var curViewModel = this.getViewModel();

        // 2017.01.30 - This WebService Needs Fixed.  The previous one is not working anymore.
        ///atlas/authentication/rx/resetmemberpassword/update	/atlasrxmember/rest/atlasrxmember/resetMemberPassword
        //{{url}}authentication/rx/resetmemberpassword/update Not working

        //var memberResetPassword = Ext.create('Atlas.member.model.MemberResetPassword', {});
        Ext.Msg.confirm('Reset Password', 'Are you sure you would like to set password  for user <b>' + me.lookup('memberSearch').getRawValue() + ' </b> ? User will be notified via email.', function (btn) {
            if (btn == 'yes') {
                var memberResetPassword = Ext.create('Atlas.common.model.resetMemberPassword', {});
                var lkpSSN = curViewModel.get('fmtLast4SSN'),
                    last4DigitSSN = '',
                    resetMessage = "Password is set for user: " + curViewModel.data.mbrUserMasterRec.data.userName + ".Password has been emailed to user.";
                if ((lkpSSN.length > 0 && lkpSSN.length == 11)) {
                    last4DigitSSN = lkpSSN.substr(7, 10);
                }

                memberResetPassword.phantom = false;

                proxy = memberResetPassword.getProxy();
                proxy.setExtraParam('pMemberID', curViewModel.data.listRec.data.memberID);
                proxy.setExtraParam('pCarrierID', curViewModel.data.listRec.data.tcarrierID);
                proxy.setExtraParam('pFourDigitSSN', last4DigitSSN);
                proxy.setExtraParam('pDOB', Ext.Date.format(curViewModel.data.listRec.data.dob, 'm/d/Y'));
                proxy.setExtraParam('pEmail', curViewModel.data.mbrUserMasterRec.data.email);
                proxy.setExtraParam('pUserName', curViewModel.data.mbrUserMasterRec.data.userName);
                //proxy.setExtraParam('pPassword', "''");
                proxy.setExtraParam('pDevice', curViewModel.data.mbrUserMasterRec.data.loginDevice);

                memberResetPassword.save({
                    scope: me,
                    failure: function (record, operation) {
                        //do something if the load failed
                    },
                    success: function (record, operation) {
                        //var fmtMsg = "Password Successfully Reset for '" + curViewModel.data.mbrUserMasterRec.data.userName + "'.";
                        Ext.Msg.alert('PBM', resetMessage);
                    },
                    callback: function (record, operation, success) {
                        //do something whether the load succeeded or failed
                    }
                });
            }
            else {

            }
        });


    },
    onCancel: function (wType) {

        var curView, curViewModel, manualForm, fldEmail, cbxActive;
        curView = this.getView();
        curViewModel = this.getViewModel();
        manualForm = curView.query('#mpuForm')[0];
        fldEmail = manualForm.getForm().findField('email');
        cbxActive = manualForm.getForm().findField('active');

        this.clearActiveErrors(curView);
        this.clearErrors(curView);

        //console.log("before: " + fldEmail.getValue().toString() + " " + cbxActive.getValue().toString());

        if (curViewModel.data.mbrUserMasterRec.dirty && curViewModel.data.mbrUserMasterRec.modified) {

            //console.log("listRec.modified before: " + curViewModel.data.mbrUserMasterRec.modified.email + " " + curViewModel.data.mbrUserMasterRec.modified.active);

            if (curViewModel.data.mbrUserMasterRec.modified.email) {
                fldEmail.setValue(curViewModel.data.mbrUserMasterRec.modified.email.toString());
            }
            else {
            }

            if (curViewModel.data.mbrUserMasterRec.modified.active) {
                cbxActive.setValue(curViewModel.data.mbrUserMasterRec.modified.active.toString());
            }
            else {
            }

        }
        this.toggleFormForEdit(false);

    },
    clearActiveErrors: function (curView) {
        var manualForm = curView.query('#mpuForm')[0];
        var fieldContainers = manualForm.query('fieldcontainer');
        fieldContainers.forEach(function (container) {
            container.unsetActiveError();
        });
    },
    getLast4SSN: function (curViewModel) {
        var lkpSSN = curViewModel.get('fmtLast4SSN');
        if ((lkpSSN.length > 0 && lkpSSN.length == 11)) {
            return lkpSSN.substr(7, 10);
        }
    },
    formatSSN: function (curViewModel, ssn) {
        if (ssn != null && ssn.length >= 9) {
            curViewModel.set('fmtLast4SSN', "XX-XXX-" + ssn.substr(5, 8));
        }
        else {
            curViewModel.set('fmtLast4SSN', "");
        }

    },
    formatLastLoginDate: function (curViewModel, llDate) {
        if (llDate != null && llDate.length >= 0) {
            //var fmtLastLogin = Ext.util.Format.date(llDate, 'm/d/Y H:m:s');
            var fmtLastLogin = Ext.util.Format.date(llDate, 'm/d/Y');
            curViewModel.set('fmtLastLoginDate', fmtLastLogin);
        }
        else {
            curViewModel.set('fmtLastLoginDate', "");
        }
    },
    formatPWChgDate: function (curViewModel, pwChg) {
        if (pwChg != null && pwChg.length >= 0) {
            var fmtPasswordChgDate = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(pwChg, 'm/d/Y');
            curViewModel.set('fmtPWChgDate', fmtPasswordChgDate);
        }
        else {
            curViewModel.set('fmtPWChgDate', "");
        }
    },
    showPopUp: function (popUpMsg) {
        Ext.Msg.alert('Member Portal Users', popUpMsg);
    },
    onMemberClick: function () {

        var me = this, vm = me.getViewModel();
        var menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar'), id = vm.get('recipientID');
        //Make sure you specify atlasId, as it serves as unique identifier to opened tab.
        this.fireEvent('openView', 'merlin', 'member', 'MemberToolbar', {
            atlasId: id,
            RID: id,
            menuId: menuId
        });
        /*
         var me = this,
         view=me.getView(),
         vm = this.getViewModel(),
         menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar');
         var curViewModel = this.getViewModel();
         var curListRec = curViewModel.data.listRec;
         me.fireEvent('openView', 'merlin', 'member', 'MemberToolbar', {
         menuId: menuId,
         atlasId: curViewModel.get('recipientID'),
         RID: curViewModel.get('recipientID'),
         keyValue: '0',
         openView: true,
         recordCase: null,
         subTabs: ['member-demographics']
         });*/
    },

    onMemberPortalClick: function () {
        var myURL = 'https://rxmember.atlascomplete.com/';
        var win = window.open(myURL, '_blank');
        win.focus();
    },
    hideMemberRegistered: function (hideField, createDateTime) {
        //debugger;
        var curView, curViewModel, btnEditUser, btnSave, btnCancel, btnSetResetPw;
        curView = this.getView();
        var fcMemberRegistered = curView.query('#mbrRegisterFC')[0];
        fcMemberRegistered.setHidden(hideField);
        if (hideField) {
        }
        else {
            var fmtCreateDateTime = Ext.util.Format.date(createDateTime, 'm/d/Y H:m:s');
            var fcMemberRegisteredDate = curView.query('#mbrRegisterField')[0];
            fcMemberRegisteredDate.setValue(fmtCreateDateTime);
        }
    },
    toggleMember: function (enableButton) {

        var curView, curViewModel, btnEditUser, btnMember;
        curView = this.getView();
        btnMember = curView.query('#btnMember')[0];
        if (enableButton) {
            btnMember.setDisabled(false);
        }
        else {
            btnMember.setDisabled(true);
        }
    },
    init: function () {
        // Any init logic should go here.
        //debugger;
        var curViewModel = this.getViewModel();
        this.disableButtonsByType(curViewModel.data.cDisableAll);
    }

});