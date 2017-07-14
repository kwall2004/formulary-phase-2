/**
 * Created by s6685 on 11/8/2016.
 */

Ext.define('Atlas.authorization.model.ReqAppealLettersQModel',{
    extend: 'Atlas.common.model.Base',
    fields: [
        {
            name: 'NoteDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        },{
            name: 'appealStartDate',
            type: 'date',
            dateFormat: 'c'
        },{
            name: 'appealDueDate',
            type: 'date',
            dateFormat: 'Y-m-d'
        },{
            name: 'AppealDecisionDate',
            type: 'date',
            dateFormat: 'c'
        }
    ],
    proxy: {
        url: 'claims/{0}/reqappeallettersq',
        extraParams: {
            pagination: true
        }
    }
});





