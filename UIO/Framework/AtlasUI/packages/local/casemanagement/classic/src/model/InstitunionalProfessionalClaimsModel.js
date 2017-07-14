/**
 * Created by s6393 on 11/19/2016.
 */
Ext.define('Atlas.casemanagement.model.InstitunionalClaimsModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'AuthCode', type: 'string'},
        {name: 'AuthID', type: 'string'},
        {name: 'authStatus', type: 'string'},
        {name: 'AuthCodeDesc', type: 'string'},
        {name: 'ServiceProviderName', type: 'string'},
        {name: 'ServiceFacilityName', type: 'string'},
        {name: 'LobID', type: 'string'},
        {name: 'AuthFromDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'AuthToDate', type: 'date', dateFormat: 'Y-m-d'}

    ],
    proxy: {
        url: 'vendor/hp/claimheadermasterapi',
        extraParams: {
            "pMode" :"mrx",
            "userState": "MI",
            'pUserName': Atlas.user.un,
            "pDeviceId": "",
            "pTokenId": "",
            "pRowid":"",
            "pRowNum":0,
            "pRows":0,
            "pSort":""
        }

    }

});