Ext.define('Atlas.atlasformulary.view.formularyheader.HeaderFooterConfigController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.headerfooterconfig',

  loadData: function (sectionSK) {
    var me = this,
        store = me.getViewModel().getStore('file');

    store.proxy.setExtraParam('summaryReportConfigSectionSK', sectionSK);
    store.load(function(records) {
      me.lookup('headerFooterConfigForm').loadRecord(records[0]);
    });
  },
  onCancelClick: function() {
    this.getView().hide();
  },
  onSaveClick: function() {
    var me = this,
      form = me.lookup('headerFooterConfigForm');
    form.updateRecord(form.getRecord());
    me.getViewModel().getStore('file').sync({
      success: function (results) {
        me.getView().hide();
        Ext.getBody().unmask();
        Ext.toast('Header/Footer successfully saved.', 'Success');
      },
      failure: function (results) {
        Ext.getBody().unmask();
        Ext.toast('Header/Footer failed to save.', 'Failure');
      }
    });
  }
});
