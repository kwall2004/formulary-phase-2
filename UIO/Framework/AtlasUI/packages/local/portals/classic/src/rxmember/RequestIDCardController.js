/**
 * Created by m4542 on 10/26/2016.
 */
Ext.define('Atlas.portals.rxmember.RequestIDCardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.requestidcardcontroller',

    init: function() {

        var user = Ext.first('viewport').getViewModel().get('user'),
            memberMasterModel = Ext.create('Atlas.member.model.MemberMaster', {}),
            me = this;


        this.getViewModel().set('memberUsername', user.UserName);
        memberMasterModel.getProxy().setExtraParam('pSessionID', user.retSessionID);
        memberMasterModel.getProxy().setExtraParam('pKeyValue', user.retRecipientID);
        memberMasterModel.getProxy().setExtraParam('pKeyType', 'RecipientID');
        memberMasterModel.getProxy().setExtraParam('pFieldList', 'firstname,lastname,middlename,@PortalMemberEmail,' +
            'socSecNum,birthDate,Home.Address1,Home.Address2,Home.City,home.zipCode,Home.State,email.ContactInfo,' +
            'homephone.ContactInfo,workphone.ContactInfo,cell.ContactInfo,Ext.ContactInfo,fax.ContactInfo');
        memberMasterModel.load({
            callback: function(record) {
                me.loadFormFields(record);
                me.loadFormCheckboxes();
            }
        });
    },

    loadFormFields: function(record) {
        this.maybePopulateField(this.lookupReference('txtFirstName'), record.get('firstname'));
        this.maybePopulateField(this.lookupReference('txtLastName'), record.get('lastname'));
        this.maybePopulateField(this.lookupReference('txtAddress'),
            record.get('Home_Address1') + record.get('Home_Address2'));
        this.maybePopulateField(this.lookupReference('cbxState'), record.get('Home_State'));
        this.maybePopulateField(this.lookupReference('txtZip'), record.get('home_zipCode'));
        this.maybePopulateField(this.lookupReference('txtHomePhone'), record.get('homephone_ContactInfo'));
        this.maybePopulateField(this.lookupReference('txtCity'), record.get('Home_City'));

        this.formatPhone(this.lookupReference('txtHomePhone'));
    },

    loadFormCheckboxes: function() {
        var user = Ext.first('viewport').getViewModel().get('user'),
            activeCoverageStore = this.getViewModel().getStore('activeCoverages'),
            me = this;

        activeCoverageStore.getProxy().setExtraParam('pSessionID', user.retSessionID);
        activeCoverageStore.getProxy().setExtraParam('pRecipientID', user.retRecipientID);
        activeCoverageStore.getProxy().setExtraParam('pCarrierID', user.CarrierID);
        activeCoverageStore.load({
            callback: function(records) {
                if (!records) { return; }
                if (this.count() === 1) {
                    me.enableCheckbox(records[0].get('LOB'), 'on', 0);
                    return;
                }
                for (var i = 0; i < records.length; i++) {
                    me.enableCheckbox(records[i].get('LOB'), '0', i);
                }
            }
        });
    },

    enableCheckbox: function(lob, checked, index) {
        switch (lob.toString()) {
            case '1':
                this.lookupReference('chkMedicaid').setHidden(false);
                this.lookupReference('chkMedicaid').setValue(checked);
                if (index === 0) { this.lookupReference('chkMedicaid').setFieldLabel('Select Plan'); }
                break;
            case '2':
                this.lookupReference('chkMedicare').setHidden(false);
                this.lookupReference('chkMedicare').setValue(checked);
                if (index === 0) { this.lookupReference('chkMedicare').setFieldLabel('Select Plan'); }
                break;
            case '3':
                this.lookupReference('chkCommercial').setHidden(false);
                this.lookupReference('chkCommercial').setValue(checked);
                if (index === 0) { this.lookupReference('chkCommercial').setFieldLabel('Select Plan'); }
                break;
            case '12':
                this.lookupReference('chkTHPMedicaid').setHidden(false);
                this.lookupReference('chkTHPMedicaid').setValue(checked);
                if (index === 0) { this.lookupReference('chkTHPMedicaid').setFieldLabel('Select Plan'); }
                break;
        }
    },

    maybePopulateField: function(field, value) {
        if (!value) { return; }
        field.setValue(value);
    },

    formatPhone: function(input) {
        var value = input.value,
            filteredValues = '"`!@#$%^&*()_+|~-=\QWERT YUIOP{}ASDFGHJKL:ZXCVBNM<>?qwertyuiop[]asdfghjkl;zxcvbnm,./\\\'',
            i = 0,
            returnString = '';

        if (value.charAt(0) == '+') { return false; }
        for (i = 0; i < value.length; i++) {
            var c = value.charAt(i);
            if ((filteredValues.indexOf(c) == -1) & (returnString.length <= 13)) {
                if (returnString.length == 0) returnString += '(';
                if (returnString.length == 4) returnString += ')';
                if (returnString.length == 5) returnString += '-';
                if (returnString.length == 9) returnString += '-';
                returnString += c;
            }
        }

        input.setValue(returnString);
        return false;
    },

    sendRequest: function() {
        var me = this,
            form = me.getView().down('form'),
            values = form.getValues(),
            user = Ext.first('viewport').getViewModel().get('user'),
            cardRequest = Ext.create('Atlas.portals.rxmember.model.PortalMemberCardRequest'),
            cardtype = "",
            pRequestEmailType = "",
            pFieldList = "",
            LastfourSSN = "";

        if(values.chkMedicaid === "0" && values.chkMedicare === "0" && values.chkCommercial === "0" && values.chkTHPMedicaid === "0") {
            Ext.MessageBox.alert('Error',"Please select a plan.", function(){});
            return;
        }

        if(!form.isValid()){
            Ext.MessageBox.alert('Error',"Please enter your information.", function(){});
            return;
        }

        if(user.socSecNum != "") {
            var socSec = user.socSecNum;
            LastfourSSN =  socSec.substr(socSec.length - 4);
        }
        cardRequest.getProxy().setExtraParam('pSessionID', user.retSessionID);

        if(values.chkCommercial == "on") {
            cardtype = "Commercial";
            pRequestEmailType = "COMMERCIAL";

            pFieldList = user.MemberID + "," + values.txtFirstName + "," + values.txtLastName + "," + values.txtAddress + "," + values.txtCity + "," + values.cbxState + "," + values.txtZip + "," + values.txtHomePhone + "," + LastfourSSN + "," + user.birthDate + "," + cardtype + "," + values.txtComments;

            cardRequest.getProxy().setExtraParam('pFieldList', pFieldList);
            cardRequest.getProxy().setExtraParam('pRequestEmailType', pRequestEmailType);
            cardRequest.load({
                callback: function() {
                    Ext.MessageBox.alert('Success',"Request sent. Your new card should arrive within a few weeks.", function(){});
                }
            });
        }

        if(values.chkMedicaid == "on" || values.chkMedicare == "on") {
            if (values.chkMedicaid == "on" && values.chkMedicare == "on")
                cardtype = "Medicaid and Medicare Cards";
            else if (values.chkMedicaid == "on")
                cardtype = "Medicaid";
            else if (values.chkMedicare == "on")
                cardtype = "Medicare";

            pRequestEmailType = "MEDICAIDMEDICARE";

            pFieldList = user.MemberID + "," + values.txtFirstName + "," + values.txtLastName + "," + values.txtAddress + "," + values.txtCity + "," + values.cbxState + "," + values.txtZip + "," + values.txtHomePhone + "," + LastfourSSN + "," + user.birthDate + "," + cardtype + "," + values.txtComments;
            cardRequest.getProxy().setExtraParam('pFieldList', pFieldList);
            cardRequest.getProxy().setExtraParam('pRequestEmailType', pRequestEmailType);
            cardRequest.load({
                callback: function() {
                    Ext.MessageBox.alert('Success',"Request sent. Your new card should arrive within a few weeks.", function(){});
                }
            });
        }

        if(values.chkTHPMedicaid == "on") {
            cardtype = "THP Medicaid";
            pRequestEmailType = "THPMEDICAID";

            pFieldList = user.MemberID + "," + values.txtFirstName + "," + values.txtLastName + "," + values.txtAddress + "," + values.txtCity + "," + values.cbxState + "," + values.txtZip + "," + values.txtHomePhone + "," + LastfourSSN + "," + user.birthDate + "," + cardtype + "," + values.txtComments;

            cardRequest.getProxy().setExtraParam('pFieldList', pFieldList);
            cardRequest.getProxy().setExtraParam('pRequestEmailType', pRequestEmailType);
            cardRequest.load({
                callback: function() {
                    Ext.MessageBox.alert('Success',"Request sent. Your new card should arrive within few weeks.", function(){});
                }
            });
        }
    }
});