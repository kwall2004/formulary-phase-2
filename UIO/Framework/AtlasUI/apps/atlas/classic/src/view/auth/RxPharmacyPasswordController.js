Ext.define('Atlas.view.auth.RxPharmacyPasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-rxpharmacypassword',

    onQuestionLoad:function(){
        var me = this,
            refs= me.getReferences();

        Ext.Ajax.request({
            useDefaultXhrHeader: false,
            withCredentials: true,
            paramsAsJson: true,
            noCache: false,
            url: Atlas.apiURL + 'authentication/rx/registerpharmacyp/update',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            params: Ext.JSON.encode({
                pAction: 'BeforeForgotPassword',
                "ttPharmacyDetails":{
                    "ttPharmacyDetails": [
                        {
                            "NcpdpID":"",
                            "RelationshipID":"",
                            "RxNum":"" ,
                            "UserName": this.getViewModel().get('username')
                        }
                    ]
                }
            }),
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                if (obj.message[0].message === 'Successful') {
                    refs.question1.setValue(obj.data[0].SecurityQuestion1);
                    refs.question2.setValue(obj.data[0].SecurityQuestion2);
                } else {
                    Ext.MessageBox.alert('Error', obj.message[0].message, function(){ me.getView().close(); });
                }
            }
        });
    },

    doReset: function () {
        var me = this,
            form = me.getView().down('form'),
            values = form.getValues(),
            question1 = this.lookupReference('question1').value,
            question2 = this.lookupReference('question2').value;

        if (form.isValid()) {
            Ext.Ajax.request({
                useDefaultXhrHeader: false,
                withCredentials: true,
                paramsAsJson: true,
                noCache: false,
                url: Atlas.apiURL + 'authentication/rx/registerpharmacyp/update',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({
                    pAction: 'ForgotPassword',
                    pSessionId: '',
                    pSessionID: '',
                    ttPharmacyDetails: {
                        ttPharmacyDetails: [
                            {
                                NcpdpID : '',
                                RelationshipID: '',
                                RxNum: '',
                                UserName: this.getViewModel().get('username'),
                                SecurityQuestion1: question1,
                                SecurityAnswer1: values.answer1,
                                SecurityQuestion2: question2,
                                SecurityAnswer2: values.answer2
                            }
                        ]
                    }
                }),
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText);

                    if (obj.message[0].code === 0) {
                        Ext.Msg.alert('Success', 'Forgot Password link has been sent to your registered email id.');
                        me.onCancel();
                        return;
                    }
                    if (obj.message[0].code === 2001) {
                        Ext.Msg.alert('Success', obj.message[0].message);
                        me.onCancel();
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
