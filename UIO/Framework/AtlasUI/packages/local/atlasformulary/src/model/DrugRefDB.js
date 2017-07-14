Ext.define('Atlas.atlasformulary.model.DrugRefDB', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.drugrefdb',

  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'DrugRefDbSK' },
    { name: 'DrugRefDbName' }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    url: '/drugrefdb'
  }
});

