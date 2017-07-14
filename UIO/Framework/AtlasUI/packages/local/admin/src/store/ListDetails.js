/**
 * Created by d4662 on 11/28/2016.
 */
Ext.define('Atlas.admin.store.ListDetails', {
    extend: 'Atlas.common.store.CloneStore',

    alias: 'store.admin-listDetails',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: false,
    proxy: {
        extraParams: {
            pListName: 'EDIFileType'
        },
        url: 'shared/{0}/listitems'
    }
});