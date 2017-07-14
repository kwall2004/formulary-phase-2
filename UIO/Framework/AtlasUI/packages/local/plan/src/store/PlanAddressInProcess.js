/**
 * Created by S4505 on 11/13/2016.
 */

Ext.define('Atlas.plan.store.PlanAddressInProcess',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-planaddressinprocess',
    model: 'Atlas.plan.model.PlanAddressList',
    autoLoad: false
});
