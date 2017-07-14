/**
 * Created by d4662 on 11/30/2016.
 */
Ext.define('Atlas.admin.store.CMSPatSafetyRuleName', {
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.admin-cmsPatSafetyRuleName',

    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'CMSPatSafetyRuleName'
        },
        url: 'shared/{0}/listitems'
    }
});