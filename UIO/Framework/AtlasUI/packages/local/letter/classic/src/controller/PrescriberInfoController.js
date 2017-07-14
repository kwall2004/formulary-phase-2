Ext.define('Atlas.letter.controller.PrescriberInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prescriberinfoctrl',
    listen:{
        controller:{
            'createeditletterctrl' : {
                XTLoadPrescriberRecord : 'onLoadRecordInfo',
                ResetAllPCPFields: 'onResetAllFields'
            }
        }
    },

    onLoadRecordInfo: function(rec) {
        var me = this;

        me.getView().loadRecord(rec);
    },

    onResetAllFields: function() {
        var me = this,
            myView = me.getView();
        myView.getForm().reset();
    }

});