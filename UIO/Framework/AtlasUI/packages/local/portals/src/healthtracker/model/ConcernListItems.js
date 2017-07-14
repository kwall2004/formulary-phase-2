/**
 * Created by m4542 on 11/9/2016.
 */
Ext.define('Atlas.portals.healthtracker.model.ConcernListItems', {
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
      pListName: 'HowConcernedAreYou'
    },
    url: 'system/hp/listitemstable'
  }
});