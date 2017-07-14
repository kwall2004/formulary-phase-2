/**
 * Created by s6635 on 12/8/2016.
 */
Ext.define('Atlas.benefitplan.model.workflow.BenefitPlanIntegration', {
    extend: 'Atlas.benefitplan.model.Base',
   fields: [
       {name: 'popGrpPBPSK', type: 'integer'},
       {name: 'isSandbox', type: 'boolean'}
   ],
    proxy: {
        url: '/BenefitPlanIntegration'
    }
});