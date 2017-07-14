Ext.define('Atlas.atlasformulary.model.NDCFormulary', {
  extend: 'Atlas.atlasformulary.model.Base',

  fields: [
    'FrmlryName',
    'FrmlryVer',
    {
      name: 'EfctvStartDt',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    },
    {
      name: 'ApprovedDate',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    }
  ],

  proxy: {
    url: '/formularyndc',
    idParam: 'ndc'
  }
});