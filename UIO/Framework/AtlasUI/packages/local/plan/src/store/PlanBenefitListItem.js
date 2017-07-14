Ext.define('Atlas.plan.store.PlanBenefitListItem',{
    alias: 'store.plan-planbenefitlistitem',
    extend: 'Ext.data.Store',
    model: 'Atlas.plan.model.PlanBenefitListItem',
    sorters: 'BenefitName',
    autoLoad: true
});