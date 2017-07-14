Ext.define('Atlas.atlasformulary.store.FdbSmartDrugFormulary', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.fdbsmartdrugformulary',

  proxy: {
    url: '/formularyconfigsmartdrugsearch'
  }
});
