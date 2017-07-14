/**
 * Created by n6570 on 1/10/2017.
 */
Ext.define('Atlas.benefitplan.model.NetworkTierPharmTypesInPlan', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: "NtwrkTierSK", type: 'int'},
        {name: "BnftPlanSK", type: 'int'},
        {name: "NtwrkTierTypeSK", type: 'int'},
        {name: "NtwrkTierNbr", type: 'int'},
        {name: "NtwrkTierName", type: 'string'},
        {name: "EfctvStartDt", type: 'string'},
        {name: "EfctvEndDt", type: 'string'},
        {name: "CreatedBy", type: 'string'},
        {name: "CreatedTs", type: 'string'},
        {name: "LastModfdBy", type: 'string'},
        {name: "LastModfdTs", type: 'string'}

    ],
    proxy: {
        url: '/BenefitPlanPharmacyType'
    }
});
