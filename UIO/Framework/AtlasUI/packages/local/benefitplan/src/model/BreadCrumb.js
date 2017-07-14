/**
 * Created by s6393 on 10/18/2016.
 */
Ext.define('Atlas.benefitplan.model.BreadCrumb', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'TenantFamSK', type: 'int'},
        {name: 'TenantFamName', type: 'string'},
        {name: 'TenantSK', type: 'int'},
        {name: 'TenantName', type: 'string'},
        {name: 'AcctSK', type: 'int'},
        {name: 'AcctName', type: 'string'},
        {name: 'GrpSK', type: 'int'},
        {name: 'GrpName', type: 'string'},
        {name: 'PopGrpSK', type: 'int'},
        {name: 'PopGrpName', type: 'string'}
    ],
    proxy: {
        url: '/NavigationBreadCrumb'
    }
});
