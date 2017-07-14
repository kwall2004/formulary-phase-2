/**
 * Created by s6393 on 11/9/2016.
 */
Ext.define('Atlas.benefitplan.model.workflow.PGBenefitWorkflow', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'CurrentUser', type: 'string'},
        {name: 'StatTypeSK', type: 'int'},
        {name: 'PopGrpPBPSK', type: 'int'},
        {name: 'PopGrpPBPStatSK', type: 'int'}
    ],
    proxy: {
        url: '/PopulationGroupBenefitWorkflow'
    }
});