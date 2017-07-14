Ext.define('Atlas.atlasformulary.model.FormularyTierModel', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.formularytier',

  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'FrmlrySK' },
    { name: 'FrmlryTierSK' },
    { name: 'FrmlryTierName' },
    { name: 'FrmlryTierDesc' },
    { name: 'FrmlryTierNumber' },
    {
      name: 'EfctvStartDt',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    },
    {
      name: 'EfctvEndDt',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    },
    { name: 'CreatedBy' },
    {
      name: 'CreatedTs',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    },
    { name: 'LastModfdBy' },
    {
      name: 'LastModfdTs',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    url: '/formularytier',
    pageParam: '',
    limitParam: '',
    startParam: '',
    actionMethods: {
      destroy: 'POST'
    }
  }
});
