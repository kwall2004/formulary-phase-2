Ext.define('Atlas.plan.store.PlanBenefitExt',{
    alias: 'store.plan-PlanBenefitExt',
    extend: 'Ext.data.Store',
    model: 'Atlas.plan.model.PlanBenefitExt',
    sorters: 'BenefitName',
    autoLoad: false,
    remoteFilter:true,
    remoteSort:true
});