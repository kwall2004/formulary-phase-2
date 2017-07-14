Ext.define('Atlas.view.auth.SecretQAInstructionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth-secretqainstructions',

    onProceedClick: function () {
        var me = this;
        me.fireEvent('hpMemberConditionProcessed');
        me.getView().close();
    }
});