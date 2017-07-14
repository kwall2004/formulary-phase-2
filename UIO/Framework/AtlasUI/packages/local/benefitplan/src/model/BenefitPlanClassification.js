/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitPlanClassification', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.benefitplanclassifications',
    fields: [
        {name: 'PlanClsfcnTypeSK', type: 'number'},
        {name: 'PlanClsfcnTypeDesc', type: 'string'}
    ],
    proxy: {
        url: '/PlanClassificationTypes'
    }
});