/**
 * Created by s6635 on 11/4/2016.
 */
Ext.define('Atlas.benefitplan.model.PlanCapLimitsQualifier', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'PlanCapLimQulfrTypeSK', type: 'number'},
        {name: 'PlanCapLimQulfrTypeCode', type: 'string'},
        {name: 'PlanCapLimQulfrTypeDesc', type: 'string'}
    ],
    proxy: {
        url: '/PlanCapLimitsQualifier'
    }
});
