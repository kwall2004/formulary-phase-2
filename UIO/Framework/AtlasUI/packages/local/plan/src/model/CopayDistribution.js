/**
 * Created by b2352 on 12/19/2016.
 */
Ext.define('Atlas.plan.model.CopayDistribution',{
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    fields: [
        {name: 'systemId',  type: 'number'},
        {name: 'coveragePhaseID',  type: 'number'},
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
        url: 'plan/{0}/plancopaydistribution'
    }

});
