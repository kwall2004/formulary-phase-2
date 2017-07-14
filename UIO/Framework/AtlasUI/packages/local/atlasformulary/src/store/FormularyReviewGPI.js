Ext.define('Atlas.atlasformulary.store.FormularyReviewGPI', {
  extend: 'Ext.data.TreeStore',
  alias: 'store.formularyreviewgpi',
  model: 'Atlas.atlasformulary.model.GpiTree',

  proxy: {
    type: 'formulary',
    url: '/formularyreviewgpi',
    pageParam: '',
    limitParam: '',
    startParam: '',
    treeTypeParam: 'GPI',
    reader: {
      type: 'json',
      rootProperty: 'children'
    },
    extraParams: {
      formularysk: null
    }
  }
});
