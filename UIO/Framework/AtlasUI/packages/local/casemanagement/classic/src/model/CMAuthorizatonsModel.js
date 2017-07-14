/**
 * Created by s6393 on 11/19/2016.
 */
Ext.define('Atlas.casemanagement.model.CMAuthorizatonsModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'AuthCode', type: 'string'},
        {name: 'AuthID', type: 'string'},
        {name: 'authStatus', type: 'string'},

        {name: 'AuthFromDate', type: 'string'},
        {name: 'AuthToDate', type: 'string'},

        {name: 'AuthCodeDesc', type: 'string'},
        {name: 'LobID', type: 'string'},


        {name: 'AuthCodeDesc', type: 'string'},
        {name: 'placeOFServiceDesc', type: 'string'},
        {name: 'DRGCode', type: 'string'},
        {name: 'DRGDesc', type: 'string'},
        {name: 'dischargeStatusDesc', type: 'string'},

        {name: 'PCPName', type: 'string'},
        {name: 'ServiceProviderName', type: 'string'},
        {name: 'ServiceFacilityName', type: 'string'},
        {name: 'ServiceFacility', type: 'string'},
        {name: 'ServiceProvider', type: 'string'},
        {name: 'PCPPhone', type: 'string'},
        {name: 'ServiceProviderPhone', type: 'string'},
        {name: 'ServiceFacilityPhone', type: 'string'},

        {name: 'PCPFax', type: 'string'},
        {name: 'ServiceProviderFax', type: 'string'},
        {name: 'ServiceFacilityFax', type: 'string'},

        {name: 'DiagCode1', type: 'string'},
        {name: 'DiagCode2', type: 'string'},

        {name: 'DiagDesc1', type: 'string'},
        {name: 'DiagDesc2', type: 'string'},

        {name: 'medicalReason', type: 'string'}



    ],

    proxy: {
        url: 'vendor/hp/authmasterapi',
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