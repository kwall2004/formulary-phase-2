/**
 * Created by n6570 on 10/6/2016.
 */
Ext.define('Atlas.benefitplan.model.ThresholdConfiguration', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'ThresholdSK',type:'number'},
        {name: 'CvrgSetThresholdSK', type:'number'},
        {name: 'BenefitThresholdName', type: 'string'},
        {name: 'ThresholdQulfrTypeSK', type: 'int'},
        {name: 'ThresholdLimit', type: 'string'},
        {name: 'RestartThresholdCalendarYear', type: 'string'},
        {name: 'RestartThresholdPlanYear', type: 'string'},
        {name: 'ThresholdRestartDaysAfterLastService', type: 'string'},
        {name: 'ThresholdRestartMonthsAfterLastService', type: 'string'},
        {name: 'ThresholdRestartDaysAfterMbrEnroll', type: 'string'},
        {name: 'ThresholdRestartMonthsAfterMbrEnroll', type: 'string'},
        {name: 'ThresholdRestartAtBegOfMonthNbr', type: 'string'},
        {name: 'ApplyToBenefitThreshold', type: 'bool'},
        {name: 'LimitByBenefitThreshold', type: 'bool'},
        {name: 'CurrentUser', type: 'string'}
    ],
    proxy: {
        url: '/Threshold'
    }
});
