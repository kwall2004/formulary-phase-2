/**
 * Created by d4662 on 11/30/2016.
 */
Ext.define('Atlas.admin.store.CMSPatSafetyRuleLevel', {
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.admin-cmsPatSafetyRuleLevel',

    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'CMSPatSafetyRuleLevel'
        },
        url: 'shared/{0}/listitems'
    }
});