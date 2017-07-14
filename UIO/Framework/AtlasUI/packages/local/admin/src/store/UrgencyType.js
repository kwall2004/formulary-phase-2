/**
 * Created by d4662 on 11/29/2016.
 */
Ext.define('Atlas.admin.store.UrgencyType', {
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.admin-urgencyType',

    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: false,
    proxy: {
        extraParams: {
            pListName: 'UrgencyType'
        },
        url: 'shared/{0}/listitems'
    }
});