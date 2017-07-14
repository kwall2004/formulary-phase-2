Ext.define('Atlas.atlasformulary.store.FdbSmartDrugField', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.fdbsmartdrugfield',

  proxy: {
    url: '/smartdrugsearchfdbfield'
  },

  listeners: {
    load: function (store) {
      store.insert(0, {
        SmartSearchFieldSK: 0,
        SmartSearchFieldName: 'All'
      });
    }
  }
});
