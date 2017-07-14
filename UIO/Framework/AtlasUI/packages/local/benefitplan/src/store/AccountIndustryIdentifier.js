/**
 * Created by s6393 on 9/30/2016.
 */
Ext.define('Atlas.benefitplan.store.AccountIndustryIdentifier', {
    alias: 'store.accountIndustryIdentifier-store',
    extend: 'Ext.data.Store',
    model: 'Atlas.benefitplan.model.AccountIndustryIdentifier',
    sorters: 'accountIndustryIdentifier',
    autoLoad: false
});