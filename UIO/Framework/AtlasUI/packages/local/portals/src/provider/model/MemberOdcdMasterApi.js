/*
 * Last Developer: Srujith Cheruku
 * Date: 11-21-2016
 * Previous Developers: []
 * Origin: Provider - Auth Inquiry - Member Search
 * Description: Member Search
 */

Ext.define('Atlas.portals.provider.model.MemberOdcdMasterApi', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {
            name: 'requestID', type: 'number'
        },
        {
            name: 'memberID', type: 'string'
        },
        {
            name: 'memberName', type: 'string'
        },
        {
            name: 'startDate', type: 'date'
        },
        {
            name: 'endDate', type: 'date'
        },
        {
            name: 'procedureCategoryDesc', type: 'string'
        },
        {
            name: 'requestStatus', type: 'string'
        },
        {
            name: 'levelOfServiceDesc', type: 'string'
        },
        {
            name: 'PlaceOfserviceDesc', type: 'string'
        },
        {
            name: 'ServicingProviderID', type: 'string'
        },
        {
            name: 'servicingFacilityName', type: 'string'
        },
        {
            name: 'RequestingProviderID', type: 'string'
        },
        {
            name: 'benefitPlanCodeDesc', type: 'string'
        },
        {
            name: 'dbRowID', type: 'string'
        },
        {
            name: 'recipientID', type: 'number'
        },
        {
            name: 'servicingProviderName', type: 'string'
        },
        {
            name: 'systemID', type: 'number'
        },
        {
            name: 'benefitPlanCode', type: 'string'
        }
    ],
    proxy: {
        url : 'caremanagement/hp/memberodcdmasterapi',
        reader: {
            type: 'json',
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }

});