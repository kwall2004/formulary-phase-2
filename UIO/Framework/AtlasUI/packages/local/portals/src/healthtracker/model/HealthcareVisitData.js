/**
 * Created by m4542 on 10/31/2016.
 */
Ext.define('Atlas.portals.healthtracker.model.HealthcareVisitData', {
  extend: 'Atlas.common.model.Base',

  fields: [
    {
      name: 'newPrescription',
      type: 'boolean'
    },
    {
      name: 'notes',
      type: 'string'
    },
    {
      name: 'reasonforVisit',
      type: 'string'
    },
    {
      name: 'provider',
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
      name: 'dateOfVisit',
      type: 'date'
    },
    {
      name: 'resultOfVisit',
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