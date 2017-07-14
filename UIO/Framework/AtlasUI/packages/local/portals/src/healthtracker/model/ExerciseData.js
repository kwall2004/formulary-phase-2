/**
 * Created by m4542 on 10/31/2016.
 */
Ext.define('Atlas.portals.healthtracker.model.ExerciseData', {
  extend: 'Atlas.common.model.Base',

  fields: [
    {
      name: 'exerciseDuration',
      type: 'string'
    },
    {
      name: 'seqNum',
      type: 'number'
    },
    {
      name: 'exerciseType',
      type: 'string'
    },
    {
      name: 'markDelete',
      type: 'boolean'
    },
    {
      name: 'dateExercise',
      type: 'date'
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
      name: 'feeling',
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