/**
 * Created by s6635 on 10/18/2016.
 */
Ext.define('Atlas.benefitplan.model.CoveragePhase', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'CvrgPhaseSK', type: 'number'},
        {name: 'BnftPlanSK', type: 'number'},
        {name: 'CvrgPhaseTypeSK', type: 'number'},
        {name: 'CvrgPhaseSeq', type: 'number'},
        {name: 'CvrgPhaseTotalDrugSpend', type: 'string'},
        {name: 'CvrgPhaseTrOOPMax', type: 'string'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'}
    ],
    proxy: {
        url: '/CoveragePhase'
    }
});
