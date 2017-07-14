Ext.define('Atlas.atlasformulary.model.EtcTree', {
  extend: 'Ext.data.TreeModel',
  fields: [
    {
      name: 'id',
      mapping: function (data) {
        return data.ETC_ID;
      }
    },
    {
      name: 'name',
      mapping: function (data) {
        return data.ETC_NAME;
      }
    }
  ]
});
