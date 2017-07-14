/**
 * Created by s6627 on 10/14/2016.
 */
Ext.define('Atlas.formulary.model.FormularyRulesModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'formularyId', type: 'string'},
        {name: 'formularyVersion', type: 'string'},
        {name: 'levelType', type: 'string'},
        {name: 'ruleLevelId', type: 'string'},
        {name: 'Covered', type: 'string'},
        {name: 'specialtyDrugInd', type: 'string'},
        {name: 'PAInd', type: 'string'},
        {name: 'PANAME', type: 'string'},
        {name: 'PAGENDERCODE', type: 'string'},
        {name: 'stepTherapyInd', type: 'string'},
        {name: 'stepTherapyName', type: 'string'},
        {name: 'MinAge', type: 'string'},
        {name: 'MaxAge', type: 'string'},
        {name: 'AgeType', type: 'string'},
        {name: 'GenderRestriction', type: 'string'},
        {name: 'TierCode', type: 'string'},
        {name: 'CopayAmt', type: 'string'},
        {name: 'CopayType', type: 'string'},
        {name: 'TextMessage', type: 'string'},
        {name: 'NOTES', type: 'string'},
        {name: 'dollarAmount', type: 'string'},
        {name: 'dollarAmtTimePeriod', type: 'string'},
        {name: 'daysSupply', type: 'string'},
        {name: 'daysSupplyTimePeriod', type: 'string'},
        {name: 'fills', type: 'string'},
        {name: 'fillsTimePeriod', type: 'string'},
        {name: 'qtyLimit', type: 'string'},
        {name: 'qtyLmtTimePeriod', type: 'string'},
        {name: 'lastUpdateDateTime', type: 'string'},
        {name: 'lastUpdateBy', type: 'string'},
        {name: 'OTCind', type: 'string'},
        {name: 'PartDDrug', type: 'string'},
        {name: 'PartDExcludedDrug', type: 'string'},
        {name: 'MedicaidCarveOutDrug', type: 'string'},
        {name: 'MedicaidFeeScreen', type: 'string'},
        {name: 'ResourceLink', type: 'string'},
        {name: 'onPrefListFlag', type: 'string'},
        {name: 'PAMinAge', type: 'string'},
        {name: 'PAMaxAge', type: 'string'},
        {name: 'MedicarePAType', type: 'string'},
        {name: 'MedicareSTGrpCount', type: 'string'},
        {name: 'MedicareSTGrpDesc1', type: 'string'},
        {name: 'MedicareSTStepValue1', type: 'string'},
        {name: 'MedicareSTGrpDesc2', type: 'string'},
        {name: 'MedicareSTStepValue2', type: 'string'},
        {name: 'MedicareSTGrpDesc3', type: 'string'},
        {name: 'MedicareSTStepValue3', type: 'string'},
        {name: 'TransFillExcluded', type: 'string'},
        {name: 'restrictToPkgSize', type: 'string'},
        {name: 'ovrGenericCheck', type: 'string'},
        {name: 'CMS_RxCUI', type: 'string'},
        {name: 'AHFSClass', type: 'string'},
        {name: 'AHFSCategory', type: 'string'},
        {name: 'PDLFlag', type: 'string'},
        {name: 'extendedDaysSupply', type: 'string'},
        {name: 'AssociatedPlans', type: 'string'}
    ],
    proxy: {
        extraParams: {
            piFormulary:'10',
            piVersion:'46',
            pcLevelType:'NDC',
            pcLevelID:'00115120501',
            pcOTCInd:'NO',
            pcFields:''
        },
        url: 'formulary/{0}/formularyrules'
    }
});