/**
 * Created by S4505 on 11/7/2016.
 */
Ext.define('Atlas.plan.store.PlanPrescriberLocation',{
    storeId: 'plan-prescriberlocation',
    alias: 'store.plan-prescriberlocation',
    extend:'Ext.data.Store',
    model: 'Atlas.plan.model.PlanPrescriberLocation',
    autoLoad: true,
    remoteFilter:true
});
