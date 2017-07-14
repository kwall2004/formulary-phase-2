Ext.define('Atlas.atlasformulary.store.MedispanSmartNewDrugsToMarket', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.medispansmartnewdrugstomarket',

  proxy: {
    url: '/newdrugstomarketmedispan'
  }
});
