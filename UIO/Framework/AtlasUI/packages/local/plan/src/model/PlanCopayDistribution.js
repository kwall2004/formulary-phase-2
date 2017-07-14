Ext.define('Atlas.plan.model.PlanCopayDistribution',{
    extend: 'Atlas.common.model.StaticBase', //change to base when layer7 URL is ready
    //idProperty: 'systemId',
    fields: [
        {name: 'systemId',  type: 'number'},
        {name: 'coveragePhaseId',  type: 'number'},
        {name: 'coveragePhaseName',  type: 'string'},
        {name: 'formularyTierId',  type: 'number'},
        {name: 'formularyTierName',  type: 'string'},
        {name: 'memberResponsibilityPct',  type: 'number'},
        {name: 'memberResponsibilityAmt',  type: 'number'},
        {name: 'mfrResponsibilityPct',  type: 'number'},
        {name: 'pharmNetworkId',  type: 'number'},
        {name: 'licsSubsidyPct',  type: 'number'},
        {name: 'planDeductAmt',  type: 'number'},
        {name: 'maxOOPMonthly',  type: 'number'},
        {name: 'maxOOPYearly',  type: 'number'},
        {name: 'maxCoverageMonthly',  type: 'number'},
        {name: 'maxCoverageYearly',  type: 'number'}
    ],
    proxy: {
        //extraParams: {
        //    planBenefitId:'10'
        //
        //},
        url: 'plan/{0}/plancopaydistribution'
    }

});
