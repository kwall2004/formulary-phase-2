Ext.define('Atlas.atlasformulary.view.formularyheader.FrontTextConfigController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.fronttextconfig',

  onStoreBeforeLoad: function (store) {
    this.getViewModel().get('pendingCalls').push(store.type);
  },

  onStoreLoad: function (store) {
    var pendingCalls = this.getViewModel().get('pendingCalls');
    pendingCalls.splice(pendingCalls.indexOf(store.type), 1);
    if (pendingCalls.length === 0) {
      Ext.getBody().unmask();
    }
  },

  loadData: function (sectionSK) {
    var me = this,
        store = me.getViewModel().getStore('file');

    store.proxy.setExtraParams({});
    store.load(function(records){
      for (var i in records) {
        records[i].data = {'fileNames': records[i].data};
      }
    });
    store = me.getViewModel().getStore('mainStore');
    me.sectionSK = sectionSK;
    store.proxy.setExtraParams({'configSectionSK': sectionSK});
    store.load(function(records) {
      me.lookup('frontTextForm').loadRecord(records[0]);
    });
  },
  onCancelClick: function() {
    this.getView().hide();
  },
  onSaveClick: function() {
    var me = this,
        form = me.lookup('frontTextForm'),
        vm = this.getViewModel();
    if (form.isValid()) {
      form.updateRecord(form.getRecord());
      form.submit({
        url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/SummaryConfigFrontText?configSectionSK=' + me.sectionSK + '&isTitlePageOnly=' + form.getRecord().get('isTitlePageOnly') + '&DefaultFrontTextPath=' + form.getRecord().get('DefaultFrontTextPath'),
        success: function () {
          me.getView().hide();
          Ext.getBody().unmask();
          Ext.toast('Custom Front Text successfully saved.', 'Success');
        },
        failure: function () {
          me.getView().hide();
          Ext.getBody().unmask();
          Ext.toast('Custom Front Text failed to save.', 'Failure');
        }
      });
    }
  }
});
