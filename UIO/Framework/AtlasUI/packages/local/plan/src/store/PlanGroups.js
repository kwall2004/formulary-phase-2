Ext.define('Atlas.plan.store.PlanGroups',{
    alias: 'store.plan-plangroups',
    extend:'Ext.data.Store',
    model: 'Atlas.plan.model.PlanGroup',
    sorters: 'planGroupName',
    autoLoad: true
});