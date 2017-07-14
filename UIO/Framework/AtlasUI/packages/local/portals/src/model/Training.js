Ext.define('Atlas.portals.model.Training', {
  extend: 'Atlas.common.model.Base',
  fields: [
    'trainingDateKey'
  ],
  proxy: {
    extraParams: {
      'pListName': 'TrainingProviderPortalWebEx'
    },
    url: 'member/hp/listitems',
    reader: {
      metaProperty: 'metadata',
      rootProperty: function (payload) {
        return payload.data;
      }
    }
  }
});