Ext.define('Atlas.atlasformulary.store.FdbSmartDrug', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.fdbsmartdrug',

  proxy: {
    url: '/smartdrugsearch'
  }
});
