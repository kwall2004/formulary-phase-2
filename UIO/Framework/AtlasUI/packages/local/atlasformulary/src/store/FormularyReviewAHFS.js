Ext.define('Atlas.atlasformulary.store.FormularyReviewAHFS', {
  extend: 'Ext.data.TreeStore',
  alias: 'store.formularyreviewahfs',
  model: 'Atlas.atlasformulary.model.FormularyReviewAHFS',

  proxy: {
    type: 'formulary',
    url: '/formularyreviewahfs',
    extraParams: {
      formularysk: null,
      ahfs_id: null // eslint-disable-line camelcase
    },
    pageParam: '',
    limitParam: '',
    startParam: '',
    treeTypeParam: 'AHFS',
    reader: {
      type: 'json',
      rootProperty: 'children'
    }
  }
});
