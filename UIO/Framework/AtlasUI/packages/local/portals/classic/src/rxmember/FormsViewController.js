Ext.define('Atlas.portals.rxmember.view.FormsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.forms',

    init: function(){
        var viewModel = this.getViewModel();
        var formsStore = viewModel.getStore('formsStore');
        formsStore.getProxy().setExtraParam('pListName', 'MemberPortalDocs');
        var me = this;
        formsStore.load({
            scope:me,
            failure: function (records, operation) {
                //do something if the load failed
            },
            success: function (records, operation) {

            },
            callback: function (records, operation, success) {

            }
        });
    },
    displayForm: function(grid, rowIndex) {
        var pdfString = grid.getStore().getAt(rowIndex).data.charString;
        window.open("resources/rxmember/forms/" + pdfString, "PDF","menubar=1,resizable=1,width=1300,height=1050");
    }

});