/**
 * Created by S4505 on 11/8/2016.
 */
Ext.define('Atlas.plan.store.DrugLevel',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-druglevel',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'DrugLevel'
        },
        url: 'shared/{0}/listitems'
    }
});