/**
 * Created by n6570 on 10/26/2016.
 */
Ext.define('Atlas.benefitplan.model.CopayDistribution', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.copaydistribution_CopayDistribution',
    //hasOne: {model: 'FormularyTier', name: 'FormularyTier', associationKey: 'FormularyTier'},
    //hasOne: {model: 'CoveragePhaseType', name: 'CoveragePhaseType', associationKey: 'CoveragePhaseType'},
    fields: [
        {name: 'BnftPlanSK',type:'number'},
        {name: 'CopayDistSK',type:'number'},
        {name: 'FrmlryTierSK',type:'number'},
        {name: 'FrmlryTierNbr',type:'number'},
        {name: 'CvrgPhaseSK',type:'number'},
        {name: 'CvrgPhaseTypeSK',type:'number'},
        {name:'MbrRespAmt', type:'number'},
        {name:'MbrRespPct', type: 'number'},
        {name: 'MfgRespPct', type: 'number'},
        {name: 'LICSSubsidyAppliesInd', type: 'bool'},
        {name: 'IsDeleted', type: 'bool'},
        {name: 'CurrentUser', type: 'string'}
    ],
    proxy: {
        url: '/CopayDistribution',
        actionMethods: {
                      destroy: 'PUT'
        }
    }
})
