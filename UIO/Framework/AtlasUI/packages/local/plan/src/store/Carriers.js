Ext.define('Atlas.plan.store.Carriers',{
    storeId: 'plan-carriers',
    alias: 'store.plan-carriers',
    extend:'Ext.data.Store',
    model: 'Atlas.plan.model.Carrier',
    //sorters: 'carrierName',
    autoLoad: false
});