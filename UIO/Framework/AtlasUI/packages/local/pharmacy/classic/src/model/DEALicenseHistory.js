/**
 * This Class is the Model created for Pharmacy/Credentialing Module
 */

Ext.define('Atlas.pharmacy.model.DEALicenseHistory', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'CreationSeq', type: 'string'},
        {name: 'updatedBy', type: 'string'},
        {name: 'NCPDPDEAId', type: 'string'},
        {name: 'DEAExpDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'DEAVerfDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'updatedOn', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'DEARegistrationID', type: 'string'},
        {name: 'DEAExpDateNCPDP', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'NTISActivity', type: 'string'}
    ]
});