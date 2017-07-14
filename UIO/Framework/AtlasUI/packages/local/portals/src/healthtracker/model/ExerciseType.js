/**
 * Created by m4542 on 11/10/2016.
 */
Ext.define('Atlas.portals.healthtracker.model.ExerciseType', {
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
      pListName: 'ExerciseType'
    },
    url: 'system/hp/listitemstable'
  }
});