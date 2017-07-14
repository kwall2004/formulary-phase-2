Ext.define('Atlas.portals.view.rxmember.ContactUsViewController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.rxmembercontactusviewcontroller',

    init: function () {
        this.loadContacts();
    },

    loadContacts: function() {
        var me = this,
            vm = me.getViewModel(),
            contactsStore = this.getView().getViewModel().getStore('contacts'),
            memberCoverages = vm.getStore('memberCoverages')
            WebAddress = "",
            Email = "",
            formattedPhone = ""; 

        memberCoverages.getProxy().setExtraParam('pSessionId', Atlas.user.sessionId);
        memberCoverages.getProxy().setExtraParam('pRecipientId', Atlas.user.retRecipientID);
        memberCoverages.load({
            callback: function(records) {
                var combo = me.lookupReference('plan'),
                    activeCoverages = [];

                if (!records) { return; }
                if (records.length === 0) { return; }
                activeCoverages = records.filter(function(item) {
                    return item.get('TermDate') == '' || new Date(item.get('TermDate')).getTime() >= new Date().getTime();
                });
                if (activeCoverages.length === 0) { return; }

                contactsStore.getProxy().setExtraParam('pSessionID', Atlas.user.sessionId);
                contactsStore.getProxy().setExtraParam('ipiPlanGroupID', activeCoverages[0].get('PlanGroupId'));
                contactsStore.getProxy().setExtraParam('ipcPortalAddresses', "");
                contactsStore.load({
                    callback: function(records, operation) {
                        WebAddress = '<a href="' + records[0].get('WebAddress') + '" target="_blank">' + records[0].get('WebAddress') + '</a>'; 
                        Email =  '<a href="mailto:' + records[0].get('Email') + '" target="_top">' + records[0].get('Email') + '</a>';
                        formattedPhone = me.formatPhone(records[0].get('PlanPhone'));

                        vm.set("Address", records[0].get('Address1'));
                        vm.set("PlanPhone", formattedPhone);
                        vm.set("WebAddress", WebAddress);
                        vm.set("Email", Email);
                    }
                });
            }
        });
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