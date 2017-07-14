/**
 * Created by b2352 on 12/19/2016.
 */
Ext.define('Atlas.plan.store.CopayDistributions',{
    alias: 'store.plan-copaydistributions',
    extend: 'Ext.data.Store',
    model: 'Atlas.plan.model.CopayDistribution',
    autoLoad: true
});