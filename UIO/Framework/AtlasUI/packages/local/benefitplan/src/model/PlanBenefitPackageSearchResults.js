/**
 * Created by s6393 on 9/21/2016.
 */
Ext.define('Atlas.benefitplan.model.PlanBenefitPackageSearchResults', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'PBPSK', type: 'number'},
        {name: 'PBPID', type: 'string'},
        {name: 'PBPName', type: 'string'},
        {name: 'BnftPlanTypeDesc', type: 'string'},
        {name: 'LOBName', type: 'string'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'PopGrpSK', type: 'number'}
    ],
    proxy: {
        url: '/PlanBenefitPackageSearch'
    }
});
