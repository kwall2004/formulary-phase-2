/**
 * Created by s6393 on 9/29/2016.
 */
Ext.define('Atlas.benefitplan.store.TenantIndustryIdentifier', {
    alias: 'store.tenantIndustryIdentifier-store',
    extend: 'Ext.data.Store',
    model: 'Atlas.benefitplan.model.TenantIndustryIdentifier',
    sorters: 'Type',
    autoLoad: false
});