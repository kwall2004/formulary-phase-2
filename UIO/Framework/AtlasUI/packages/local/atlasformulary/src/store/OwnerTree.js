Ext.define('Atlas.atlasformulary.store.OwnerTree', {
  extend: 'Ext.data.TreeStore',
  alias: 'store.ownertree',
  model: 'Atlas.atlasformulary.model.OwnerTree',
  storeId: 'ownertreestore',

  autoLoad: true,

  root: {
    expanded: true
  }
});
