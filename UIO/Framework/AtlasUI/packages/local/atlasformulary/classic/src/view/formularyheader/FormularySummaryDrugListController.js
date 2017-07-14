Ext.define('Atlas.atlasformulary.view.formularyheader.FormularySummaryDrugListController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.formularysummarydruglist',

  workingMsg: 'Processing...',

  loadData: function (sectionSK) {
    this.getViewModel().set('configSectionSK', sectionSK);
    var store = this.getViewModel().getStore('summaryconfigdruglistsection');
    store.proxy.setExtraParam('summaryReportConfigSectionSK', sectionSK);
    store.load({
      scope: this,
      callback: function (records, operation, success) {
        if (success) {
          this.getViewModel().set('summaryConfigSection', records[0]);
        }
      }
    });
  },

  onCloseClick: function () {
    this.lookup('columnonecheckbox').setValue(0);
    this.lookup('columntwocheckbox').setValue(0);
    this.lookup('columnthreecheckbox').setValue(0);
    this.lookup('columnfourcheckbox').setValue(0);
    this.getView().hide();
  },

  onSaveClick: function () {
    var me = this;
    me.getView().mask(me.workingMsg);
    var proxy = this.getViewModel().get('summaryConfigSection').proxy;
    proxy.setExtraParam('summaryReportConfigSectionSK', this.getViewModel().get('configSectionSK'));

    this.getViewModel().get('summaryConfigSection').save({
      success: function () {
        me.getView().unmask();
        Ext.toast('Successfully updated Formulary Summary Drug List');
      },
      failure: function () {
        me.getView().unmask();
        Ext.toast('There was an error while trying to update.');
      }
    });
  }


});