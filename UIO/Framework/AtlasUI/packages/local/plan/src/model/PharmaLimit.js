Ext.define('Atlas.plan.model.PharmaLimit',{
    extend: 'Atlas.common.model.StaticBase', //change to base when layer7 URL is ready
    idProperty: 'SystemID',
    fields: [
        {name: 'SystemID',  type: 'number'},
        {name: 'planBenefitId',  type: 'number'},
        {name: 'fulFillmentType',  type: 'string'},
        {name: 'fulFillmentTypeDesc',  type: 'string'},
        {name: 'daysSupplyMaint',  type: 'number'},
        {name: 'daysSupplyNonMaint',  type: 'number'},
        {name: 'qtyLimitsMaint',  type: 'number'},
        {name: 'qtyLimitNonMaint',  type: 'number'},
        {name: 'earlyRefillPercent',  type: 'number'},
        {name: 'maxDollarPerRx',  type: 'number'},
        {name: 'maxDollarPer30Days',  type: 'number'},
        {name: 'maxDollarPer60Days',  type: 'number'},
        {name: 'maxDollarPer90Days',  type: 'number'},
        {name: 'MaxDollarPerRx',  type: 'number'},
        {name: 'copayConfiguredInd',  type: 'number'},
        {name: 'priceDetailConfiguredInd',  type: 'string'}
    ],
    proxy: {
        url: 'resources/data/dummydata/plan/pharmalimits.json'
    }
});