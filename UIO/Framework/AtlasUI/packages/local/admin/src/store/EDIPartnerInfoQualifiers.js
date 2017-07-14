/**
 * Created by d4662 on 2/9/2017.
 */
Ext.define('Atlas.admin.store.EDIPartnerInfoQualifiers', {
    extend: 'Atlas.common.store.CloneStore',

    alias: 'store.admin-edipartnerinfoqualifiers',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'EDIPartnerInfoQualifiers'
        },
        url: 'shared/{0}/listitems'
    }
});

