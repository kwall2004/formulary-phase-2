Ext.define('Atlas.letter.controller.MedicationInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.medicationinfoctrl',
    listen:{
        controller:{
            'createeditletterctrl' : {
                XTLoadClaimRecord : 'onGetClaimInfo',
                ResetAllMedicationFields: 'onResetAllFields'
            }
        }
    },

    onGetClaimInfo: function(rec) {
        var me = this;

        me.getView().loadRecord(rec);
    },

    onResetAllFields: function() {
        var me = this,
            myView = me.getView();
        myView.getForm().reset();
    }

});