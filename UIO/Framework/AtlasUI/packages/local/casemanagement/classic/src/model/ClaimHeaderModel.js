/**
 * Created by s6393 on 11/21/2016.
 */
Ext.define('Atlas.casemanagement.model.ClaimHeaderModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'claimNumber', type: 'string'},
        {name: 'servProvId', type: 'string'},
        {name: 'servProvName', type: 'string'},
        {name: 'pos', type: 'string'},
        {name: 'billType', type: 'string'},
        {name: 'drgCode', type: 'string'},
        {name: 'diagCd1', type: 'string'},
        {name: 'diagCd2', type: 'string'},
        {name: 'lobID', type: 'string'},
        {name: 'stmtFromDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'ptnAccountNum',  type: 'string'}

    ]//,
    // proxy: {
    //     url: 'vendor/hp/claimheadermasterapi',
    //     extraParams: {
    //         "pMode": "mrx",
    //         "userState": "MI",
    //         'pUserName': Atlas.user.un,
    //         "pDeviceId": null,
    //         "pTokenId": null,
    //         "pSort": null,
    //         pagination: true
    //     }
    //
    // }

});