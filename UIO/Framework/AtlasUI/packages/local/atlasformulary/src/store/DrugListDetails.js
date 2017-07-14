Ext.define('Atlas.atlasformulary.store.DrugListDetails', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.druglistdetails',
  model: 'Atlas.atlasformulary.model.DrugListDetail',

  proxy: {
    type: 'formulary',
    url: '/druglistcriteriagroup',

    extraParams: {
      druglistsk: null,
      druglistdetailsk: null,
      isnewrequest: null,
      count: 25
    },
    startParam: 'startIndex'
  }
});
