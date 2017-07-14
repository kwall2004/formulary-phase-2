/**
 * Created by s6393 on 11/21/2016.
 */
Ext.define('Atlas.casemanagement.model.EligibilityHistoryModel', {
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
        url: 'vendor/hp/memberenrollmentmasterapi',
        extraParams:
        {
            "pMode": "mrx",
            "pUserName": Atlas.user.un,
            "userState":"MI",
            "pDeviceId": null,
            "pTokenId": null,
            "pLOBID": "All"
        }
    }

});