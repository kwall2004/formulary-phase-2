Ext.define('Atlas.atlasformulary.view.formularyheader.BackTextConfigController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.backtextconfig',

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
      me.lookup('backTextForm').loadRecord(records[0]);
    });
  },
  onCancelClick: function() {
    this.getView().hide();
  },
  onSaveClick: function() {
    var me = this,
        form = me.lookup('backTextForm'),
        vm = this.getViewModel();
    if (form.isValid()) {
      form.updateRecord(form.getRecord());
      form.submit({
        url: Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + '/SummaryConfigBackText?configSectionSK=' + me.sectionSK + '&DefaultBackTextPath=' + form.getRecord().get('DefaultBackTextPath'),
        success: function () {
          me.getView().hide();
          Ext.getBody().unmask();
          Ext.toast('Custom Back Text successfully saved.', 'Success');
        },
        failure: function () {
          me.getView().hide();
          Ext.getBody().unmask();
          Ext.toast('Custom Back Text failed to save.', 'Failure');
        }
      });
    }

  }
});
