Ext.define('Atlas.plan.model.PlanDUR', {
    extend: 'Atlas.common.model.Base',
    idProperty: 'SystemID',
    fields: [
        {name: 'durSeverityLevelDescription',  type: 'string'},
        {name: 'durAction',  type: 'string'},
        {name: 'SystemID',  type: 'number'},
        {name: 'durSeverityLevel',  type: 'string'},
        {name: 'durActionDescription',  type: 'string'},
        {name: 'durTypeDescription',  type: 'string'},
        {name: 'durType',  type: 'string'}
    ],
    proxy: {
        url: 'plan/{0}/plandur'
    }
});