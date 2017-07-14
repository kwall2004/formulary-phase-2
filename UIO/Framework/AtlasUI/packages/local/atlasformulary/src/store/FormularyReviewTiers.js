Ext.define('Atlas.atlasformulary.store.FormularyReviewTiers', {
  extend: 'Ext.data.Store',
  model: 'Atlas.atlasformulary.model.FormularyTierModel',
  alias: 'store.formularyreviewtiers',

  proxy: {
    type: 'formulary',
    url: '/formularyreviewtiers',
    idParam: 'formularysk',
    reader: {
      type: 'json',
      rootProperty: 'Rows'
    }
  }
});
