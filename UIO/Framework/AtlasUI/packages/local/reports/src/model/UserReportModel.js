
Ext.define('Atlas.reports.model.UserReportModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'userreportmodel',
    fields: [
        {name: 'pcUsrName', type: 'string', mapping: 'pcUsrName' },
        {name: 'pcRptID', type: 'string', mapping: 'pcRptID' },
        {name: 'pcAction', type: 'string', mapping: 'pcAction'}
    ],
    pageSize: 50,
    proxy: {
        url: 'shared/[0]/userreport',
        unifyOperations: true
    }
});