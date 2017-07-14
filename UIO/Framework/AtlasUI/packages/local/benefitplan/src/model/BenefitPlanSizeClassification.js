/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitPlanSizeClassification', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.benefitplansizeclassifications',
    fields: [
        {name: 'BnftPlanSizeClsfcnTypeSK', type: 'number'},
        {name: 'BnftPlanSizeClsfcnCode', type: 'string'}
    ],
    proxy: {
        url: '/BenefitPlanSizeClassificationTypes'
    }
});