/**
 * Created by b2352 on 12/21/2016.
 */
Ext.define('Atlas.plan.store.RejectedCodes',{
    alias: 'store.plan-rejectedcodes',
    extend:'Ext.data.Store',
    model: 'Atlas.plan.model.RejectedCode',
    //sorters: 'planGroupName',
    autoLoad: true
});