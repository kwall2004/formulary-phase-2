Ext.define('Atlas.atlasformulary.store.FdbDrug', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.fdbdrug',
  model: 'Atlas.atlasformulary.model.FdbDrug',

  remoteSort: true,
  remoteFilter: true,

  proxy: {
    url: '/drugsearch',
    jsonSubmit: true,
    paramsAsJson: true,
    actionMethods: {
      create: 'POST',
      read: 'POST',
      update: 'POST',
      destroy: 'POST'
    },
    enablePaging: true
  }
});
