/**
 * This Class is the Model created for Pharmacy/Credentialing Module
 */

Ext.define('Atlas.pharmacy.model.InsLicenseHistory', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'CreationSeq', type: 'number'},
        {name: 'InsuranceExpDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'InsuranceCompany', type: 'string'},
        {name: 'updatedBy', type: 'string'},
        {name: 'updatedOn', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'InsuranceVerfDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'InsuranceAccount', type: 'string'},
        {name: 'AmountOfCoverage', type: 'string'}
    ]
});