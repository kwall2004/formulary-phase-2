/**
 * This Class is the Model created for Pharmacy/Credentialing Module
 */

Ext.define('Atlas.pharmacy.model.StateLicensePBMHistory', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'SAMDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'OIGAction', type: 'string'},
        {name: 'updatedBy', type: 'string'},
        {name: 'SAMAction', type: 'string'},
        {name: 'stateLicenseDisAction', type: 'string'},
        {name: 'updatedOn', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'CreationSeq', type: 'number'},
        {name: 'stateLicenseVerfDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'stateLicenseExpDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'LicenseStateCode', type: 'string'},
        {name: 'stateLicenseNumber', type: 'string'},
        {name: 'OIGDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'deleteDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'action', type: 'string'}
    ]
});