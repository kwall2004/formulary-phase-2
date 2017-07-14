/**
 * This Class is the Model created for Pharmacy/Credentialing Module
 */

Ext.define('Atlas.pharmacy.model.StateLicensePBMShowXXX', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'SAMDate', type: 'date', dateFormat: 'Y-m-d\TH:i:s'},
        {name: 'OIGAction', type: 'string'},
        {name: 'updatedBy', type: 'string'},
        {name: 'SAMAction', type: 'string'},
        {name: 'stateLicenseDisAction', type: 'string'},
        {name: 'updatedOn', type: 'date', dateFormat: 'Y-m-d\TH:i:s'},
        {name: 'CreationSeq', type: 'number'},
        {name: 'stateLicenseVerfDate', type: 'date', dateFormat: 'Y-m-d\TH:i:s'},
        {name: 'stateLicenseExpDate', type: 'date', dateFormat: 'Y-m-d\TH:i:s'},
        {name: 'LicenseStateCode', type: 'string'},
        {name: 'stateLicenseNumber', type: 'number'},
        {name: 'OIGDate', type: 'date', dateFormat: 'Y-m-d\TH:i:s'},
        {name: 'deleteDate', type: 'date', dateFormat: 'Y-m-d\TH:i:s'}
    ]
});