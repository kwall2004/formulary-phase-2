Ext.define('Atlas.atlasformulary.store.MedispanSmartDrugField', {
  extend: 'Atlas.atlasformulary.store.FdbSmartDrugField',
  alias: 'store.medispansmartdrugfield',

  proxy: {
    url: '/smartdrugsearchmedispanfield'
  }
});
