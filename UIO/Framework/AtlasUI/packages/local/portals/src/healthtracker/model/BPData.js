/**
 * Created by m4542 on 10/31/2016.
 */
Ext.define('Atlas.portals.healthtracker.model.BPData', {
  extend: 'Atlas.common.model.Base',

  fields: [
    {
      name: 'systolic',
      type: 'string'
    },
    {
      name: 'diastolic',
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
      name: 'pulse',
      type: 'string'
    },
    {
      name: 'recipientID',
      type: 'number'
    },
    {
      name: 'dateBPReading',
      type: 'date'
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