/**
 * Created by mkorivi on 11/14/2016.
 */

Ext.define('Atlas.casemanagement.model.CaseLoadMasterextAPI', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'recipientId', type: 'string'},
        {name: 'seqNum', type: 'string'},
        {name: 'systemId', type: 'string'},
        {name: 'memberName', type: 'string'},
        {name: 'effDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'termDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'followUpDate',type: 'date', dateFormat: 'Y-m-d'},
        {name: 'cmDescription', type: 'string'},
        {name: 'referralSource', type: 'string'},
        {name: 'lastContact', type: 'string'},
        {name: 'AcuityLevel', type: 'string'},
        {name: 'AcuityLevelDesc',type: 'string'},
        {name: 'referralType', type: 'string'},
        {name: 'Alerts', type: 'string'},
        {name: 'goalForNextContact', type: 'string'},
        {name: 'Attachments', type: 'string'},
        {name: 'memberID', type: 'string'},
        {name: 'referralReason', type: 'string'},
        {name: 'COCMasterSystemId', type: 'string'},
        {name: 'startDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'strat', type: 'string'},
        {name: 'stratDesc', type: 'string'},
        {name: 'closedReason', type: 'string'},
        {name: 'closedReasonDesc', type: 'string'},
        {name: 'caseStatus', type: 'string'},
        {name: 'managedByUserName', type: 'string'}



    ],
    proxy: {
        url: 'vendor/hp/caseloadmasterextapi',
        extraParams: {
             pagination:true,
            "pDeviceId": "",
            "pTokenId": "",
            "pSort": "",
            "userState": "MI",
            "pMode" :"mrx",
             timeout: 1200000

        }

    }

})
