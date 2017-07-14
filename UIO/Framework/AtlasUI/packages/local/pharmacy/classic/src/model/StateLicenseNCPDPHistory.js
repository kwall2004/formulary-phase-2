/**
 * This Class is the Model created for Pharmacy/Credentialing Module
 */

Ext.define('Atlas.pharmacy.model.StateLicenseNCPDPHistory', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'CreationSeq', type: 'string'},
        {name: 'ncpdipid', type: 'string'},
        {name: 'stateLicenseExpDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'LicenseStateCode', type: 'string'},
        {name: 'stateLicenseNumber', type: 'string'},
        {name: 'deleteDate', type: 'string'}
    ]
});