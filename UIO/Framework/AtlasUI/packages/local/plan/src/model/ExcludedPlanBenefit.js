/**
 * Created by d3973 on 11/19/2016.
 */
Ext.define('Atlas.plan.model.ExcludedPlanBenefit', {
    extend: 'Atlas.common.model.Base',

    fields: [{
        name: 'planBenefitId',
        type: 'number'
    }, {
        name: 'planBenefitCode',
        type: 'string'
    }],

    proxy: {
        url: 'plan/{0}/plangroupinfo'
    }
});