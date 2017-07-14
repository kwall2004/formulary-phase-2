/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitPlanProductType', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.benefitplanproducttypes',
    fields: [
        {name: 'PrdctTypeSK', type: 'number'},
        {name: 'PrdctTypeDesc', type: 'string'}
    ],
    proxy: {
        url: '/ProductTypes'
    }
});