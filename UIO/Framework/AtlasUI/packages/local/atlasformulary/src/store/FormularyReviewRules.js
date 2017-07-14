Ext.define('Atlas.atlasformulary.store.FormularyReviewRules', {
  extend: 'Ext.data.Store',
  model: 'Atlas.atlasformulary.model.DrugCategory',
  alias: 'store.formularyreviewrules',

  proxy: {
    type: 'formulary',
    url: '/formularyreviewrules',
    idParam: 'formularysk',
    reader: {
      type: 'json',
      rootProperty: 'Rows'
    }
  }
});
