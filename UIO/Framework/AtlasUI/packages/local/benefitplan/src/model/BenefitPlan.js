/**
 * Created by s6393 on 9/22/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitPlan', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.benefitplan',
    hasMany: {model: 'BenefitPlanWaiverRiders', name: 'BenefitPlanWaiverRiders', associationKey: 'BenefitPlanWaiverRiders'},
    fields: [
        {name: 'BnftPlanSK', type: 'number'},
        {name:'AllowEmrgyFillsInd',type:'boolean'},
        {name: 'PrdctTypeSK', type: 'string', serialize: function (value, record) {return (value == "")?null:value}},
        {name: 'PlanClsfcnTypeSK', type: 'string'},
        {name: 'BnftPlanTypeSK', type: 'number'},
        {name: 'LOBSK', type: 'number'},
        {name: 'BnftPlanSizeClsfcnTypeSK', type: 'string'},
        {name: 'BnftPlanID', type: 'string'},
        {name: 'BnftPlanName', type: 'string'},
        {name: 'TmpltInd', type: 'boolean'},
        {name: 'BnftPlanYr', type: 'string'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'GrandfatheredPlanInd', type: 'string', serialize: function (value, record) {return (value == "")?false:value}},//necessary because radios only use strings, and backend is non-nullable boolean
        {name: 'AllowMnlEnrlmtInd', type: 'boolean'},
        {name: 'NbrofNtwrkTiers', type: 'number'},
        {name: 'MaxNbrofDaysAlwdonCOBRAAmt', type: 'string'},
        {name: 'COBRABnftOfferedInd', type: 'string', serialize: function (value, record) {return (value == "")?false:value}},//necessary because radios only use strings, and backend is non-nullable boolean
        {name: 'OnHIEInd', type: 'string', serialize: function (value, record) {return (value == "")?false:value}},//necessary because radios only use strings, and backend is non-nullable boolean
        {name: 'HIOSPlanVarntID', type: 'string'},
        {name: 'DefaultVaccineAdmnstnFeeAmt', type: 'string'},
        {name: 'RequireSpcltyPharmforSpcltyDrugsInd', type: 'boolean'},
        {name: 'MndtryGenrcDrugPlanInd', type: 'boolean'},
        {name: 'RejAllClaimsInd', type: 'boolean'},
        {name: 'AllowMbrLocksInd', type: 'boolean'},
        {name: 'NbrofFrmlryTiers', type: 'number'},
        {name: 'OneMthDaySuplAmt', type: 'number'},
        {name: 'PrescbrDrugOvrrdListSK', type: 'string'},
        {name: 'AlwdPrescribersListSK', type: 'string'},
        {name: 'FrmlrySK', type: 'string'},
        {name: 'RxPrcgTypeSK', type: 'string'},
        {name: 'DrugRefDbSK', type: 'string'},
        {name: 'CopayFuncTypeSK', type: 'string'},
        {name: 'CMSBnftStructTypeSK', type: 'string'},
        {name: 'McrCvrgGapGenrcPct', type: 'number'},
        {name: 'McrCvrgGapBrandPct', type: 'number'},
        {name: 'McrPartBCoinsurancePct', type: 'string'},
        {name: 'PrcsMcrPartBClaimsInd', type: 'boolean'},
        {name: 'CurrentUser', type: 'string'},
        {name: 'PayNonMcrPartDIngredients',type:'boolean'},
        {name: 'InclNonMcrPartDonPDE',type:'boolean'},
        {name: 'ExclPHIDataInReports',type:'boolean'},
        {name: 'StdDeducblAmt', type: 'string'},
        {name: 'BnftPlanAbbr', type: 'string'},
        {name: 'BenefitPlanWaiverRiders'}
],
    proxy: {
        url: '/BenefitPlan'
    }
});

