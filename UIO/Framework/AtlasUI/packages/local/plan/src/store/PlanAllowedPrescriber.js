/**
 * Created by S4505 on 11/7/2016.
 */

Ext.define('Atlas.plan.store.PlanAllowedPrescriber',{
    storeId: 'plan-allowedprescriber',
    alias: 'store.plan-allowedprescriber',
    extend:'Ext.data.Store',
    model: 'Atlas.plan.model.PlanAllowedPrescriber',
    autoLoad: true
});
