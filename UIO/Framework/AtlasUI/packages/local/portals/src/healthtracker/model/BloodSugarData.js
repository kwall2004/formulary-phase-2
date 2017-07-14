/**
 * Created by m4542 on 10/31/2016.
 */
Ext.define('Atlas.portals.healthtracker.model.BloodSugarData', {
  extend: 'Atlas.common.model.Base',

  fields: [
    {
      name: 'dateBloodSugarReading',
      type: 'date'
    },
    {
      name: 'notes',
      type: 'string'
    },
    {
      name: 'bloodsugarLevel',
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
      name: 'dayTime',
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