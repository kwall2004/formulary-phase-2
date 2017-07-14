Ext.define('Atlas.atlasformulary.model.FormularyDrugList', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.formularydruglist',

  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'FrmlryDrugListSK' },
    { name: 'FrmlrySK' },
    { name: 'DrugListSK' },
    { name: 'FrmlryDrugListName' },
    { name: 'EfctvStartDt' },
    { name: 'EfctvEndDt' },
    { name: 'CreatedBy' },
    { name: 'CreatedTs' },
    { name: 'LastModfdBy' },
    { name: 'LastModfdTs' },
    { name: 'InctvTs' },
    { name: 'DelTs' }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    url: '/formularydruglist',
    actionMethods: {
      destroy: 'POST'
    }
  }
});
