Ext.define('Atlas.plan.model.CopayFunction',{
    extend: 'Atlas.common.model.StaticBase', //change to base when layer7 URL is ready
    idProperty: 'FuncProg',
    fields: [
        {name: 'FuncProg',  type: 'number'},
        {name: 'Description',  type: 'string'}
    ],
    proxy: {
        url: 'resources/data/dummydata/plan/copayfunctions.json'
    }
});