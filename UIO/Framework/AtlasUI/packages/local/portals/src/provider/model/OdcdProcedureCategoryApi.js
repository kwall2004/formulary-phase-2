/*
 * Last Developer: Srujith Cheruku
 * Date: 11-21-2016
 * Previous Developers: []
 * Origin: Provider - Auth Inquiry - Procedure Category Search
 * Description: Procedure Category Search
 */

Ext.define('Atlas.portals.provider.model.OdcdProcedureCategoryApi', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {
            name: 'procedureCategoryID'
        },
        {
            name: 'procedureCategory'
        },
        {
            name: 'longDescr'
        },
        {
            name: 'requiredDocs'
        },
        {
            name: 'reportGroup'
        },
        {
            name: 'levelOfService'
        }
    ],
    
    proxy: {
     //   rootProperty: 'ttODCDProcedureCategory',
        url : 'caremanagement/hp/odcdprocedurecategoryapi'
    }

});