/**
 * Created by s6393 on 10/3/2016.
 */
Ext.define('Atlas.benefitplan.model.PopulationGroupPlanBenefitPackageSummary', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'PopGrpSK', type: 'number'},
        {name: 'PBPName', type: 'string'},
        {name: 'PBPID', type: 'string'},
        {name: 'PlanPgmCode', type: 'string'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt',  type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'DOSProcsngStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'DOSProcsngEndDt',  type: 'date', dateFormat: 'Y-m-d\\TH:i:s'}
    ],
    proxy: {
        url: '/PopulationGroupPlanBenefitPackage'
    }
});
