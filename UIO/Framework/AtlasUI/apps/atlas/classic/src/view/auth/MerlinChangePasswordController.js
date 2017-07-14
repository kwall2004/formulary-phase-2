/**
 * Created by mkorivi on 1/25/2017.
 */
Ext.define('Atlas.view.auth.MerlinChangePasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-merlinchangepassword',

doChange: function () {
        var me=this,
            form = me.getView().down('form'),
            values = this.getView().down('form').getValues();
        if (form.isValid()) {

            var extraParameters = {
                'ipcUserName': values.un,
                'ipcOldPassword': values.oldPassword,
                'ipcNewPassword': values.newPassword
            };

            var Returndata = Atlas.common.utility.Utilities.post('system/rx/changepassword/update', extraParameters, null);
            if (Returndata.code == 0) {
                me.fireEvent('changePassword', { credentials: { username: values.un, password: values.newPassword }});
                me.getView().close();
            }
            else {
                me.updateStatus(Returndata.message);

            }
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
