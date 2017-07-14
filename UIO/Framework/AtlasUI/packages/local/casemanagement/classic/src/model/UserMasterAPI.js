/**
 * Created by mkorivi on 11/14/2016.
 */
Ext.define('Atlas.casemanagement.model.UserMasterAPI', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'userName', type: 'string'},
        {name: 'firstName', type: 'string'},
        {name: 'middleName', type: 'string'},
        {name: 'lastName', type: 'string'},
        {name: 'fullName', type: 'string'},
        {name: 'managerID', type: 'string'},
        {name: 'systemID', type: 'string'},
        {name: 'UsrGrpID', type: 'string'},
        {name: 'groupDescription', type: 'string'},
        {name: 'startDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'termDate', type: 'date', dateFormat: 'Y-m-d'}

    ],
    proxy: {
        url: 'vendor/hp/usermasterapi',
        extraParams: {
            "pDeviceId": "",
            "pTokenId": "",
            "pSort": "",
            "userState": "MI",
            "pMode" :"mrx",
            'pUserName': Atlas.user.un,
            'pWhere': ''

        }

    }

});