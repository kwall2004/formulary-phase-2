Ext.define('Atlas.atlasformulary.store.GpiTree', {
  extend: 'Atlas.atlasformulary.store.EtcTree',
  alias: 'store.gpitree',
  model: 'Atlas.atlasformulary.model.GpiTree',

  proxy: {
    url: '/gpitree'
  }
});