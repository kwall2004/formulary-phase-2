Ext.define('Atlas.atlasformulary.store.MedispanSmartDrugFormulary', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.medispansmartdrugformulary',

  proxy: {
    url: '/formularyconfigsmartdrugsearchmedispan'
  }
});
