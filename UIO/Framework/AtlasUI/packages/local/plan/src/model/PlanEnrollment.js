Ext.define('Atlas.plan.model.PlanEnrollment', {
    extend: 'Atlas.common.model.Base',
    idProperty: 'SystemID',
    fields: [
    ],
    proxy: {
        url: 'plan/{0}/planenrollment'
    }
});