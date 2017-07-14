/**
 * Created by s6393 on 10/25/2016.
 */
Ext.define('Atlas.benefitplan.model.CopayExclusions', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'BnftPlanSK', type: 'int'},
        {name: 'CopayCoinsuranceLogicTypeSK', type: 'int'},
        {name: 'CopayOvrrdSK', type: 'int'},
        {name: 'CopayOvrrdQulfrTypeSK', type: 'int'},

        {name: 'CopayOvrrdVal', type: 'string'},
        {name: 'CoinsurancePct',  type: 'string'},
        {name: 'CopayAmt', type: 'string'},
        {name: 'isDeleted', type: 'bool'},
        {name: 'CurrentUser', type: 'string'}
    ],
    validators: {
        CopayAmt: {type: 'format', matcher: /^\$*[0-9]+\.*[0-9]{0,2}$/i, message: 'Copay amount  must be a valid currency amount ($100.00)'}
    },
    proxy: {
        url: '/CopayExclusions'
    }
});
