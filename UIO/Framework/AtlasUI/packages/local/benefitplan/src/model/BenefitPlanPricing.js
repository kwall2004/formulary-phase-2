/**
 * Created by s6393 on 9/22/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitPlanPricing', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.benefitplanpricing',
    fields: [
        {name: 'BnftPlanSK', type: 'number'},
        {name: 'PlanPrcgSK', type: 'number'},
        {name: 'DaySuplTypeSK', type: 'number'},
        {name: 'PharmTypeSK', type: 'number'},
        {name: 'CostBasisTypeSK', type: 'number'},
        {name: 'DrugBrandTypeSK', type: 'number'},
        {name: 'DiscPct', type: 'number'},
        {name: 'DiscAmt', type: 'number'},
        {name: 'MinDspnsgFeeAmt', type: 'number'},
        {name: 'MaxDspnsgFeeAmt', type: 'number'},
        {name: 'GERDspnsgFeeAmt', type: 'number'},
        {name: 'CurrentUser', type: 'string'},
        {name: 'isDeleted', type: 'boolean'}
],
    proxy: {
        url: '/PharmacyPricingDetail',
        actionMethods: {
            destroy: 'PUT'
        }
    }

});

