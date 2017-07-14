/**
 * Created by m4542 on 11/22/2016.
 */
Ext.define('Atlas.portals.provider.model.CareGiverDetail', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'ttclinicName', type: 'string' },
        { name: 'ttAddress2', type: 'string' },
        { name: 'ttAddress1', type: 'string' },
        { name: 'ttcareGiverID', type: 'int' },
        { name: 'ttPhoneMain', type: 'date' },
        { name: 'ttfirstName', type: 'string' },
        { name: 'ttlastName', type: 'string' },
        { name: 'ttPhone2', type: 'string' },
        { name: 'ttPhone3', type: 'string' },
        { name: 'ttEmailAddress', type: 'int' },
        { name: "formattedEmailAddress", calculate: function(obj){
            if(obj.ttEmailAddress === 0) {
                return "";
            }

            return obj.ttEmailAddress;
        }},
        { name: 'ttPhoneCell', type: 'string' },
        { name: 'ttwaiverProvider', type: 'boolean' },
        { name: 'ttzipCode', type: 'string' },
        { name: 'ttnpiNum', type: 'string' },
        { name: 'ttPhoneFax', type: 'string' },
        { name: 'ttcaregiverIND', type: 'int' },
        { name: 'ttdbRowID', type: 'string' },
        { name: 'ttProvID', type: 'string' },
        { name: 'ttState', type: 'string' },
        { name: 'ttCity', type: 'string' },
        { name: 'ttcareGiverType', type: 'string' }
    ],
    proxy: {
        url: 'caremanagement/hp/caregiverdetail',
        reader: {
            metaProperty: 'metadata',
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }
});