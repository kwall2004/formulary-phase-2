/**
 * Created by c4539 on 10/28/2016.
 */
Ext.define('Atlas.portals.hpmember.MemberProfileController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalshpmembermemberprofileController',

    /**
     * Called when the view is created
     */
    init: function () {
        if (Atlas.user.benefitPlanCodeShortDesc.toUpperCase() == "MHS" || Atlas.user.portalPlanId.toUpperCase() === 'MCHOICE') {
            this.getView().getViewModel().set('canEdit', false);
        }
        this.loadMemberData();
        this.loadStates();
    },

    loadStates: function () {
        var combo = this.lookupReference('stateCombo'),
            states = [["AL", "AL"], ["AK", "AK"], ["AZ", "AZ"], ["AR", "AR"], ["CA", "CA"], ["CO", "CO"], ["CN", "CN"],
                ["DE", "DE"], ["DC", "DC"], ["FL", "FL"], ["GA", "GA"], ["HW", "HW"], ["ID", "ID"], ["IL", "IL"],
                ["IN", "IN"], ["IA", "IA"], ["KS", "KS"], ["KY", "KY"], ["LA", "LA"], ["ME", "ME"], ["MA", "MA"],
                ["MD", "MD"], ["MI", "MI"], ["MN", "MN"], ["MS", "MS"], ["MO", "MO"], ["MT", "MT"], ["NE", "NE"],
                ["NV", "NV"], ["NH", "NH"], ["NJ", "NJ"], ["NM", "NM"], ["NY", "NY"], ["NC", "NC"], ["ND", "ND"], ["OH", "OH"],
                ["OK", "OK"], ["OR", "OR"], ["PA", "PA"], ["RH", "RH"], ["SC", "SC"], ["SD", "SD"], ["TE", "TE"], ["TX", "TX"],
                ["UT", "UT"], ["VE", "VE"], ["VA", "VA"], ["WA", "WA"], ["WV", "WV"], ["WI", "WI"], ["WY", "WY"]],
            statesStore = {};

        statesStore = new Ext.data.ArrayStore({
            fields: ['text', 'value'],
            data: states
        });

        combo.setStore(statesStore);
    },

    loadMemberData: function () {
        var user = Ext.first('viewport').getViewModel().get('user'),
            me = this,
            getMemberDataStore = this.getViewModel().getStore('memberDataStore');
        getMemberDataStore.removeAll();
        getMemberDataStore.getProxy().setExtraParam('pRecipientID', user.recipientId);
        getMemberDataStore.getProxy().setExtraParam('pFieldList', "firstname,lastname,middlename,home.address1,home.address2,home.city,home.state,home.zip,Homephone.contactinfo,email.contactinfo,WorkPhone.contactinfo,Cell.contactinfo,unsubscribeEmail,@dispMemberID,@primaryLOB,@SmsID,@SmsNumber,@smsOptOutFlag,@SmsContPrefOrdList");
        getMemberDataStore.getProxy().setExtraParam('portalPlan',user.portalPlanId);
        getMemberDataStore.load({
            scope: this,
            failure: function (rec, operation) {
                Ext.Msg.alert('Failure', 'getting member data error, Please contact admin.');

            },
            success: function (rec, operation) {

            },
            callback: function (record, operation, success) {
                var rec = record[0];
                me.lookupReference('firstName').setValue(rec.get('firstname'));
                me.lookupReference('middleName').setValue(rec.get('middlename'));
                me.lookupReference('lastName').setValue(rec.get('lastname'));
                me.lookupReference('address1').setValue(rec.get('home.address1'));
                me.lookupReference('address2').setValue(rec.get('home.address2'));
                me.lookupReference('city').setValue(rec.get('home.city'));
                me.lookupReference('stateCombo').setValue(rec.get('home.state'));

                var zip = rec.get('home.zip');
                var modifiedZip = '';
                if (zip.length > 5) {
                    modifiedZip = zip.replace(/^(\d{5})(\d{4})$/, '$1-$2');
                } else {
                    modifiedZip = zip;
                }
                me.lookupReference('zip').setValue(modifiedZip);
                me.lookupReference('email').setValue(rec.get('email.contactinfo'));
                me.lookupReference('homePhone').setValue(this.modifyPhone(rec.get('Homephone.contactinfo')));
                me.lookupReference('workPhone').setValue(this.modifyPhone(rec.get('WorkPhone.contactinfo')));
                me.lookupReference('cellPhone').setValue(this.modifyPhone(rec.get('Cell.contactinfo')));
                if (rec.get('unsubscribeEmail') == 'yes'){
                    me.lookupReference('unsubscribeEmail').setValue(true);
                    me.lookupReference('receiveEmailNotice').setValue(false);
                } else {
                    me.lookupReference('unsubscribeEmail').setValue(false);
                    me.lookupReference('receiveEmailNotice').setValue(true);
                }
                if (rec.get('@smsOptOutFlag') == 'yes'){
                    me.lookupReference('unsubscribeText').setValue(true);
                    me.lookupReference('receiveTextMessages').setValue(false);
                } else {
                    me.lookupReference('unsubscribeText').setValue(false);
                    me.lookupReference('receiveTextMessages').setValue(true);
                }
            }
        });
    },

    onSaveClick: function () {
        if (this.lookupReference('memberForm').isValid()) {
            var me = this,
                vm = me.getViewModel(),
                user = Ext.first('viewport').getViewModel().get('user');
                /*setMemberDataStore = this.getViewModel().getStore('setMemberDataStore'),
                getMemberDataStore = this.getViewModel().getStore('memberDataStore');*/

            var address1 = this.lookupReference('address1').getValue(),
                address2 = this.lookupReference('address2').getValue(),
                city = this.lookupReference('city').getValue(),
                zip = this.lookupReference('zip').getValue().replace('-', ''),
                state = this.lookupReference('stateCombo').getValue(),
                homePhone = this.lookupReference('homePhone').getValue().replace(/[^a-zA-Z0-9 ]/g, ""),
                workPhone = this.lookupReference('workPhone').getValue().replace(/[^a-zA-Z0-9 ]/g, ""),
                cellPhone = this.lookupReference('cellPhone').getValue().replace(/[^a-zA-Z0-9 ]/g, ""),
                unsubscribeEmail = 'no',
                smsOptOutFlag = 'no',
                newEmail = this.lookupReference('email').getValue();

            if (this.lookupReference('unsubscribeEmail').getValue()) {
                unsubscribeEmail = 'yes';
            }
            if (this.lookupReference('unsubscribeText').getValue()) {
                smsOptOutFlag = 'yes';
            }

            var pFields = address1 + '|' + address2 + '|' + city + '|' + state + '|' + zip + '|' + homePhone + '|' +
                newEmail + '|' + workPhone + '|' + cellPhone + '|' + unsubscribeEmail + '|' + smsOptOutFlag;

            var setMemberDataStore = Ext.create('Atlas.portals.hpmember.model.MemberProfileWeb', {});
            setMemberDataStore.phantom = false;
            setMemberDataStore.getProxy().setExtraParam('pSessionID', user.sessionId);
            setMemberDataStore.getProxy().setExtraParam('pRecipientID', user.recipientId);
            setMemberDataStore.getProxy().setExtraParam('pFieldList', "home.address1,home.address2,home.city,home.state,home.zip,Homephone.contactinfo,email.contactinfo,WorkPhone.contactinfo,Cell.contactinfo,unsubscribeEmail,smsOptOutFlag");
            setMemberDataStore.getProxy().setExtraParam('pFields', pFields);

            setMemberDataStore.save({
                success: function (response, operation, record) {
                    var obj = Ext.JSON.decode(operation._response.responseText),
                        result = obj.message[0].message;
                    me.loadMemberData();
                    if (result == ''){
                        result = 'You have successfully changed your profile information. For any questions, please contact Member services';
                    }
                    Ext.Msg.alert("Save Profile Message",result);
               }
            });
        }
    },

    modifyPhone: function (phoneNumber) {
        return phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
    },

    validateEmail: function (component, newData, eOpts) {
        var email = this.lookupReference('newEmail').getValue(),
            retypeemail = this.lookupReference('retypeEmail').getValue();
        if (email !== retypeemail) {
            Ext.Msg.alert("Email Validation", " Email address does not match. Please retype correct email address.")
        }
    },

    formatPhone: function (input) {
        var value = input.value,
            filteredValues = '"`!@#$%^&*()_+|~-=\QWERT YUIOP{}ASDFGHJKL:ZXCVBNM<>?qwertyuiop[]asdfghjkl;zxcvbnm,./\\\'',
            i = 0,
            returnString = '';

        if (value.charAt(0) == '+') {
            return false;
        }
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
    }
});