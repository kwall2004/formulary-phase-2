Ext.define('Atlas.atlasformulary.store.NDCFormularies', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.ndcformularies',
  model: 'Atlas.atlasformulary.model.NDCFormulary',

  proxy: {
    pageParam: false,
    startParam: false,
    limitParam: false
  }
});