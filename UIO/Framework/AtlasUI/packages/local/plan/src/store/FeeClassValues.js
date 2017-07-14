/**
 * Created by b2352 on 12/19/2016.
 */
Ext.define('Atlas.plan.store.FeeClassValues',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-benefits-feeclassvalues',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: false,
    proxy: {
       /* extraParams: {
             pListName: ''
        },*/
        url: 'shared/{0}/listitems'
    }
});