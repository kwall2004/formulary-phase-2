Ext.define('Atlas.plan.model.PlanCopay',{
    extend: 'Atlas.common.model.StaticBase', //change to base when layer7 URL is ready
    idProperty: 'systemId',
    fields: [
        {name: 'systemId',  type: 'number'},
        {name: 'maintenance',  type: 'number'},
        {name: 'maintenanceDescription',  type: 'string'},
        {name: 'coveragePhaseId',  type: 'number'},
        {name: 'coveragePhaseName',  type: 'string'},
        {name: 'formularyTierId',  type: 'number'},
        {name: 'formularyTierName',  type: 'string'},
        {name: 'CopayAmount',  type: 'number'},
        {name: 'coinsurancePercent',  type: 'number'},
        {name: 'copayPercent',  type: 'number'},
        {name: 'pharmNetworkId',  type: 'number'},
        {name: 'maxCopayAmount',  type: 'number'},
        {name: 'copayLesserOf',  type: 'string'}
    ],
    proxy: {
        url: 'resources/data/dummydata/plan/copay.json'
    }
});