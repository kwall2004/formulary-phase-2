Ext.define('Atlas.finance.view.audit.AdvancedSearchModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.finance-audit-advsearch',

    stores: {
        advsearchresults: {
            model: 'Atlas.finance.model.Audit',
            pageSize : 15
        }
    }
});
