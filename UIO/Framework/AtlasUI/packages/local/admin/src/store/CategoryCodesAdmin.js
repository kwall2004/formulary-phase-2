/**
 * Created by d4662 on 12/7/2016.
 */
Ext.define('Atlas.admin.store.CategoryCodes', {
    extend: 'Atlas.common.store.CloneStore',

    alias: 'store.admin-categoryCodes',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'ContactCodeCategory'
        },
        url: 'shared/{0}/listitems'
    }
});
