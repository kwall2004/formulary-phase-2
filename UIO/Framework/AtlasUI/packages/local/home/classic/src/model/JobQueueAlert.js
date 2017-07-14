Ext.define('Atlas.home.model.JobQueueAlert', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'submittedBy', type:'string'},
        {name: 'jobNum', type:'number'},
        {name: 'jobStatus', type:'string'},
        {name: 'description', type:'string'},
        {name: 'endDateTime', type:'date',dateFormat: 'c'},
        {name: 'RowNum', type:'int'},
        {name: 'submitDateTime', type:'date',dateFormat: 'c'},
        {name: 'statusDescription', type:'string'},
        {name: 'startDateTime', type:'date',dateFormat: 'c'},
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