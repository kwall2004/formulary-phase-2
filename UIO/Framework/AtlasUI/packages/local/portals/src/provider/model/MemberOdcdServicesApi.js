/*
 * Last Developer: Srujith Cheruku
 * Date: 11-21-2016
 * Previous Developers: []
 * Origin: Provider - Auth Inquiry - Member Search
 * Description: Member Search
 */

Ext.define('Atlas.portals.provider.model.MemberOdcdServicesApi', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {
            name: 'recipientID', type: 'number'
        },
        {
            name: 'benefitPlanCode', type: 'string'
        },
        {
            name: 'requestID', type: 'string'
        },
        {
            name: 'startDate', type: 'date'
        },
        {
            name: 'endDate', type: 'date'
        },
        {
            name: 'serviceLineNumber', type: 'string'
        },
        {
            name: 'createUser', type: 'string'
        },
        {
            name: 'measureDesc', type: 'string'
        },
        {
            name: 'receiveDateTime', type: 'string'
        },
        {
            name: 'requestedBy', type: 'string'
        },
        {
            name: 'reviewType', type: 'string'
        },
        {
            name: 'reviewTypeDesc', type: 'string'
        },
        {
            name: 'serviceCode', type: 'string'
        },
        {
            name: 'dbRowID', type: 'string'
        },
        {
            name: 'serviceDescription', type: 'string'
        },
        {
            name: 'serviceMeasure', type: 'string'
        },
        {
            name: 'serviceReqUnits', type: 'number'
        },
        {
            name: 'serviceStatus', type: 'string'
        },
        {
            name: 'serviceType', type: 'string'
        },
        {
            name: 'systemID', type: 'number'
        },
        {
            name: 'rownum', type: 'string'
        }
    ],

    proxy: {
        url : 'caremanagement/hp/memberodcdservicesapi',
        reader: {
            type: 'json',
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }

});