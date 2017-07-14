Ext.define('Atlas.atlasformulary.store.FormularyPlanSubType', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.formularyplansubtype',
  model: 'Atlas.atlasformulary.model.FormularyPlanSubType',

  proxy: {
    url: '/formularyplansubtype'
  }
});