/**
 * Created by s6393 on 10/11/2016.
 */

Ext.define('Atlas.benefitplan.model.TenantIndustryIdentifierTypeValue', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.tenantIndustryIdentifierTypeValue',
    fields: [
        {name: 'IndustryIdentifier', type: 'number'},
        {name: 'TenantTypeKey', type: 'number'},
        {name: 'ValueID', type: 'number'},
        {name: 'Description', type: 'string'},
        {name: 'Type', type: 'string'},
        {name: 'Value', type: 'string'}
    ],
    proxy: {

        url: '/TenantIndustryIdentifier'
    }
});
