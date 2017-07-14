Ext.define('Atlas.atlasformulary.store.DrugRefDB', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.drugrefdb',
  model: 'Atlas.atlasformulary.model.DrugRefDB',

  proxy: {
    url: '/drugrefdb',
    pageParam: '',
    startParam: '',
    limitParam: ''
  }
});