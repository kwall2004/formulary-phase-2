/**
 * This Class is the Model created for Pharmacy/Credentialing Module
 */

Ext.define('Atlas.pharmacy.model.FederalTaxIDHistory', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'CreationSeq'},
        {name: 'FederalTaxID'},
        {name: 'updatedBy'},
        {name: 'updatedOn', type: 'date', dateFormat: 'Y-m-d'}
    ]
});