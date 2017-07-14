Ext.define('Atlas.portals.rxmember.model.PlanGroupInfo', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'allowMemberLocks',type: 'bool'},
        {name: 'passThroughPricing',type: 'bool'},
        {name: 'licsSubsidy',type: 'bool'},
        {name: 'planBenefitId',type: 'int'},
        {name: 'formularyId',type: 'int'},
        {name: 'PB1ROWID',type: 'string'},
        {name: 'renewalDate',type: 'string'},
        {name: 'benefitStatus',type: 'string'},
        {name: 'processMTMCase',type: 'bool'},
        {name: 'RowNum',type: 'int'},
        {name: 'planFaxLogo',type: 'string'},
        {name: 'pharmNetworkId',type: 'int'},
        {name: 'pcnCodeList',type: 'string'},
        {name: 'effDate',type: 'string'},
        {name: 'processMAPCase',type: 'bool'},
        {name: 'benefitName',type: 'string'},
        {name: 'planBenefitCode',type: 'string'},
        {name: 'MACListID', type: 'int'},
        {name: 'termDate', type: 'string'},
        {name: 'nonPrefPharmNetworkId', type: 'int'}
    ],

    proxy: {
        url: 'plan/{0}/plangroupinfo'
    }
});