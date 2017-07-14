/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.PlanBenefitPackageConfig', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.planbenefitpackageconfigs',
    hasMany: {model: 'PBPBnftPlanList', name: 'PBPBnftPlanList', associationKey: 'PBPBnftPlanList'},
    fields: [
        {name: 'PBPSK', type: 'number'},
        {name: 'PBPID', type: 'string'},
        {name: 'PBPName', type: 'string'},
        {name: 'LOBSK', type: 'int'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'PBPYr', type:'string'},
        {name: 'HIOSPrdctID', type: 'string'},
        {name: 'PBPBnftPlanList'},
        {name: 'CombinedPlanLvlDeducbInd', type: 'string'},
        {name: 'CombinedMOOPInd', type: 'string'},
        {name: 'CurrentUser', type: 'string'}
    ],
    proxy: {
        url: '/PlanBenefitPackage'
    }
});