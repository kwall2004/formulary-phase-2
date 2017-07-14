/**
 * Created by s6393 on 11/1/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitPlanTransition', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'BnftPlanSK', type: 'number'},
        {name: 'TransitionTimeframeDays', type: 'number'},
        {name: 'TransitionLookBackPerDays', type: 'number'},
        {name: 'LTCTransitionAlwdDays', type: 'number'},
        {name: 'RtlTransitionAlwdDays', type: 'number'},
        {name: 'TransitionRestartMthNbr', type: 'number'},
        {name: 'AllowTransitionFillsInd', type: 'bool'},
        {name: 'RestartTransitionatPlanYrInd', type: 'bool'},
        {name: 'CurrentUser', type: 'string'}
    ],
    proxy: {
        url: '/BenefitPlanTransition'
    }
});