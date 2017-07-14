Ext.define('Atlas.plan.model.CMSPlanType',{
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    idProperty: 'TypeCode',
    fields: [
        {name: 'TypeCode',  type: 'string'},
        {name: 'TypeName',  type: 'string'}
    ],
    proxy: {
        extraParams:{
            pListName:'CMSPlanTypes'
        },
        url: 'shared/{0}/listitems'
    }
});