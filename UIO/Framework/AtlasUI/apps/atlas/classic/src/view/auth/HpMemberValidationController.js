Ext.define('Atlas.view.auth.HpMemberValidationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-hpmembervalidation',

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
                        {"NcpdpID":"","RelationshipID":"","RxNum":"" ,"UserName": this.getViewModel().get('username') }
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

    onValidate: function () {
        var me = this,
            form = me.getView().down('form'),
            values = form.getValues();
        if (form.isValid()) {

            //todo:
            Ext.Ajax.request({
                useDefaultXhrHeader: false,
                withCredentials: true,
                paramsAsJson: true,
                noCache: false,
                //url: Atlas.apiURL + 'authentication/rx/registerpharmacyp/update',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: Ext.JSON.encode({

                }),
                success: function (response, opts) {
                    var obj = Ext.decode(response.responseText);

                    if (obj.message[0].message === 'Successful') {

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
