/**
 * Created by m4542 on 10/31/2016.
 */
Ext.define('Atlas.portals.healthtracker.model.MedicationsData', {
  extend: 'Atlas.common.model.Base',

  fields: [
    {
      name: 'dosage',
      type: 'string'
    },
    {
      name: 'strength',
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
      name: 'reasonForTaking',
      type: 'string'
    },
    {
      name: 'sectionID',
      type: 'number'
    },
    {
      name: 'dateMedicationStart',
      type: 'date'
    },
    {
      name: 'medicineName',
      type: 'string'
    },
    {
      name: 'frequency',
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