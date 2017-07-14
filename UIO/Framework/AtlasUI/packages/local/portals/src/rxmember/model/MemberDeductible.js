Ext.define('Atlas.portals.rxmember.model.MemberDeductible', {

    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'planbenefitID',type: 'int'},
        {name: 'DeductibleAmt',type: 'string'},
        {name: 'RemDeductAmt',type: 'string'},
        {name: 'CurrentTroopAmt',type: 'string'},
        {name: 'recipientId',type: 'int'},
        {name: 'PlanGroupId',type: 'int'},
        {name: 'MaxTroopAmt',type: 'string'},
        {name: 'memberId',type: 'string'}
    ],

    proxy: {
        url: 'portal/{0}/memberdeductiblesp'
    }
});