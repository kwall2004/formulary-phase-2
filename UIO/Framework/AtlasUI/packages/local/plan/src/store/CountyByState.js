/**
 * Created by S4505 on 11/10/2016.
 */

Ext.define('Atlas.plan.store.CountyByState',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-countybystate',
    model: 'Atlas.common.model.County',
    autoLoad: true,
    proxy: {
        url: 'shared/{0}/countybystate'
    }
});