/**
 * Created by S4505 on 11/8/2016.
 */
Ext.define('Atlas.plan.store.DAWType',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-dawtype',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'DAWType'
        },
        url: 'shared/{0}/listitems'
    }
});