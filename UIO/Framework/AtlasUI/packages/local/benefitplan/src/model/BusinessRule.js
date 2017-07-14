/**
 * Created by s6393 on 10/26/2016.
 */
Ext.define('Atlas.benefitplan.model.BusinessRule', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'PBPSK', type: 'int'},
        {name: 'PBPConfgPrptySK', type: 'int'},
        {name: 'ConfgPrptyTypeSK', type: 'int'},
        {name: 'ConfgPrptyTypeChildSK', type: 'int'},
        {name: 'Question', type: 'string'},
        {name: 'CurrentAnswer', type: 'string'},
        {name: 'CurrentUser', type: 'string'},
        {name: 'IsDeleted', type: 'bool'}

    ],
    proxy: {
        url: '/PlanBenefitPackageBusinessRule'
    }
});
