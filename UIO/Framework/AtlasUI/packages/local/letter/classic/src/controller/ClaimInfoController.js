Ext.define('Atlas.letter.controller.ClaimInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.claiminfoctrl',
    listen:{
        controller:{
            'createeditletterctrl' : {
                XTLoadClaimRecord : 'onLoadRecordInfo',
                ResetAllClaimFields: 'onResetAllFields'
            }
        }
    },

    onLoadRecordInfo: function(rec) {
        var me = this;
        var me = this;
        if(rec.data.TransitionFill.toLocaleLowerCase() == 'yes'){
            rec.set('TransFillText','<font color="red"><strong>'+rec.get('TransFillText')+'</strong></font>');
        }
        me.getView().loadRecord(rec);
    },

    onResetAllFields: function() {
        var me = this,
            myView = me.getView();
        myView.getForm().reset();
    }

});