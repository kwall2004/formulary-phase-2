Ext.define('Atlas.atlasformulary.store.FdbNewDrugsToMarket', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.fdbnewdrugstomarket',
  model: 'Atlas.atlasformulary.model.FdbNewDrugsToMarket',

  proxy: {
    url: '/newdrugstomarket'
  }
});
