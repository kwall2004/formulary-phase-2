Ext.define('Atlas.plan.store.PlanCarrierLOBs',{
    alias: 'store.plan-plancarrierLOBs',
    extend: 'Ext.data.Store',
    model: 'Atlas.plan.model.PlanCarrierLOB',
    sorters: 'lobName',
    autoLoad: false
});