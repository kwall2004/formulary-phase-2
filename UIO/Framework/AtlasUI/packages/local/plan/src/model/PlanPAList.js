Ext.define('Atlas.plan.model.PlanPAList', {
    extend: 'Atlas.common.model.Base',
    idProperty: 'SystemID',
    fields: [
    ],
    proxy: {
        url: 'plan/{0}/planpalist'
    }
});