Ext.define('Atlas.atlasformulary.store.FormularyReviewNotes', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.formularyreviewnotes',
  model: 'Atlas.atlasformulary.model.FormularyReviewNote',

  proxy: {
    type: 'formulary',
    url: '/formularynotes',
    pageParam: undefined,
    limitParam: undefined,
    startParam: undefined
  }
});
