/**
 * Created by b2352 on 12/21/2016.
 */

Ext.define('Atlas.plan.store.PlanGroupRiders',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-plangroupriders',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'PlanGroupRiders'
        },
        url: 'shared/{0}/listitems'
    }
});

