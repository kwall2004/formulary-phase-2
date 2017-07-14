Ext.define('Atlas.portals.view.Model.FormsModel', {
  extend: 'Atlas.common.model.Base',

  fields: [
    {
      name: 'StateDesc',
      type: 'string'
    },
    {
      name: 'StateCode',
      type: 'string'
    }
  ],

  proxy: {
    url: 'portal/{0}/priorauthdocumentsmrxrest',
    reader: {
      //Specify metadata property
      metaProperty: 'metadata',
      //Optionally specify root of the data if it's other than 'data'
      rootProperty: function (payload) {
        return payload.data;
      }
    }
  }

});