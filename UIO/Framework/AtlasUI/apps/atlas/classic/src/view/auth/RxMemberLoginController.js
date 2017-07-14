Ext.define('Atlas.view.auth.RxMemberLoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-rxmemberlogin',

    onBoxReady: function(){
        var body =  Ext.fly(document.body);
        body.addCls('rx-member-login');
    },

    onBeforeClose: function(){
        var body =  Ext.fly(document.body);
        body.removeCls('rx-member-login');
        return true;
    },

    onLogin: function () {
        var me = this,
            form = me.getView().down('form'),
            user = {},
            info = Ext.browser.name + '|' + window.screen.availWidth + '/' + window.screen.availHeight + '|' + 'iphere' + '|' + Ext.os.name,
            url = Atlas.apiURL + 'authentication/rx/authenticatemember/read',
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
                    pPassword: credentials.pwd,
                    browserinfo: info
                    // Ext.util.Base64.encode(credentials.pwd)
                }),
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText),
                        user = {};

                    if (!!obj.metadata.retSessionID) { //obj.success

                        user = obj.metadata;
                        user.start = me.getViewModel().get('start');
                        user.un = credentials.un;
                        user.sessionId = obj.metadata.retSessionID;

                        //call validate to get more info
                        me.fireEvent('validatesession',user);
                        me.getView().close();

                    } else {
                        me.updateStatus("Invalid username/password");
                    }
                }
            });
        }
    },

    onForgot: function () {
        Ext.create('Atlas.view.auth.RxMemberPassword');
    },

    onRegister: function () {
        Ext.create('Atlas.portals.view.registration.RxMemberRegistration').show();
    },

    updateStatus: function (status) {
        var label = this.getView().down('[reference=status]');
        if (label) {
            label.setText(status);
            label.show();
        }
    }

});