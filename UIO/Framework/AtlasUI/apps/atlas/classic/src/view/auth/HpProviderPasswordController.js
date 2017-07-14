Ext.define('Atlas.view.auth.HpProviderPasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-hpproviderpassword',

    init: function () {
        var me = this,
            vm = me.getViewModel();

        me.loadSecretQuestions(vm.get('username'));
    },

    onUserNameTextfieldBlur: function() {
        this.loadSecretQuestions(this.getView().down('[name=username]').value);
    },

    loadSecretQuestions: function(username) {
        var me = this;

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'system/hp/secretquestions/read',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pUserName: username,
                userState: 'MI'
            }),
            success: function (response) {
                var obj = Ext.decode(response.responseText),
                    view = me.getView();

                if (obj.message[0].code === 200) { //obj.success
                    view.down('[name=username]').setValue(username);
                    view.down('[name=question1]').setFieldLabel(obj.metadata.pQuestion1);
                    view.down('[name=question2]').setFieldLabel(obj.metadata.pQuestion2);
                    me.updateStatus('Please enter information');
                } else {
                    view.down('[name=question1]').setFieldLabel('Question 1');
                    view.down('[name=question2]').setFieldLabel('Question 2');
                    me.updateStatus(obj.message[0].message);
                }
            }
        });
    },

    onCancel: function(){
        this.getView().close();
    },

    onReset: function() {
        var me = this,
            form = me.lookup('forgotPasswordForm').getForm(),
            values = form.getValues();

        if (form.isValid()) {
            Ext.Ajax.request({
                useDefaultXhrHeader: false,
                withCredentials: true,
                paramsAsJson: true,
                noCache: false,
                url: Atlas.apiURL + 'system/hp/forgotpassword/read',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    pUserName: values.username,
                    pAnswer1: Ext.util.Base64.encode(values.question1.trim().toLowerCase()),
                    pAnswer2: Ext.util.Base64.encode(values.question2.trim().toLowerCase()),
                    pEmailAddress: values.email,
                    userState: values.stateCombo
                }),
                success: function(response) {
                    var obj = Ext.decode(response.responseText);

                    if (obj.message[0].code === 200) { //obj.success
                        Ext.MessageBox.alert('Request Sent','Your new password will be emailed to you shortly.');
                        me.getView().close();
                    } else {
                        Ext.MessageBox.alert('Forgot Password','There was a problem resetting your password.  Please check your answers and try again.');
                    }
                },
                failure: function() {
                    Ext.MessageBox.alert('Request Failed','Internal Server Error.')
                }
            });
        } else {
            Ext.MessageBox.alert('Validation Error','Please fill out all the fields.');
        }
    },

    onClear: function() {
        this.lookup('forgotPasswordForm').getForm().reset();
    },

    updateStatus: function (status) {
        var label = this.getView().down('[reference=status]');
        if (label) {
            label.setText(status);
            label.show();
        }
    }
});
