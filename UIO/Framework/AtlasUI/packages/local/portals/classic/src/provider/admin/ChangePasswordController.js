// k3279 - Kevin Tabasan - 12/28/2016

Ext.define('Atlas.portals.view.provider.admin.ChangePasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.providerchangepassword',

    onChangePasswordClick: function() {
        var vm = this.getViewModel(),
            user = vm.get('user'),
            form = this.lookup('changePasswordForm'),
            formValues = form.getValues(),
            objToSend = {},
            url = '';

        if (form.isValid()) {
            if (formValues.newPassword.length < 8 ) {
                Ext.MessageBox.alert('Validation Error','Your new password should contain at least 8 characters.');
                return false;
            }

            if (formValues.confirmPassword !== formValues.newPassword) {
                Ext.MessageBox.alert('Validation Error','Your new password and confirmation password do not match.');
                return false;
            }

            if (vm.get('portal') === 'hpprovider') {
                objToSend = {
                    pSessionID: user.sessionId,
                    pChangeType: '',
                    pUserName: user.un,
                    pEmail: user.userPreferences.email,
                    pOldPassword: Ext.util.Base64.encode(formValues.oldPassword),
                    pNewPassword: Ext.util.Base64.encode(formValues.newPassword),
                    userState: user.providerStateSelected
                };

                url = 'system/hp/resetpasswordweb/update';
            } else if (vm.get('portal') === 'hpmember') {
                objToSend = {
                    pSessionID: user.sessionId,
                    pRecipientID: user.recipientId,
                    pOldPassword: Ext.util.Base64.encode(formValues.oldPassword),
                    pNewPassword: Ext.util.Base64.encode(formValues.newPassword),
                    userState: user.portalStateSelected
                };

                url = 'portal/hp/resetmemberpasswordweb/update';
            } else {
                objToSend = {
                    pSessionID: user.sessionId,
                    pChangeType: '',
                    pUserName: 'unknown',
                    pEmail: 'unknown',
                    pOldPassword: Ext.util.Base64.encode(formValues.oldPassword),
                    pNewPassword: Ext.util.Base64.encode(formValues.newPassword),
                    userState: ''
                }
            }

            this.changePassword(objToSend, url);
        } else {
            Ext.MessageBox.alert('Validation Error','Please fill out all the fields.')
        }
    },

    changePassword: function(objToSend, url) {
        var me = this;

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode(objToSend),
            success: function (response) {
                var obj = Ext.decode(response.responseText),
                    msg = obj.message[0].message;

                if (msg) {
                    if (msg === 'Password has been reset') {
                        Ext.MessageBox.alert('Success!','Your password has been reset.', function(){
                            me.fireEvent('hpMemberConditionProcessed');
                            me.getView().destroy();
                        });
                    } else if (msg === 'Email addresses do not match, reset rejected') {
                        Ext.MessageBox.alert('Failed','Your email address in the system is either invalid or does not exist. Please call our Help Desk.');
                    } else if (msg === 'Old Password does not match, reset rejected' || msg === 'Old password does not match, please try again.') {
                        Ext.MessageBox.alert('Failed','Your old password does not match. Please correct this, then try again.');
                    } else {
                        Ext.MessageBox.alert('Alert',msg);
                    }
                }
                else {
                    Ext.MessageBox.alert('Failed','Your password was unable to be reset. Please try again.');
                }
            },
            failure: function (response) {
                var obj = Ext.decode(response.responseText);
                Ext.MessageBox.alert('Failed', obj.message[0].message);
            }
        });
    },

    onCancelClick: function() {
        this.getView().destroy();
    },

    onClearClick: function() {
        this.lookup('changePasswordForm').reset();
    }
});