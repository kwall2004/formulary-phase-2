/**
 * Created by s6627 on 11/27/2016.
 */
Ext.define('Atlas.casemanagement.model.FaxHistoryModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'faxDate', type: 'date'},
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
        url: 'member/{0}/mtmfaxattachment'
    }
})