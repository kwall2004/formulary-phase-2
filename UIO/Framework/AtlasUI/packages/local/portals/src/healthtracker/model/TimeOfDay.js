/**
 * Created by m4542 on 11/10/2016.
 */
Ext.define('Atlas.portals.healthtracker.model.TimeOfDay', {
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
      pListName: 'TimeofDay'
    },
    url: 'system/hp/listitemstable'
  }
});