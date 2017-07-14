Ext.define('Atlas.plan.model.DMRLob', {
    extend: 'Atlas.common.model.Base',
    idProperty: 'SystemID',
    fields: [
        {name: 'SystemID', type: 'number'},
        {name: 'ListItem', type: 'string'},
        {name: 'ListDescription', type: 'string'},
        {name: 'CharString', type: 'string'},
        {name: 'Active', type: 'string'},
        {name: 'PlanGroupAccess', type: 'string'}

    ],
    proxy: {
        url: 'system/{0}/listdetail'
    }



});