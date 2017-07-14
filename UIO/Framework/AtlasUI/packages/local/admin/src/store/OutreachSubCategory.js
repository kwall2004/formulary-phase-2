/**
 * Created by d4662 on 11/11/2016.
 */
Ext.define('Atlas.admin.store.OutreachSubCategory', {
    extend: 'Atlas.common.store.CloneStore',

    alias: 'store.admin-outreachSubCategory',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'OutreachSubCategory'
        },
        url: 'shared/{0}/listitems'
    }

});