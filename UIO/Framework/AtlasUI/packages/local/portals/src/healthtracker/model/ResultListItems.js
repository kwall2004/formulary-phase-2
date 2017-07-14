/**
 * Created by m4542 on 11/8/2016.
 */
Ext.define('Atlas.portals.healthtracker.model.ResultListItems', {
  extend: 'Atlas.common.model.Base',

  fields: [
    {
      name: 'listitem',
      type: 'string'
    },
    {
      name: 'listDescription',
      type: 'string'
    }
  ],

  proxy: {
    extraParams: {
      pListName: 'ResultOfVisit'
    },
    url: 'system/hp/listitemstable'
  }
});