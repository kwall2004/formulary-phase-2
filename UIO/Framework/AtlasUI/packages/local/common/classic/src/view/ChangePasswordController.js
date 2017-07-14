/**
 * Created by n6684 on 11/29/2016.
 */
// Revisited by @Sencha
//Labeled 
Ext.define('Atlas.common.view.ChangePasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.changepasswordcontroller',

    changePassword: function () {
        var me = this,
            rec = Ext.create('Atlas.common.model.UserPassword');

        rec.phantom = false; //facilitate proper API method - update (needed for saving operation of new record)

        rec.save({
            params:{
                pUserName: SetUser.un, //Implicit global variable; set from Auth Controller
                pPassword: this.getView().down('#pass').getValue()
            },
            callback: function (record, operation, success) {
                var objResp = Ext.decode(operation.getResponse().responseText),
                    msg = objResp.message[0];

                if(msg && msg.code !== 0){
                    Ext.MessageBox.show({
                        title: 'Password change',
                        msg: msg.message,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                } else {
                    Ext.MessageBox.show({
                        title: 'Password change',
                        msg: 'Password has been changed',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                    me.getView().close();
                }
            }
        });
    },

    btncancel: function () {
        this.getView().close();
    }
});