Ext.define('Atlas.view.user.RxPrescriberChangePasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user-rxprescriberchangepassword',

    onChange: function () {
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
                    pSessionId: Atlas.sessionId,
                    ipcAction: 'ChangePassword',
                    ttPrescriberDetails: {
                        UserName: Atlas.user.un,
                        Password: values.pass
                    }
                }),
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText);

                    if (obj.message[0].code === 0) {
                        Ext.Msg.alert('Success', 'Your password has been changed successfully.');
                        me.getView().close();
                    } else {
                        me.updateStatus(obj.message[0].message);
                    }
                }
            });
        }
    },

    onCancel: function(){
        this.getView().close();
    },

    updateStatus: function (status) {
        var label = this.getView().down('[reference=status]');
        if (label) {
            label.setText(status);
            label.show();
        }
    }
});
