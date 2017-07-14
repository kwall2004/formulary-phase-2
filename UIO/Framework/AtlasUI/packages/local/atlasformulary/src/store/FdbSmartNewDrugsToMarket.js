Ext.define('Atlas.atlasformulary.store.FdbSmartNewDrugsToMarket', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.fdbsmartnewdrugstomarket',

  proxy: {
    url: '/newdrugstomarket'
  }
});
