/**
 * Created by m4542 on 10/31/2016.
 */
Ext.define('Atlas.portals.healthtracker.model.BMIData', {
  extend: 'Atlas.common.model.Base',

  fields: [
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
      name: 'weight',
      type: 'string'
    },
    {
      name: 'sectionID',
      type: 'number'
    },
    {
      name: 'measureDate',
      type: 'date'
    },
    {
      name: 'height',
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