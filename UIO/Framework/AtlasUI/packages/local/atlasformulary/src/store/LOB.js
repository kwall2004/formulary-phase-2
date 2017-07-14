Ext.define('Atlas.atlasformulary.store.LOB', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.lob',
  model: 'Atlas.atlasformulary.model.LOB',

  proxy: {
    url: '/lob'
  }
});