Ext.define('Atlas.pharmacy.view.main.survey.PbmVerificationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacy-main-pbmverification',

    boxReady: function() {
        var vm = this.getViewModel(),
            ncpdpid = this.getView().ncpdpid;

        //TODO load the store
    }

});
