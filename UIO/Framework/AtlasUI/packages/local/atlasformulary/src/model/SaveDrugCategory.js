Ext.define('Atlas.atlasformulary.model.SaveDrugCategory', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.savedrugcategory',
  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'DrugCatgSK' },
    { name: 'UserId' },
    { name: 'CriteriaName' },
    { name: 'FrmlrySK' },
    { name: 'CvrdInd' },
    { name: 'tblRules' }
  ],
  /* eslint-enable object-curly-newline */
  hasMany: {
    model: 'Atlas.atlasformulary.model.SaveDrugCriteria',
    name: 'tblRules',
    associationKey: 'tblRules'
  },

  proxy: {
    url: '/drugcategory'
  }
});
