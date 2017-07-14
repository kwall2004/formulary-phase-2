Ext.define('Atlas.atlasformulary.store.MedispanSmartDrugDrugList', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.medispansmartdrugdruglist',

  proxy: {
    url: '/druglistconfigsmartdrugsearchmedispan'
  }
});