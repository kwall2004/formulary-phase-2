/**
 * Created by mkorivi on 11/15/2016.
 */
Ext.define('Atlas.casemanagement.model.COCMasterextAPI', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'COCcaseNum', type: 'string'},
        {name: 'MCSRecipientId', type: 'string'},
        {name: 'MemberId', type: 'string'},
        {name: 'LOB', type: 'string'},
        {name: 'StratLevel', type: 'string'},
        {name: 'AcuityLevelDesc', type: 'string'},
        {name: 'TriggeringDiagnosis', type: 'string'},
        {name: 'HighCostMedical', type: 'string'},
        {name: 'HighCostPharmacy', type: 'string'},
        {name: 'Pregnancy', type: 'string'},
        {name: 'effDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'termDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'lastContactDate',type: 'date', dateFormat: 'Y-m-d'},
        {name: 'followupDate',type: 'date', dateFormat: 'Y-m-d'},
        {name: 'followupReason', type: 'string'},
        {name: 'teamName', type: 'string'},
        {name: 'assignedCoordinator', type: 'string'},
        {name: 'createDate',type: 'date', dateFormat: 'Y-m-d'},
        {name: 'createDateTime',type: 'date', dateFormat: 'Y-m-d'},
        {name: 'CreateTime', type: 'string'},
        {name: 'createUser', type: 'string'}




    ],
    proxy: {
        url: 'vendor/hp/cocmasterextapi',
        extraParams: {

            "pDeviceId": "",
            "pTokenId": "",
            "pSort": "",
            "userState": "MI",
            "pMode" :"mrx"


        }

    }

})
