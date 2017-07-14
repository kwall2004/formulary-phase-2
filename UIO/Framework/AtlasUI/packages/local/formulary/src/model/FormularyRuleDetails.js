/**
 * Created by mkorivi on 10/24/2016.
 */
Ext.define('Atlas.formulary.model.FormularyRuleDetails', {
    extend: 'Atlas.common.model.Base',

    fields: [

        {name: 'ruleLevelId', type: 'string'},
        {name: 'levelType', type: 'string'},
        {name: 'levelDescr', type: 'string'},
        {name: 'Covered', type:'string'},
        {name: 'OTCInd', type: 'string'},
        {name: 'onPrefListFlag', type: 'string'},
        {name: 'PartDExcludedDrug', type: 'string'},
        {name: 'PartDDrug', type: 'string'},
        {name: 'MedicaidCarveOutDrug', type: 'string'},
        {name: 'MedicaidFeeScreen', type: 'string'},
        {name: 'SpecialtyDrugInd', type: 'string'},
        {name: 'DRUG_TYPE', type: 'string'},
        {name: 'copayAmt', type: 'string'},
        {name: 'copayType', type: 'string'},
        {name: 'MAX_COPAY_AMT', type: 'string'},
        {name: 'COPAY_LIMIT', type: 'string'},
        {name: 'COPAY_LIMIT_NOTES', type: 'string'},
        {name: 'TierCode', type: 'string'},
        {name: 'genderRestriction', type: 'string'},
        {name: 'MIN_AGE', type: 'string'},
        {name: 'MAX_AGE', type: 'string'},
        {name: 'PAInd', type: 'string'},
        {name: 'PA_NAME', type: 'string'},
        {name: 'PAMINAGE', type: 'string'},
        {name: 'PAMAXAGE', type: 'string'},
        {name: 'PA_GENDER_CODE', type: 'string'},
        {name: 'LIMITED_ACCESS', type: 'string'},
        {name: 'dollarAmount', type: 'string'},
        {name: 'dollarAmtTimePeriod', type: 'string'},
        {name: 'daysSupply', type: 'string'},
        {name: 'daysSupplyTimePeriod', type: 'string'},
        {name: 'qtyLimit', type: 'string'},
        {name: 'qtyLimitTimePeriod', type: 'string'},
        {name: 'QL_Notes', type: 'string'},
        {name: 'stepTherapyInd', type: 'string'},
        {name: 'NOTES', type: 'string'},
        {name: 'EFFECTIVE_DATE', mapping: function (data) {
            if(data!=null)
            return Ext.Date.format(new Date(data.EFFECTIVE_DATE), 'm/d/Y');
        }},
        {name: 'stepTherapyName', type: 'string'},
        {name: 'TERM_DATE', type: 'string'},
        {name: 'TextMessage', type: 'string'},
        {name: 'ResourceLink', type: 'string'},
        {name: 'createdDate', mapping: function (data) {
            if(data!=null)
            return Ext.Date.format(new Date(data.createdDate), 'm/d/Y');
        }},
        {name: 'createdBy', type: 'string'},
        {name: 'lastUpdatedDate', mapping: function (data) {
            if(data!=null)
            return Ext.Date.format(new Date(data.lastUpdatedDate), 'm/d/Y');
        }},
        {name: 'lastUpdatedBy', type: 'string'}


    ],
    proxy: {

        url: 'formulary/{0}/formularyruledetails',
        timeout: 120000,
        extraParams: {
            pagination: true
        }
    }
});