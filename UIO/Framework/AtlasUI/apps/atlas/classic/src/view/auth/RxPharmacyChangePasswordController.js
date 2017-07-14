/**
 * Created by c4539 on 12/15/2016.
 */
Ext.define('Atlas.view.auth.RxPharmacyChangePasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-rxpharmacychangepassword',

    changePassword: function() {
        var form = this.lookupReference('passwordForm'),
            values = form.getValues(),
            me = this;

        if (form.isValid()) {
            if (values.newPassword !== values.confirmPassword) {
                this.lookupReference('confirmPassword').markInvalid('New and Confirm New passwords should be same.');
                return;
            }
            Ext.Msg.show({
                title:'Change Password',
                message: 'Your password will be changed and the new password will be effective for any login here after, Do you wish to continue?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(btn) {
                    if (btn === 'yes') {
                        me.registerPharmacy();
                        return;
                    }
                    this.close();
                }
            });
        }
    },

    registerPharmacy: function() {
        var action = 'ChangePassword',
            password = this.lookupReference('newPassword').value,
            pharmacyDetails = {},
            me = this,
            user = this.getView().getViewModel().get('user'),
            registerModel = Ext.create('Atlas.portals.rxpharmacy.model.RegisterPharmacyP', {});

        pharmacyDetails = {
            AdminAcceptTerms: false,
            Answer1: '',
            Answer2: '',
            Email: '',
            NcpdpID: '',
            Phone: '',
            SecurityQuestion1: '',
            SecurityQuestion2: '',
            RelationshipID: '',
            RxNum: '',
            ContactName: '',
            UserName: user.un,
            ActiveField: 0,
            Password: Ext.util.Base64.encode(password)
        };

        registerModel.phantom = false;
        registerModel.getProxy().setExtraParam('ttPharmacyDetails', pharmacyDetails);
        registerModel.getProxy().setExtraParam('pAction', action);
        registerModel.save({
            callback: function(record, operation) {
                var response = '';

                if (!operation._response) {
                    Ext.Msg.alert('Error', 'Error Occurred, please contact Network Management at 313.324.3800.');
                    return;
                }

                response = Ext.JSON.decode(operation._response.responseText);
                if (response.message[0].code === 2001) {
                    Ext.Msg.alert('Error', response.message[0].message);
                    return;
                }
                if (response.message[0].code !== 0) {
                    Ext.Msg.alert('Error', 'Error Occurred, please contact Network Management at 313.324.3800.');
                    return;
                }

                me.fireEvent('changePasswordLogin', { credentials: { username: user.un, password: password }});
                me.getView().close();
            }
        });
    },

    onConfirmPress: function (field, event) {
        if (event.getKey() === event.ENTER) {
            this.changePassword();
        }
    },

    cancelChange: function() {
        this.getView().close();
    }
});