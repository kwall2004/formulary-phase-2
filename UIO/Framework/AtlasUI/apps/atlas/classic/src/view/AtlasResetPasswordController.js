Ext.define('Atlas.view.AtlasResetPasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.atlaspasswordreset',

    listen: {
        controller: {
            '*': {
                updateResetStatus: 'updateResetStatus'
            }
        }
    },

    init: function () {
    },

    onCancel: function(){
        this.getView().close();
    },

    doReset: function(){
        var me = this,
            form = me.getView().down('form'),
            credentials = form.getValues();

        if( form.isValid() ){
            credentials['start'] = me.getViewModel().get('start');
            me.fireEvent('doresetpassword',credentials);
        }
    },

    updateResetStatus: function(status){
        Ext.Msg.alert('PBM', objResp.message[0].message);
        var label = this.getView().down('[reference=status]');
        if(label){
            label.setText(status);
            label.show();
        }
    }

});