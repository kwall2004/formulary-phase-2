/**
 * Created by
 */
Ext.define('Atlas.benefitplan.model.BenefitCoverageSetItem', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'BnftPlanBnftCvrgSetNtwrkTierSK',type:'number'},
        {name: 'CvrgSetName', type:'string'},
        {name: 'CvrgSetSK', type: 'number'},
        {name: 'CvrgSetPrity', type: 'number'},
        {name: 'Deleted', type: 'string'},
        {name: 'CurrentUser', type: 'string'}
    ]
});
