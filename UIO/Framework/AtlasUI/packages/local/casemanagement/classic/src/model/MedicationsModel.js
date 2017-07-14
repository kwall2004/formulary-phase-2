/**
 * Created by s6627 on 11/18/2016.
 */
Ext.define('Atlas.casemanagement.model.MedicationsModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'MTMId', type: 'int'},
        {name: 'MedicationId', type: 'int'},
        {name: 'dataSource', type: 'string'},
        {name: 'dataType', type: 'string'},
        {name: 'dataTypeDesc',type: 'string'},
        {name: 'startDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'endDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'NDC', type: 'string'},
        {name: 'medicationName',  type: 'string'},
        {name: 'dosage',type: 'string'},
        {name: 'oralHX',type: 'boolean'},
        {name: 'FILLED', type: 'boolean'},
        {name: 'samples', type: 'boolean'},
        {name: 'knowDrugName', type: 'boolean'},
        {name: 'knowFrequency',type: 'boolean'},
        {name: 'knowReason', type: 'boolean'},
        {name: 'continueAtHome', type: 'boolean'},
        {name: 'includeInLetter', type: 'boolean'},
        {name: 'systemID', type: 'string'},
        {name: 'npi', type: 'string'},
        {name: 'prescriberName', type: 'string'},
        {name: 'transactionID', type: 'int'},
        {name: 'transactionDate',  type: 'date', dateFormat: 'Y-m-d'},
        {name: 'claimType', type: 'string'},
        {name: 'treatmentOf',type: 'string'},
        {name: 'additionalInfo', type: 'string'}
    ],
    proxy: {
        url: 'member/{0}/mtmmedications',
        extraParams: {
            pMTMId: null,
            pMedicationId:null,
            pagination:true
        },
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
})