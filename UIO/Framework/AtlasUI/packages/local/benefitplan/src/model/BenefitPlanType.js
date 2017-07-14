/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitPlanType', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.benefitplantypes',
    fields: [
        {name: 'BnftPlanTypeSK', type: 'number'},
        {name: 'BnftPlanTypeDesc', type: 'string'}
    ],
    proxy: {
        url: '/BenefitPlanType'
    }
});