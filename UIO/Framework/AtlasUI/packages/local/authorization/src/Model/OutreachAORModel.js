/*
 Developer: Srujith Cheruku
 Description: model for Outreach AOR
 Origin: Merlin
 9/7/16

 */
Ext.define('Atlas.authorization.model.OutreachAORModel', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {
        name: 'AuthID',
        type: 'number'
    },{
        name: 'MemberID',
        type: 'string'
    },{
        name: 'MemberName',
        type: 'string'
    },{
        name: 'RecipientID',
        type: 'number'
    },{
        name: 'NDC',
        type: 'string'
    },{
        name: 'LN',
        type: 'string'
    },{
        name: 'HrsRem',
        type: 'number'
    },{
        name: 'AuthStatusDesc',
        type: 'string'
    },{
        name: 'DescisionBy',
        type: 'string'
    },{
        name: 'DecisionDateTime',
        type: 'string'
    },{
        name: 'OutreachDetermination',
        type: 'string'
    },{
        name: 'UrgencyType',
        type: 'string'
    },{
        name: 'UrgencyTypeDesc',
        type: 'string'
    },{
        name: 'RequestType',
        type: 'string'
    },{
        name: 'RequestTypeDesc',
        type: 'string'
    },{
        name: 'PrescriberId',
        type: 'string'
    },{
        name: 'PrescriberName',
        type:'string'
    },{
        name: 'CarrierID',
        type: 'number'
    },{
        name: 'PlanGroupID',
        type: 'number'
    },{
        name: 'PlanGroupName',
        type: 'string'
    },{
        name: 'CarrierName',
        type: 'string'
    },{
        name: 'AccountName',
        type: 'string'
    },{
        name: 'LOBName',
        type: 'string'
    },{
        name: 'NoteDate',
        type: 'date',
        dateFormat: 'Y-m-d'
    },{
        name: 'Notes',
        type: 'string'
    },{
        name: 'AttemptsMade',
        type: 'number'
    },{
        name: 'ContactName',
        type: 'string'
    },{
        name: 'LastContactDateTime',
        type: 'string'
    }],
    proxy: {
        extraParams: {
            pQueueType: ''
        },
        reader: {
            rootProperty: function(payload){
                return payload.data[0];
            }
        },
        url: 'claims/{0}/coverageoutreachq'
    }
});