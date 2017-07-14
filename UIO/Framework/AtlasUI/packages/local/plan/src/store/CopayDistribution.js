/**
 * Created by a6686 on 11/15/2016.
 */

Ext.define('Atlas.plan.store.CopayDistribution',{
    alias: 'store.plan-copaydistribution',
    extend: 'Ext.data.Store',
    model: 'Atlas.plan.model.PlanCopayDistribution',
    sorters: 'benefitName',
    autoLoad: true
});
