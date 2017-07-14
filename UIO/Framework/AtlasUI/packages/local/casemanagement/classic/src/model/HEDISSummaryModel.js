/**
 * Created by s6393 on 11/19/2016.
 */
Ext.define('Atlas.casemanagement.model.HEDISSummaryModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'measureDesc', type: 'string'},
        {name: 'subMeasure', type: 'string'},
        {name: 'dueBy',  type: 'date', dateFormat: 'Y-m-d'},
        {name: 'lastSeen', type: 'string'},
        {name: 'provId', type: 'string'},
        {name: 'complete', type: 'string'},
        {name: 'futureAppointmentDate',type: 'date', dateFormat: 'Y-m-d'},
        {name: 'appointmentDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'pending', type: 'string'},
        {name: 'createUser', type: 'string'},
        {name: 'reportYear', type: 'string'}


    ],
    proxy: {
        url: 'vendor/hp/memberhedissummarymasterapi',
        extraParams: {
            "pMode" :"mrx",
            "userState": "MI",
            "pUserName": Atlas.user.un,
            "pDeviceId": "",
            "pTokenId": ""
        }

    }

});