Ext.define('Atlas.letter.controller.PCPInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pcpinfoctrl',
    listen:{
        controller:{
            'createeditletterctrl' : {
                XTLoadPCPRecord : 'onLoadRecordInfo',
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