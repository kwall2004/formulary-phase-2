/**
 * Created by m4542 on 10/31/2016.
 */
Ext.define('Atlas.portals.healthtracker.model.BloodA1CData', {
  extend: 'Atlas.common.model.Base',

  fields: [
    {
      name: 'notes',
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
      name: 'dateHemoglobinA1CReading',
      type: 'date'
    },
    {
      name: 'recipientID',
      type: 'number'
    },
    {
      name: 'sectionID',
      type: 'number'
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