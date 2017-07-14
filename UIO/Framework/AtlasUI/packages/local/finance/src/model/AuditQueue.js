Ext.define('Atlas.finance.model.AuditQueue', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'auditID', type:'int'},
        {name: 'ncpdpid', type:'number'},
        {name: 'auditCompleteDate', type:'date'},
        {name: 'LetterSentDate', type:'date'},
        {name: 'pharmacyname', type:'string'},
        {name: 'auditType', type:'string'},
        {name: 'daysElapsed', type:'int'}
    ],

    proxy: {
        url: 'finance/{0}/reqaudittakebacks',
        extraParams: {
            pagination: true
        }
    }
});