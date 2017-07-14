/**
 * Created by S4505 on 11/28/2016.
 */

Ext.define('Atlas.plan.store.BenefitMaintenance',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-benefitmaintenance',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'Maintenance'
        },
        url: 'shared/{0}/listitems'
    }
});
