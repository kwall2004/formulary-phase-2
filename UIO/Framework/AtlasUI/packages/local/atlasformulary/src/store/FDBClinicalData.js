Ext.define('Atlas.atlasformulary.store.FDBClinicalData', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.fdbclinicaldata',
  model: 'Atlas.atlasformulary.model.FDBClinicalData',

  proxy: {
    pageParam: false,
    startParam: false,
    limitParam: false
  }
});
