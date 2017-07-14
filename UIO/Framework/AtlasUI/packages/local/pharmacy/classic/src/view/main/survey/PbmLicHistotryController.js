Ext.define('Atlas.pharmacy.view.main.survey.PbmLiscHistoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacy-main-pbmlichistory',

    boxReady: function() {
        var vm = this.getViewModel(),
            ncpdpid = this.getView().ncpdpid;

        //TODO load the store
    }

});
