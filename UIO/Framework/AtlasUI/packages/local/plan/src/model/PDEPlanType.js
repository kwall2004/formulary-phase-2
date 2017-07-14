Ext.define('Atlas.plan.model.PDEPlanType',{
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    idProperty: 'TypeCode',
    fields: [
        {name: 'TypeCode',  type: 'string'},
        {name: 'TypeName',  type: 'string'}
    ],
    proxy: {
        extraParams:{
            pListName:'PDEPlanType'
        },
        url: 'shared/{0}/listitems'
    }
});