Ext.define('Atlas.view.auth.RxPrescriberPasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-rxprescriberpassword',

    listen: {
        controller: {
            '*': {
                updateLoginStatus: 'updateStatus'
            }
        }
    },

    getResetLink: function() {
        // if this is the local devleopment environment, need to add the portal identifier
        var portal = location.hostname == 'localhost' ? 'rxprescriber&' : '';
        return location.origin + location.pathname + '?' + portal + 'ResetLinkClick=' + Atlas.UUIDgen.generate();
    },

    onReset: function () {
        var me = this,
            form = me.getView().down('form'),
            values = form.getValues();

        if (form.isValid()) {
            Ext.Ajax.request({
                useDefaultXhrHeader: false,
                withCredentials: true,
                paramsAsJson: true,
                noCache: false,
                url: Atlas.apiURL + 'authentication/rx/registerprescriber/update',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    pUserName: me.getViewModel().get('username'),
                    ipcAction: 'ForgotPassword',
                    ttPrescriberDetails: {
                        userName: this.getViewModel().get('username'),
                        StateLic: values.lic,
                        NPI: values.npi,
                        DEA: values.dea,
                        QuestionID1: values.question1,
                        Answer1: values.answer1,
                        QuestionID2: values.question2,
                        Answer2: values.answer2,
                        emailVerfId: me.getResetLink()
                    }
                }),
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText);
                    if (obj.message[0].code == 0) { //obj.success
                        me.getView().close();
                        Ext.Msg.alert('Success', 'Forgot Password link has been sent to your registered email id.');
                    } else {
                        me.updateStatus(obj.message[0].message);
                    }
                }
            });
        }
    },

    onForgot: function () {
        Ext.create('Atlas.view.auth.RxMemberPassword');
    },

    onCancel: function () {
        this.getView().close();
    },

    onRegister: function () {
        var me = this,
            vm = me.getViewModel(),
            start = vm.get('start');

        switch (start) {
            case 'membermhp':
                Ext.create('Atlas.portals.view.registration.MemberMHPRegistration').show();
                break;
            default:
                alert('This feature is not yet set up for this module');
                break;
        }
    },

    updateStatus: function (status) {
        this.getViewModel().set('statusMessage', status);
    },

    getForgotPasswordQuestions: function () {
        var me = this,
            form = me.getView().down('form'),
            values = form.getValues(),
            refs = me.getReferences();

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'authentication/rx/registerprescriber/update',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pUserName: me.getViewModel().get('username'),
                ipcAction: 'BeforeForgotPassword',
                ttPrescriberDetails: {
                    NPI: values.npi,
                    DEA: values.dea
                }
            }),
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj.message[0].code == 0) { //obj.success
                    refs.question1.setValue(obj.data[0].QuestionID1);
                    refs.question2.setValue(obj.data[0].QuestionID2);
                } else {
                    me.updateStatus(obj.message[0].message);
                }
            }
        });
    }
});