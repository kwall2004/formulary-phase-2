Ext.define('Atlas.atlasformulary.store.FormularyReviewETC', {
  extend: 'Ext.data.TreeStore',
  alias: 'store.formularyreviewetc',
  model: 'Atlas.atlasformulary.model.EtcTree',

  proxy: {
    type: 'formulary',
    url: '/formularyreviewetc',
    pageParam: '',
    limitParam: '',
    startParam: '',
    treeTypeParam: 'ETC',
    reader: {
      type: 'json',
      rootProperty: 'children'
    },
    extraParams: {
      formularysk: null
    }
  }
});
