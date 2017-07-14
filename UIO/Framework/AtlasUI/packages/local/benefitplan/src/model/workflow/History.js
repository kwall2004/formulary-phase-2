/**
 * Created by j2560 on 11/4/2016.
 */
Ext.define('Atlas.benefitplan.model.workflow.History', {
    extend: 'Atlas.benefitplan.model.Base',
    hasMany: {model: 'StatusNotes', name: 'StatusNotes', associationKey: 'StatusNotes'},
    fields: [
        {name: 'CurrentUser', type: 'string'},
        {name: 'Action', type: 'string'},
        {name: 'ActionDate', type: 'date'},
        {name: 'PopGrpPBPSK', type: 'int'},
        {name: 'PopGrpPBPStatSK', type: 'int'},
        {name: 'StatTypeSK', type: 'int'},
        {name: 'StatusNotes'},
        {name: 'SubmittingUser', type: 'string'}
    ],
    proxy: {
        url: '/WorkflowHistory'
    }
});