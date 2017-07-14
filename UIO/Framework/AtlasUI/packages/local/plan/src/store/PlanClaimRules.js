/**
 * Created by S4505 on 11/8/2016.
 */

Ext.define('Atlas.plan.store.PlanClaimRules',{
    alias: 'store.plan-planclaimrules',
    extend: 'Ext.data.Store',
    model: 'Atlas.plan.model.PlanClaimRules',
    sorters: 'benefitName',
    autoLoad: true
});
