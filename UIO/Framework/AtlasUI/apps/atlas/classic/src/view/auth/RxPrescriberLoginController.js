Ext.define('Atlas.view.auth.RxPrescriberLoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-rxprescriberlogin',

    onBoxReady: function () {
        var body = Ext.fly(document.body);
        body.addCls('rx-prescriber-login');
    },

    onBeforeClose: function () {
        var body = Ext.fly(document.body);
        body.removeCls('rx-prescriber-login');
        return true;
    },

    onLogin: function () {
        var me = this,
            form = me.getView().down('form'),
            user = {},
            info = Ext.browser.name + '|' + window.screen.availWidth + '/' + window.screen.availHeight + '|' + 'iphere' + '|' + Ext.os.name,
            url = Atlas.apiURL + 'authentication/rx/authenticateprescriber/read',
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

                        // is this the first login? - if so, activate the user
                        if (obj.message[0].message.toLowerCase() == 'temporary password used') {
                            // show the activation dialog
                            Ext.create({
                                xtype: 'rxprescriber-useractivation',
                                layout: 'fit',
                                viewModel: {
                                    data: {
                                        user: user
                                    }
                                }
                            }).show();
                        }
                        else {
                            //call validate to get more info
                            me.fireEvent('validatesession', user);
                        }

                        me.getView().close();
                    }
                    else {
                        me.updateStatus(obj.message[0].message);
                    }

                }
            });
        }
    },

    onForgot: function () {
        Ext.create('Atlas.view.auth.RxPrescriberPassword');
    },

    onDownload: function () {
        alert('This feature is not yet set up for this module');
    },

    onRegister: function () {
        Ext.create('Atlas.portals.view.registration.RxPrescriberRegistration').show();
    },

    updateStatus: function (status) {
        var label = this.getView().down('[reference=status]');
        if (label) {
            label.setText(status);
            label.show();
        }
    }

});