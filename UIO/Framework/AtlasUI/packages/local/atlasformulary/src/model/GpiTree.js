Ext.define('Atlas.atlasformulary.model.GpiTree', {
  extend: 'Ext.data.TreeModel',
  fields: [
    {
      name: 'id',
      mapping: function (data) {
        return data.GPI;
      }
    },
    {
      name: 'name',
      mapping: function (data) {
        return data.GPI_Name;
      }
    }
  ]
});