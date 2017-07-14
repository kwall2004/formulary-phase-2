/**
 * Created by j2560 on 11/4/2016.
 */
Ext.define('Atlas.benefitplan.model.workflow.StatusNotes', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'CurrentUser', type: 'string'},
        {name: 'NoteDtl', type: 'string'},
        {name: 'NoteSubject', type: 'string'},
        {name: 'PopGrpPBPStatSK', type: 'int'},
        {name: 'StatNoteSK', type: 'int'},
        {name: 'User', type: 'string'},
        {name: 'DateCreated', type: 'date'}



    ],
    proxy: {
        url: '/StatusNote'
    }
});