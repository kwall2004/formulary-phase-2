/**
 * Created by j2487 on 10/5/2016.
 */
Ext.define('Atlas.member.view.MemberAddEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memberedit',
    Action: '',
    listen: {
        controller: {
            '*': {
                parentSaveNotes: 'btnSaveWin_Click',
                parentWinEnrollSaveSuccess: 'winSaveSuccess',
                parentSave: 'onSaveClick'
            }
        }
    },

    loadStore: function (recipientID) {
        var view = this.getView();
        var vm = this.getViewModel();
        var memberCoverageHistoryStore = vm.getStore('membercoveragehistorystore');
        memberCoverageHistoryStore.getProxy().setExtraParam('pKeyValue', recipientID);
        memberCoverageHistoryStore.load({
            scope: this,
            callback: function (record, operation, success) {
                var objRespCoverageHistory = Ext.decode(operation.getResponse().responseText);
                if (objRespCoverageHistory.data.length > 0) {
                    view.down('#hiddenRecipientId').setValue(objRespCoverageHistory.data[0].tRecipientID);
                    view.down('#hiddenMemberId').setValue(objRespCoverageHistory.data[0].tmemberId);
                    view.down('#hiddenLOBId').setValue(objRespCoverageHistory.data[0].CarrierLOBid);
                    view.down('#hidMemberDetailsSystemId').setValue(objRespCoverageHistory.data[0].MemDetailsSysId);
                }
            }


        });
    },

    onProgramGroupCodeSelection: function (combo, rcd) {
        var view = this.getView();
        view.down('#hidProgGroupCode').setValue(rcd.data.progGroupCode);
        view.down('#hidProgBenefitCode').setValue(rcd.data.progBenefitCode);
    },


    checkPrimaryRecipient_Change: function (item, rcd) {
        if (rcd == true) {
            var view = this.getView();

            if (view.down('#bdate').getValue() != null) {
                if (view.down('#ChkPrimaryRecipient').getValue() == true) {
                    var dt = new Date();
                    var month = dt.getMonth() + 1;
                    var day = dt.getDate();
                    var year = dt.getFullYear();

                    var dt1 = new Date(view.down('#bdate').getValue());
                    var ActualAge = Math.ceil(Math.ceil((Math.abs((dt).getTime() - new Date(dt1).getTime())) / (1000 * 3600 * 24)) / 365);
                    if (view.down('#precipient').getValue() != '') {

                        if (ActualAge < 18) {
                            this.getPrimaryMember('recipientID', view.down('#hiddenPrimaryId').getValue(), 'guardiancontactinfo');
                        }
                    }
                    else {
                        if (ActualAge < 18) {
                            Ext.Msg.alert('Error', 'Please Select Primary Recipient');
                            view.down('#ChkPrimaryRecipient').setValue(false);
                            return false;
                        } // Checking if the Primary Checkbox is Checked and Primary Recipient is Blank in case of Minor.
                    }
                } //if(Ext.getCmp('ChkPrimaryRecipient').getValue()==true)
            } //if(Ext.getCmp('txtDOB').getValue()!='')
        }
        else {
            Ext.ComponentQuery.query('#fpGuardianInfo')[0].items.items.forEach(function (f) {
                if (f.xtype == 'container') {
                    f.items.items.forEach(function (item) {
                        if (item.xtype == 'textfield') {
                            item.setValue('');
                        }
                    });
                }
                if (f.xtype == 'textfield') {
                    f.setValue('');
                }
            });
        }
    },

    primaryRecipient_Select: function () {
        var view = this.getView();
        view.down('#hiddenPrimaryId').setValue(view.down('#precipient').getValue());
    },

    precipient_Select: function () {
        this.primaryRecipient_Select();
        this.checkPrimaryRecipient();
        this.checkPrimaryRecipientContact();
    },

    checkPrimaryRecipient: function () {
        var view = this.getView();
        if (view.down('#bdate').getValue() != '') {
            if (view.down('#ChkPrimaryRecipient').getValue() == true) {
                var dt = new Date();
                var month = dt.getMonth() + 1;
                var day = dt.getDate();
                var year = dt.getFullYear();

                var dt1 = new Date(view.down('#bdate').getValue());
                var ActualAge = Math.ceil(Math.ceil((Math.abs((dt).getTime() - new Date(dt1).getTime())) / (1000 * 3600 * 24)) / 365);
                if (view.down('#precipient').getValue() != '') {

                    if (ActualAge < 18) {
                        this.getPrimaryMember('recipientID', view.down('#hiddenPrimaryId').getValue(), 'guardiancontactinfo');
                    }
                }
                else {
                    if (ActualAge < 18) {
                        Ext.Msg.alert('Error', 'Please Select Primary Recipient');
                        view.down('#ChkPrimaryRecipient').setValue(false);
                        return false;
                    } // Checking if the Primary Checkbox is Checked and Primary Recipient is Blank in case of Minor.
                }
            } //if(Ext.getCmp('ChkPrimaryRecipient').getValue()==true)
        } //if(Ext.getCmp('txtDOB').getValue()!='')
    },

    checkPrimaryRecipientContact: function () {
        var view = this.getView();
        if (view.down('#ChkAddressSamePrimaryRecp').getValue()) {
            this.getPrimaryMember('recipientID', view.down('#hiddenPrimaryId').getValue(), 'membercontactinfo');
        } //if(Ext.getCmp('txtDOB').getValue()!='')
    },

    ChkAddressSamePrimaryRecp_Change: function (item, rcd) {
        var view = this.getView();
        if (rcd == true) {
            Ext.ComponentQuery.query('#fpContactInfo')[0].items.items.forEach(function (f) {
                if (f.xtype == 'container') {
                    f.items.items.forEach(function (item) {
                        if (item.xtype == 'textfield') {
                            item.setValue('');
                        }
                    });
                }
                if (f.xtype == 'textfield') {
                    f.setValue('');
                }
            });
            view.down('#addresstype').setValue('');
            if (view.down('#hiddenPrimaryId').getValue() != '') {
                this.checkPrimaryRecipientContact();
            }
            else {
                Ext.Msg.alert('PBM', 'Please select a primary recipient first.');
                Ext.MessageBox.show({
                    title: 'PBM',
                    msg: 'Please select a primary recipient first.',
                    buttons: Ext.Msg.OK,
                    fn: function (btn) {
                        if (btn == "ok") {
                            view.down('#ChkAddressSamePrimaryRecp').setValue(false);
                        }
                    }
                });
                view.down('#ChkAddressSamePrimaryRecp').setValue(false);
            }
        }
        else {
            Ext.ComponentQuery.query('#fpContactInfo')[0].items.items.forEach(function (f) {
                if (f.xtype == 'container') {
                    f.items.items.forEach(function (item) {
                        if (item.xtype == 'textfield') {
                            item.setValue('');
                        }
                    });
                }
                if (f.xtype == 'textfield') {
                    f.setValue('');
                }
            });
            view.down('#addresstype').setValue('');
        }
    },


    setPrimaryEnabled: function (action) {
        var view = this.getView();
        if (action == 'enable') {
            view.down('#ChkPrimaryRecipient').setDisabled(false);
            var fp = Ext.ComponentQuery.query('#fpGuardianInfo')[0];
            fp.items.items.forEach(function (f) {
                if (f.itemId == "rcity" || f.itemId == "rstate" || f.itemId == "rzip" || f.itemId == "raddress1" || f.itemId == "raddress2" || f.itemId == "hphone" || f.itemId == "rfname" || f.itemId == "wphone" || f.itemId == "rmname" || f.itemId == "rlname" || f.itemId == "dfPrimaryAsGuardian") {
                    f.setDisabled(false);
                }
            });
        }
        else {
            view.down('#ChkPrimaryRecipient').setDisabled(true);
            view.down('#ChkPrimaryRecipient').setValue(false);
            var fp = Ext.ComponentQuery.query('#fpGuardianInfo')[0];
            fp.items.items.forEach(function (f) {

                if (f.itemId == "rcity" || f.itemId == "rstate" || f.itemId == "rzip" || f.itemId == "raddress1" || f.itemId == "raddress2" || f.itemId == "hphone" || f.itemId == "rfname" || f.itemId == "wphone" || f.itemId == "rmname" || f.itemId == "rlname") {
                    f.setDisabled(true);
                    f.setValue('');
                }
                if (f.itemId == 'dfPrimaryAsGuardian') {
                    f.setDisabled(true);
                }
            });

        }
    },

    checkValidBirthDate: function () {
        if (Action.toString().toUpperCase() == 'CREATE') {
            var view = this.getView();
            if (view.down('#bdate').getValue() != '') {
                var dt = new Date();
                var month = dt.getMonth() + 1;
                var day = dt.getDate();
                var year = dt.getFullYear();

                var dt1 = new Date(view.down('#bdate').getValue());
                if (dt1 > dt) {
                    Ext.Msg.alert('Error', 'Birthday Date should not be future Date');
                    view.down('#bdate').setValue('');
                    return false;
                }
                var ActualAge = Math.ceil(Math.ceil((Math.abs((dt).getTime() - new Date(dt1).getTime())) / (1000 * 3600 * 24)) / 365);
                if (ActualAge < 18) {
                    this.setPrimaryEnabled('enable');
                    view.down('#rfname').allowBlank = false;
                    view.down('#rlname').allowBlank = false;
                    view.down('#raddress1').allowBlank = false;
                    view.down('#rcity').allowBlank = false;
                    view.down('#rstate').allowBlank = false;
                    view.down('#rzip').allowBlank = false;
                    view.down('#addresstype').allowBlank = true;
                    view.down('#haddress1').allowBlank = true;
                    view.down('#hcity').allowBlank = true;
                    view.down('#hstate').allowBlank = true;
                    view.down('#hzip').allowBlank = true;
                    view.down('#hphone').allowBlank = true;
                }

                else {
                    this.setPrimaryEnabled('disable');
                    view.down('#rfname').allowBlank = true;
                    view.down('#rlname').allowBlank = true;
                    view.down('#raddress1').allowBlank = true;
                    view.down('#rcity').allowBlank = true;
                    view.down('#rstate').allowBlank = true;
                    view.down('#rzip').allowBlank = true;
                    view.down('#addresstype').allowBlank = false;
                    view.down('#haddress1').allowBlank = false;
                    view.down('#hcity').allowBlank = false;
                    view.down('#hstate').allowBlank = false;
                    view.down('#hzip').allowBlank = false;
                    view.down('#hphone').allowBlank = false;
                }
            }
        }


    },

    getPrimaryMember: function (keyType, keyValue, pnlName) {
        var view = this.getView();
        var vm = this.getViewModel();
        var fieldList = "recipientID,firstname,middlename,lastname,suffix,gender,birthDate,socSecNum,@languageDescription,race,deathDate," +
            "Home.Address1,Home.Address2,Home.City,home.zipCode,Home.State,@countyDescription,homephone.ContactInfo,workphone.ContactInfo,cell.ContactInfo," +
            "email.ContactInfo,@alerts,hedisMessage,@enrollmentStatus,respFirstName,respMiddleName,respLastName,resp.address1,resp.address2," +
            "resp.state,resp.city,resp.ZipCode,respHomePhone.ContactInfo,respWorkPhone.ContactInfo,complianceAlert,CarrierName,AccountName,@CoCMember,primRecipientId,MobilePin,MobileAccess,restrictAccess,SystemID,maritalStatus,langCode";


        var memberMasterModel = Ext.create('Atlas.member.model.MemberMaster', {});
        memberMasterModel.getProxy().setExtraParam('pKeyValue', keyValue);
        memberMasterModel.getProxy().setExtraParam('pKeyType', keyType);
        memberMasterModel.getProxy().setExtraParam('pFieldList', fieldList);
        memberMasterModel.load(
            {
                scope: this,
                success: function (record, operation) {
                    if (pnlName == 'guardiancontactinfo') {
                        view.down('#rfname').setValue(record.data.firstname);
                        if (record.data.middlename == null || record.data.middlename == '')
                            view.down('#rmname').setValue(' ');
                        else
                            view.down('#rmname').setValue(record.data.middlename);
                        view.down('#rlname').setValue(record.data.lastname);
                        view.down('#raddress1').setValue(record.data.Home_Address1);
                        view.down('#raddress2').setValue(record.data.Home_Address2);
                        view.down('#rcity').setValue(record.data.Home_City);
                        view.down('#rstate').setValue(record.data.Home_State);
                        view.down('#rzip').setValue(record.data.home_zipCode);
                        view.down('#rwphone').setValue(this.numberFormatter(record.data.workphone_ContactInfo, 'PHONE'));
                        view.down('#rhphone').setValue(this.numberFormatter(record.data.homephone_ContactInfo, 'PHONE'));
                    }
                    else {
                        view.down('#addresstype').setValue('Home');
                        view.down('#haddress1').setValue(record.data.Home_Address1);
                        view.down('#haddress2').setValue(record.data.Home_Address2);
                        view.down('#hcity').setValue(record.data.Home_City);
                        view.down('#hstate').setValue(record.data.Home_State);
                        view.down('#hzip').setValue(record.data.home_zipCode);
                        view.down('#hphone').setValue(this.numberFormatter(record.data.homephone_ContactInfo, 'PHONE'));
                        view.down('#cphone').setValue(this.numberFormatter(record.data.cell_ContactInfo, 'PHONE'));
                        view.down('#wphone').setValue(this.numberFormatter(record.data.workphone_ContactInfo, 'PHONE'));
                        view.down('#email').setValue(record.data.email_ContactInfo);
                    }
                },
                callback: function (record, operation, success) {
                    //do something whether the load succeeded or failed
                }
            });
    },

    getAddressDataInfo: function (recipientID) {
        var view = this.getView();
        var keyType = "Home";
        var keyValue = recipientID;
        var modelMemAddressDeatil = Ext.create('Atlas.authorization.model.cdag.MemberAddressDetail');
        modelMemAddressDeatil.getProxy().setExtraParam('ipiRecipientId', keyValue);
        modelMemAddressDeatil.getProxy().setExtraParam('ipcType', keyType);
        modelMemAddressDeatil.load({
            scope: this,
            callback: function (record, operation, success) {
                var objRespMemAddressDeatil = Ext.decode(operation.getResponse().responseText);
                if (objRespMemAddressDeatil.message[0].code != 0) {
                    Ext.Msg.alert('Message', objRespMemAddressDeatil.message[0].message);
                }
                else {
                    view.down('#haddress1').setValue(objRespMemAddressDeatil.data[0].address1); //////////////////
                    view.down('#haddress2').setValue(objRespMemAddressDeatil.data[0].address2);
                    view.down('#cphone').setValue(this.numberFormatter(objRespMemAddressDeatil.data[0].CellPhone, 'PHONE'));
                    view.down('#hcity').setValue(objRespMemAddressDeatil.data[0].city);

                    view.down('#hstate').setValue(objRespMemAddressDeatil.data[0].State);
                    view.down('#hzip').setValue(objRespMemAddressDeatil.data[0].ZipCode);
                    view.down('#email').setValue(objRespMemAddressDeatil.data[0].Email);
                    view.down('#hphone').setValue(this.numberFormatter(objRespMemAddressDeatil.data[0].HomePhone, 'PHONE'));
                    view.down('#wphone').setValue(this.numberFormatter(objRespMemAddressDeatil.data[0].WorkPhone, 'PHONE'));
                    view.down('#addresstype').setValue(objRespMemAddressDeatil.data[0].name);
                    //view.down('#fpContactInfo').clearInvalid();
                }
            }
        });


    },

    txtTempPrimaryRecipient_Keyup: function (item, value) {
        var view = this.getView();
        view.down('#precipient').show();
        view.down('#precipient').setRawValue(item.getValue());
        item.hide();

    },

    txtTempPlanGroup_Keyup: function (item, value) {
        var view = this.getView();
        view.down('#cmbSearchPlanGroupsWin').show();
        view.down('#cmbSearchPlanGroupsWin').setRawValue(item.getValue());
        item.hide();
    },

    numberFormatter: function (number, formatType) {
        var formattedNumber = '';
        if (number != undefined) {
            var contactNumber = 0;
            formattedNumber = number.toUpperCase() == "ERROR" ? '' : number;
            number = number.replace("/[-)(\s]/", ""); //Regex.Replace(number, @"[-)(\s]", string.Empty);

            if (number.length == 10) {

                if (formatType.toUpperCase() == "PHONE") {
                    formattedNumber = '(' + number.substring(0, 3) + ')-' + number.substring(3, 6) + '-' + number.substring(6, 10);
                }
                else {
                    formattedNumber = number.substring(0, 3) + '-' + number.substring(3, 6) + '-' + number.substring(6, 10);
                }
            }
        }
        return formattedNumber;
    },

    getMember: function (keyValue) {
        if (keyValue == '') {
            return false;
        }
        var view = this.getView();
        var vm = this.getViewModel();
        var fieldList = "recipientID,firstname,middlename,lastname,suffix,gender,birthDate,socSecNum,@languageDescription,race,deathDate," +
            "Home.Address1,Home.Address2,Home.City,home.zipCode,Home.State,@countyDescription,homephone.ContactInfo,workphone.ContactInfo,cell.ContactInfo," +
            "email.ContactInfo,@alerts,hedisMessage,@enrollmentStatus,respFirstName,respMiddleName,respLastName,resp.address1,resp.address2," +
            "resp.state,resp.city,resp.ZipCode,respHomePhone.ContactInfo,respWorkPhone.ContactInfo,complianceAlert,CarrierName,AccountName,@CoCMember,primRecipientId,MobilePin,MobileAccess,restrictAccess,SystemID,maritalStatus,langCode,Primary.FirstName,Primary.LastName";


        var memberMasterModel = Ext.create('Atlas.member.model.MemberMaster', {});
        memberMasterModel.getProxy().setExtraParam('pKeyValue', keyValue);
        memberMasterModel.getProxy().setExtraParam('pKeyType', 'recipientID');
        memberMasterModel.getProxy().setExtraParam('pFieldList', fieldList);
        memberMasterModel.load(
            {
                scope: this,
                success: function (record, operation) {
                    vm.set('masterrecord', record);

                    var objRespMemberMaster = Ext.decode(operation.getResponse().responseText);
                    var SocNum = '';
                    if (objRespMemberMaster.message[0].code == 0) {
                        if (record.data.socSecNum > 0) {
                            SocNum = record.data.socSecNum;
                        }
                    }
                    var MemberAge = '';
                    var Birthdate = null;

                    var selectedid = view.down('#cboMemberList').getValue();


                    if (objRespMemberMaster.message[0].code == 0) {
                        if (record.data.birthDate != '') {
                            Birthdate = new Date(record.data.birthDate);
                            //var ActualAge = DateTime.Now.Year - Birthdate.Value.Year;
                            //if (DateTime.Now.Month < Birthdate.Value.Month || (DateTime.Now.Month == Birthdate.Value.Month && DateTime.Now.Day < Birthdate.Value.Day))
                            //    ActualAge--;

                            var ActualAge = Math.ceil(Math.ceil((Math.abs((new Date()).getTime() - new Date(record.data.birthDate).getTime())) / (1000 * 3600 * 24)) / 365);
                            MemberAge = ActualAge;
                        }

                        var RecipientId = record.data.recipientID;


                        var pRecipientId;

                        //if (long.TryParse(RecipientId, out pRecipientId) && pRecipientId > 0 && selectedid != RecipientId)
                        //{
                        //    loadMemberFamilyList(pRecipientId);
                        //}
                        var memberfamilystore = vm.getStore('memberfamilystore');
                        memberfamilystore.getProxy().setExtraParam('pRecipientID', record.data.recipientID);
                        memberfamilystore.load(
                            {
                                scope: this,
                                success: function (record, operation) {
                                },
                                callback: function (record, operation, success) {
                                    view.down('#cboMemberList').setValue(keyValue);
                                }
                            }
                        );
                    }


                    view.down('#formid').loadRecord(record);
                    //view.down('#precipient').setValue(record.data.primRecipientId);
                    //view.down('#precipient').setRawValue(record.data.firstname + ' ' + record.data.lastname + ' ' + record.data.primRecipientId);
                    //view.down('#txtTempPrimaryRecipient').show();
                    //view.down('#txtTempPrimaryRecipient').setValue(record.data["Primary.FirstName"] + ' ' + record.data["Primary.LastName"] + ' ' + record.data.primRecipientId);
                    //view.down('#precipient').hide();
                    view.down('#btnEditMember').setDisabled(false);
                    view.down('#btnCreateEnrollment').setDisabled(false);
                    view.down('#hiddenSystemID').setValue(record.data.SystemID);


                    view.down('#lblMrxId').setValue(record.data.recipientID);
                    view.down('#fname').setValue(record.data.firstname);
                    view.down('#mname').setValue(record.data.middlename);
                    view.down('#lname').setValue(record.data.lastname);
                    view.down('#suffix').setValue(record.data.suffix);
                    view.down('#gender').setValue(record.data.gender);
                    /* date is now being formated in teh store and the form field
                    if (record.data.birthDate != undefined && record.data.birthDate != null) {
                        //view.down('#bdate').setValue(record.data.birthDate.replace(" 12:00:00 AM", ""));
                        view.down('#bdate').setValue(new Date(record.data.birthDate.replace(" 12:00:00 AM", "")));
                    }*/
                    view.down('#ssn').setValue(record.data.socSecNum);
                    view.down('#langcode').setValue(record.data.langCode);
                    view.down('#race').setValue(record.data.race);
                    if (record.data.deathDate != undefined && record.data.deathDate != null && record.data.deathDate != '') {
                        //view.down('#ddate').setValue(record.data.deathDate.replace(" 12:00:00 AM", ""));
                        view.down('#ddate').setValue(new Date(record.data.deathDate.replace(" 12:00:00 AM", "")));
                    }
                    view.down('#hiddenKey').setValue(record.data.recipientID);

                    view.down('#hiddenSystemID').setValue(record.data.SystemID);
                    view.down('#hiddenresult').setValue("");

                    var ActualAge = Math.ceil(Math.ceil((Math.abs((new Date()).getTime() - new Date(record.data.birthDate).getTime())) / (1000 * 3600 * 24)) / 365);
                    if (ActualAge < 18) {
                        view.down('#rfname').allowBlank = false;
                        view.down('#rlname').allowBlank = false;
                        view.down('#raddress1').allowBlank = false;
                        view.down('#rcity').allowBlank = false;
                        view.down('#rstate').allowBlank = false;
                        view.down('#rzip').allowBlank = false;

                    }
                    else {
                        view.down('#rfname').allowBlank = true;
                        view.down('#rlname').allowBlank = true;
                        view.down('#raddress1').allowBlank = true;
                        view.down('#rcity').allowBlank = true;
                        view.down('#rstate').allowBlank = true;
                        view.down('#rzip').allowBlank = true;

                    }
                    view.down('#mstatus').setValue(record.data.maritalStatus);
                    view.down('#rfname').setValue(record.data.respFirstName);
                    if (record.data.respMiddleName == '' || record.data.respMiddleName == null) {
                        view.down('#rmname').setValue(' ');
                    }
                    else {
                        view.down('#rmname').setValue(record.data.respMiddleName);
                    }


                    view.down('#rlname').setValue(record.data.respLastName);
                    view.down('#raddress1').setValue(record.data.resp_address1);
                    view.down('#raddress2').setValue(record.data.resp_address2);
                    view.down('#rcity').setValue(record.data.resp_city);
                    view.down('#rstate').setValue(record.data.resp_state);
                    view.down('#rzip').setValue(record.data.resp_ZipCode);
                    view.down('#rwphone').setValue(this.numberFormatter(record.data.respWorkPhone_ContactInfo, 'PHONE'));
                    view.down('#rhphone').setValue(this.numberFormatter(record.data.respHomePhone_ContactInfo, 'PHONE'));
                    this.getAddressDataInfo(record.data.recipientID);
                    //view.down('#fpEnrollmentInfo').clearInvalid();
                    //view.down('#fpGeneralInfo').clearInvalid();
                    //view.down('#fpOtherInfo').clearInvalid();
                    //view.down('#fpContactInfo').clearInvalid();
                    //view.down('#fpGuardianInfo').clearInvalid();


                    //Ext.getCmp(x).iframe.dom.contentWindow.Ext.getCmp('btnEdit').setDisabled(false);
                    if (record.data.restrictAccess.length > 0) {
                        if (record.data.restrictAccess == 'no') {
                            view.down('#raccess').setValue(false);
                        }
                        else {
                            view.down('#raccess').setValue(true);
                        }
                    }
                    if (record.data.MobileAccess.length > 0) {
                        if (record.data.MobileAccess == 'no') {
                            view.down('#maccess').setValue(false);
                        }
                        else {
                            view.down('#maccess').setValue(true);
                        }
                    }

                    view.down('#mpin').setValue(record.data.MobilePin);

                    if (record.data.primRecipientId == '0' || record.data.primRecipientId == '') {
                        //view.down('#precipient').setValue(record.data.primRecipientId);
                        //view.down('#precipient').setRawValue(record.data.firstname + ' ' + record.data.lastname + ' ' + record.data.primRecipientId);
                        view.down('#precipient').setValue('');
                        view.down('#precipient').hide();
                        view.down('#txtTempPrimaryRecipient').show();
                        view.down('#txtTempPrimaryRecipient').setValue('');

                        view.down('#hiddenPrimaryRecipient').setValue('');
                        view.down('#hiddenPrimaryId').setValue('');
                    }
                    else {
                        if (record.data.primRecipientId == record.data.recipientID) {
                            view.down('#hiddenPrimaryRecipient').setValue(record.data["Primary.FirstName"] + ' ' + record.data["Primary.LastName"] + ' ' + record.data.primRecipientId);
                            view.down('#hiddenPrimaryId').setValue(record.data.primRecipientId);

                            if (record.data["Primary.FirstName"] != null && record.data["Primary.FirstName"] != '') {
                                view.down('#precipient').setValue(record.data["Primary.FirstName"] + ' ' + record.data["Primary.LastName"] + ' ' + record.data.primRecipientId);

                                view.down('#precipient').setValue(record.data.primRecipientId);
                                view.down('#precipient').setRawValue(record.data.firstname + ' ' + record.data.lastname + ' ' + record.data.primRecipientId);
                                view.down('#precipient').hide();
                                view.down('#txtTempPrimaryRecipient').show();
                                view.down('#txtTempPrimaryRecipient').setValue(record.data["Primary.FirstName"] + ' ' + record.data["Primary.LastName"] + ' ' + record.data.primRecipientId);
                            }
                        }
                        else {

                            view.down('#hiddenPrimaryRecipient').setValue(record.data["Primary.FirstName"] + ' ' + record.data["Primary.LastName"] + ' ' + record.data.primRecipientId);
                            view.down('#hiddenPrimaryId').setValue(record.data.primRecipientId);

                            if (record.data["Primary.FirstName"] != null && record.data["Primary.FirstName"] != '') {
                                //view.down('#precipient').setValue(record.data["Primary.FirstName"] + ' ' + record.data["Primary.LastName"] + ' ' + record.data.primRecipientId);
                                view.down('#precipient').setValue(record.data.firstname + ' ' + record.data.lastname + ' ' + record.data.primRecipientId);
                                view.down('#precipient').hide();
                                view.down('#txtTempPrimaryRecipient').show();
                                view.down('#txtTempPrimaryRecipient').setValue(record.data["Primary.FirstName"] + ' ' + record.data["Primary.LastName"] + ' ' + record.data.primRecipientId);
                            }
                        }
                    }
                }
                ,
                callback: function (record, operation, success) {
                    //do something whether the load succeeded or failed
                }
            });
    },

    cboMemberList_Onselect: function (cmb, rcd) {
        var view = this.getView();
        this.getMember(rcd.data.recipientID);
        this.loadStore(rcd.data.recipientID);
        view.down('#cbxMember').setRawValue(rcd.data.recipientID);
        view.down('#hdnMemberId').setValue('');
    },

    cbxMember_OnSelect: function () {
        var view = this.getView();
        if (view.down('#lblMrxId').getValue() != '' && view.down('#lblMrxId').getValue() != null && view.down('#lblMrxId').getValue() != undefined && view.down('#lblMrxId').getValue() != 0 &&
            view.down('#lblMrxId').getValue() != '0') {
            if (view.down('#hiddenRecipientId').getValue() == view.down('#lblMrxId').getValue()) {
                view.down('#cbxMember').setValue(view.down('#lblMrxId').getValue());
            }
            view.down('#hiddenRecipientId').setValue(view.down('#cbxMember').getValue());
            this.getMember(view.down('#cbxMember').getValue());
            this.loadStore(view.down('#cbxMember').getValue());
            view.down('#btnEditMember').setDisabled(false);
            view.down('#btnCreateEnrollment').setDisabled(false);
        }
        else {
            this.getMember(view.down('#hiddenRecipientId').getValue());
            this.loadStore(view.down('#hiddenRecipientId').getValue());
            view.down('#cbxMember').setValue(view.down('#hiddenRecipientId').getValue());
        }
    },

    onMemberSelection: function (combo, rcd) {
        var vm = this.getViewModel(),
            me = this;
        var theView = this.getView();
        var recipientID = rcd.data.recipientID;
        theView.down('#cbxMember').setRawValue(rcd.get('MemberInfo'));
        vm.set("isMemberSelected", true);
        vm.set("planGroupName", rcd.data.planGrpName);
        theView.down('#hdnMemberId').setValue(rcd.data.memberID);
        theView.down('#lblMrxId').setValue(rcd.data.recipientID);

        var memberCoverageHistoryStore = vm.getStore('membercoveragehistorystore');
        memberCoverageHistoryStore.getProxy().setExtraParam('pKeyValue', rcd.data.recipientID);
        var sortProperty =[ {
            "property": "tEffDate",
            "direction":"DESC"
        }];
        memberCoverageHistoryStore.sorters.add(sortProperty);
        memberCoverageHistoryStore.load({
            scope: this,
            callback: function (record, operation, success) {
                var objRespCoverageHistory = Ext.decode(operation.getResponse().responseText);
                theView.down('#hiddenRecipientId').setValue(objRespCoverageHistory.data[0].tRecipientID);
                theView.down('#hiddenMemberId').setValue(objRespCoverageHistory.data[0].tmemberId);
                theView.down('#hiddenLOBId').setValue(objRespCoverageHistory.data[0].CarrierLOBid);
                theView.down('#hidMemberDetailsSystemId').setValue(objRespCoverageHistory.data[0].MemDetailsSysId);
            }


        });
        var memberfamilystore = vm.getStore('memberfamilystore');
        memberfamilystore.getProxy().setExtraParam('pRecipientID', rcd.data.recipientID);
        memberfamilystore.load(
            {
                scope: this,
                success: function (record, operation) {

                },
                callback: function (record, operation, success) {

                    theView.down('#cboMemberList').setValue(recipientID);
                }
            }
        );
        Ext.defer(function() {
            me.getMember(rcd.data.recipientID);
        }, 500);

    },

    displayDetail: function (rcd) {
        var view = this.getView();
        var vm = this.getViewModel();
        var terminationDate = new Date(rcd.data.tTermDate);
        var todayDate = new Date();
        view.down('#TermDateWin').setReadOnly(false);
        view.down('#cbxMCSProgGroupCodeWin').setDisabled(false);

        view.down('#effDateWin').setValue(rcd.data.tEffDate);
        view.down('#TermDateWin').setValue(rcd.data.tTermDate);

        var planGroupId = rcd.data.tPlanGroupID;
        var planbenefitstore = vm.getStore('PlanBenefitStore');
        planbenefitstore.getProxy().setExtraParam('pWhere', " planGroupId = " + planGroupId);
        planbenefitstore.load();
        view.down('#cmbSearchPlanBenefitWin').setValue(rcd.data.tPlanBenefitID);

        var storeProgCode = vm.getStore('storeMCSProgGroupCode');
        storeProgCode.getProxy().setExtraParam('pPlanGroupId', rcd.data.tPlanGroupID);
        storeProgCode.getProxy().setExtraParam('pPlanBenefitId', 0);
        storeProgCode.getProxy().setExtraParam('pCarrierID', 0);
        storeProgCode.getProxy().setExtraParam('pCarrierAccountNumber', '');
        storeProgCode.getProxy().setExtraParam('pLobID', 0);
        storeProgCode.load({
            scope: this,
            callback: function (record, operation, success) {
                var activeProgramCodes1 = [];
                var objRespPlanProgCode = Ext.decode(operation.getResponse().responseText);
                objRespPlanProgCode.data.forEach(function (item, index) {
                    if (item.active == true) {
                        activeProgramCodes1.push(item);
                    }
                });

                if (rcd.data.tPlanBenefitID > 0) {
                    var modelPlanProgCode2 = Ext.create('Atlas.plan.model.PlanProgramCode');
                    modelPlanProgCode2.getProxy().setExtraParam('pPlanGroupId', rcd.data.tPlanGroupID);
                    modelPlanProgCode2.getProxy().setExtraParam('pPlanBenefitId', rcd.data.tPlanBenefitID);
                    modelPlanProgCode2.getProxy().setExtraParam('pCarrierID', 0);
                    modelPlanProgCode2.getProxy().setExtraParam('pCarrierAccountNumber', '');
                    modelPlanProgCode2.getProxy().setExtraParam('pLobID', 0);
                    modelPlanProgCode2.load({
                        scope: this,
                        callback: function (record, operation, success) {
                            var activeProgramCodes2 = [];
                            var objRespPlanProgCode2 = Ext.decode(operation.getResponse().responseText);
                            objRespPlanProgCode2.data.forEach(function (item, index) {
                                if (item.active == true) {
                                    activeProgramCodes2.push(item);
                                }
                            });
                            var arrFinal = activeProgramCodes1.concat(activeProgramCodes2);
                            if (arrFinal != null && arrFinal.length > 0) {
                                vm.getStore('storeMCSProgGroupCode').loadData(arrFinal);
                                view.down('#cbxMCSProgGroupCodeWin').bindStore(vm.getStore('storeMCSProgGroupCode'));
                            }
                        }
                    });
                }
            }
        });

        // view.down('#precipient').setValue(rcd.data.tmemberId);
        view.down('#txtMemberIDWin').setValue(rcd.data.tmemberId);
        view.down('#txtPersonCodeWin').setValue(rcd.data.PersonCode);
        view.down('#cbxRelationshipWin').setValue(rcd.data.tRelationshipCode);
        view.down('#cmbSearchPlanGroupsWin').clearInvalid();
        view.down('#cmbSearchPlanGroupsWin').setValue(rcd.data.tPlanGroupID);
        view.down('#cmbSearchPlanGroupsWin').setRawValue(rcd.data.tPlanGroupName);

        var me = this;
        Ext.Function.defer(function () {
            me.setPlanGroupTypeAhead(view.down('#cmbSearchPlanGroupsWin'), rcd.data.tPlanGroupName);
        }, 200);

        view.down('#lblPrimaryRecipientWin').setValue(view.down('#hiddenPrimaryRecipient').getValue());
        view.down('#cbxMCSProgGroupCodeWin').setValue(rcd.data.mcsProgGroupCodeDesc);

        if (rcd.data.tAltInsInd == 'true') {
            view.down('#chkAltInsIndWin').setValue(true);
        }
        else if (rcd.data.tAltInsInd == 'false') {
            view.down('#chkAltInsIndWin').setValue(false);
        }
        view.down('#txtAltInsIdWin').setValue(rcd.data.tAltInsMemberID);
        view.down('#txtAltInsNameWin').setValue(rcd.data.tAltInsCarrierName);
        view.down('#dtAltInsEffDateWin').setValue(rcd.data.altInsStartDate);
        view.down('#dtAltInsTermDateWin').setValue(rcd.data.altInsEndDate);
        view.down('#txtHICNWin').setValue(rcd.data.tAltMemberID);


        view.down('#hiddenRecipientId').setValue(rcd.data.tRecipientID);
        view.down('#hiddenMemberId').setValue(rcd.data.tmemberId);
        view.down('#hiddenLOBId').setValue(rcd.data.CarrierLOBid);
        view.down('#hidMemberDetailsSystemId').setValue(rcd.data.MemDetailsSysId);
        view.down('#hiddenEnrollmentSystemID').setValue(rcd.data.tsystemID);

        view.down('#hidCovPlanGroupId').setValue(rcd.data.tPlanGroupID);
        view.down('#hidCovPlanBenefitId').setValue(rcd.data.tPlanBenefitID);

        view.down('#txtMemberIDWin').setDisabled(true);
        view.down('#cmbSearchPlanGroupsWin').setDisabled(false);
        view.down('#cmbSearchPlanBenefitWin').setDisabled(false);
        view.down('#effDateWin').setDisabled(false);
        view.down('#cbxRelationshipWin').setDisabled(true);
    },
    
    setPlanGroupTypeAhead: function(cbx, value)
    {
        var store = cbx.getStore();
        store.getProxy().setExtraParam('pWhere', "wrdidx contains '" + value+"'");
        store.load({
            scope: this,
            callback: function (record, operation, success) {
                cbx.setValue(value);
            }
        }); //end nicol
    },

    editEnrollment: function (me, record, tr, rowIndex, e, eOpts) {
        var me = this;
        var view = this.getView();
        if (view.down('#hiddenAction').getValue() == 'Edit') {
            Ext.Msg.alert('Message', 'Please complete editing of member information.');
        }
        else {
            /*var gridRow = view.down('#HistoryGridPanel').getSelectionModel().getSelections();
             var thisRow = gridRow[0];
             if (thisRow == null) {
             Ext.Msg.alert('Message', 'Please Select a Record to edit');
             return false;
             }*/

            //view.down('#winEnrollmentdetail').show();
            /*var enroll = Ext.create(Enroll);
             view.add(enroll);
             enroll.show();*/
            win = Ext.create({
                xtype: 'memaddeditenrollwin',
                autoShow: true
            });

            this.getView().add(win);


            this.displayDetail(record);
            view.down('#hdnAction').setValue('Edit');
            this.setEditEnrollment('Edit');
        }
    },

    onEditClick: function () {
        Action = 'Edit';
        var view = this.getView();
        view.down('#fpEnrollmentInfo').setCollapsed(true);
        view.down('#hiddenAction').setValue('Edit');
        this.setDisable(false);
        view.down('#btnSave').setDisabled(false);
        view.down('#btnCancel').setDisabled(false);
        view.down('#btnCreateMember').setDisabled(true);
        view.down('#btnEditMember').setDisabled(true);
        view.down('#btnCreateEnrollment').setDisabled(true);
        this.disableTopToolBar(true);


        /*this.getView().down('#fname').setReadOnly(false);
         this.getView().down('#mname').setReadOnly(false);
         this.getView().down('#lname').setReadOnly(false);
         this.getView().down('#suffix').setReadOnly(false);
         this.getView().down('#bdate').setReadOnly(false);
         this.getView().down('#ssn').setReadOnly(false);
         this.getView().down('#gender').setReadOnly(false);
         this.getView().down('#precipient').setReadOnly(false);
         this.getView().down('#ddate').setReadOnly(false);
         this.getView().down('#maccess').setReadOnly(false);
         this.getView().down('#mstatus').setReadOnly(false);
         this.getView().down('#mpin').setReadOnly(false);
         this.getView().down('#race').setReadOnly(false);
         this.getView().down('#raccess').setReadOnly(false);
         this.getView().down('#langcode').setReadOnly(false);
         this.getView().down('#addresstype').setReadOnly(false);
         this.getView().down('#haddress1').setReadOnly(false);
         this.getView().down('#haddress2').setReadOnly(false);
         this.getView().down('#hcity').setReadOnly(false);
         this.getView().down('#hstate').setReadOnly(false);
         this.getView().down('#hzip').setReadOnly(false);
         this.getView().down('#hphone').setReadOnly(false);
         this.getView().down('#cphone').setReadOnly(false);
         this.getView().down('#wphone').setReadOnly(false);
         this.getView().down('#email').setReadOnly(false);
         this.getView().down('#rfname').setReadOnly(false);
         this.getView().down('#rmname').setReadOnly(false);
         this.getView().down('#rlname').setReadOnly(false);
         this.getView().down('#raddress1').setReadOnly(false);
         this.getView().down('#raddress2').setReadOnly(false);
         this.getView().down('#rcity').setReadOnly(false);
         this.getView().down('#rstate').setReadOnly(false);
         this.getView().down('#rzip').setReadOnly(false);
         this.getView().down('#rhphone').setReadOnly(false);
         this.getView().down('#rwphone').setReadOnly(false);
         this.getView().down('#raccess').setReadOnly(false);

         this.getView().down('#cbxMember').setReadOnly(true);
         this.getView().down('#btnEditMember').setDisabled(true);
         this.getView().down('#btnCreateMember').setDisabled(true);
         this.getView().down('#btnCreateEnrollment').setDisabled(true);
         this.getView().down('#btnSave').setDisabled(false);
         this.getView().down('#btnCancel').setDisabled(false);*/
    },

    allowBlanksForAltIns: function (isNewMember, checked) {
        var view = this.getView();
        var objWinEnrollment = Ext.ComponentQuery.query('#WinEnrollment')[0];
        if (isNewMember == true) {
            if (checked == false) {
                view.down('#txtAltInsId').clearInvalid();
                view.down('#txtAltInsName').clearInvalid();
                view.down('#dtAltInsEffDate').clearInvalid();
            }
            else {
                view.down('#txtAltInsId').markInvalid();
                view.down('#txtAltInsName').markInvalid();
                view.down('#dtAltInsEffDate').markInvalid();
            }
            view.down('#txtAltInsId').allowBlank = !checked;
            view.down('#txtAltInsName').allowBlank = !checked;
            view.down('#dtAltInsEffDate').allowBlank = !checked;


        }
        else {
            if (checked == false) {
                objWinEnrollment.query('#txtAltInsIdWin')[0].clearInvalid();
                objWinEnrollment.query('#txtAltInsNameWin')[0].clearInvalid();
                objWinEnrollment.query('#dtAltInsEffDateWin')[0].clearInvalid();
            }
            objWinEnrollment.query('#txtAltInsIdWin')[0].allowBlank = !checked;
            objWinEnrollment.query('#txtAltInsNameWin')[0].allowBlank = !checked;
            objWinEnrollment.query('#dtAltInsEffDateWin')[0].allowBlank = !checked;
        }
    },

    resetEnrollmentWindow: function () {
        var view = this.getView();
        var vm = this.getViewModel();
        var objWinEnrollment = Ext.ComponentQuery.query('#WinEnrollment')[0];
        //Ext.ComponentQuery.query('#WinEnrollment')[0].query('#txtMemberIDWin')[0]
        objWinEnrollment.query('#formWinEnrollment')[0].reset();
        //view.down('#cmbSearchPlanGroupsWin').setValue('');
        //view.down('#cmbSearchPlanBenefitWin').setValue('');
        //view.down('#effDateWin').setValue('');
        //view.down('#TermDateWin').setValue('');
        //view.down('#cbxRelationshipWin').setValue('');
        //view.down('#cbxMCSProgGroupCodeWin').setValue('');
        //view.down('#txtPersonCodeWin').setValue('');
        //view.down('#lblPrimaryRecipientWin').setText('')

        //view.down('#chkAltInsIndWin').setValue('');
        //view.down('#txtAltInsIdWin').setValue('');
        //view.down('#txtAltInsNameWin').setValue('');
        //view.down('#dtAltInsEffDateWin').setValue('');
        //view.down('#dtAltInsTermDateWin').setValue('');
        //view.down('#txtHICNWin').setValue('');
        this.allowBlanksForAltIns(false, false);

        vm.getStore('storeMCSProgGroupCode').removeAll();
        vm.getStore('PlanBenefitStore').removeAll();
    },

    setEditEnrollment: function (action) {
        //working -----------------------
        var view = this.getView();
        var vm = this.getViewModel();
        var objWinEnrollment = Ext.ComponentQuery.query('#WinEnrollment')[0];
        objWinEnrollment.query('#flsMemberWin')[0].items.items.forEach(function (f) {
            if (f.itemId != 'lblPrimaryRecipient') {
                if (view.down('#hidCovPlanBenefitId').getValue() != "") {
                    var modelPlanProgCode = Ext.create('Atlas.plan.model.PlanProgramCode');
                    modelPlanProgCode.getProxy().setExtraParam('pPlanGroupId', view.down('#cmbSearchPlanGroups').getValue());
                    modelPlanProgCode.getProxy().setExtraParam('pPlanBenefitId', 0);
                    modelPlanProgCode.getProxy().setExtraParam('pCarrierID', 0);
                    modelPlanProgCode.getProxy().setExtraParam('pCarrierAccountNumber', '');
                    modelPlanProgCode.getProxy().setExtraParam('pLobID', 0);
                    modelPlanProgCode.load({
                        scope: this,
                        callback: function (record, operation, success) {
                            var activeProgramCodes1 = [];
                            var objRespPlanProgCode = Ext.decode(operation.getResponse().responseText);
                            objRespPlanProgCode.data.forEach(function (item, index) {
                                if (item.active == true) {
                                    activeProgramCodes1.push(item);
                                }
                            });
                            if (view.down('#hidCovPlanBenefitId').getValue() > 0) {
                                var modelPlanProgCode = Ext.create('Atlas.plan.model.PlanProgramCode');
                                modelPlanProgCode.getProxy().setExtraParam('pPlanGroupId', view.down('#hidCovPlanGroupId').getValue());
                                modelPlanProgCode.getProxy().setExtraParam('pPlanBenefitId', view.down('#hidCovPlanBenefitId').getValue());
                                modelPlanProgCode.getProxy().setExtraParam('pCarrierID', 0);
                                modelPlanProgCode.getProxy().setExtraParam('pCarrierAccountNumber', '');
                                modelPlanProgCode.getProxy().setExtraParam('pLobID', 0);
                                modelPlanProgCode.load({
                                    scope: this,
                                    callback: function (record, operation, success) {
                                        var activeProgramCodes2 = [];
                                        var objRespPlanProgCode2 = Ext.decode(operation.getResponse().responseText);
                                        objRespPlanProgCode2.data.forEach(function (item, index) {
                                            if (item.active == true) {
                                                activeProgramCodes2.push(item);
                                            }
                                        });
                                        activeProgramCodes1.concat(activeProgramCodes2);
                                    }
                                });
                            }
                            if (activeProgramCodes1 != null && activeProgramCodes1.length < 1) {
                                objWinEnrollment.query('#cbxMCSProgGroupCodeWin')[0].setDisabled(false);
                                vm.getStore('storeMCSProgGroupCode').loadData(activeProgramCodes1);
                            }
                            else if (activeProgramCodes1 != null) {
                                objWinEnrollment.query('#cbxMCSProgGroupCodeWin')[0].setDisabled(false);
                                vm.getStore('storeMCSProgGroupCode').loadData(activeProgramCodes1);
                            }


                            if (activeProgramCodes1 != null && activeProgramCodes1.length < 1) {
                                //var temp = isEditEnrollment ? cbxMCSProgGroupCodeWin.Disabled = false : cbxMCSProgGroupCode.Disabled = false;
                                vm.getStore('storeMCSProgGroupCode').loadData(activeProgramCodes1);
                            }

                        }
                    });
                }
            }
        });
        if (action == "Edit") {
            view.down('#hdnAction').setValue('Edit');
        }
        else {
            view.down('#hdnAction').setValue('Create');
        }

    },

    onEnrollClick: function () {
        var view = this.getView();
        //var objWinEnrollment = Ext.ComponentQuery.query('#WinEnrollment')[0];
        //objWinEnrollment.show();
        win = Ext.create({
            xtype: 'memaddeditenrollwin'
        });
        this.getView().add(win);
        win.show();

        this.resetEnrollmentWindow();
        this.setEditEnrollment('Create');
        var objWinEnrollment = Ext.ComponentQuery.query('#WinEnrollment')[0];
        objWinEnrollment.query('#txtMemberIDWin')[0].setDisabled(false);
        objWinEnrollment.query('#cmbSearchPlanGroupsWin')[0].setDisabled(false);
        objWinEnrollment.query('#cmbSearchPlanBenefitWin')[0].setDisabled(false);
        objWinEnrollment.query('#effDateWin')[0].setDisabled(false);
        objWinEnrollment.query('#cbxRelationshipWin')[0].setDisabled(false);
        //objWinEnrollment.query('#formWinEnrollment')[0].clearInvalid();
        if (view.down('#precipient').getValue() != null && view.down('#precipient').getValue() != '' && view.down('#precipient').getValue() != undefined) {
            objWinEnrollment.query('#lblPrimaryRecipientWin')[0].setValue(view.down('#precipient').getValue());
        }
    },
    /****************************Create a new member***************************/
    createMember: function () {
        this.resetEntireFields();
        this.getView().down('#hiddenAction').setValue('Create');
        this.getView().down('#hiddenGroupID').setValue('');
    },

    resetEntireFields: function () {
        var view = this.getView();
        view.down('#fpEnrollmentInfo').reset();
        view.down('#fpGeneralInfo').reset();
        view.down('#fpOtherInfo').reset();
        view.down('#fpContactInfo').reset();
        view.down('#fpGuardianInfo').reset();
    },

    setDisableFields: function (fp, pBool) {
        var view = this.getView();
        var fPnl = view.down('#' + fp);
        if (fPnl.itemId == 'fpEnrollmentInfo') {
            fPnl.setDisabled(pBool);
        }
        else {
            if(fPnl.items != undefined) {
                fPnl.items.items.forEach(function (f) {
                    if(f.xtype != 'container'){
                        f.setDisabled(pBool ? true : false);
                    }
                });
            }
            else{
                fPnl.setDisabled(pBool ? true : false);
            }
        }
        /*view.down('#' + fp).items.items.forEach(function (f) {
         if (f.xtype != 'container' && f.itemId != 'cmpAckMonitorID' && f.itemId != 'txtAckParameters' && f.itemId != 'chkAckActive' && f.itemId != 'txtAckMinFileAge') {
         if (f.getValue() != "" || view.down('#txtAckProgramName').getValue() != "") {
         ackResponseAllowBlank = false;
         return false;
         }
         }
         });*/
    },

    setDisable: function (pBool) {
        var view = this.getView();
        if (view.down('#hiddenAction').getValue() == '' || view.down('#hiddenAction').getValue().toString().toUpperCase() == "CREATE") {
            this.setDisableFields('fpEnrollmentInfo', pBool);
        }
        this.setDisableFields('fpGeneralInfo', pBool);
        this.setDisableFields('fpOtherInfo', pBool);
        this.setDisableFields('fpContactInfo', pBool);
        this.setDisableFields('fpGuardianInfo', pBool);

        //this.setDisableFields('GenInfoContainer1', pBool);
        this.setDisableFields('suffix', pBool);
        this.setDisableFields('bdate', pBool);


        //this.setDisableFields('GenInfoContainer2', pBool);
        this.setDisableFields('ssn', pBool);
        this.setDisableFields('gender', pBool);


        //this.setDisableFields('OtherInfoContainer1', pBool);
        this.setDisableFields('ddate', pBool);
        this.setDisableFields('maccess', pBool);


        //this.setDisableFields('OtherInfoContainer2', pBool);
        this.setDisableFields('mstatus', pBool);
        this.setDisableFields('mpin', pBool);


        //this.setDisableFields('OtherInfoContainer3', pBool);
        this.setDisableFields('race', pBool);
        this.setDisableFields('raccess', pBool);


        //this.setDisableFields('ContactInfoContainer1', pBool);
        this.setDisableFields('hcity', pBool);
        this.setDisableFields('hstate', pBool);


        //this.setDisableFields('ContactInfoContainer2', pBool);
        this.setDisableFields('hzip', pBool);
        this.setDisableFields('hphone', pBool);


        //this.setDisableFields('ContactInfoContainer3', pBool);
        this.setDisableFields('cphone', pBool);
        this.setDisableFields('wphone', pBool);


        //this.setDisableFields('RespPartyContainer1', pBool);
        this.setDisableFields('ChkPrimaryRecipient', pBool);
        this.setDisableFields('dfPrimaryAsGuardian', pBool);


        //this.setDisableFields('RespPartyContainer2', pBool);
        this.setDisableFields('rfname', pBool);
        this.setDisableFields('rmname', pBool);
        this.setDisableFields('rlname', pBool);


        //this.setDisableFields('RespPartyContainer3', pBool);
        this.setDisableFields('rcity', pBool);
        this.setDisableFields('rstate', pBool);


        //this.setDisableFields('RespPartyContainer4', pBool);
        this.setDisableFields('rhphone', pBool);
        this.setDisableFields('rwphone', pBool);
    },

    disableTopToolBar: function (pBool) {
        var view = this.getView();
        view.down('#cbxMember').setReadOnly(pBool);
        view.down('#cboMemberList').setReadOnly(pBool);
    },


    onCreateClick: function () {
        var view = this.getView();
        var vm = this.getViewModel();
        this.getView().down('#fpEnrollmentInfo').setCollapsed(false);
        Action = 'Create';
        view.down('#hiddenPrimaryId').setValue('');
        this.createMember();
        vm.getStore('PlanBenefitStore').removeAll();
        vm.getStore('storeMCSProgGroupCode').removeAll();
        vm.getStore('membercoveragehistorystore').removeAll();
        this.setDisableFields('fpEnrollmentInfo', false);
        view.down('#btnSave').setDisabled(false);
        view.down('#btnCancel').setDisabled(false);
        view.down('#btnCreateMember').setDisabled(true);
        view.down('#btnEditMember').setDisabled(true);
        view.down('#btnCreateEnrollment').setDisabled(true);
        this.disableTopToolBar(true);
        view.down('#cbxMember').setValue('');
        vm.getStore('memberfamilystore').removeAll();
        view.down('#cboMemberList').setRawValue('');
        view.down('#cboMemberList').setValue('');
        view.down('#lblMrxId').setValue('');


        //this.getView().down('#cbxMember').setDisabled(true);
        //this.getView().down('#cboMemberList').setDisabled(true);
        //this.getView().down('#btnSave').setDisabled(false);
        //this.getView().down('#btnCancel').setDisabled(false);
        // this.onPlanSelection(combo,record);

    },
    /******************End of Create a new Member*******************/

    /*cmbSearchPlanBenefit_BeforeQuery: function (combo, record) {
     var view = this.getView();
     if (combo.combo.store.data.length > 0) {
     var rcd = {
     data: {
     planGroupId : ''
     }
     };
     rcd.data.planGroupId = view.down('#cmbSearchPlanGroups').getValue()
     this.onPlanSelection('', rcd);
     }
     },*/

    onPlanSelection: function (combo, rcd) {
        var me = this;
        var view = this.getView();
        var planGroupId = rcd.data.planGroupId;
        var vm = this.getViewModel();
        view.down('#cmbSearchPlanBenefit').setReadOnly(false);
        view.down('#cmbSearchPlanBenefit').setValue('');
        //view.down('#cbxMCSProgGroupCode').setReadOnly(false);
        //view.down('#cbxMCSProgGroupCode').setValue('');
        view.down('#hidProgGroupCode').setValue('');

        var planbenefitstore = vm.getStore('PlanBenefitStore');
        //var modelBenefit = Ext.create('Atlas.plan.model.PlanBenefitListItem');
        //modelBenefit.load({
        //    scope: this,
        //    callback: function (record, operation, success) {
        //        var objRespBenefitStore = Ext.decode(operation.getResponse().responseText);
        //        var planIdList = {};
        //        var planBenefitList = [];
        //        objRespBenefitStore.data.forEach(function (item, index) {
        //            if (item.planGroupId == planGroupId) {
        //                planBenefitList.push(item);
        //            }
        //        });
        //        planbenefitstore.loadData(planBenefitList);
        //        view.down('#cmbSearchPlanBenefit').expand();
        //        view.down('#cmbSearchPlanBenefit').bindStore(planbenefitstore);
        //        //view.down('#cmbSearchPlanBenefit').loadRawData(planbenefitstore);
        //    }
        //});
        //var modelBenefit = Ext.create('Atlas.common.model.PlanBenefitExt');
        planbenefitstore.getProxy().setExtraParam('pWhere', " planGroupId = " + planGroupId);
        planbenefitstore.load();


        view.down('#hidPlanGroupId').setValue(rcd.data.planGroupId);
        view.down('#hidPlanGroupStatusCode').setValue(rcd.data.planGroupStatus);


        //--------------
        view.down('#hidCovPlanGroupId').setValue(rcd.data.planGroupId);
        this.setDisable(false);
        if (view.down('#ChkAddressSamePrimaryRecp').getValue() == false) {
            var fieldList = 'systemId,planGroupId,carrierId,carrierName,carrierAcctNumber,accountName,carrierLOBId,lobName,planGroupCode,planGroupName,effDate,renewalDate,termDate,planGroupStatus,exclFormularyId,formularyId,MACListID,allowMemberLocks,processMTMCase,processMAPCase,pharmNetworkId,nonPrefPharmNetworkId,planFaxLogo,allowMedAdminFee,medAdminFeeAmt,payablePatRespCodes,partBPCN,pcnCodeList,mandatoryGeneric,cmsPBPid,CMSPlanId,CMSFormularyId,CMSCntrId,CMSPlanType,asthmaHEDISAlert,copayCalcFunction,defMemberEnollAddrType,MbrCardFrontImage,MbrCardFrontCSS,MbrCardBackImage,MbrCardBackCSS,@DrugDataSource,PDEPlanType,useAllowedPrescribers,PayNonPartDIngredients';
            var modelPlanGroup = Ext.create('Atlas.portals.rxmember.model.PlanGroupInfo');
            modelPlanGroup.getProxy().setExtraParam('pplanGroupId', rcd.data.planGroupId);
            modelPlanGroup.getProxy().setExtraParam('pFieldList', fieldList);
            modelPlanGroup.load({
                scope: this,
                callback: function (record, operation, success) {
                    var objRespPlanGroup = Ext.decode(operation.getResponse().responseText);
                    var defaultAddress = objRespPlanGroup.data[0] != undefined ? objRespPlanGroup.data[0].defMemberEnollAddrType : '';
                    if (defaultAddress != '') {

                        var modelPlanAddress = Ext.create('Atlas.plan.model.PlanAddressList');
                        modelPlanAddress.getProxy().setExtraParam('ipiPlanGroupID', rcd.data.planGroupId);
                        modelPlanAddress.getProxy().setExtraParam('ipcPortalAddresses', '');
                        modelPlanAddress.load({
                            scope: this,
                            callback: function (record, operation, success) {
                                var objRespPlanAddress = Ext.decode(operation.getResponse().responseText);
                                if (objRespPlanAddress.data.length > 0) {
                                    this.setDisableFields('fpContactInfo', false);
                                    objRespPlanAddress.data.forEach(function (item, index) {
                                        if (item.AddressType == defaultAddress) {
                                            view.down('#haddress1').setValue(item.Address1);
                                            view.down('#haddress2').setValue(item.Address2);
                                            view.down('#hcity').setValue(item.City);
                                            view.down('#hstate').setValue(item.State);
                                            view.down('#hzip').setValue(item.ZipCode);
                                            view.down('#hphone').setValue(this.numberFormatter(item.PlanPhone, 'PHONE'));
                                            view.down('#email').setValue(item.Email);
                                            view.down('#addresstype').setValue(item.AddressType);
                                            me.setDisableFields('fpContactInfo', true);
                                        }
                                    });
                                }
                            }
                        });
                    }

                }
            });
        }
    },

    onPlanSelection_Win: function (combo, rcd) {
        var view = this.getView();
        var planGroupId = rcd.get('planGroupId');
        var vm = this.getViewModel();
        view.down('#cmbSearchPlanBenefitWin').setReadOnly(false);
        view.down('#cmbSearchPlanBenefitWin').setValue('');
        //view.down('#cbxMCSProgGroupCode').setReadOnly(false);
        //view.down('#cbxMCSProgGroupCode').setValue('');
        Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hidProgGroupCode')[0].setValue('');
        var planbenefitstore = vm.getStore('PlanBenefitStore');
        planbenefitstore.getProxy().setExtraParam('pWhere', " planGroupId = " + planGroupId);
        planbenefitstore.load();
        /*var modelBenefit = Ext.create('Atlas.plan.model.PlanBenefitListItem');
         modelBenefit.load({
         scope: this,
         callback: function (record, operation, success) {
         var objRespBenefitStore = Ext.decode(operation.getResponse().responseText);
         var planIdList = {};
         var planBenefitList = [];
         objRespBenefitStore.data.forEach(function (item, index) {
         if (item.planGroupId == planGroupId) {
         planBenefitList.push(item);
         }
         });
         planbenefitstore.loadData(planBenefitList);
         }
         });*/
        //view.down('#hidPlanGroupId').setValue(rcd.get('planGroupId'));
        //view.down('#hidPlanGroupStatusCode').setValue(rcd.get('planGroupStatus'));

        Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hidPlanGroupId')[0].setValue(rcd.get('planGroupId'));
        Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hidPlanGroupStatusCode')[0].setValue(rcd.get('planGroupStatus'));


    },


    onBenefitSelection: function (cntrl, rcd) {
        var view = this.getView();
        var vm = this.getViewModel();
        view.down('#hdnParentPlanGroupId').setValue(rcd.data.planGroupId);
        view.down('#hdnParentPlanBenefitId').setValue(rcd.data.planBenefitId);
        view.down('#hdnParentPlanBenefitStatus').setValue(rcd.data.benefitStatus);
        //view.down('#cbxMCSProgGroupCode').setValue('');
        vm.getStore('storeMCSProgGroupCode').removeAll();
        view.down('#hidProgGroupCode').setValue('');
        //Ext.net.DirectMethods.GetPlanProgramCodes(Ext.getCmp('cmbSearchPlanGroups').getValue(), SelectedValue, false);
        //var modelPlanProgCode = Ext.create('Atlas.plan.model.PlanProgramCode');
        //modelPlanProgCode.getProxy().setExtraParam('pPlanGroupId', view.down('#cmbSearchPlanGroups').getValue());
        //modelPlanProgCode.getProxy().setExtraParam('pPlanBenefitId', 0);
        //modelPlanProgCode.getProxy().setExtraParam('pCarrierID', 0);
        //modelPlanProgCode.getProxy().setExtraParam('pCarrierAccountNumber', '');
        //modelPlanProgCode.getProxy().setExtraParam('pLobID', 0);
        var storeProgCode = vm.getStore('storeMCSProgGroupCode');
        storeProgCode.getProxy().setExtraParam('pPlanGroupId', view.down('#cmbSearchPlanGroups').getValue());
        storeProgCode.getProxy().setExtraParam('pPlanBenefitId', 0);
        storeProgCode.getProxy().setExtraParam('pCarrierID', 0);
        storeProgCode.getProxy().setExtraParam('pCarrierAccountNumber', '');
        storeProgCode.getProxy().setExtraParam('pLobID', 0);
        storeProgCode.load({
            scope: this,
            callback: function (record, operation, success) {
                var activeProgramCodes1 = [];
                var objRespPlanProgCode = Ext.decode(operation.getResponse().responseText);
                objRespPlanProgCode.data.forEach(function (item, index) {
                    if (item.active == true) {
                        activeProgramCodes1.push(item);
                    }
                });

                if (rcd.data.planBenefitId > 0) {
                    var modelPlanProgCode2 = Ext.create('Atlas.plan.model.PlanProgramCode');
                    modelPlanProgCode2.getProxy().setExtraParam('pPlanGroupId', view.down('#cmbSearchPlanGroups').getValue());
                    modelPlanProgCode2.getProxy().setExtraParam('pPlanBenefitId', rcd.data.planBenefitId);
                    modelPlanProgCode2.getProxy().setExtraParam('pCarrierID', 0);
                    modelPlanProgCode2.getProxy().setExtraParam('pCarrierAccountNumber', '');
                    modelPlanProgCode2.getProxy().setExtraParam('pLobID', 0);
                    modelPlanProgCode2.load({
                        scope: this,
                        callback: function (record, operation, success) {
                            var activeProgramCodes2 = [];
                            var objRespPlanProgCode2 = Ext.decode(operation.getResponse().responseText);
                            objRespPlanProgCode2.data.forEach(function (item, index) {
                                if (item.active == true) {
                                    activeProgramCodes2.push(item);
                                }
                            });
                            var arrFinal = activeProgramCodes1.concat(activeProgramCodes2);
                            if (arrFinal != null && arrFinal.length > 0) {
                                vm.getStore('storeMCSProgGroupCode').loadData(arrFinal);
                                view.down('#cbxMCSProgGroupCode').bindStore(vm.getStore('storeMCSProgGroupCode'));
                            }
                        }
                    });
                }
            }
        });

        view.down('#cbxMCSProgGroupCode').setDisabled(false);
    },

    onBenefitSelection_Win: function (cntrl, rcd) {
        var view = this.getView();
        var vm = this.getViewModel();
        Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hdnParentPlanGroupId')[0].setValue(rcd.data.planGroupId);
        Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hdnParentPlanBenefitId')[0].setValue(rcd.data.planBenefitId);
        Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hdnParentPlanBenefitStatus')[0].setValue(rcd.data.benefitStatus);

        //view.down('#cbxMCSProgGroupCode').setValue('');
        vm.getStore('storeMCSProgGroupCode').removeAll();

        Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hidProgGroupCode')[0].setValue('');

        //var modelPlanProgCode = Ext.create('Atlas.plan.model.PlanProgramCode');
        //modelPlanProgCode.getProxy().setExtraParam('pPlanGroupId', view.down('#cmbSearchPlanGroupsWin').getValue());
        //modelPlanProgCode.getProxy().setExtraParam('pPlanBenefitId', 0);
        //modelPlanProgCode.getProxy().setExtraParam('pCarrierID', 0);
        //modelPlanProgCode.getProxy().setExtraParam('pCarrierAccountNumber', '');
        //modelPlanProgCode.getProxy().setExtraParam('pLobID', 0);
        var storeProgCode = vm.getStore('storeMCSProgGroupCode');
        storeProgCode.getProxy().setExtraParam('pPlanGroupId', view.down('#cmbSearchPlanGroups').getValue());
        storeProgCode.getProxy().setExtraParam('pPlanBenefitId', 0);
        storeProgCode.getProxy().setExtraParam('pCarrierID', 0);
        storeProgCode.getProxy().setExtraParam('pCarrierAccountNumber', '');
        storeProgCode.getProxy().setExtraParam('pLobID', 0);
        storeProgCode.load({
            scope: this,
            callback: function (record, operation, success) {
                var activeProgramCodes1 = [];
                var objRespPlanProgCode = Ext.decode(operation.getResponse().responseText);
                objRespPlanProgCode.data.forEach(function (item, index) {
                    if (item.active == true) {
                        activeProgramCodes1.push(item);
                    }
                });

                if (rcd.data.planBenefitId > 0) {
                    var modelPlanProgCode2 = Ext.create('Atlas.plan.model.PlanProgramCode');
                    modelPlanProgCode2.getProxy().setExtraParam('pPlanGroupId', view.down('#cmbSearchPlanGroupsWin').getValue());
                    modelPlanProgCode2.getProxy().setExtraParam('pPlanBenefitId', rcd.data.planBenefitId);
                    modelPlanProgCode2.getProxy().setExtraParam('pCarrierID', 0);
                    modelPlanProgCode2.getProxy().setExtraParam('pCarrierAccountNumber', '');
                    modelPlanProgCode2.getProxy().setExtraParam('pLobID', 0);
                    modelPlanProgCode2.load({
                        scope: this,
                        callback: function (record, operation, success) {
                            var activeProgramCodes2 = [];
                            var objRespPlanProgCode2 = Ext.decode(operation.getResponse().responseText);
                            objRespPlanProgCode2.data.forEach(function (item, index) {
                                if (item.active == true) {
                                    activeProgramCodes2.push(item);
                                }
                            });
                            var arrFinal = activeProgramCodes1.concat(activeProgramCodes2);
                            if (arrFinal != null && arrFinal.length > 0) {
                                vm.getStore('storeMCSProgGroupCode').loadData(arrFinal);
                                view.down('#cbxMCSProgGroupCodeWin').bindStore(vm.getStore('storeMCSProgGroupCode'));
                            }
                        }
                    });
                }

            }
        });

        view.down('#cbxMCSProgGroupCodeWin').setDisabled(false);
    },

    fromToDateCheck: function (effDate, termDate) {
        var returnValue = true;
        if (termDate.getValue() != null) {
            var d1 = new Date(effDate.getValue());
            var d2 = new Date(termDate.getValue());

            //var timeDiff = d2.getTime() - d1.getTime();
            var diffDays = Math.ceil(Math.ceil((Math.abs(d2.getTime() - d1.getTime())) / (1000 * 3600 * 24)) / 365);
            //var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (diffDays < 0) {
                var message = 'Effective Date must be less than Terminatioin Date.';
                if (effDate.itemId == 'dtAltInsEffDate' || effDate.itemId == 'dtAltInsEffDateWin') {
                    message = 'Alt Ins Effective Date must be less than Alt Ins Terminatioin Date.';
                }
                returnValue = false;
                Ext.Msg.alert('PBM', message);
            }
            return returnValue;
        }
        else {
            return returnValue;
        }
    },

    onSaveClick: function () {
        var view = this.getView();
        if (this.fromToDateCheck(view.down('#effdate'), view.down('#termdate')) == false || this.fromToDateCheck(view.down('#altedate'), view.down('#alttdate')) == false) {
            return;
        }
        else if (this.beforeSave() == false) {
            return
        }
        var saveMessage = '';
        var pRequestIDCard = '';
        var dtMember = {};
        var dtResponse = {};
        var dtAddress = {};
        var dtEnrollment = {};
        var dtMemberBasicInfo;

        if (Action.toString().toUpperCase() == "CREATE") {
            dtMember.recipientID = (view.down('#hdnIsForcefullyEnroll').getValue() == '' || view.down('#hdnIsForcefullyEnroll').getValue() == false || view.down('#hdnIsForcefullyEnroll').getValue() == 'false') ? 0 : view.down('#hiddenRecipientId').getValue();
            dtMember.SystemID = 0;
            dtMember.Action = 'Add';
            pRequestIDCard = view.down('#hdnRequestIDCard').getValue() == '' ? 'N' : view.down('#hdnRequestIDCard').getValue();
            dtEnrollment.Action = "Add";
            dtEnrollment.memberId = view.down('#memId').getValue();
            dtEnrollment.PersonCode = view.down('#pcode').getValue();
            dtEnrollment.RecipientId = 0;
            dtEnrollment.PlanGroupId = view.down('#cmbSearchPlanGroups').getValue();
            dtEnrollment.PlanBenefitID = view.down('#cmbSearchPlanBenefit').getValue();
            if (view.down('#effdate').getValue() == null) {
                dtEnrollment.EffDate = '';
            }
            else {
                dtEnrollment.EffDate = Ext.Date.format(view.down('#effdate').getValue(), 'Y/m/d');
            }
            if (view.down('#termdate').getValue() == null) {
                dtEnrollment.TermDate = '';
            }
            else {
                dtEnrollment.TermDate = Ext.Date.format(view.down('#termdate').getValue(), 'Y/m/d');
            }
            dtEnrollment.TermReason = '';
            dtEnrollment.SystemId = 0;
            dtEnrollment.RelationShipCode = view.down('#relation').getValue();

            dtEnrollment.PrimRecipientId = view.down('#hiddenPrimaryId').getValue() == '' ? 0 : view.down('#hiddenPrimaryId').getValue();
            dtEnrollment.mcsProgGroupCode = view.down('#hidProgGroupCode').getValue();
            dtEnrollment.mcsProgramCode = view.down('#hidProgBenefitCode').getValue();


            dtEnrollment.AltInsInd = view.down('#ind').getValue();
            dtEnrollment.AltInsMemberID = view.down('#altid').getValue();
            dtEnrollment.AltInsCarrierName = view.down('#altcname').getValue();
            dtEnrollment.AltMemberId = view.down('#hicn').getValue();

            if (view.down('#altedate').getValue() == null) {
                dtEnrollment.AltInsEffDate = '';
            }
            else {
                dtEnrollment.AltInsEffDate = Ext.Date.format(view.down('#altedate').getValue(), 'Y/m/d');
            }
            if (view.down('#alttdate').getValue() == null) {
                dtEnrollment.AltInsTermDate = '';
            }
            else {
                dtEnrollment.AltInsTermDate = Ext.Date.format(view.down('#alttdate').getValue(), 'Y/m/d');
            }
        }
        else {
            dtMember.recipientID = view.down('#hiddenRecipientId').getValue();
            dtMember.SystemID = view.down('#hiddenSystemID').getValue();
            dtMember.Action = "Update";
        }

        dtMember.firstName = view.down('#fname').getValue();
        dtMember.middleName = view.down('#mname').getValue();
        dtMember.lastName = view.down('#lname').getValue();
        dtMember.birthDate = Ext.Date.format(view.down('#bdate').getValue(), 'Y/m/d');
        dtMember.socSecNum = view.down('#ssn').getValue();
        dtMember.langCode = view.down('#langcode').getValue();
        dtMember.gender = view.down('#gender').getValue();
        dtMember.suffix = view.down('#suffix').getValue();

        if (view.down('#mpin').getValue().length > 0) {
            dtMember.MobilePin = view.down('#mpin').getValue();
        }
        dtMember.race = view.down('#race').getValue();
        if (view.down('#ddate').getValue() != null) {
            dtMember.deathDate = Ext.Date.format(view.down('#ddate').getValue(), 'Y/m/d');
        }
        else {
            dtMember.deathDate = view.down('#ddate').getValue();
        }

        if (view.down('#maccess').getValue() == true) {
            dtMember.MobileAccess = true;
        }
        else {
            dtMember.MobileAccess = false;
        }
        if (view.down('#hiddenPrimaryId').getValue().length > 0) {
            dtMember.primRecipientId = view.down('#hiddenPrimaryId').getValue();
        }
        else {
            dtMember.primRecipientId = 0;
        }

        if (view.down('#raccess').getValue() == true) {
            dtMember.restrictAccess = true;
        }
        else {
            dtMember.restrictAccess = false;
        }

        dtMember.maritalStatus = view.down('#mstatus').getValue();
        if (view.down('#hiddenAction').getValue().toString().toUpperCase() == 'CREATE') {
            saveMessage = "User is created";
        }
        else {
            saveMessage = "User is updated";
        }
        var Birthdate = Ext.Date.format(view.down('#bdate').getValue(), 'Y/m/d');
        var ActualAge = Math.ceil(Math.ceil((Math.abs((new Date()).getTime() - new Date(Birthdate).getTime())) / (1000 * 3600 * 24)) / 365);
        var MemberAge = ActualAge;
        if (ActualAge < 18) {
            dtResponse.RespAddress1 = view.down('#raddress1').getValue();
            dtResponse.RespAddress2 = view.down('#raddress2').getValue();
            dtResponse.RespCity = view.down('#rcity').getValue();
            dtResponse.RespFirstName = view.down('#rfname').getValue();
            dtResponse.RespMiddleName = view.down('#rmname').getValue();
            dtResponse.RespLastName = view.down('#rlname').getValue();
            dtResponse.RespState = view.down('#rstate').getValue();
            dtResponse.RespWorkPhone = view.down('#rwphone').getValue();
            dtResponse.RespHomePhone = view.down('#rhphone').getValue();
            dtResponse.RespZipCode = view.down('#rzip').getValue();
        }
        //Regex.Replace(txtPlanPhone.Text, @"[()-]", string.Empty).Replace(" ", string.Empty);
        dtAddress.address1 = view.down('#haddress1').getValue();
        dtAddress.address2 = view.down('#haddress2').getValue();
        dtAddress.city = view.down('#hcity').getValue();
        dtAddress.State = view.down('#hstate').getValue();
        dtAddress.ZipCode = view.down('#hzip').getValue();
        dtAddress.HomePhone = view.down('#hphone').getValue();
        dtAddress.WorkPhone = view.down('#wphone').getValue();
        dtAddress.CellPhone = view.down('#cphone').getValue();
        dtAddress.name = view.down('#addresstype').getValue();
        dtAddress.Email = view.down('#email').getValue();
        dtAddress.systemID = null;
        dtAddress.parentSystemID = null;
        var IsForcefullyEnroll = (view.down('#hdnIsForcefullyEnroll').getValue() == '' || view.down('#hdnIsForcefullyEnroll').getValue() == false) ? false : true;

        var ttmemberMaster = {};
        ttmemberMaster.ttmemberMaster = [];
        if (dtMember.firstName != undefined) {
            ttmemberMaster.ttmemberMaster.push(dtMember);
        }


        var ttRespContact = {};
        ttRespContact.ttRespContact = [];
        if (dtResponse.RespAddress1 != undefined) {
            ttRespContact.ttRespContact.push(dtResponse);
        }

        var ttAddress = {};
        ttAddress.ttAddress = [];
        if (dtAddress.address1 != undefined) {
            ttAddress.ttAddress.push(dtAddress);
        }


        var ttEnrollment = {};
        ttEnrollment.ttEnrollment = [];
        if (dtEnrollment.Action != undefined) {
            ttEnrollment.ttEnrollment.push(dtEnrollment);
        }

        var setMemberMasterModel = Ext.create('Atlas.member.model.MemberMasterSet');
        setMemberMasterModel.getProxy().setExtraParam('pRequestIDCard', pRequestIDCard);
        setMemberMasterModel.getProxy().setExtraParam('ttmemberMaster', ttmemberMaster);
        setMemberMasterModel.getProxy().setExtraParam('ttRespContact', ttRespContact);
        setMemberMasterModel.getProxy().setExtraParam('ttAddress', ttAddress);
        setMemberMasterModel.getProxy().setExtraParam('ttEnrollment', ttEnrollment);
        setMemberMasterModel.getProxy().setExtraParam('iplForceEnroll', IsForcefullyEnroll);
        setMemberMasterModel.phantom = false;
        setMemberMasterModel.save({
            scope: this,
            callback: function (record, operation, success) {
                var objRespMemberMaster = Ext.decode(operation.getResponse().responseText);
                //Ext.Msg.alert('PBM', saveMessage);
                view.down('#hiddenresult').setValue(objRespMemberMaster.message[0].code);
                view.down('#hiddenRecipientId').setValue(objRespMemberMaster.metadata.opiRecipientId);
                if (objRespMemberMaster.message[0].code == 0 && objRespMemberMaster.data.length > 0) {
                    view.down('#hdnResultValue').setValue(objRespMemberMaster.message[0].code);
                    view.down('#hdnIsForcefullyEnroll').setValue(false);
                }
                else if (objRespMemberMaster.message[0].code == 0 && objRespMemberMaster.metadata.opiRecipientId != undefined) {
                    view.down('#hdnResultValue').setValue(objRespMemberMaster.message[0].code);
                    //StatusBar1.SetStatus(new StatusBarStatusConfig
                    //{
                    //    Text = saveMessage,
                    //        IconCls = " ",
                    //        Icon = Icon.Accept,
                    //        Clear2 = true
                    //});
                }
                else if (objRespMemberMaster.message[0].code == 1 && objRespMemberMaster.data != undefined && objRespMemberMaster.data.length > 0) {
                    view.down('#hdnIsForcefullyEnroll').setValue(false);
                    //view.down('#btnCreate').Hidden = (!string.IsNullOrWhiteSpace(txtSSN.Text));
                    //view.down('#btnClose').Hidden = string.IsNullOrWhiteSpace(txtSSN.Text);
                    //storeMemberBasicInfo.DataSource = dtMemberBasicInfo;
                    //storeMemberBasicInfo.DataBind();
                    //winMemberBasicInfo.Show();
                    win = Ext.create({
                        xtype: 'memberbasicinfowin',
                        extraParams: {
                            dtMemBasicInfo: objRespMemberMaster.data,
                            isHideBtnCreate: view.down('#ssn').getValue() == '' ? false : true,
                            isHideBtnClose: view.down('#ssn').getValue() == '' ? true : false
                        },
                        autoShow: true
                    });
                    this.getView().add(win);


                    view.down('#hdnResultValue').setValue(objRespMemberMaster.message[0].code);
                }
                else {
                    //StatusBar1.SetStatus(new StatusBarStatusConfig
                    //{
                    //    Text = "Error",
                    //        IconCls = " ",
                    //        Icon = Icon.Error,
                    //        Clear2 = true
                    //});
                    //Ext.Net.ResourceManager.AjaxSuccess = false;
                    //Ext.Net.ResourceManager.AjaxErrorMessage = pMesaage;
                    Ext.Msg.alert("Error", objRespMemberMaster.message[0].message);
                    return;
                }
                view.down('#hdnIsForcefullyEnroll').setValue(false);
                if (view.down('#hdnResultValue').getValue() == '0') {
                    this.saveSucess();
                    this.saveSuccessEnrollment();
                }
                view.down('#hdnResultValue').setValue('');
            }
        });

        /*var ttmemberMasterlist = [];
         ttmemberMasterlist.push(dtMember);
         var ttmemberMaster2 = {};
         ttmemberMaster2.ttmemberMaster = ttmemberMasterlist;



         var ttRespContactlist = [];
         ttRespContactlist.push(dtResponse);
         var ttRespContact2 = {};
         ttRespContact2.ttRespContact = ttRespContactlist;

         var ttAddresslist = [];
         ttAddresslist.push(dtAddress);
         var ttAddress2 = {};
         ttAddress2.ttAddress = ttAddresslist;

         var ttEnrollmentlist = [];
         ttEnrollmentlist.push(dtEnrollment);
         var ttEnrollment2 = {};
         ttEnrollment2.ttEnrollment = ttEnrollmentlist;


         var listStore = [{}];
         var iplForceEnroll = false;
         /!*var extraParameter = {
         'pRequestIDCard': 'N',
         'iplForceEnroll': iplForceEnroll,
         'ttmemberMaster': ttmemberMaster2,
         'ttRespContact': ttRespContact2,
         'ttAddress': ttAddress2,
         'ttEnrollment': ttEnrollment2
         };*!/
         var extraParameter = {
         'pRequestIDCard': 'N',
         'iplForceEnroll': iplForceEnroll,
         'ttmemberMaster': dtMember,
         'ttRespContact': dtResponse,
         'ttAddress': dtAddress,
         'ttEnrollment': dtEnrollment
         };
         var saveAction = [{"Save": {"key": "mode", "value": "Update"}}];
         var tempTableList = '';
         var testReturn = Atlas.common.utility.Utilities.saveData(listStore, 'member/rx/membermaster/update', null, true, extraParameter,
         saveAction, null);*/

    },

    onCancelClick: function () {
        var view = this.getView();
        var vm = this.getViewModel();
        view.down('#fpEnrollmentInfo').setCollapsed(true);
        view.down('#hiddenAction').setValue('');
        this.setDisable(true);
        view.down('#btnSave').setDisabled(true);
        view.down('#btnCreateMember').setDisabled(false);
        view.down('#btnCancel').setDisabled(true);
        this.disableTopToolBar(false);
        if (view.down('#cbxMember').getValue() == '' || view.down('#cbxMember').getValue() == undefined || view.down('#cbxMember').getValue() == null) {
            this.resetEntireFields();
            if (view.down('#hiddenRecipientId').getValue() == '') {
                view.down('#btnEditMember').setDisabled(true);
                view.down('#btnCreateEnrollment').setDisabled(true);
            }
            else {
                view.down('#btnEditMember').setDisabled(false);
                view.down('#btnCreateEnrollment').setDisabled(false);
            }
            vm.getStore('memberfamilystore').removeAll();
            this.cbxMember_OnSelect();
            view.down('#cboMemberList').setValue(view.down('#hiddenRecipientId').getValue());
        }
        else {
            this.cbxMember_OnSelect();
            view.down('#btnEditMember').setDisabled(false);
            view.down('#btnCreateEnrollment').setDisabled(false);
        }

    },

    saveSuccessEnrollment: function () {
        var vm = this.getViewModel();
        Ext.ComponentQuery.query('#coverageGrid')[0].setDisabled(false);
        var pgHidden = Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0];
        var pgTbrBottom = Ext.ComponentQuery.query('#tbrBottom')[0];
        var memberCoverageHistoryStore = vm.getStore('membercoveragehistorystore');
        memberCoverageHistoryStore.getProxy().setExtraParam('pKeyValue', pgHidden.query('#hiddenRecipientId')[0].getValue());
        memberCoverageHistoryStore.load({
            scope: this,
            callback: function (record, operation, success) {
                var objRespCoverageHistory = Ext.decode(operation.getResponse().responseText);
                pgHidden.query('#hiddenRecipientId')[0].setValue(objRespCoverageHistory.data[0].tRecipientID);
                pgHidden.query('#hiddenMemberId')[0].setValue(objRespCoverageHistory.data[0].tmemberId);
                pgHidden.query('#hiddenLOBId')[0].setValue(objRespCoverageHistory.data[0].CarrierLOBid);
                pgHidden.query('#hidMemberDetailsSystemId')[0].setValue(objRespCoverageHistory.data[0].MemDetailsSysId);
            }


        });
        //view.down('#winEnrollmentdetail').hide();
        //view.down('#winNotes').hide();
        pgTbrBottom.query('#btnEditMember')[0].setDisabled(false);
        pgTbrBottom.query('#btnCreateEnrollment')[0].setDisabled(false);
    },

    saveSucess: function () {
        var pgForm = Ext.ComponentQuery.query('#formid')[0];
        var pgHidden = Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0];
        var pgTbrBottom = Ext.ComponentQuery.query('#tbrBottom')[0];
        var view = this.getView();
        var vm = this.getViewModel();
        pgForm.query('#fpEnrollmentInfo')[0].setCollapsed(true);
        if (pgHidden.query('#hiddenresult')[0].getValue() == '0') {
            if (pgHidden.query('#hiddenAction')[0].getValue() == 'Create') {
                Ext.defer(function () {
                    Ext.ComponentQuery.query('#cbxMember')[0].setValue(pgHidden.query('#hiddenRecipientId')[0].getValue());
                }, 300);

            }
            pgTbrBottom.query('#btnSave')[0].setDisabled(true);
            pgTbrBottom.query('#btnCreateMember')[0].setDisabled(false);
            pgTbrBottom.query('#btnCancel')[0].setDisabled(true);
            this.disableTopToolBar(false);
            this.resetEntireFields();
            this.getMember(pgHidden.query('#hiddenRecipientId')[0].getValue());
            this.setDisable(true);

            if (pgHidden.query('#hiddenAction')[0].getValue() == 'Create') {
                var userName = pgHidden.query('#hiddenRecipientId')[0].getValue();
                pgHidden.query('#hiddenAction')[0].setValue('Edit');
            }
            pgHidden.query('#hiddenAction')[0].setValue('');
            Ext.defer(function () {
                Ext.ComponentQuery.query('#cbxMember')[0].setRawValue(pgHidden.query('#hdnMemberId')[0].getValue() + ' ' + pgForm.query('#fname')[0].getValue() + ' ' + pgForm.query('#mname')[0].getValue() + ' ' + pgForm.query('#lname')[0].getValue());
            }, 300);

        }
        if (pgHidden.query('#hdnAction')[0].getValue().toUpperCase() == 'CREATE') {
            vm.getStore('membercoveragehistorystore').removeAll();
        }
    },

    termMembers: function () {
        var view = this.getView();
        var modelTermMember = Ext.create('Atlas.member.model.TermMembersModel');
        modelTermMember.getProxy().setExtraParam('pOutFileName', '');
        modelTermMember.getProxy().setExtraParam('pParameters', '');
        modelTermMember.phantom = false;
        modelTermMember.save({
            scope: this,
            callback: function (record, operation, success) {
                var objRespTermMember = Ext.decode(operation.getResponse().responseText);
                if (objRespTermMember.message[0].code == 0) {
                    Ext.Msg.alert('Message', 'Term Members Procedure has been executed.');
                    Ext.ComponentQuery.query('#no')[0].setDisabled(false);
                }
                else {
                    Ext.Msg.alert('Error', 'Error happened in during the execution.');
                }
            }
        });
    },

    outputResults: function () {
        var view = this.getView();
        Ext.Msg.confirm('confirm', 'Output files has been generated and email to TermMembersRecipients e-mail list.', function (id, value) {
            if (id === 'yes') {
                Ext.ComponentQuery.query('#no')[0].setDisabled(true);
            }
        }, this);
    },

    beforeSave: function () {
        var view = this.getView();
        if (view.down('#bdate').getValue() != null) {
            var dt = new Date();
            var month = dt.getMonth() + 1;
            var day = dt.getDate();
            var year = dt.getFullYear();

            var dt1 = new Date(view.down('#bdate').getValue());

            if (view.down('#ddate').getValue() != null) {

                var deathdate = new Date(view.down('#ddate').getValue());
                {
                    if (deathdate < dt1) {
                        Ext.Msg.alert('Error', 'Death Date should not be less then Birth Date');
                        return false;
                    }
                    if(deathdate > new Date()){
                        Ext.Msg.alert('Error', 'Death Date should not be future Date');
                        view.down('#ddate').setValue('');
                        return false;
                    }
                }
            }
            var ActualAge = Math.ceil(Math.ceil((Math.abs((dt).getTime() - new Date(dt1).getTime())) / (1000 * 3600 * 24)) / 365);
            if (ActualAge < 18) {
                view.down('#addresstype').allowBlank = true;
                view.down('#haddress1').allowBlank = true;
                view.down('#hcity').allowBlank = true;
                view.down('#hstate').allowBlank = true;
                view.down('#hzip').allowBlank = true;
                view.down('#hphone').allowBlank = true;
                if (view.down('#rcity').getValue() == '' || view.down('#rstate').getValue() == '' || view.down('#rzip').getValue() == '' || view.down('#rlname').getValue() == '' ||
                    view.down('#rfname').getValue() == '' || view.down('#raddress1').getValue() == '') {
                    Ext.Msg.alert('Error', 'Please Enter Details for Primary Guardian');

                    return false;
                } //Ext.getCmp('txtCity').getValue() == '' || Ext.getCmp('txtState').getValue() == '' || ....


            }
            else {
                view.down('#addresstype').allowBlank = false;
                view.down('#haddress1').allowBlank = false;
                view.down('#hcity').allowBlank = false;
                view.down('#hstate').allowBlank = false;
                view.down('#hzip').allowBlank = false;
                view.down('#hphone').allowBlank = false;

            }

        }
        var valid = view.down('#fpGeneralInfo').getForm().isValid();
        var validAddress = view.down('#fpContactInfo').getForm().isValid();
        var validEnroll = view.down('#fpEnrollmentInfo').getForm().isValid();

        var validGuardian = view.down('#fpGuardianInfo').getForm().isValid();
        if (valid) {
            valid = view.down('#fpOtherInfo').getForm().isValid();
        }


        if (valid && validAddress && validGuardian && validEnroll) {
            //Ext.getCmp('StatusBar1').showBusy('Saving form...');

        } else {
            Ext.Msg.alert('Error', 'Please Enter valid Field values');
            return false;
        }
        if (view.down('#hiddenAction').getValue() == 'Create') {
            if (!view.down('#fpEnrollmentInfo').getForm().isValid()) {
                Ext.Msg.alert('Error', 'Please Enter All Required Member Enrollment Information.');
                return false;
            }
            if (view.down('#cmbSearchPlanBenefit').getRawValue() == 'CMCEMPRX01' || view.down('#cmbSearchPlanBenefit').getRawValue() == 'CMCEXCRX01') {
                if (confirm('Do you want to submit an ID card request for this member\'s enrollment?')) {
                    view.down('#hdnRequestIDCard').setValue('Y');
                }
                else {
                    view.down('#hdnRequestIDCard').setValue('N');
                }

            }
            else {
                view.down('#hdnRequestIDCard').setValue('N');
            }
        }

        return true;
    },

    beforeSaveEnrollment: function () {
        var view = this.getView();
        var pg = Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0];
        if (view.down('#cmbSearchPlanGroupsWin').hidden == false) {
            view.down('#cmbSearchPlanGroupsWin').allowBlank = false;
        }
        else {
            view.down('#cmbSearchPlanGroupsWin').allowBlank = true;
        }
        if (pg.query('#hdnAction')[0].getValue() == 'Create' && view.down('#cmbSearchPlanGroupsWin').hidden == false && view.down('#cmbSearchPlanGroupsWin').getRawValue() == '') {
            Ext.Msg.alert('Message', 'Please Select Plan Groups');
            return false;
        }
        if (pg.query('#hdnAction')[0].getValue() == 'Create' && view.down('#txtTempPlanGroup').hidden == false && view.down('#txtTempPlanGroup').getRawValue() == '') {
            Ext.Msg.alert('Message', 'Please Select Plan Groups');
            return false;
        }

        if (pg.query('#hdnAction')[0].getValue() == 'Create' && view.down('#cmbSearchPlanBenefitWin').getRawValue() == '') {
            Ext.Msg.alert('Message', 'Please Select Plan Benifit');
            return false;
        }
        if (pg.query('#hdnAction')[0].getValue() == 'Edit' && view.down('#formWinEnrollment').getForm().isValid() && view.down('#TermDateWin').getValue() != null) {
            if (new Date(view.down('#TermDateWin').getValue()).setHours(0, 0, 0, 0) == new Date(Ext.ComponentQuery.query('#coverageGrid')[0].getSelectionModel().selected.items[0].data.tTermDate).setHours(0, 0, 0, 0)) {
                //view.down('#txtNotesWin').setValue(Ext.ComponentQuery.query('#coverageGrid')[0].getSelectionModel().selected.items[0].data.tTermReason);
                //view.down('#txtNotesWin').setDisabled(true);
                Ext.ComponentQuery.query('#winNotesEditEnrollment')[0].query('#txtNotesWin')[0].setValue(Ext.ComponentQuery.query('#coverageGrid')[0].getSelectionModel().selected.items[0].data.tTermReason);
                Ext.ComponentQuery.query('#winNotesEditEnrollment')[0].query('#txtNotesWin')[0].setDisabled(true);
            }
            else {
                /* var winNotes = Ext.create(WinNotes);
                 view.add(winNotes);
                 winNotes.show();*/
                win = Ext.create({
                    xtype: 'memaddeditnoteswin',
                    autoShow: true
                });

                this.getView().add(win);
                //win.show();

                //Ext.ComponentQuery.query('#winNotesEditEnrollment')[0].query('#txtNotesWin')[0].setValue('');
                //Ext.ComponentQuery.query('#winNotesEditEnrollment')[0].query('#txtNotesWin')[0].setDisabled(false);

                //view.down('#txtNotesWin').setValue('');
                //view.down('#txtNotesWin').setDisabled(false);
                //winNotes.show();
                return false;
            }

        }
        var valid = view.down('#formWinEnrollment').getForm().isValid();
        if (valid) {

            if (view.down('#cmbSearchPlanBenefitWin').getRawValue() == 'CMCEMPRX01' || view.down('#cmbSearchPlanBenefitWin').getRawValue() == 'CMCEXCRX01') {
                if (pg.query('#hdnAction')[0].getValue() == 'Create') {
                    if (confirm('Do you want to submit an ID card request for this member\'s enrollment?')) {
                        pg.query('#hdnRequestIDCard')[0].setValue('Y');
                    }
                    else {
                        pg.query('#hdnRequestIDCard')[0].setValue('N');
                    }
                }
            }
            else {
                pg.query('#hdnRequestIDCard')[0].setValue('N');
            }
        }
        else {
            Ext.Msg.alert('Error', 'Please Enter valid field values');
        }
        return valid;
    },

    formatPhoneNumber: function (control, e) {
        var i;
        var returnString = '';
        var s = control.getValue();
        if (s.charAt(0) == '+') {
            return false;
        }
        filteredValues = '"`!@#$%^&*()_+|~-=\QWERT YUIOP{}ASDFGHJKL:ZXCVBNM<>?qwertyuiop[]asdfghjkl;zxcvbnm,./\\\'';

        /* Search through string and append to unfiltered values
         to returnString. */
        for (i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if ((filteredValues.indexOf(c) == -1) & (returnString.length <= 13)) {
                if (returnString.length == 0) returnString += '(';
                if (returnString.length == 4) returnString += ')';
                if (returnString.length == 5) returnString += '-';
                if (returnString.length == 9) returnString += '-';
                returnString += c;
            }
        }
        control.setValue(returnString);

        return false;
    },

    btnCancelWin_Click: function () {
        var win = Ext.WindowManager.getActive();
        if (win) {
            win.close();
        }
    },


    btnSaveWin_Click: function (winNotes) {
        var view = this.getView();
        var vm = this.getViewModel();
        //if (source == 'winNotesEditEnrollment') {
        // view = view.up().up();
        // vm = view.getViewModel();
        // }
        //notes = notes == undefined ? '' : notes;
        /*if (source != undefined && source != 'winNotesEditEnrollment' && this.beforeSaveEnrollment() == false) {
         return false;
         }*/
        if (this.beforeSaveEnrollment() == false) {
            return false;
        }
        else {
            var termReason = winNotes;//Ext.ComponentQuery.query('#winNotesEditEnrollment')[0].query('#txtNotesWin')[0].getValue();//view.down('#txtNotesWin').getValue();
            var systemID = Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hiddenEnrollmentSystemID')[0].getValue();
            var memberID = view.down('#txtMemberIDWin').getValue();
            var personCode = view.down('#txtPersonCodeWin').getValue();

            var AltInsInd = view.down('#chkAltInsIndWin').getValue();
            var AltInsID = view.down('#txtAltInsIdWin').getValue();
            var AltInsCarrierName = view.down('#txtAltInsNameWin').getValue();


            var AltInsEffDate = view.down('#dtAltInsEffDateWin').getValue() == null ? '' : Ext.Date.format(view.down('#dtAltInsEffDateWin').getValue(), 'Y/m/d');
            var AltInsTermDate = view.down('#dtAltInsTermDateWin').getValue() == null ? '' : Ext.Date.format(view.down('#dtAltInsTermDateWin').getValue(), 'Y/m/d');

            var HICN = view.down('#txtHICNWin').getValue();

            var pRequestIDCard = "N";

            if (Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hdnRequestIDCard')[0] != null && Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hdnRequestIDCard')[0].getValue() != null) {
                pRequestIDCard = Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hdnRequestIDCard')[0].getValue();
            }

            var tableTemp = {};
            tableTemp.PlanGroupId = view.down('#cmbSearchPlanGroupsWin').getValue();
            tableTemp.PlanBenefitID = view.down('#cmbSearchPlanBenefitWin').getValue();
            tableTemp.EffDate = view.down('#effDateWin').getValue() == null ? '' : Ext.Date.format(view.down('#effDateWin').getValue(), 'Y/m/d');
            tableTemp.TermDate = view.down('#TermDateWin').getValue() == null ? '' : Ext.Date.format(view.down('#TermDateWin').getValue(), 'Y/m/d');
            tableTemp.RecipientId = Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hiddenRecipientId')[0].getValue();
            tableTemp.memberID = memberID;
            tableTemp.TermReason = termReason;
            tableTemp.SystemId = systemID;
            tableTemp.tRelationshipCode = view.down('#cbxRelationshipWin').getValue();
            tableTemp.MCSProgGroupCode = Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hidProgGroupCode')[0].getValue();
            tableTemp.mcsProgramCode = Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hidProgBenefitCode')[0].getValue();
            tableTemp.PersonCode = personCode;
            tableTemp.AltInsInd = AltInsInd;
            tableTemp.AltInsMemberID = AltInsID;
            tableTemp.AltInsCarrierName = AltInsCarrierName;
            tableTemp.AltInsEffDate = AltInsEffDate;
            tableTemp.AltInsTermDate = AltInsTermDate;
            tableTemp.AltMemberId = HICN;

            var ActionName = Ext.ComponentQuery.query('#hdnContainer_MemberAddEdit')[0].query('#hdnAction')[0].getValue();
            if (ActionName == "Create") {
                tableTemp.Action = "Add";
            }
            else if (ActionName == "Edit") {
                tableTemp.Action = "Update";
            }
            var saveMessage = '';
            if (ActionName == "Create") {
                saveMessage = "Enrollment is created";
            }
            else if (ActionName == "Edit") {
                saveMessage = "Enrollment is updated";
            }

            var ttMEmberEnrollment = {};
            ttMEmberEnrollment.ttMEmberEnrollment = [];
            ttMEmberEnrollment.ttMEmberEnrollment.push(tableTemp);

            var modelSetEnrollment = Ext.create('Atlas.member.model.MemberEnrollmentSet');
            modelSetEnrollment.getProxy().setExtraParam('ttmemberEnrollment', ttMEmberEnrollment);
            modelSetEnrollment.getProxy().setExtraParam('pRequestIDCard', pRequestIDCard);
            modelSetEnrollment.phantom = false;
            modelSetEnrollment.save({
                scope: this,
                callback: function (record, operation, success) {
                    var objRespMemberMaster = Ext.decode(operation.getResponse().responseText);
                    //if (objRespMemberMaster.message[0].code == 0) {
                    var win = Ext.WindowManager.getActive();
                    if (win) {
                        win.close();
                    }
                    Ext.Msg.alert('PBM', objRespMemberMaster.message[0].message);
                    //}
                }
            });
        }
    },


    winSaveSuccess: function () {
        this.saveSucess();
        this.saveSuccessEnrollment();
    },

    initViewModel: function () {
        //this.setDisable(true);
        var vm = this.getViewModel();
        vm.getStore('PlanBenefitStore').removeAll();
        vm.getStore('memberfamilystore').removeAll();
    }
});
/*var Enroll;
 Enroll = new Ext.window.Window({

 itemId: 'WinEnrollment',
 controller: 'memberedit',
 viewModel: 'member',
 //modal: true,
 closable: true,
 //scrollable: true,
 title: 'Enrollment Details',
 listeners: {
 close: 'winSaveSuccess'
 },
 items: [
 {
 xtype: 'form',
 layout: 'hbox',
 itemId: 'formWinEnrollment',
 items: [
 {
 xtype: 'fieldset',
 itemId: 'flsMemberWin',
 defaults: {
 labelWidth: 135
 },
 items: [
 {
 xtype: 'textfield',
 fieldLabel: 'Member Id',
 itemId: 'txtMemberIDWin',
 allowBlank: false
 },
 {
 xtype: 'textfield',
 fieldLabel: 'Plan Group',
 itemId: 'txtTempPlanGroup',
 hidden: true,
 enableKeyEvents: true,
 listeners: {
 keyup: 'txtTempPlanGroup_Keyup'
 }

 },
 {
 xtype: 'plangrouptypeahead',
 fieldLabel: 'Plan Group',
 itemId: 'cmbSearchPlanGroupsWin',
 listeners: {
 select: 'onPlanSelection_Win'
 },
 displayField: 'planGroupName',
 valueField: 'planGroupId',
 allowBlank: false
 },
 {
 xtype: 'combobox',
 fieldLabel: 'Plan Benefit',
 itemId: 'cmbSearchPlanBenefitWin',
 displayField: 'planBenefitCode',
 valueField: 'planBenefitId',
 listeners: {
 select: 'onBenefitSelection_Win'
 },
 bind: {
 store: '{PlanBenefitStore}'
 },
 allowBlank: false
 },
 {xtype: 'textfield', fieldLabel: 'HICN', itemId: 'txtHICNWin'},
 {
 xtype: 'datefield',
 fieldLabel: 'Effective Date',
 itemId: 'effDateWin',
 allowBlank: false
 },
 {xtype: 'datefield', fieldLabel: 'Termination Date', itemId: 'TermDateWin'},
 {
 xtype: 'combobox',
 fieldLabel: 'Relationship',
 itemId: 'cbxRelationshipWin',
 bind: {store: '{relationshipcodestore}'},
 displayField: 'name',
 valueField: 'value',
 allowBlank: false
 },
 {
 xtype: 'combobox',
 fieldLabel: 'Program Group Code',
 itemId: 'cbxMCSProgGroupCodeWin',
 displayField: 'progDescription',
 valueField: 'progDescription',
 listeners: {
 //select: 'onProgramGroupCodeSelection' -------------- need to implement
 },
 bind: {
 store: '{storeMCSProgGroupCode}'
 }
 },
 {xtype: 'textfield', fieldLabel: 'Person Code', itemId: 'txtPersonCodeWin'},
 {xtype: 'displayfield', fieldLabel: 'Primary Recipient', itemId: 'lblPrimaryRecipientWin'}

 ]
 },
 {
 xtype: 'fieldset',
 itemId: 'flsAltIns',
 defaults: {
 labelWidth: 150
 },
 items: [
 {xtype: 'checkbox', fieldLabel: 'Alt Ins Indicator', itemId: 'chkAltInsIndWin'},
 {xtype: 'textfield', fieldLabel: 'Alt Ins ID', itemId: 'txtAltInsIdWin'},
 {xtype: 'textfield', fieldLabel: 'Alt Ins Carrier Name', itemId: 'txtAltInsNameWin'},
 {xtype: 'datefield', fieldLabel: 'Alt Ins Effective Date', itemId: 'dtAltInsEffDateWin'},
 {xtype: 'datefield', fieldLabel: 'Alt Ins Termination Date', itemId: 'dtAltInsTermDateWin'}
 ]
 }
 ]
 }

 ],
 dockedItems: [
 {
 xtype: 'toolbar',
 dock: 'bottom',
 items: [
 '->',
 {
 xtype: 'button',
 text: 'Save',
 itemId: 'btnSaveWin',
 iconCls: 'fa fa-save',
 handler: 'btnSaveWin_Click',
 params: {
 source: 'WinEnrollment'
 }
 },
 {
 xtype: 'button',
 itemId: 'btnCancelWin',
 text: 'Cancel',
 iconCls: 'fa fa-remove',
 listeners: {
 click: 'btnCancelWin_Click'
 }
 }
 ]
 }
 ]
 });

 var WinNotes;
 WinNotes = new Ext.window.Window({
 itemId: 'winNotesEditEnrollment',
 controller: 'memberedit',
 viewModel: 'member',
 modal: true,
 closable: true,
 scrollable: true,
 width: 500,
 title: 'Termination Reason',
 listeners: {
 close: 'winSaveSuccess'
 },
 items: [
 {
 xtype: 'textarea',
 itemId: 'txtNotesWin',
 height: '100%',
 width: '100%'
 }

 ],
 dockedItems: [
 {
 xtype: 'toolbar',
 dock: 'bottom',
 items: [
 '->',
 {
 xtype: 'button',
 text: 'Save',
 itemId: 'btnSaveWin',
 iconCls: 'fa fa-save',
 handler: 'btnSaveWin_Click',
 params: {
 source: 'winNotesEditEnrollment'
 }
 }
 ]
 }
 ]
 });*/

