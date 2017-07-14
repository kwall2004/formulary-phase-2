/**
 * Created by s6635 on 2/7/2017.
 */
Ext.define('Atlas.benefitplan.model.CopayDistributionLICS', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'BnftPlanSK', type: 'int'},
        {name: 'LICS4DeducblAmt', type: 'number'},
        {name: 'isEnabled', type: 'bool'},
        {name: 'CurrentUser', type: 'string'}
    ],
    proxy: {
        url: '/CopayDistributionLICS'
    }
});
