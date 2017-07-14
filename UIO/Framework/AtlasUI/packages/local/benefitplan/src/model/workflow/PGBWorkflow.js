/**
 * Created by j2560 on 11/4/2016.
 */
Ext.define('Atlas.benefitplan.model.workflow.PGBWorkflow', {
    extend: 'Atlas.benefitplan.model.Base',
    hasMany: {model: 'StatusNotes', name: 'StatusNotes', associationKey: 'StatusNotes'},
    fields: [
        {name: 'CurrentUser', type: 'string'},
        {name: 'Account', type: 'string'},
        {name: 'EffectiveEndDate', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EffectiveStartDate', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'Group', type: 'string'},
        {name: 'LastDate', type: 'date', dateFormat: 'Y-m-d'},

        {name: 'LastTime', type: 'date', dateFormat: 'H:i:s'},
        {name: 'LastUser', type: 'string'},
        {name: 'PBPID', type: 'string'},
        {name: 'PBPName', type: 'string'},
        {name: 'PopGrp', type: 'string'},
        {name: 'Tenant', type: 'string'},
        {name: 'PopGrpPBPSK', type: 'int'},
        {name: 'PopGrpPBPStatSK', type: 'int'},
        {name: 'StatusNotes'}
    ],
    proxy: {
        url: '/PopulationGroupBenefitWorkflow'
    }
});