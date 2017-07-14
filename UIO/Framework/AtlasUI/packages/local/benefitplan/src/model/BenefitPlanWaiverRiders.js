/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitPlanWaiverRiders', {
    extend: 'Atlas.benefitplan.model.Base',
    proxy: {
        type: 'memory'
    },
    fields: [
        {name: 'BnftPlanWvrRiderSK', type: 'number'},
        {name: 'CurrentUser', type: 'string'},
        {name: 'Deleted', type: 'boolean'},
        {name: 'WvrRiderTypeSK', type: 'number'}
    ]
});