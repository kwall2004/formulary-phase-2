/**
 * Created by b2352 on 12/19/2016.
 */
Ext.define('Atlas.plan.store.FeeClassTypes',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-benefits-feeclasstypes',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {

        extraParams: {
            pListName: 'FeeClassType'
        },
        url: 'shared/{0}/listitems'
    }
});