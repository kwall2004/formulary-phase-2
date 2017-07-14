/**
 * Created by n6570 on 10/6/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitCoverageSetDetails', {
    extend: 'Atlas.benefitplan.model.Base',
  //  alias: 'viewmodel.benefit_coverageset',
    fields: [
        {name: 'BnftSK',type:'number'},
        {name:'BnftPlanSK', type:'number'},
        {name:'CurrentUser', type: 'string'},
        {name: 'BenefitName', type: 'string'},
        {name: 'Deleted', type: 'string'}
    ],
    proxy: {
        url: '/BenefitCoverageSetDetails'
    }
});
