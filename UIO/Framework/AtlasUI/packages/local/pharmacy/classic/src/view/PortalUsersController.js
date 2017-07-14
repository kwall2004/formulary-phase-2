+Ext.define('Atlas.pharmacy.view.PortalUsersController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacy-portalusers',


    init: function () {
        // Any init logic should go here.
        var vm = this.getViewModel();
        //debugger;
        this.assignSearchType();
    },
    assignSearchType: function () {

        //debugger;

        var vm = this.getViewModel(),
            searchTypeBtn = this.lookup('btnSearchType'),
            pharmacybutton = this.lookup('btnPharmacy');

        if (searchTypeBtn.value == undefined) {

            vm.set('searchBy', "Pharmacy");
            vm.set('searchEmptyText', "Pharmacy");
            pharmacybutton.setVisible(true);
        }
        else if (searchTypeBtn.value == 'RelationshipId') {
            vm.set('searchBy', searchTypeBtn.value);
            vm.set('searchEmptyText', searchTypeBtn.value);
            pharmacybutton.setVisible(false);
        }
        else if (searchTypeBtn.value == 'Pharmacy') {
            vm.set('searchBy', searchTypeBtn.value);
            vm.set('searchEmptyText', searchTypeBtn.value);
            pharmacybutton.setVisible(true);
        }

        this.formatHiddenFields();
        this.clearFields();
        this.togglePharmacy(false);
        this.disableButtonsByType(vm.data.cDisableAll);

        //console.log("assignSearchType - searchBy: " + vm.data.searchBy);

    },
    onSearchTypeToggle: function (seg, button) {
        this.assignSearchType();
    },
    onBeforeStoreLoad: function (store, operation, options) {
        console.log("-----------------------");
    },
    onStoreLoad: function (store, records, successful, operation, eOpts) {
        var response = Ext.decode(operation.getResponse().responseText);
        //this.getViewModel().getStore('auditDetail').loadRawData(records);
    },
    onCbxSelect: function (combo, record) {
        var me = this,
            vw = this.getView(),
            vm = this.getViewModel(),
            wNcpdpId = "",
            wRelationshipId = ""

        this.clearErrors(vw);
        this.toggleFormForEdit(false);
        this.togglePharmacy(false);
        this.clearForms();

        if (vm.data.searchBy == "Pharmacy") {

            wNcpdpId = record.data.ncpdpId;

            if ((wNcpdpId > 0)) {

                this.lookupPharmacyUser(record, wNcpdpId, "");
            }
            else {
                alert("#1 Lookup Does Not Have valid NcpdpId...");
                vm.set('listRec', null);
                vm.set('pharmacyUserMasterRec', null);
                // Disable Edit and Save
                this.disableButtonsByType(vm.data.cDisableAll);
            }

        }
        else {

            //debugger;

            wRelationshipId = record.data.relationshipID;

            if (wRelationshipId > 0) {
                this.lookupPharmacyUser(record, "", wRelationshipId);
            }
            else {
                alert("#2 LookUp Does Not Have valid Relationship Id...");
                vm.set('listRec', null);
                vm.set('pharmacyUserMasterRec', null);
                // Disable Edit and Save
                this.disableButtonsByType(vm.data.cDisableAll);
            }
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
    formatPassDate: function (curViewModel, llDate) {
        if (llDate != null && llDate.length >= 0) {
            var fmtPassChageDate = Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(llDate, 'm/d/Y');
            //  var fmtLastLogin = Ext.util.Format.date(llDate, 'm/d/Y');
            curViewModel.set('fmtPassChageDate', fmtPassChageDate);
        }
        else {
            curViewModel.set('fmtPassChageDate', "");
        }
    },
    lookupPharmacyUser: function (inListRecord, wNcpdpId, wRelationshipId) {

        //debugger;

        var me = this,
            vm = me.getViewModel();

        var pharmacyUserMasterModel = Ext.create('Atlas.common.model.PharmacyUser', {});
        pharmacyUserMasterModel.getProxy().setExtraParam('pNcpdpID', wNcpdpId);
        pharmacyUserMasterModel.getProxy().setExtraParam('pRelationshipId', wRelationshipId);

        pharmacyUserMasterModel.load(
            {
                scope: me,
                failure: function (record, operation) {
                    var objResp = Ext.decode(operation.getResponse().responseText);

                    vm.set('listRec', inListRecord);
                    vm.set('pharmacyUserMasterRec', null);

                    var fmtMsg = objResp.message[0].message;
                    me.showPopUp(fmtMsg);
                    this.disableButtonsByType(vm.data.cDisableAll);
                    if (vm.data.searchBy == "Pharmacy") {
                        this.togglePharmacy(true);
                    }

                },
                success: function (record, operation) {

                    vm.set('listRec', inListRecord);
                    vm.set('pharmacyUserMasterRec', record);
                    this.formatPassDate(vm, record.data.PasswordChangeDate);
                    this.formatLastLoginDate(vm, record.data.Lastlogin);
                    if (vm.data.searchBy == "Pharmacy") {
                        vm.set('searchText', wNcpdpId + " - " + vm.data.listRec.data.Name);
                        var cbxPharmSearch = this.lookup('cbxPharmSearch');
                        var cbxRelationshipSearch = this.lookup('cbxRelationshipSearch');
                        cbxRelationshipSearch.setValue("");
                        this.togglePharmacy(true);
                    }
                    else {
                        vm.set('searchText', wRelationshipId + " " + vm.data.listRec.data.name);
                        var cbxPharmSearch = this.lookup('cbxPharmSearch');
                        cbxPharmSearch.setValue("");
                        var cbxRelationshipSearch = this.lookup('cbxRelationshipSearch');
                        this.togglePharmacy(false);
                    }

                },
                callback: function (record, operation, success) {
                }
            });


    },
    onSave: function (button) {

        console.log("--onSave--");
        var me = this;


        var vw, vm, manualForm, fldUserName, fldNcpdpId, fldRelationshipId, fldContactName, fldPhone, fldEmail,
            cbxActive, cbxAccountLocked, fldEmailContainer, fldPhoneContainer;
        vw = this.getView();
        vm = this.getViewModel();
        manualForm = vw.query('#pucForm')[0];


        fldUserName = manualForm.getForm().findField('userName');
        fldNcpdpId = manualForm.getForm().findField('ncpdpId');
        fldRelationshipId = manualForm.getForm().findField('relationshipId');


        fldContactName = manualForm.getForm().findField('contactName');
        fldPhone = manualForm.getForm().findField('phone');
        fldEmail = manualForm.getForm().findField('email');

        cbxActive = manualForm.getForm().findField('active');
        cbxAccountLocked = manualForm.getForm().findField('accountLocked');

        fldPhoneContainer = vw.query('#fcphone')[0];
        if (!(fldPhone.isValid())) {
            this.setFieldContainerError(fldPhoneContainer, "Invalid Phone Number Found");
            fldPhone.selectText();
            this.toggleFormForEdit(true);
            return;
        }

        fldEmail = manualForm.getForm().findField('email');
        fldEmailContainer = vw.query('#fcemail')[0];


        var fldUtil = Ext.create('Atlas.common.view.AtlasEditsUtil');

        if (fldUtil.validEmail(fldEmail.value.toString())) {
        }
        else {

            this.setFieldContainerError(fldEmailContainer, "Invalid Email Found");
            fldEmail.selectText();
            this.toggleFormForEdit(true);
            return;
        }


        //var updateModel = vm.get('pharmacyUserMasterRec');

        var updateModel = Ext.create('Atlas.common.model.PharmacyUser', {});
        updateModel.phantom = false;


        // -----------------------
        // #1 Initialize Vars for Load
        // -----------------------
        var ackAction = "Ack";
        var myUser = Atlas.user;

        // Set up Objects
        var ttPharmacyUserMaster = new Object();
        ttPharmacyUserMaster.UserName = fldUserName.value.toString();
        ttPharmacyUserMaster.Mode = "Save";
        ttPharmacyUserMaster.NcpdpID = fldNcpdpId.value.toString();
        ttPharmacyUserMaster.RelationshipId = fldRelationshipId.value.toString();
        ttPharmacyUserMaster.ContactName = fldContactName.value.toString();
        ttPharmacyUserMaster.Phone = fldPhone.value.toString();
        ttPharmacyUserMaster.Email = fldEmail.value.toString();
        ttPharmacyUserMaster.Active = cbxActive.value.toString();
        ttPharmacyUserMaster.AccountLocked = cbxAccountLocked.value.toString();

        // -----------------------------------------
        // #2 Convert Array to JSON without Leading "
        // -----------------------------------------

        // -----------------------------------------
        // #2 Convert Array to JSON without Leading "
        // -----------------------------------------
        var ttPharmacyUserMasterArray = [];
        ttPharmacyUserMasterArray.push(ttPharmacyUserMaster);


        const mySingleJSONArrayWithNoQuotes = ttPharmacyUserMasterArray;

        updateModel.getProxy().setExtraParam('ttPharmacyUserMaster', {"ttPharmacyUserMaster": mySingleJSONArrayWithNoQuotes});

        updateModel.save(
            {
                scope: me,
                failure: function (record, operation) {
                    var failureResp = Ext.decode(operation.getResponse().responseText);
                    me.showPopUp(failureResp.message[0].message);
                },
                success: function (record, operation) {
                    var objResp = Ext.decode(operation.getResponse().responseText);
                    if (objResp.message[0].code == 0) {
                        me.showPopUp('Pharmacy Details Updated');
                    }
                    else {
                        me.showPopUp(objResp.message[0].message);
                    }
                },
                callback: function (record, operation, success) {
                    //do something whether the load succeeded or failed
                }
            });

        this.clearActiveErrors(vw);
        this.clearErrors(vw);
        this.toggleFormForEdit(false);


    },
    clearFields: function () {
        var me = this.getView();
        var manualForm = me.query('#pucForm')[0];
        var fieldContainers = manualForm.query('fieldcontainer');

        //debugger;

        fieldContainers.forEach(function (container) {

            //debugger;

            var curContainer = container.$className;
            var textUI = container.down('textfield');
            //debugger
            if (textUI) {
                textUI.setValue("");
            }
            var cbxUI = container.down('checkbox');

            if (cbxUI) {
                cbxUI.setValue(false);
            }
        });
    },
    clearActiveErrors: function (vw) {
        var manualForm = vw.query('#pucForm')[0];
        var fieldContainers = manualForm.query('fieldcontainer');
        fieldContainers.forEach(function (container) {
            container.unsetActiveError();
        });
    },
    clearErrors: function (vw) {
        var manualForm = vw.query('#pucForm')[0];
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

        var vw, vm, manualForm, fldContactName, fldPhone, fldEmail, cbxActive, cbxAccountLocked, imgContactName, imgPhone, imgEmail, imgActive, imgAccountLocked;
        vw = this.getView();
        vm = this.getViewModel();
        manualForm = vw.query('#pucForm')[0];


        fldContactName = manualForm.getForm().findField('contactName');
        fldPhone = manualForm.getForm().findField('phone');
        fldEmail = manualForm.getForm().findField('email');

        var toggleImageLock = enableControls ? "resources/images/unlocked.png" : "resources/images/locked.png";

        var fldContactNameContainer = vw.query('#fccontactName')[0];
        imgContactName = fldContactNameContainer.down('#hldcontactName').down('#imgcontactName');
        imgContactName.el.dom.src = toggleImageLock;

        var fldPhoneContainer = vw.query('#fcphone')[0];
        imgPhone = fldPhoneContainer.down('#hldphone').down('#imgphone');
        imgPhone.el.dom.src = toggleImageLock;

        var fldEmailContainer = vw.query('#fcemail')[0];
        imgEmail = fldEmailContainer.down('#hldemail').down('#imgemail');
        imgEmail.el.dom.src = toggleImageLock;

        cbxActive = manualForm.getForm().findField('active');
        var fldActiveContainer = vw.query('#fcactive')[0];
        imgActive = fldActiveContainer.down('#hldactive').down('#imgactive');
        imgActive.el.dom.src = toggleImageLock;

        cbxAccountLocked = manualForm.getForm().findField('accountLocked');
        var fldAccountLockedContainer = vw.query('#fcaccountLocked')[0];
        imgAccountLocked = fldAccountLockedContainer.down('#hldaccountLocked').down('#imgaccountLocked');
        imgAccountLocked.el.dom.src = toggleImageLock;

        if (enableControls) {
            fldContactName.setDisabled(false);
            fldContactName.selectText();

            fldPhone.setDisabled(false);
            fldPhone.selectText();

            fldEmail.setDisabled(false);
            fldEmail.selectText();

            cbxActive.setDisabled(false);
            cbxAccountLocked.setDisabled(false);

            this.disableButtonsByType(vm.data.cDisableEdit);
        }
        else {
            fldContactName.setDisabled(true);
            fldPhone.setDisabled(true);
            fldEmail.setDisabled(true);
            cbxActive.setDisabled(true);
            cbxAccountLocked.setDisabled(true);

            this.disableButtonsByType(vm.data.cDisableSave);
        }

    },
    disableButtonsByType: function (wType) {

        var vw, vm, btnEditUser, btnSave, btnCancel, btnSetResetPw;
        vm = this.getViewModel()
        vw = this.getView();
        btnSave = vw.query('#btnSave')[0];
        btnEditUser = vw.query('#btnEditUser')[0];
        btnCancel = vw.query('#btnCancel')[0];
        btnSetResetPw = vw.query('#btnSetResetPw')[0];

        if (wType == vm.data.cDisableAll) {
            btnSave.setDisabled(true);
            btnEditUser.setDisabled(true);
            btnCancel.setDisabled(true);
            btnSetResetPw.setDisabled(true)

        }
        else {
            if (wType == vm.data.cDisableSave) {
                btnEditUser.setDisabled(false);
                btnSave.setDisabled(true);
                btnCancel.setDisabled(true);
                btnSetResetPw.setDisabled(false)
            }
            else {
                if (wType == vm.data.cDisableEdit) {
                    btnEditUser.setDisabled(true);
                    btnSave.setDisabled(false);
                    btnCancel.setDisabled(false);
                    btnSetResetPw.setDisabled(true)
                }
            }
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
    onSetResetPw: function (wType) {

        var me = this;
        var vw, vm, manualForm, fldUserName, fldNcpdpId, fldRelationshipId, fldContactName, fldPhone, fldEmail, cbxActive, cbxAccountLocked;
        vw = this.getView();
        vm = this.getViewModel();
        manualForm = vw.query('#pucForm')[0];

        Ext.MessageBox.show({
            title: 'Reset Password',
            msg: "Are you sure you would like to reset password, you will be notified via registered email?",
            buttons: Ext.MessageBox.OKCANCEL,
            callback: function (btn) {
                //user.portalPlanId = Ext.get('planListCombo').getValue();
                // stops the user from continuing before a plan is selected
                if (btn == 'cancel') {
                    console.log("-------------------------")
                    console.log("CANCEL DELETE")
                    console.log("-------------------------")
                    return;
                }
                else if (btn == 'ok') {


                    console.log("--onSave--");

                    fldUserName = manualForm.getForm().findField('userName');

                    var updateModel = Ext.create('Atlas.common.model.PharmacyUser', {});
                    updateModel.phantom = false;


                    // Set up Objects
                    var ttPharmacyUserMaster = new Object();
                    ttPharmacyUserMaster.UserName = fldUserName.value.toString();
                    ttPharmacyUserMaster.Mode = "Reset";

                    // -----------------------------------------
                    // #2 Convert Array to JSON without Leading "
                    // -----------------------------------------
                    var ttPharmacyUserMasterArray = [];
                    ttPharmacyUserMasterArray.push(ttPharmacyUserMaster);


                    const mySingleJSONArrayWithNoQuotes = ttPharmacyUserMasterArray;

                    updateModel.getProxy().setExtraParam('ttPharmacyUserMaster', {"ttPharmacyUserMaster": mySingleJSONArrayWithNoQuotes});

                    updateModel.save(
                        {
                            scope: me,
                            failure: function (record, operation) {
                                alert("#2 Failed Update in MemberUserMasterUpdate.");
                            },
                            success: function (record, operation) {

                                var objResp = Ext.decode(operation.getResponse().responseText);

                                if (objResp.message[0].code == 0) {
                                    Ext.Msg.alert('Password Reset', objResp.message[0].message);
                                }
                                else {
                                    Ext.Msg.alert('Password Reset Failure', objResp.message[0].message);
                                }


                            },
                            callback: function (record, operation, success) {
                                //do something whether the load succeeded or failed
                            }
                        });


                }
            }
        });

        this.clearActiveErrors(vw);
        this.clearErrors(vw);
        this.toggleFormForEdit(false);


    },
    onCancel: function (wType) {

        var vw, vm, manualForm, fldContactName, fldPhone, fldEmail, cbxActive, cbxAccountLocked;
        vw = this.getView();
        vm = this.getViewModel();
        manualForm = vw.query('#pucForm')[0];

        fldContactName = manualForm.getForm().findField('contactName');
        fldPhone = manualForm.getForm().findField('phone');
        fldEmail = manualForm.getForm().findField('email');

        cbxActive = manualForm.getForm().findField('active');
        cbxAccountLocked = manualForm.getForm().findField('accountLocked');

        this.clearActiveErrors(vw);
        this.clearErrors(vw);

        console.log("before: " + fldEmail.getValue().toString() + " " + cbxActive.getValue().toString());

        if (vm.data.pharmacyUserMasterRec.dirty && vm.data.pharmacyUserMasterRec.modified) {

            if (vm.data.pharmacyUserMasterRec.modified.ContactName) {
                fldContactName.setValue(vm.data.pharmacyUserMasterRec.modified.ContactName.toString());
            }

            if (vm.data.pharmacyUserMasterRec.modified.Phone) {
                fldPhone.setValue(vm.data.pharmacyUserMasterRec.modified.Phone.toString());
            }

            if (vm.data.pharmacyUserMasterRec.modified.Email) {
                fldEmail.setValue(vm.data.pharmacyUserMasterRec.modified.Email.toString());
            }

            if (vm.data.pharmacyUserMasterRec.modified.Active) {
                cbxActive.setValue(vm.data.pharmacyUserMasterRec.modified.Active.toString());
            }

            if (vm.data.pharmacyUserMasterRec.modified.AccountLocked) {
                cbxAccountLocked.setValue(vm.data.pharmacyUserMasterRec.modified.AccountLocked.toString());
            }

        }
        this.toggleFormForEdit(false);

    },
    showPopUp: function (popUpMsg) {
        Ext.Msg.alert('Pharmacy Portal Users', popUpMsg);
    },
    onPharmacyClick: function () {
        //var authid = component.getWidgetRecord().data.AuthID;
        //var memberid = component.getWidgetRecord().data.MemberID;
        var vm = this.getViewModel();
        var curListRec = vm.data.listRec;
        this.fireEvent('openView', 'merlin', 'member', 'MemberToolbar', {
            isMemberPassedIn: true,
            atlasId: curListRec.get('tmemberID'),
            masterrecord: curListRec,
            menuId : Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar')
        })
    },
    togglePharmacy: function (enableButton) {
        var vw, vm, btnEditUser, btnSave, btnCancel, btnSetResetPw, btnPharmacy;
        vw = this.getView();
        btnPharmacy = this.lookup('btnPharmacy');
        if (enableButton) {
            btnPharmacy.setDisabled(false);
        }
        else {
            btnPharmacy.setDisabled(true);
        }
    },
    formatHiddenFields: function () {

        var vw, vm, manualForm, cbxPharmSearch, cbxRelationshipSearch, fldNcpdpIdContainer, fldRelationshipIdContainer, fldNcpdpId, fldRelationshipId;
        vw = this.getView();
        vm = this.getViewModel();
        manualForm = vw.query('#pucForm')[0];

        //sdebugger;

        fldNcpdpIdContainer = vw.query('#fcncpdpId')[0];
        fldRelationshipIdContainer = vw.query('#fcrelationshipId')[0];

        manualForm = vw.query('#pucForm')[0];
        fldNcpdpId = manualForm.getForm().findField('ncpdpId');
        fldRelationshipId = manualForm.getForm().findField('relationshipId');

        cbxPharmSearch = vw.lookup('cbxPharmSearch');
        cbxPharmSearch.setValue("");
        cbxRelationshipSearch = vw.lookup('cbxRelationshipSearch');
        cbxRelationshipSearch.setValue("");

        if (vm.data.searchBy == "Pharmacy") {
            fldNcpdpIdContainer.show();
            fldRelationshipIdContainer.hide();
            cbxPharmSearch.show();
            cbxRelationshipSearch.hide();
        }
        else {
            fldNcpdpIdContainer.hide();
            fldRelationshipIdContainer.show();
            cbxPharmSearch.hide();
            cbxRelationshipSearch.show();
        }

        //manualForm.re

    },
    onRouteToPharmacyClick: function (grid, rowIndex) {
        //debugger;
        var me = this,
            vm = this.getViewModel(),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/pharmacy/Pharmacy');

        // -------------------
        // NEW WAY OF DOING IT;
        // -------------------
        me.fireEvent('openView', 'merlin', 'pharmacy', 'Pharmacy', {
            atlasId: vm.data.listRec.data.ncpdpId,
            ncpdpId: vm.data.listRec.data.ncpdpId,
            menuId: menuId
        }, null);
    },
    clearForms: function () {
        var me = this.getView();
        var manualForm = me.query('#pucForm')[0];
        var txtflds = manualForm.query('textfield');
        txtflds.forEach(function (txt) {
            txt.setValue('');
        });
        var txtflds = manualForm.query('checkbox');
        txtflds.forEach(function (chk) {
            chk.setValue(false);
        });
    }
});
