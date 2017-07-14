Ext.define('Atlas.home.model.ClaimAlert', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'NCPDPID', type:'string'},
        {name: 'Account', type:'string'},
        {name: 'ClaimID', type: 'int'},
        {name: 'PlanGroupName', type: 'string'},
        {name: 'planGrpName', type: 'string', mapping: 'PlanGroupName'}, //for member record
        {name: 'NPI', type: 'string'},
        {name: 'RuleId', type: 'int'},
        {name: 'CreateDateTime', type: 'date'},
        {name: 'SystemID', type: 'number'},
        {name: 'PlanGroupID', type: 'int'},
        {name: 'Descr', type: 'string'},
        {name: 'NDC', type: 'string'},
        {name: 'PharmacyName', type: 'string'},
        {name: 'PrescriberName', type: 'string'},
        {name: 'RecipID', type: 'int'},
        {name: 'recipientID', type: 'string', mapping: 'RecipID'}, //for member record
        {name: 'Stat', type: 'string'},
        {name: 'SvcDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'assigned', type: 'string'},
        {name: 'Carrier', type: 'string'},
        {name: 'MemberName', type: 'string'},
        {name: 'StatCode', type: 'string'},
        {name: 'LOB', type: 'string'},
        {name: 'RecPointer', type: 'string'}
    ],

    proxy: {
        url: 'claims/{0}/claimalert',
        extraParams: {
            pagination: true
        },
        timeout: 120000
    }
});