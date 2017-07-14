/**
 * Created by S4505 on 11/17/2016.
 */


Ext.define('Atlas.plan.store.planETC',{
    extend: 'Ext.data.Store',
    alias: 'store.plan-planetc',
    model: 'Atlas.common.model.ETC',
    autoLoad: false,
    remoreFilter:true,
    remoteSort:true
});