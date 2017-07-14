Ext.define('Atlas.view.auth.RxPharmacyLoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-rxpharmacylogin',

    listen: {
        controller: {
            'auth-rxpharmacychangepassword':  {
                'changePasswordLogin': 'onChangePasswordLogin'
            }
        }
    },

    onChangePasswordLogin: function(credentials) {
        this.lookupReference('username').setValue(credentials.username);
        this.lookupReference('password').setValue(credentials.password);
        this.onLogin();
    },

    onBoxReady: function(){
        var body =  Ext.fly(document.body);
        body.addCls('rx-pharmacy-login');
    },

    onBeforeClose: function(){
        var body =  Ext.fly(document.body);
        body.removeCls('rx-pharmacy-login');
        return true;
    },

    onLogin: function () {
        var me = this,
            form = me.getView().down('form'),
            info = Ext.browser.name + '|' + window.screen.availWidth + '/' + window.screen.availHeight + '|' + 'iphere' + '|' + Ext.os.name,
            url = Atlas.apiURL + 'authentication/rx/authenticatepharmacyp/read',
            credentials = form.getValues();

        if (form.isValid()) {
            me.updateStatus('working...');

            Ext.Ajax.request({
                useDefaultXhrHeader: false,
                withCredentials: true,
                paramsAsJson: true,
                noCache: false,
                url: url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    pUserName: credentials.un,
                    pPassword: Ext.util.Base64.encode(credentials.pwd),
                    browserinfo: info
                }),
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText),
                        user = {},
                        changePasswordView = Ext.create('Atlas.view.auth.RxPharmacyChangePassword');

                    if (!!obj.metadata.pSessionID) {
                        user = obj.metadata;
                        user.start = me.getViewModel().get('start');
                        user.un = credentials.un;
                        user.sessionId = obj.metadata.pSessionID;

                        if (obj.message[0].code === 0) {
                            me.fireEvent('validatesession',user);
                            me.getView().close();
                            return;
                        }
                        if (obj.message[0].code === 2002) {
                            changePasswordView.setViewModel({ data: { user: user }});
                            changePasswordView.show();
                            return;
                        }
                        me.updateStatus(obj.message[0].message);
                    } else {
                        me.updateStatus(obj.message[0].message);
                    }
                }
            });
        }
    },

    onForgot: function () {
        Ext.create('Atlas.view.auth.RxPharmacyPassword',{
            viewModel:{
                data:{
                    username: this.getView().down('form').getValues().un
                }
            }
        });
    },

    onRegister: function () {
        Ext.create('Atlas.view.auth.RxPharmacyRegistration').show();
    },

    updateStatus: function (status) {
        var label = this.getView().down('[reference=status]');
        if (label) {
            label.setText(status);
            label.show();
        }
    }
});