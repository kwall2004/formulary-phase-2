/**
 * Created by d4662 on 11/11/2016.
 */
Ext.define('Atlas.admin.store.OutreachCategory', {
    extend: 'Atlas.common.store.CloneStore',

    alias: 'store.admin-outreachCategory',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'outreachCategory'
        },
        url: 'shared/{0}/listitems'
    }
});