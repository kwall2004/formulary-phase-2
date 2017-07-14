Ext.define('Atlas.letter.controller.PharmacyInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacyinfoctrl',
    listen:{
        controller:{
            'createeditletterctrl' : {
                XTLoadPharmacyRecord : 'onLoadRecordInfo',
                ResetAllPharmacyFields: 'onResetAllFields'
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