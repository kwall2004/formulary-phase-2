Ext.define('Atlas.plan.model.PlanBenefitPricingMaster',{
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    //idProperty: 'systemId',
    fields: [
        {name: 'priceId',  type: 'number'},
        {name: 'fulfillmentType',  type: 'string'},
        {name: 'maintenance',  type: 'number'},
        {name: 'drugType',  type: 'number'},
        {name: 'costBasis',  type: 'string'},
        {name: 'discPercent',  type: 'number'},
        {name: 'discAmount',  type: 'number'},
        {name: 'dispFee',  type: 'number'},
        {name:'RowNum',type:'number'}

    ],
    proxy: {
        url: 'plan/{0}/planpricinginfo'
    }
});

