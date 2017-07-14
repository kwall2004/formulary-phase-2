/**
 * Created by S4505 on 11/15/2016.
 */

Ext.define('Atlas.plan.store.DURTypes',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-durtypes',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'DURType'
        },
        url: 'shared/{0}/listitems'
    }
});

