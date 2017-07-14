Ext.define('Atlas.atlasformulary.model.DrugListDetail', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.druglistdetail',

  idParameter: 'druglistdetailsk',

  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'DrugListDtlSK' },
    { name: 'DrugListSK' },
    { name: 'DrugListDtlName' }
  ],
  /* eslint-enable object-curly-newline */
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
