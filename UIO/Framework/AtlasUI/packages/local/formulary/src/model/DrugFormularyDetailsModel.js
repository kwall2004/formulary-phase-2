/**
 * Created by s6627 on 11/3/2016.
 */
Ext.define('Atlas.formulary.model.DrugFormularyDetailsModel', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',
    fields: [
        {name: 'FormularyID', type: 'string'},
        {name: 'FormularyVersion', type: 'string'},
        {name: 'FormularyName', type: 'string'},
        {name: 'Covered', type: 'string'},
        {name: 'SpecialtyDrugInd', type: 'string'},
        {name: 'PartDExcludedDrug', type: 'string'},
        {name: 'MedicaidCarveOutDrug', type: 'string'},
        {name: 'MedicaidFeeScreen', type: 'string'},
        {name: 'GenderRestriction', type: 'string'},
        {name: 'MinAge', type: 'string'},
        {name: 'MaxAge', type: 'string'},
        {name: 'AgeType', type: 'string'},
        {name: 'PAInd', type: 'string'},
        {name: 'PAName', type: 'string'},
        {name: 'PAMinAge', type: 'string'},
        {name: 'PAMaxAge', type: 'string'},
        {name: 'MedicarePAType', type: 'string'},
        {name: 'StepTherapyInd', type: 'string'},
        {name: 'StepTherapyName', type: 'string'},
        {name: 'MedicareSTGrpCount', type: 'string'},
        {name: 'MedicareSTGrpDesc1', type: 'string'},
        {name: 'MedicareSTStepValue1', type: 'string'},
        {name: 'MedicareSTGrpDesc2', type: 'string'},
        {name: 'MedicareSTStepValue2', type: 'string'},
        {name: 'MedicareSTGrpDesc3', type: 'string'},
        {name: 'MedicareSTStepValue3', type: 'string'},
        {name: 'DaysSupply', type: 'string'},
        {name: 'DaysSupplyTimePeriod', type: 'string'},
        {name: 'FillsTimePeriod', type: 'string'},
        {name: 'QtyLimit', type: 'string'},
        {name: 'QtyLmtTimePeriod', type: 'string'},
        {name: 'Notes', type: 'string'},
        {name: 'TextMessage', type: 'string'},
        {name: 'RuleLevelID', type: 'string'},
        {name: 'LevelType', type: 'string'},
        {name: 'extendedDaysSupply', type: 'string'}
    ],
    proxy: {
        extraParams: {
            pDrugCode:'',
            pFormVsnLst:'',
            pFields:'',
            pagination: true
        },
        url: 'formulary/{0}/ndcformularydetails',
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
});