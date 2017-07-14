/**
 * Created by s6635 on 11/4/2016.
 */
Ext.define('Atlas.benefitplan.model.PlanCapLimits', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'PlanCapLimSK', type: 'number'},
        {name: 'BnftPlanSK', type: 'number'},
        {name: 'PlanCapLimQulfrTypeSK', type: 'number'},
        {name: 'PlanCapLimVal', type: 'string'},
        {name: 'PlanCapLimPerQulfrTypeSK', type: 'number'},
        {name: 'PlanCapLimAmt', type: 'number'},
        {name: 'isDeleted',type: 'bool'},
        {name: 'CurrentUser',type: 'string'}
    ],
    proxy: {
        url: '/PlanCapLimits'
    }
});
