/**
 * Created by d4662 on 11/29/2016.
 */
Ext.define('Atlas.admin.store.DeterminationTypes', {
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.admin-determinationTypes',

    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'DeterminationType'
        },
        url: 'shared/{0}/listitems'
    }
});