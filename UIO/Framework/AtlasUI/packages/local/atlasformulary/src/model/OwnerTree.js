Ext.define('Atlas.atlasformulary.model.OwnerTree', {
  extend: 'Ext.data.Model',
  alias: 'model.ownertree',

  fields: [
    {
      name: 'id',
      mapping: function (data) {
        return data.id;
      }
    },
    {
      name: 'msg',
      mapping: function (data) {
        return data.msg;
      }
    },
    {
      name: 'name',
      mapping: function (data) {
        return data.name;
      }
    },
    {
      name: 'text',
      mapping: function (data) {
        return data.text;
      }
    }
  ],

  proxy: {
    type: 'ajax',
    api: {
      read: 'resources/data/dummydata/ownertree.json'
    },
    reader: {
      type: 'json',
      rootProperty: 'children'
    }
  }
});
