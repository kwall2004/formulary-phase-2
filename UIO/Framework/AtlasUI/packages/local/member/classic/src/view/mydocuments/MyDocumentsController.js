Ext.define('Atlas.member.view.mydocuments.MyDocumentsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.myDocumentsController',

    onDocumentFilter: function(btn) {
        Ext.create('Atlas.member.view.mydocuments.DocumentFilterWindow').show();
    },

    showResultText: function(btn, text) {
        this.showToast(Ext.String.format('You clicked the {0} button and entered the text "{1}".', btn, text));
    },

    showToast: function(s, title) {
        Ext.toast({
            html: s,
            closable: false,
            align: 't',
            slideInDuration: 400,
            minWidth: 400
        });
    },

    destroy: function() {
        if (this.timer) {
            window.clearTimeout(this.timer);
        }
        Ext.Msg.hide();
        this.callParent();
    }
});
