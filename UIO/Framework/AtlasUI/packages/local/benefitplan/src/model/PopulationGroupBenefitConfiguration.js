/**
 * Created by l6630 on 10/13/2016.
 */
Ext.define('Atlas.benefitplan.model.PopulationGroupBenefitConfiguration', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'PopGrpPBPSK', type: 'int'},
        {name: 'PopGrpSK', type: 'int'},
        {name: 'EntityTypeContactSK', type: 'int'},
        {name: 'PBPSK', type: 'int'},
        {name: 'PlanPgmCode', type: 'string'},
        {name: 'AccumtrRestartMth', type: 'int'},
        {name: 'AccumtrRestartDay', type: 'int'},
        {name: 'WorkFlowStatus', type: 'string'},
        {name: 'PBPName', type: 'string'},
        {name: 'PBPID', type: 'string'},
        {name: 'DOSProcsngStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'DOSProcsngEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'CurrentUser', type: 'string'},
        {name : 'BenefitPlans'}
    ],
    proxy: {
        url: '/PopulationGroupBenefitConfiguration'
    }
});