/**
 * Created by s6393 on 9/22/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitPlanName', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.benefitplannames',
    fields: [
        {name: 'BnftPlanSK', type: 'number'},
        {name: 'BnftPlanID', type: 'string'},
        {name: 'BnftPlanName', type: 'string'}
    ],
    proxy: {
        url: '/BenefitPlan'
    }
});

