Ext.define('Atlas.atlasformulary.store.CompareFormularyUMCriterias', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.compareformularyumcriterias',
  model: 'Atlas.atlasformulary.model.CompareFormularyUMCriteria',

  proxy: {
    url: '/formularycompare',
    pageParam: false,
    startParam: false,
    limitParam: false
  }
});
