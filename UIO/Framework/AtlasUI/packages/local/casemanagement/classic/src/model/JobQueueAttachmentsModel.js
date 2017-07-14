/**
 * Created by s6393 on 11/15/2016.
 */
Ext.define('Atlas.casemanagement.model.JobQueueAttachments', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'fileName',type: 'string'},
        { name: 'DocumentID', type: 'string' },
        { name: 'SubmittedBy', type: 'string'},
        { name: 'ttRowID',type: 'string'},
        { name: 'parentJobNum', type: 'string' },
        { name: 'SubmittedDate', type: 'string'},
        { name: 'jNum',type: 'string'},
        { name: 'ChildStatus', type: 'string' },
        { name: 'ttRowNum', type: 'string'},
        { name: 'inOut',type: 'string'},
        { name: 'RecordType', type: 'string' },
        { name: 'DESCRIPTION', type: 'string'},
        { name: 'ChildJobNums',type: 'string'},
        { name: 'faxDate', type: 'string' },
        { name: 'StatusDescription', type: 'string'},
        { name: 'FaxNumber', type: 'string' },
        { name: 'ChildDocIDs', type: 'string'}

    ],
    proxy: {
        url: 'shared/{0}/jobqueueandattachments',
        extraParams: {
            pBatchSize: 0,
            pWhere: "moduleName = 'CaseManagement'",
            pagination:true
        }

    }
});
