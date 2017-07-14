/**
 * Created by n6570 on 10/6/2016.
 */
Ext.define('Atlas.benefitplan.model.CoverageSetsAll', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'BnftPlan',type:'string'},
        {name: 'BnftPlanBnftCvrgSetNtwrkTier', type:'string'}, //[]
        {name: 'PymtPrfl', type: 'string'}, //[]
        {name: 'CvrgSetThreshold', type: 'string'}, //[]
        {name: 'CvrgSetCrtriaSet', type: 'string'}, //[]
        {name: 'CvrgSetSK', type: 'number'},
        {name: 'BnftPlanSK', type: 'number'},
        {name: 'CvrgSetName', type: 'string'},
        {name: 'EfctvStartDt', type: 'string'},
        {name: 'EfctvStartDt', type: 'string'},
        {name: 'EfctvEndDt', type: 'string'},
        {name: 'CreatedBy', type: 'string'},
        {name: 'CreatedTs', type: 'string'}

    ],
    proxy: {
        url: '/CoverageSet'
    }
});
