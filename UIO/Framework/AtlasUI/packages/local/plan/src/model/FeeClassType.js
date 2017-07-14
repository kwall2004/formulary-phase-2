Ext.define('Atlas.plan.model.FeeClassType',{
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    //idProperty: 'pcnCode',

    fields: [
        {name: 'value',  type: 'string'},
        {name: 'name',  type: 'string'}
    ],

    proxy: {
        extraParams: {
            pListName: 'FeeClassType'
        },
        url: 'shared/{0}/listitems'
    }
});