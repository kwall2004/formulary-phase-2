Ext.define('Atlas.view.auth.MerlinPasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-merlinpassword',

    doReset: function () {
        var me=this, form,values;
        form = this.getView().down('form');
        values = form.getValues();
        if (form.isValid() && values)
        {
            Ext.MessageBox.show({
                title: 'Save Changes?',
                msg: 'Your password will be reset and the new password will be emailed to your registered email id. Are you sure?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                fn: function (btn) {

                    if (btn === 'yes') {

                        Ext.Ajax.request({
                            useDefaultXhrHeader: false,
                            paramsAsJson: true,
                            noCache: false,
                            url: Atlas.apiURL + 'authentication/rx/forgotuserpassword/read',
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },

                            params: Ext.JSON.encode({
                                pUserName: values.un,
                                pEmail: values.email
                                // Ext.util.Base64.encode(credentials.pwd)
                            }),
                            success: function (response, opts) {
                                var obj = Ext.decode(response.responseText);
                                if(obj.message[0].code == 0) {
                                    Ext.MessageBox.alert("Success", "Your password has been reset. Your new password is emailed to your registered email id.", function(){ me.getView().close(); });
                                }
                                else {
                                    Ext.MessageBox.alert("Failure", obj.message[0].message);
                                    return;
                                }

                            },
                            failure: function (response, opts) {
                                console.log('server-side failure with status code ' + response.status);
                            }
                        });

                    }
                },
                icon: Ext.MessageBox.QUESTION
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
