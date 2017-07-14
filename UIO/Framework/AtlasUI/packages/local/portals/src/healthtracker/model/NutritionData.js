/**
 * Created by m4542 on 10/31/2016.
 */
Ext.define('Atlas.portals.healthtracker.model.NutritionData', {
  extend: 'Atlas.common.model.Base',

  fields: [
    {
      name: 'breakfastNotes',
      type: 'string'
    },
    {
      name: 'lunchNotes',
      type: 'string'
    },
    {
      name: 'dateNutritionStart',
      type: 'date'
    },
    {
      name: 'dinnerNotes',
      type: 'string'
    },
    {
      name: 'snackNotes',
      type: 'string'
    },
    {
      name: 'seqNum',
      type: 'number'
    },
    {
      name: 'markDelete',
      type: 'boolean'
    },
    {
      name: 'recipientID',
      type: 'number'
    },
    {
      name: 'sectionID',
      type: 'number'
    },
    {
      name: 'dayNotes',
      type: 'string'
    }
  ],
  proxy: {
    url: 'caremanagement/hp/healthtrackerdata',
    reader: {
      metaProperty: 'metadata',
      rootProperty: function (payload) {
        return payload.data;
      }
    }
  }
});