Ext.define('Atlas.atlasformulary.store.FormularyPlanType', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.formularyplantype',
  model: 'Atlas.atlasformulary.model.FormularyPlanType',

  proxy: {
    url: '/formularyplantype'
  }
});