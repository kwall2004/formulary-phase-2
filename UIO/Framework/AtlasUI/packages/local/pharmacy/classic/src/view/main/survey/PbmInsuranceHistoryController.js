Ext.define('Atlas.pharmacy.view.main.survey.PbmInsuranceHistoryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacy-main-pbminsurance',

    boxReady: function() {
        var vm = this.getViewModel(),
            ncpdpid = this.getView().ncpdpid;

        //TODO load the store
    }

});
