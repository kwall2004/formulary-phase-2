Ext.define('Atlas.atlasformulary.store.FdbSmartDrugDrugList', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.fdbsmartdrugdruglist',

  proxy: {
    url: '/druglistconfigsmartdrugsearch'
  }
});