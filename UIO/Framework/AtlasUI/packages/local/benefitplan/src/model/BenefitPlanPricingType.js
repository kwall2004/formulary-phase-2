/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitPlanPricingType', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.benefitplanpricingtypes',
    fields: [
        {name: 'RxPrcgTypeSK', type: 'number'},
        {name: 'RXPrcgTypeCode', type: 'string'}
    ],
    proxy: {
        url: '/RxPricingType'
    }
});