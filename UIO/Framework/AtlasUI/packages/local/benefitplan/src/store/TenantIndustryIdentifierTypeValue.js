/**
 * Created by s6393 on 10/11/2016.
 */

Ext.define('Atlas.benefitplan.store.TenantIndustryIdentifierTypeValue', {
    alias: 'store.tenantIndustryIdentifierTypeValue-store',
    extend: 'Ext.data.Store',
    model: 'Atlas.benefitplan.model.TenantIndustryIdentifierTypeValue',
    sorters: 'Type',
    autoLoad: false
});