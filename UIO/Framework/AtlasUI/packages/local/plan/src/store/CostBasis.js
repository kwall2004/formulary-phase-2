/**
 * Created by S4505 on 11/29/2016.
 */

Ext.define('Atlas.plan.store.CostBasis',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-costbasis',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'CostBasis'
        },
        url: 'shared/{0}/listitems'
    }
});
