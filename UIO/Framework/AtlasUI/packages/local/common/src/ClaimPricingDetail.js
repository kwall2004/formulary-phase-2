/**
 * Created by T4317 on 11/15/2016.
 */
/*
 Developer: Tremaine Grant
 Description: model for providers
 Origin: Merlin
 8/16/16

 */
Ext.define('Atlas.common.model.ClaimPricingDetail', {
    extend: 'Atlas.common.model.Base',

    fields: ['contractId',
        'costBasis',
        'unitPrice',
        'discpercent',
        'discAmount',
        'dispFee',
        'finalPrice',
        'usedForClaimPricing',
        'rowNum',
        'Carrier',
        'Account',
        'LOB'
    ],
    proxy: {
        extraParams: {
            pPlanPricing: 'false'
        },
        url: 'claims/{0}/claimpricingdetail'
    }

});