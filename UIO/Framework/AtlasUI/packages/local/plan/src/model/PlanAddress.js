Ext.define('Atlas.plan.model.PlanAddress',{
    extend: 'Atlas.common.model.Base',
    // extend: 'Atlas.common.model.StaticBase', //change to base when layer7 URL is ready
    idProperty: 'SystemID',
    fields: [
        {name: 'SystemID',  type: 'number'},
        {name: 'AddressTypeName',  type: 'string'}
    ],
    proxy: {
        url: 'plan/{0}/planaddresses'
        // url: 'resources/data/dummydata/plan/planaddresstypes.json'
    }
});