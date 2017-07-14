Ext.define('Atlas.atlasformulary.model.DrugCriteria', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.drugcriteria',

  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'property' },
    { name: 'opertator' },
    { name: 'value' }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    url: '/drugcriteria',

    extraParams: {
      drugcategorysk: null
    }
  }
});
