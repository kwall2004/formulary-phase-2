Ext.define('Atlas.atlasformulary.store.EtcTree', {
  extend: 'Ext.data.TreeStore',
  alias: 'store.etctree',
  model: 'Atlas.atlasformulary.model.EtcTree',

  proxy: {
    type: 'formulary',
    url: '/formularytree',
    reader: {
      type: 'json',
      rootProperty: 'children'
    }
  }
});
