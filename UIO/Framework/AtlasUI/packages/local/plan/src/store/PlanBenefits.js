Ext.define('Atlas.plan.store.PlanBenefits',{
    alias: 'store.plan-planbenefits',
    extend: 'Ext.data.Store',
    model: 'Atlas.plan.model.PlanBenefit',
    sorters: 'benefitName',
    autoLoad: true
});