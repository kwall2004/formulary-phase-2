/**
 * Created by b2352 on 12/19/2016.
 */
Ext.define('Atlas.plan.store.FeeTypes',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-benefits-feetypes',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'AdminFeeTypes'
        },
        url: 'shared/{0}/listitems'
    }
});