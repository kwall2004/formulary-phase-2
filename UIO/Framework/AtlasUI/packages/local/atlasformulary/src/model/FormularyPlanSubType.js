Ext.define('Atlas.atlasformulary.model.FormularyPlanSubType', {
  extend: 'Atlas.atlasformulary.model.Base',

  fields: [
    'FrmlryPlanSubTypeSK',
    'FrmlryPlanSubTypeName'
  ],

  proxy: {
    url: 'FormularyPlanSubType'
  }
});