/**
 * Created by s6635 on 10/18/2016.
 */
Ext.define('Atlas.benefitplan.model.CoveragePhaseType',{
extend: 'Atlas.benefitplan.model.Base',
    fields: [
    {name: 'CvrgPhaseTypeSK', type: 'number'},
    {name: 'CvrgPhaseSK', type: 'number'},
    {name: 'CvrgPhaseCode', type: 'string'}
    ],
    proxy: {
        url: '/CoveragePhaseType'
    }

});