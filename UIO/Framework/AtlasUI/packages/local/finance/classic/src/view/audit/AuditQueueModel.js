Ext.define('Atlas.finance.view.audit.AuditQueueModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.finance-auditqueue',

    stores: {
        audittakebacksrequired: {
            model:'Atlas.finance.model.AuditQueue',
            sorters: [{
                property: 'LetterSentDate',
                direction: 'DESC'
            }]
        }
    },

    data: {

    }
});