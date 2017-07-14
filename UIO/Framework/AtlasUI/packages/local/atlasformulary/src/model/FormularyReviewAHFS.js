Ext.define('Atlas.atlasformulary.model.FormularyReviewAHFS', {
  extend: 'Ext.data.TreeModel',
  fields: [
    {
      name: 'id',
      mapping: function (data) {
        return data.AHFS_Id;
      }
    },
    {
      name: 'name',
      mapping: function (data) {
        return data.AHFS_Name;
      }
    }
  ]
});
