Ext.define('Atlas.benefitplan.model.AccountIndustryIdentifier', {
    extend: 'Atlas.benefitplan.model.Base',
       fields: [
           {name: 'IndustryIdentifier', type: 'number'},
           {name: 'TenantTypeKey', type: 'number'},
           {name: 'ValueID', type: 'number'},
           {name: 'Type', type: 'string'},
           {name: 'Type', type: 'string'},
           {name: 'Value', type: 'string'}
    ],
    proxy: {

        url: '/AccountIndustryIdentifier'
    }
});
