/**
 * Created by g2304 on 12/11/2016.
 */
Ext.define('Atlas.common.model.shared.JobQueueMain', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'submittedBy', type:'string'},
        {name: 'jobNum', type:'number'},
        {name: 'jobStatus', type:'string'},
        {name: 'description', type:'string'},
        {name: 'endDateTime', type:'date'},
        {name: 'RowNum', type:'int'},
        {name: 'submitDateTime', type:'date'},
        {name: 'statusDescription', type:'string'},
        {name: 'startDateTime', type:'date'},
        {name: 'programName', type:'string'},
        {name: 'dbRowID', type:'string'},
        {name: 'faxNumber', type:'string'},
        {name: 'documentID', type:'number'},
        {name: 'schedStartDate', type:'date'},
        {name: 'jobType', type:'string'}
    ],
    proxy: {
        url: 'shared/{0}/jobqueue',
        extraParams: {
            pWhere: '',
            pSort: 'submitDateTime desc',
            pBatchSize: 10,
            pRowNum: 0,
            pDBrowID: ''
        },
        timeout: 120000
    }
});