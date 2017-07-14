Ext.define('Atlas.plan.store.PlanCarrierExt',{
    storeId: 'plan-plancarrierext',
    alias: 'store.plan-plancarrierext',
    extend:'Ext.data.Store',
    model: 'Atlas.plan.model.PlanCarrierExt',
    //sorters: 'carrierName',
    autoLoad: false
});