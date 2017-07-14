/**
 * Created by s6635 on 11/5/2016.
 */
Ext.define('Atlas.benefitplan.model.PlanCapLimitsCapPeriod', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'PlanCapLimPerQulfrTypeSK', type: 'number'},
        {name: 'PlanCapLimPerQulfrTypeCode', type: 'string'},
        {name: 'PlanCapLimPerQulfrTypeDesc', type: 'string'}
    ],
    proxy: {
        url: '/PlanCapLimitsCapPeriod'
    }
});
