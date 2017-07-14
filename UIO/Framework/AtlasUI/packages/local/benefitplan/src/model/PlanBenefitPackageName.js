/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.PlanBenefitPackageName', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.planbenefitpackagenames',
    fields: [
        {name: 'PBPSK', type: 'number'},
        {name: 'PBPID', type: 'string'},
        {name: 'PBPName', type: 'string'},
        {name: 'LOB', type: 'string'},
        {name: 'EfctvStartDt', type: 'date'},
        {name: 'EfctvEndDt', type: 'date'},
        {name: 'PBPYr', type: 'number'},
        {name: 'HIOSPrdctID', type: 'string'},
        {name: 'CombinedPlanLvlDeducblInd', type: 'bool'},
        {name: 'CombinedMOOPInd', type: 'bool'}
    ],
    proxy: {
        url: '/PlanBenefitPackage'
    }
});