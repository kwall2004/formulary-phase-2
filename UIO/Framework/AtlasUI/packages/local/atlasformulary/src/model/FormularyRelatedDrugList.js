Ext.define('Atlas.atlasformulary.model.FormularyRelatedDrugList', {
  extend: 'Atlas.atlasformulary.model.Base',

  fields: [
    'name'
  ],

  proxy: {
    type: 'memory'
  }
});