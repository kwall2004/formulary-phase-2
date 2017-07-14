/**
 * Created by S4505 on 11/10/2016.
 */

Ext.define('Atlas.plan.store.States',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-states',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'states'
        },
        url: 'shared/{0}/listitems'
    }
});