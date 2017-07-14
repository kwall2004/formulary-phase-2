Ext.define('Atlas.atlasformulary.model.FdbNewDrugsToMarket', {
  extend: 'Atlas.atlasformulary.model.Base',

  /* eslint-disable object-curly-newline */
  fields: [
    { name: 'LabelName' },
    { name: 'NDC' },
    { name: 'GenericName' },
    { name: 'BrandName' },
    { name: 'MedId' },
    { name: 'DrugStrength' },
    {
      name: 'DateToMarket',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    }
  ]
  /* eslint-enable object-curly-newline */
});
