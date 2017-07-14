Ext.define('Atlas.plan.model.PlanAddressType',{
    extend: 'Atlas.common.model.Base',
    idProperty: 'AddressType',
    fields: [
        {name: 'AddressType',  type: 'string'},
        {name: 'AddressTypeName',  type: 'string'}
    ],
    extraParams:{
        ipcPortalAddresses: ''
    },
    proxy: {
        url: 'plan/{0}/planaddresses'
    }
});