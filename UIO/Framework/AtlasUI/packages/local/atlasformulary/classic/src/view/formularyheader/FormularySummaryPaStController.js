Ext.define('Atlas.atlasformulary.view.formularyheader.FormularySummaryPaStController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.formularysummarypast',

  workingMsg: 'Processing...',

  loadData: function (configuration, sectionSK) {
    this.getViewModel().set('configSectionSK', sectionSK);
    this.getViewModel().set('configuration', configuration);

    var store = this.getViewModel().getStore('summaryconfigpast');
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
    this.getView().hide();
  },

  onSaveClick: function () {
    var me = this;
    me.getView().mask(me.workingMsg);
    var proxy = this.getViewModel().get('summaryConfigSection').proxy;
    proxy.setExtraParam('summaryReportConfigSectionSK', this.getViewModel().get('configSectionSK'));

    var configuration = this.getViewModel().get('configuration');

    this.getViewModel().get('summaryConfigSection').save({
      success: function () {
        me.getView().unmask();
        Ext.toast('Successfully updated Formulary Summary ' + configuration + ' Configuration');
      },
      failure: function () {
        me.getView().unmask();
        Ext.toast('There was an error while trying to update.');
      }
    });
  }


});