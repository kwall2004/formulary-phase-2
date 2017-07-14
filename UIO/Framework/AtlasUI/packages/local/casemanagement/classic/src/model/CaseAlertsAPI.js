/**
 * Created by mkorivi on 11/15/2016.
 */

Ext.define('Atlas.casemanagement.model.CaseAlertsAPI', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'parentSystemID', type: 'string'},
        {name: 'systemID', type: 'string'},
        {name: 'alertType', type: 'string'},
        {name: 'alertDescription', type: 'string'},
        {name: 'ownerSystemID', type: 'string'},
        {name: 'Read', type: 'string'},
        {name: 'createDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'createTime', type: 'string'},
        {name: 'createDateTime',type: 'date'},
        {name: 'createUser', type: 'string'},
        {name: 'completeDate',type: 'date', dateFormat: 'Y-m-d'},
        {name: 'completeTime', type: 'string'},
        {name: 'completeDateTime', type: 'date'},
        {name: 'completeUser', type: 'string'},
        {name: 'displayDateTime',type: 'string'},
        {name: 'dispCompleteDateTime',type: 'string'}




    ],
    proxy: {
        url: 'vendor/hp/casealertsapi',
        extraParams: {

            "pDeviceId": "",
            "pTokenId": "",
            "pSort": "",
            "userState": "MI",
            "pMode" :"mrx",
             pagination:true
        }

    }

})
