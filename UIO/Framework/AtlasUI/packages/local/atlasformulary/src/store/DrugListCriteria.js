Ext.define('Atlas.atlasformulary.store.DrugListCriteria', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.druglistcriterias',
  model: 'Atlas.atlasformulary.model.DrugCriteria',

  proxy: {
    url: '/druglistcriteriagroup',
    extraParams: {
      druglistdetailsk: null
    }
  }
});
