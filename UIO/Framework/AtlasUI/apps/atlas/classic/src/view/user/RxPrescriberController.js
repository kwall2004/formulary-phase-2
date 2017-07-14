Ext.define('Atlas.view.user.RxPrescriberController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.user-rxprescriber',

    init: function () {
        this.getUserDetails();
    },

    onChange: function () {
        Ext.create('Atlas.view.user.RxPrescriberChangePassword');
    },

    onCancel: function(){
        this.getView().up('window').close();
    },

    onSave: function () {
        var me = this,
            ttPrescriberDetails = {},
            requestModel = Ext.create('Atlas.portals.prescriber.model.RegisterPrescriber'),
            formValues = me.getView().getForm().getValues();

        requestModel.phantom = false;
        ttPrescriberDetails.Email = formValues.Email;

        requestModel.getProxy().setExtraParam('ttPrescriberDetails', ttPrescriberDetails);
        requestModel.getProxy().setExtraParam('ipcAction', 'ChangeEmail');
        requestModel.save({
            success: function (response, operation) {
                var obj = Ext.JSON.decode(operation._response.responseText),
                    message = obj.message[0].message,
                    pResult = obj.message[0].code;

                if (pResult == 0) {
                    // success
                    message = message.replace(/.+?[\.\?\!](\s|$)/g, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                    Ext.Msg.alert('Success', message)
                } else {
                    Ext.Msg.alert('Error', message);
                }
            }
        });
    },

    updateStatus: function (status) {
        var label = this.getView().down('[reference=status]');
        if (label) {
            label.setText(status);
            label.show();
        }
    },

    getUserDetails:function() {
        var me = this,
            vm = me.getViewModel(),
            prescriberMasterModel = Ext.create('Atlas.portals.prescriber.model.PrescriberUserMaster', {});

        prescriberMasterModel.getProxy().setExtraParam('pUserName', Atlas.user.un);
        prescriberMasterModel.load({
            success: function(record, operation){
                me.getView().getForm().loadRecord(record);
            }
        })
    }

});
