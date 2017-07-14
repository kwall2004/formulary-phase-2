Ext.define('Atlas.atlasformulary.store.DrugListAssocFormularies', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.druglistassocformularies',
  model: 'Atlas.atlasformulary.model.DrugListAssocFormularies',

  proxy: {
    pageParam: false,
    startParam: false,
    limitParam: false
  }
});
