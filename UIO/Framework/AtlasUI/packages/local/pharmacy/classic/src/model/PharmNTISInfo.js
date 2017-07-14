/**
 * This Class is the Model created for Pharmacy/Credentialing Module
 */

Ext.define('Atlas.pharmacy.model.PharmNTISInfo', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'NTISDeaNum', type: 'string'},
        {name: 'NTISCity', type: 'string'},
        {name: 'NTISAddlCompanyInfo', type: 'string'},
        {name: 'NTISName', type: 'string'},
        {name: 'NTISDeaExp', type: 'string'},
        {name: 'NTISBusActSubCode', type: 'number'},
        {name: 'NTISZip', type: 'number'},
        {name: 'NTISBusActCode', type: 'string'},
        {name: 'NTISDrugSchedule', type: 'string'},
        {name: 'NTISAddress2', type: 'string'},
        {name: 'NTISState', type: 'string'},
        {name: 'NTISAddress1', type: 'string'}
    ]
});