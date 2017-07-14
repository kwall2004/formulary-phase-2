/**
 * Created by c4539 on 2/6/2017.
 */
Ext.define('Atlas.portals.provider.ExportEnrollmentReportsWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsproviderexportenrollmentreportswindow',

    exportReports: function() {
        var providersExportStore = this.getView().getViewModel().getStore('providersExport'),
            form = this.lookupReference('reportForm'),
            params = form.getValues(),
            fileDate = this.getView().getViewModel().get('reportDate'),
            me = this;

        if (!form.isValid()) { return; }
        providersExportStore.getProxy().setExtraParam('pProvGroupId', params.provider.replace('-', ''));
        providersExportStore.getProxy().setExtraParam('pFileDate', fileDate);
        providersExportStore.load({
            callback: function() {
                var grid = me.lookupReference('hiddenProviderExport');

                grid.saveDocumentAs({
                    type: 'xlsx',
                    title: 'All Providers Export',
                    fileName: 'AllProvidersExport.xlsx'
                });
            }
        });
    },

    cancelReports: function() {
        this.getView().up().destroy();
    }
});