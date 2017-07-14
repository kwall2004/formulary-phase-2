/**
 * Created by s6393 on 11/21/2016.
 */
Ext.define('Atlas.casemanagement.model.ClaimDetailsModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'claimStatusDesc', type: 'string'},
        {name: 'lineNUm', type: 'string'},
        {name: 'revCode', type: 'string'},
        {name: 'procCd', type: 'string'},
        {name: 'rate', type: 'string'},
        {name: 'units', type: 'string'},
        {name: 'chargeAmt', type: 'string'},
        {name: 'netAmount', type: 'string'},
        {name: 'servFromDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'nonCoveredAmt', type: 'string'}

    ],
    proxy: {
        url: 'vendor/hp/claimdetailmasterapi',
        extraParams: {
            "pMode": "mrx",
            "userState": "MI",
            'pUserName': Atlas.user.un,
            "pDeviceId": null,
            "pTokenId": null,
            "pSort": null
        }
    }
});