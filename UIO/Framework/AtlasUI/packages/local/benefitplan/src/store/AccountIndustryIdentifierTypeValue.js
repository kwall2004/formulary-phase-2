/**
 * Created by s6393 on 9/30/2016.
 */
Ext.define('Atlas.benefitplan.store.AccountIndustryIdentifierTypeValue', {
    alias: 'store.accountIndustryIdentifierTypeValue-store',
    extend: 'Ext.data.Store',
    model: 'Atlas.benefitplan.model.AccountIndustryIdentifierTypeValue',
    sorters: 'accountIndustryIdentifierTypeValue',
    autoLoad: false
});