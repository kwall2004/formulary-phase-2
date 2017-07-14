Ext.define('Atlas.atlasformulary.store.FormularyReviewDrugs', {
  extend: 'Ext.data.Store',
  alias: 'store.formularyreviewdrugs',
  model: 'Atlas.atlasformulary.model.FdbDrug',

  proxy: {
    type: 'formulary',
    url: '/formularyreview',
    extraParams: {
      formularysk: null
    },
    reader: {
      type: 'json',
      rootProperty: 'Rows',
      totalProperty: 'Count'
    }
  }
});
