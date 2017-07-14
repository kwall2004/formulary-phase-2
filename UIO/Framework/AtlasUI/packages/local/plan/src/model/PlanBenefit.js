Ext.define('Atlas.plan.model.PlanBenefit',{
    // extend: 'Atlas.common.model.StaticBase', //change to base when layer7 URL is ready
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'systemId',  type: 'number'},
        {name: 'planGroupId',  type: 'number'},
        {name: 'PlanBenefitID',  type: 'string'},
        {name: 'PlanBenefitCode',  type: 'string'},
        {name: 'benefitName',  type: 'string'},
        {name: 'helpDeskPhone',  type: 'string'},
        {name: 'effDate',  type: 'string'},
        {name: 'renewalDate',  type: 'string'},
        {name: 'termDate',  type: 'string'},
        {name: 'benefitStatus',  type: 'string'},
        {name: 'passThroughPricing',  type: 'boolean'},
        {name: 'licsSubsidy', type: 'boolean'},
        {name: 'allowOutOfNetworkClaims',  type: 'boolean'},
        {name: 'allowTransitionRefill',  type: 'boolean'},
        {name: 'copayRequired',  type: 'boolean'},
        {name: 'allowEmergencyFill',  type: 'boolean'},
        {name: 'partBCopayPct',  type: 'number'},
        {name: 'daysAllowedOnline',  type: 'number'},
        {name: 'daysAllowedReversal',  type: 'number'},
        {name: 'daysAllowedPaper',  type: 'number'},
        {name: 'prefPharmExclTierCodes',  type: 'string'},
        {name: 'nonPrefPharmExclTierCodes',  type: 'string'},
        {name: 'planDedExclTierCodes',  type: 'string'},
        {name: 'pcnCodeList',  type: 'string'},
        {name: 'applyPlanPricing',  type: 'boolean'},
        {name: 'specDrugAtSpecPharm',  type: 'boolean'},
        {name: 'embeddedDeductible',  type: 'boolean'},
        {name: 'initialCoveragePhaseLimit',  type: 'string'},
        {name: 'catastrophicAmount',  type: 'string'},
        {name: 'maxCopay',  type: 'string'},
        {name: 'dirMemReimbProcessedBy',  type: 'string'},
        {name: 'maxBenefitIndv',  type: 'string'},
        {name: 'maxBenefitFmly',  type: 'string'},
        {name: 'deductAmountIndv',  type: 'string'},
        {name: 'deductAmountFmly',  type: 'string'},
        {name: 'deductApplToMailOrder',  type: 'boolean'},
        {name: 'deductApplToDiabeticSense',  type: 'boolean'},
        {name: 'outOfPocketAmountIndv',  type: 'string'},
        {name: 'outOfPocketAmountFmly',  type: 'string'},
        {name: 'outOfPocketAcumMailOrder',  type: 'boolean'},
        {name: 'outOfPocketAcumDiabeticSense',  type: 'boolean'},
        {name: 'coinsuranceStartAmt',  type: 'string'},
        {name: 'coInsOOPMaxIndiv',  type: 'string'},
        {name: 'coInsOOPMaxFamily',  type: 'string'},
        {name: 'coInsOOPMaxFamily',  type: 'string'},
        {name: 'applicableCoveragePhases',  type: 'string'},
        {name: 'accumDAWPenaltyInOOP',  type: 'string'}

    ],
    proxy: {
        extraParams: {
           planBenefitId:'10',
            pFieldList:''
        },
        url: 'plan/{0}/planbenefitinfo'
    }
    // proxy: {
    //    url: 'resources/data/dummydata/plan/benefits.json'
    //}
});



