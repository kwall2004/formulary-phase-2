/**
 * Created by S4505 on 11/15/2016.
 */

Ext.define('Atlas.plan.store.DURConditions',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-durcondition',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'DurCondition'
        },
        url: 'shared/{0}/listitems'
    }
});
