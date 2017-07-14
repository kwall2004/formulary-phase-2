/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitPlanCopayFunction', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.benefitplancopayfunctions',
    fields: [
        {name: 'CopayFuncTypeSK', type: 'number'},
        {name: 'CopayFuncTypeDesc', type: 'string'}
    ],
    proxy: {
        url: '/CopayFunctionTypes'
    }
});