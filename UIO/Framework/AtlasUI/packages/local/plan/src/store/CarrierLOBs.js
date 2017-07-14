Ext.define('Atlas.plan.store.CarrierLOBs',{
    alias: 'store.plan-carrierLOBs',
    extend: 'Ext.data.Store',
    model: 'Atlas.plan.model.CarrierLOB',
    sorters: 'lobName',
    autoLoad: false
});