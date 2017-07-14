Ext.define('Atlas.atlasformulary.model.CustomNDCFormularyFormulary', {
  extend: 'Atlas.atlasformulary.model.Base',
  alias: 'model.customndcformularyformulary',

  columns: [
    'FormularySK',
    'FrmlryName',
    {
      name: 'EfctvStartDt',
      type: 'date',
      dateFormat: 'Y-m-d\\TH:i:s'
    }
  ],
  proxy: {
    type: 'memory'
  }
});