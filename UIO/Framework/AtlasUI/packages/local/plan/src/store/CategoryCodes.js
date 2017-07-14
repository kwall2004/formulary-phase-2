/**
 * Created by d4662 on 11/11/2016.
 */

Ext.define('Atlas.plan.store.CategoryCodes', {
    extend: 'Atlas.common.store.CloneStore',

    alias: 'store.plan-categoryCodes',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'ContactCodeCategory'
        },
        url: 'shared/{0}/listitems'
    }
});