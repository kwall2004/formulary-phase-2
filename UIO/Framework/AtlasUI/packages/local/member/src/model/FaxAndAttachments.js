/**
 * Created by s6627 on 1/11/2017.
 */
Ext.define('Atlas.member.model.FaxAndAttachments', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'faxDate', type: 'string'},
        {name: 'inOut', type: 'string'},
        {name: 'SubmittedBy', type: 'string'},
        {name: 'FaxNumber', type: 'string'},
        {name: 'DocumentID',type: 'int'},
        {name: 'DESCRIPTION',type: 'string'}
    ],
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'shared/{0}/faxandattachment'
    }
})