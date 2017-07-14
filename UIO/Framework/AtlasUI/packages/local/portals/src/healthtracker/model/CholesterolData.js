/**
 * Created by m4542 on 10/31/2016.
 */
Ext.define('Atlas.portals.healthtracker.model.CholesterolData', {
  extend: 'Atlas.common.model.Base',

  fields: [
    {
      name: 'HDL',
      type: 'string'
    },
    {
      name: 'notes',
      type: 'string'
    },
    {
      name: 'LDL',
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
      name: 'triglycerides',
      type: 'string'
    },
    {
      name: 'dateCholesterolReading',
      type: 'date'
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