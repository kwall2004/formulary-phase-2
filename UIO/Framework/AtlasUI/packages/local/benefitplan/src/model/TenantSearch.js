Ext.define('Atlas.benefitplan.model.TenantSearch', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'TenantFamName', type: 'string'},
        {name: 'TenantName', type: 'string'},
        {name: 'AcctName', type: 'string'},
        {name: 'GrpName', type: 'string'},
        {name: 'PopGrpName', type: 'string'}
    ],
    proxy: {
        url: '/TenantSearch'
    }
});
