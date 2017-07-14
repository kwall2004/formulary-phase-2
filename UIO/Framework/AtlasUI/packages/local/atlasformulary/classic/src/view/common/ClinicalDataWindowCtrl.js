Ext.define('Atlas.atlasformulary.view.common.ClinicalDataWindowCtrl', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.clinicaldatawindowctrl',

  loadFDBClinicalData: function (NDC) {
    var me = this,
      store = me.getViewModel().getStore('fdbclinicaldata');

    me.getViewModel().set('NDC', NDC);
    store.proxy.setExtraParam('ndc', NDC);
    Ext.getBody().mask('Loading');
    store.load(function (records) {
      if (records.length === 1) {
        me.getViewModel().set('clinicaldata', records[0]);
      }
      Ext.getBody().unmask();
    });
  },

  onTabActivate: function (tab) {
    this.getViewModel().set('activeTab', tab.itemId);
  },

  onCloseClick: function () {
    this.getView().destroy();
  },

  loadAllStores: function (NDC) {
    this.loadFDBClinicalData(NDC);
  }
});
