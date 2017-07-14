Ext.define('Atlas.atlasformulary.store.MedispanDrug', {
  extend: 'Atlas.atlasformulary.store.FdbDrug',
  alias: 'store.medispandrug',
  model: 'Atlas.atlasformulary.model.MedispanDrug',

  proxy: {
    url: '/medispandrugsearch'
  }
});
