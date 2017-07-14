/**
 * Created by S4505 on 11/22/2016.
 */

Ext.define('Atlas.plan.model.PlanPharmaLimitsModel',{
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'SystemID',  type: 'string'},
        {name: 'fulFillmentType',  type: 'string'},
        {name: 'fulFillmentTypeDesc',  type: 'string'},
        {name: 'daysSupplyMaint',  type: 'int'},
        {name: 'daysSupplyNonMaint',  type: 'int'},
        {name: 'qtyLimitsMaint',  type: 'int'},
        {name: 'qtyLimitNonMaint',  type: 'int'},
        {name: 'QtyLimitsNonMaint',  type: 'int'},
        {name: 'earlyRefillPercent',  type: 'int'},
        {name: 'maxDollarPerRx',  type: 'string'},
        {name: 'maxDollarPer30Days',  type: 'string'},
        {name: 'RowNum',  type: 'int'},
        {name: 'dbRowID',  type: 'string'},
        {name: 'maxDollarPer60Days',  type: 'string'},
        {name: 'maxDollarPer90Days',  type: 'string'},
        {name: 'copayConfiguredInd',  type: 'boolean'},
        {name: 'priceDetailConfiguredInd',  type: 'boolean'},
        {name: 'inNetworkCostSharingDays',  type: 'int'},
        {name: 'outNetworkCostSharingDays',  type: 'int'}
    ],

    proxy: {
        url: 'plan/{0}/planservicetypes'
    }
});

