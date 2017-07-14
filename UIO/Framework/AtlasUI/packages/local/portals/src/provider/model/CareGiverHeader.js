/**
 * Created by m4542 on 11/15/2016.
 */
Ext.define('Atlas.portals.provider.model.CareGiverHeader', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'ttuserName', type: 'string' },
        { name: 'ttCareGiverIND', type: 'int' },
        { name: 'ttfirstName', type: 'string' },
        { name: 'ttlastName', type: 'string' },
        { name: 'ttCareGiverID', type: 'int' },

        { name: "formattedTTCareGiverID", calculate: function(obj){
            if(obj.ttCareGiverID === 0) {
                return "";
            }

            return obj.ttCareGiverID;
        }},

        { name: 'ttspecialty', type: 'string'},
        { name: 'ttProvID', type: 'string' },
        { name: 'ttrecipientID', type: 'int'},
        { name: 'ttcareGiverType', type: 'string'}
    ],


    proxy: {
        url: 'caremanagement/hp/caregiverheader'
    }
});