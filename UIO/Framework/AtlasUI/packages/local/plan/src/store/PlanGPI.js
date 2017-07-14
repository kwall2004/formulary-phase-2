/**
 * Created by S4505 on 11/17/2016.
 */
Ext.define('Atlas.plan.store.planGPI',{
    extend: 'Ext.data.Store',
    alias: 'store.plan-plangpi',
    model: 'Atlas.common.model.GPI',
    autoLoad: false,
    remoreFilter:true,
    remoteSort:true
});