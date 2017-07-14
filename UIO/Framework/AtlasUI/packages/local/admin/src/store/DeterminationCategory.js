/**
 * Created by d4662 on 11/29/2016.
 */
Ext.define('Atlas.admin.store.DeterminationCategory', {
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.admin-determinationCategory',

    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'DeterminationCategory'
        },
        url: 'shared/{0}/listitems'
    }
});