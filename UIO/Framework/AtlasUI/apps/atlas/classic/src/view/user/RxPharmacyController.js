/**
 * Created by c4539 on 12/15/2016.
 */
Ext.define('Atlas.view.user.RxPharmacyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user-rxpharmacy',

    init: function() {
        this.loadProfileData();
    },

    loadProfileData: function() {
        var action = 'GetProfileInfo',
            pharmacyDetails = {},
            username = Ext.first('viewport').getViewModel().get('user').un,
            registerModel = Ext.create('Atlas.portals.rxpharmacy.model.RegisterPharmacyP', {}),
            form = this.getView();

        pharmacyDetails = { UserName: username };
        registerModel.phantom = false;
        registerModel.getProxy().setExtraParam('ttPharmacyDetails', pharmacyDetails);
        registerModel.getProxy().setExtraParam('pAction', action);
        registerModel.save({
            callback: function(record) {
                if (!record && !record.data) { return; }
                form.loadRecord(record);
            }
        });
    },

    onSave: function() {
        var action = 'Update',
            pharmacyDetails = {},
            registerModel = Ext.create('Atlas.portals.rxpharmacy.model.RegisterPharmacyP', {}),
            form = this.getView(),
            pharmacyDetails = form.getValues(),
            me = this;

        if (!form.isValid()){ return; }
        registerModel.phantom = false;
        registerModel.getProxy().setExtraParam('ttPharmacyDetails', pharmacyDetails);
        registerModel.getProxy().setExtraParam('pAction', action);
        registerModel.save({
            success: function(record, opts) {
                var response = Ext.JSON.decode(opts._response.responseText);

                if (!response && !response.message && !response.message[0]) { return; }
                if (response.message[0].code === 0) {
                    Ext.Msg.alert('Success', 'Your detail has been reset successfully.', function() {
                        me.onCancel();
                    });
                    return;
                }
                Ext.Msg.alert('Failed', response.message[0].message);
            }
        });
    },

    onChange: function() {
        var changePasswordView = Ext.create('Atlas.view.auth.RxPharmacyChangePassword'),
            values = this.getView().getValues(),
            user = { un: values.UserName };

        changePasswordView.setViewModel({ data: { user: user }});
        changePasswordView.show();
    },

    onCancel: function() {
        this.getView().up('window').close();
    },

    onSubmitPress: function(field, event) {
        if (event.getKey() === event.ENTER) {
            this.onSave();
        }
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
    }
});