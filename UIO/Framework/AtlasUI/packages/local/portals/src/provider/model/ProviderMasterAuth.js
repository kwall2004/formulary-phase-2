/*
 * Last Developer: Srujith Cheruku
 * Date: 11-28-2016
 * Previous Developers: []
 * Origin: Provider - Auth Inquiry Facility Lookup
 * Description: Provider Auth Inquiry Facility Lookup
 */
Ext.define('Atlas.portals.provider.model.ProviderMasterAuth', {
    extend: 'Atlas.common.model.Base',

    fields:[
        { name: 'Zip', type: 'string' },
        { name: 'cshcs', type: 'string' },
        { name: 'lastName', type: 'string' },
        { name: 'ageLimitLow', type: 'number' },
        { name: 'aliases', type: 'string' },
        { name: 'specCode', type: 'string' },
        { name: 'Hours', type: 'string' },
        { name: 'Languages', type: 'string' },
        { name: 'Gender', type: 'string' },
        { name: 'ageLimitHigh', type: 'string' },
        { name: 'providerType', type: 'string' },
        { name: 'wrdIdx', type: 'string' },
        { name: 'socSecNum', type: 'string' },
        { name: 'Phone', type: 'string' },
        { name: 'pcp', type: 'string' },
        { name: 'specDescription', type: 'string' },
        { name: 'boardCertified', type: 'string' },
        { name: 'titleDegree', type: 'string' },
        { name: 'inNetwork', type: 'string' },
        { name: 'TypeOfBusiness', type: 'string' },
        { name: 'npi', type: 'string' },
        { name: 'Address2', type: 'string' },
        { name: 'countyDescription', type: 'string' },
        { name: 'Address1', type: 'string' },
        { name: 'City', type: 'string' },
        { name: 'birthDate', type: 'date' },
        { name: 'boardCerts', type: 'string' },
        { name: 'firstName', type: 'string' },
        { name: 'Hospitals', type: 'string' },
        { name: 'dirCounty', type: 'string' },
        { name: 'State', type: 'string' },
        { name: 'newClients', type: 'string' },
        { name: 'locationID', type: 'string' },
        { name: 'dbRowID', type: 'string' },
        { name: 'rowNUm', type: 'string' },
        { name: 'dirGroup', type: 'string' },
        { name: 'Fax', type: 'string' },
        { name: 'provId', type: 'string' },
        { name: 'lobID', type: 'string' }
    ],

    proxy: {
        extraParams: {
            'pagination': true
        },
        url: 'eligibility/hp/providermasterauth'
    }
});