/**
 * Created by m4542 on 1/9/2017.
 */
Ext.define('Atlas.portals.hpmember.model.HealthPassportData', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'LANGUAGE', type: 'string' },
        { name: 'RecipientID', type: 'number' },
        { name: 'FirstName', type: 'string' },
        { name: 'ZipCode', type: 'string' },
        { name: 'PlanID', type: 'string' },
        { name: 'Address2', type: 'string' },
        { name: 'Address1', type: 'string' },
        { name: 'City', type: 'string' },
        { name: 'Salutation', type: 'string' },
        { name: 'MiddleInitial', type: 'int' },
        { name: 'PrintDate', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'State', type: 'string' },
        { name: 'MemSystemID', type: 'number' },
        { name: 'FromDate', type: 'date', dateFormat: 'Y-m-d'  },
        { name: 'ToDate', type: 'date', dateFormat: 'Y-m-d'  },
        { name: 'ID', type: 'string' },
        { name: 'LastName', type: 'string' },
        { name: 'PrintRoom', type: 'boolean' },
        { name: 'DB', type: 'string' },
        { name: 'jobNumber', type: 'number' },
        { name: 'lobID', type: 'string' }
    ],
    proxy: {
        url: 'member/hp/healthpassportdata',
        reader: {
            metaProperty: 'metadata',
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }
});