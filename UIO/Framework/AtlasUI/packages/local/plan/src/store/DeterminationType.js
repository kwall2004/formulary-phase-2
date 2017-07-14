/**
 * Created by d4662 on 11/11/2016.
 */
Ext.define('Atlas.plan.store.DeterminationType', {
    extend: 'Atlas.common.store.CloneStore',

    alias: 'store.plan-determinationType',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'DeterminationType'
        },
        url: 'shared/{0}/listitems'
    }
});