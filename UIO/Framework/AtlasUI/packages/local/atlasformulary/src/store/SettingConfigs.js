Ext.define('Atlas.atlasformulary.store.SettingConfigs', {
  extend: 'Ext.data.Store',
  alias: 'store.settingconfigs',
  requires: [
    'Atlas.atlasformulary.model.SettingConfig',
    'Ext.data.proxy.Rest',
    'Ext.data.reader.Json'
  ],

  constructor: function (cfg) {
    var me = this,
      newcfg = cfg || {};
    me.callParent([Ext.apply({
      storeId: 'SettingConfigs',
      model: 'Atlas.atlasformulary.model.SettingConfig',
      proxy: {
        type: 'rest',
        url: '/settingconfig',
        reader: {
          type: 'json',
          rootProperty: 'configs'
        }
      }
    }, newcfg)]);
  }
});