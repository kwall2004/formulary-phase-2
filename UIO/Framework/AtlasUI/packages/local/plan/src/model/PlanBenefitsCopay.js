Ext.define('Atlas.plan.model.PlanBenefitsCopay',{
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    //idProperty: 'systemId',
    fields: [
        {name: 'formularyTierId',  type: 'number'},
        {name: 'systemId',  type: 'number'},
        {name: 'copayLesserOf',  type: 'string'},
        {name: 'coinsurancePercent',  type: 'number'},
        {name:'RowNum',type:'number'},
        {name: 'coveragePhaseId',  type: 'number'},
        {name: 'maintenanceDescription',  type: 'string'},
        {name: 'maxCopayAmount',  type: 'number'},
        {name: 'pharmNetworkId',  type: 'number'},
        {name: 'CopayAmount',  type: 'number'},
        {name: 'copayPercent',  type: 'number'},
        {name: 'maintenance',  type: 'number'}
        // {name: 'coveragePhaseName',  type: 'string'},
        //
        // {name: 'formularyTierName',  type: 'string'},
    ],
    proxy: {
        url: 'plan/{0}/plancopay'
    }
});

