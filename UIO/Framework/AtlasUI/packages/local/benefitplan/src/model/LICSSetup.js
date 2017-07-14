/**
 * Created by s6393 on 11/1/2016.
 */
Ext.define('Atlas.benefitplan.model.LICSSetup', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [

        {name: 'BnftPlanSK', type: 'number'},
        {name: 'LICSTypeSK', type: 'number'},
        {name: 'PharmTypeSK', type: 'number'},
        {name: 'CvrgPhaseSK', type: 'number'},
        {name: 'FrmlryTierSK', type: 'number'},
        {name: 'CopayAmt', type: 'string'},
        {name: 'CoinsurancePct', type: 'string'},
        {name: 'LICSLvlDeducblAmt', type: 'string'},
        {name: 'CopayCoinsuranceLogicTypeSK', type: 'number'},
        {name: 'CurrentUser', type: 'string'}
    ],
    proxy: {
        actionMethods: {
            destroy: 'PUT'
        },
        url: '/LICSSetup'
    }
});
