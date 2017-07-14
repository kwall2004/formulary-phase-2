Ext.define('Atlas.plan.store.PlanUserGroups',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-usergroups',
    model: 'Atlas.plan.model.PlanUserGroupList',
    autoLoad: true
});