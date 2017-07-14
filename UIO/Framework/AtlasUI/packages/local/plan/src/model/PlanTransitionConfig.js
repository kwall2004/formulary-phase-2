/**
 * Created by b2352 on 12/21/2016.
 */
Ext.define('Atlas.plan.model.PlanTransitionConfig', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'TransitionStartDate', type: 'date', dateFormat:'Y-m-d' },
        {name: 'PlangroupId', type: 'number'},
        {name: 'ResetEveryYear', type: 'boolean'},
        {name: 'TransitionPeriodDays', type: 'string'},
        {name: 'NonLTCDaysSupplyMax', type: 'string'},
        {name: 'LTCDaysSupplyMax', type: 'string'},
        {name: 'EffectiveDate', type: 'date', dateFormat:'Y-m-d' }
    ],
    proxy: {
        url: 'plan/{0}/plantransitionconfig'
    }
});