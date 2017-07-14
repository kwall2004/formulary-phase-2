Ext.define('Atlas.plan.store.CarrierAccounts',{
    storeId: 'carriersaccounts',
    alias: 'store.plan-carrieraccounts',
    extend:'Ext.data.Store',
    model: 'Atlas.plan.model.CarrierAccount',
    autoLoad: false
});