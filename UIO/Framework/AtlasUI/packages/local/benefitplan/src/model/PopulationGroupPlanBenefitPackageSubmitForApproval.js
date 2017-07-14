/**
 * Created by n6570 on 12/9/2016.
 */
Ext.define('Atlas.benefitplan.model.PopulationGroupPlanBenefitPackageSubmitForApproval', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'code', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'message', type: 'string'},
        {name: 'dataindex', type: 'string'}
    ],
    proxy: {
        url: '/PopulationGroupPlanBenefitPackageSubmitForApproval'
    }
});
