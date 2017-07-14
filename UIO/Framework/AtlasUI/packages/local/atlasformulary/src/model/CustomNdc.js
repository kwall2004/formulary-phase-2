Ext.define('Atlas.atlasformulary.model.CustomNdc', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.customndc',

  /* eslint-disable object-curly-newline */
  fields: [
    {
      name: 'DrugListSK',
      defaultValue: 1
    },
    { name: 'NDC' },
    { name: 'LabelName' },
    {
      name: 'DateToMarket',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    },
    { name: 'UnitPrice' },
    { name: 'RouteAdministration' },
    { name: 'TenantOwner' }
  ],
  /* eslint-enable object-curly-newline */
  proxy: {
    type: 'formulary',
    url: '/customndc',
    idParam: 'ndc'
  }
});
