/**
 * Created by j3703 on 9/22/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitWorkflow', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'BnftSK', type: 'number'},
        {name: "newStatType", type: 'string'},
        {name: "StatTypeSK", type: 'string'},
        {name: "CurrentUser", type: 'string'}
],
    proxy: {
        url: '/BenefitWorkflow'
    }
});