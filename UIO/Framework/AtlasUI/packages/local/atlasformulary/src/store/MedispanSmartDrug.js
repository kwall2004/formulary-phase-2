Ext.define('Atlas.atlasformulary.store.MedispanSmartDrug', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.medispansmartdrug',

  proxy: {
    url: '/smartdrugsearchmedispan'
  }
});
