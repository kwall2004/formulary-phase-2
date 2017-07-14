Ext.define('Atlas.letter.view.templates.TemplateLetterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.templateletterctrl',

    init: function () {
        //Load Main menus for the right side - have to know parent Id
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            openView = view.openView,
            menuID = view.ID,
            letterID = view.LetterID,
            letterType = view.LetterType,
            keyValue = view.keyValue;
    },

    onSearch: function (value) {
        /*var me = this,
         vm = me.getViewModel(),
         lettermasterstore = me.getStore('lettermasterdata'),
         letterinfostore = me.getStore('letterinfodata');

         lettermasterstore.load();
         letterinfostore.load();*/
    }
});