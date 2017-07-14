Ext.define('Atlas.atlasformulary.store.NDCNotes', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.ndcnotes',
  model: 'Atlas.atlasformulary.model.NDCNote',

  proxy: {
    pageParam: false,
    startParam: false,
    limitParam: false
  }
});
