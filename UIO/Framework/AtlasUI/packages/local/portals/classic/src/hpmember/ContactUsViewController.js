/**
 * Created by t3852 on 10/20/2016.
 */
Ext.define('Atlas.portals.view.hpmember.ContactUsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hpmembercontactusviewcontroller',

    init: function () {
        this.loadContacts();
    },

    loadContacts: function() {
        var contactsStore = this.getView().getViewModel().getStore('contacts'),
            me = this,
            userRecord = {};

        contactsStore.getProxy().setExtraParam('pBenefitPlanCode', Atlas.user.benefitPlanCode);
        contactsStore.load({
            callback: function(records, operation) {
                var meta = {},
                    address = {};

                if (operation && operation._response) {
                    meta = Ext.JSON.decode(operation._response.responseText).metadata;
                    if (meta && meta.ttaddressdetails && meta.ttaddressdetails.ttaddressdetails && (meta.ttaddressdetails.ttaddressdetails.length > 0)) {
                        address = meta.ttaddressdetails.ttaddressdetails[0];
                    }
                }

                userRecord = me.mapUserContacts(records);
                me.mapUserDetails(userRecord, address);
                me.getView().getViewModel().set('userRecord', userRecord);
            }
        });
    },

    mapUserContacts: function(contacts) {
        var userRecord = {};

        if (!contacts || contacts.length === 0) { return userRecord; }

        for (var i = 0; i < contacts.length; i++) {
            var phone = this.formatPhone(contacts[i].get('contactvalue'));

            switch (contacts[i].get('contactDescription').toLowerCase()) {
                case 'member services phone english (internal)':
                    userRecord.memberService = phone;
                    break;
                case 'magellan behavioural health (external)':
                    userRecord.behavorialService = phone;
                    break;
                case 'non-emergent transportation (external)':
                    userRecord.transportation = phone;
                    break;
                case 'tty (external)':
                    userRecord.tty = contacts[i].get('contactvalue').trim();
                    break;
            }
        }

        return userRecord;
    },

    mapUserDetails: function(userRecord, address) {
        userRecord.serviceEmail = 'memberservices.' + Atlas.user.portalStateSelected.toLowerCase() + '@mhplan.com';
        userRecord.address = address;
    },

    formatPhone: function(number) {
        var value = number,
            filteredValues = '"`!@#$%^&*()_+|~-=\QWERTY UIOP{}ASDFGHJKL:ZXCVBNM<>?qwertyuiop[]asdfghjkl;zxcvbnm,./\\\'',
            i = 0,
            returnString = '';

        if (value.charAt(0) == '+') { return returnString; }
        for (i = 0; i < value.length; i++) {
            var c = value.charAt(i);
            if ((filteredValues.indexOf(c) == -1) & (returnString.length <= 13)) {
                if (returnString.length == 0) returnString += '(';
                if (returnString.length == 4) returnString += ')';
                if (returnString.length == 5) returnString += ' ';
                if (returnString.length == 9) returnString += '-';
                returnString += c;
            }
        }

        return returnString;
    }
});