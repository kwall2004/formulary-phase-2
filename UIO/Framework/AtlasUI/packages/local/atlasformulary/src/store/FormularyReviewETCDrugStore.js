Ext.define('Atlas.atlasformulary.store.FormularyReviewETCDrugStore', {
  extend: 'Ext.data.Store',
  model: 'Atlas.atlasformulary.model.FdbDrug',
  proxy: {
    type: 'formulary',
    url: '/formularyreviewetc',
    idParam: 'formularysk'
  }
});
