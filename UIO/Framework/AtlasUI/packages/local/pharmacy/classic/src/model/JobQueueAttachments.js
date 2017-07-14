Ext.define('Atlas.pharmacy.model.JobQueueAttachments', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {
            name: 'DocumentID',
            type: 'string'
        },
        {
            name: 'SubmittedBy',
            type: 'string'
        },
        {
            name: 'DocumentID',
            type: 'string'
        },
        {
            name: 'ttRowID',
            type: 'string'
        },
        {
            name: 'parentJobNum',
            type: 'string'
        },
        {
            name: 'SubmittedDate',
            type: 'date'
        },
        {
            name: 'jNum',
            type: 'string'
        },
        {
            name: 'ChildStatus',
            type: 'string'
        },
        {
            name: 'ttRowNum',
            type: 'string'
        },
        {
            name: 'inOut',
            type: 'string'
        },
        {
            name: 'RecordType',
            type: 'string'
        },
        {
            name: 'DESCRIPTION',
            type: 'string'
        },
        {
            name: 'ChildJobNums',
            type: 'string'
        },
        {
            name: 'faxDate',
            type: 'string'
        },
        {
            name: 'StatusDescription',
            type: 'string'
        },
        {
            name: 'FaxNumber',
            type: 'string'
        },
        {
            name: 'ChildDocIDs',
            type: 'string'
        }
    ],
    proxy: {
        extraParams: {
            pParentSystemId: '',
            pKeyType: '',
            pagination: true
        },
        url: 'shared/{0}/jobqueueandattachments'
    }
});
