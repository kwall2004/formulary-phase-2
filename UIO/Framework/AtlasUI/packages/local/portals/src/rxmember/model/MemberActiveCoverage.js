Ext.define('Atlas.portals.rxmember.model.MemberActiveCoverage', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'PlanEmail',type: 'string'},
        {name: 'planBenefitId',type: 'string'},
        {name: 'FirstName',type: 'string'},
        {name: 'PlanCity',type: 'string'},
        {name: 'PlanName',type: 'string'},
        {name: 'PlanPhone',type: 'string'},
        {name: 'Planzip',type: 'string'},
        {name: 'MemberId',type: 'string'},
        {name: 'PCPNPI',type: 'string'},
        {name: 'Planstate',type: 'string'},
        {name: 'PlanAddress',type: 'string'},
        {name: 'LastName',type: 'string'},
        {name: 'planGroupId',type: 'string'}
    ],

    proxy: {
        url: 'member/{0}/memberactivecoverage'
    }
});