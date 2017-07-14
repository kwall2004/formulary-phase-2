Ext.define('Atlas.portals.rxmember.model.MemberCoverage', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'PlanBenefitId',type: 'int'},
        {name: 'CarrierLOBId',type: 'int'},
        {name: 'CarrierName',type: 'string'},
        {name: 'RecipientId',type: 'int'},
        {name: 'PlanBenefitName',type: 'string'},
        {name: 'PlanGroupName',type: 'string'},
        {name: 'LOBName',type: 'string'},
        {name: 'BIN',type: 'string'},
        {name: 'CMSPBPId',type: 'string'},
        {name: 'EffDate',type: 'string'},
        {name: 'PlanGroupId',type: 'string'},
        {name: 'SystemId',type: 'string'},
        {name: 'CMSContractId',type: 'string'},
        {name: 'MemberId',type: 'string'},
        {name: 'CarrierId',type: 'string'},
        {name: 'PrimaryCarePhys',type: 'string'},
        {name: 'TermDate',type: 'string'},
        {name: 'PCN', type: 'string'},
        {name: 'DisplayName', calculate: function(obj){
            return obj.LOBName + " - " + obj.PlanGroupName;
        }}
    ],
    proxy: {
        url: 'portal/{0}/portalmembercoveragep'
    }
});