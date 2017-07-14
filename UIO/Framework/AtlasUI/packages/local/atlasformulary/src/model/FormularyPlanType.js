Ext.define('Atlas.atlasformulary.model.FormularyPlanType', {
  extend: 'Atlas.atlasformulary.model.Base',

  fields: [
    'FrmlryPlanTypeName',
    'FrmlryPlanTypeSK'
  ],

  proxy: {
    url: '/formularyplantype'
  }
});
