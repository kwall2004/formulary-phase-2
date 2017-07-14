Ext.define('Atlas.atlasformulary.store.MedispanNewDrugsToMarket', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.medispannewdrugstomarket',
  model: 'Atlas.atlasformulary.model.MedispanNewDrugsToMarket',

  proxy: {
    url: '/newdrugstomarketmedispan'
  }
});
