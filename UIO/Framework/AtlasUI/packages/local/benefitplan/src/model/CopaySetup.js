/**
 * Created by n6570 on 10/26/2016.
 */
Ext.define('Atlas.benefitplan.model.CopaySetup', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.copaysetup_CopaySetup',
    fields: [
        {name: 'BnftPlanSK',type:'number'},
        {name: 'CopaySetupSK',type:'number'},
        {name: 'FrmlryTierSK',type:'number'},
        {name: 'NtwrkTierSK',type:'number'},
        {name: 'NtwrkTierName',type:'string'},
        {name: 'CvrgPhaseSK',type:'number'},
        {name: 'CopayCoinsuranceLogicTypeSK',type:'number'},
        {name: 'PharmTypeSK',type:'number'},
        {name: 'DaySuplTypeSK',type:'number'},
        {name: 'BnftPlanPharmTypeDaySuplSK', type:'number'},
        {name: 'CopayAmt', type: 'number'},
        {name: 'CoinsurnacePct', type: 'number'},
        {name: 'MaxMbrCostPerRx', type: 'number'},
        {name: 'MbrMthlyCvrgMaxAmt', type: 'number'},
        {name: 'MbrYearlyCvrgMaxAmt', type: 'number'},
        {name: 'PlanMthlyCvrgMaxAmt', type: 'number'},
        {name: 'PlanYearlyCvrgMaxAmt', type: 'number'},
        {name: 'Deleted', type: 'bool'},
        {name: 'CurrentUser', type: 'string'}
    ],
    proxy: {
        url: '/CopaySetup'
    }
})
