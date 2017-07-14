Ext.define('Atlas.atlasformulary.model.SaveDrugListDetail', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.savedruglistdetail',
  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'DrugListDtlSK' },
    { name: 'DrugListSk' },
    { name: 'UserId' },
    { name: 'tblRules' }
  ],
  /* eslint-enable object-curly-newline */
  hasMany: {
    model: 'Atlas.atlasformulary.model.SaveDrugCriteria',
    name: 'tblRules',
    associationKey: 'tblRules'
  },

  proxy: {
    url: '/druglistcriteriagroup'
  }
});
