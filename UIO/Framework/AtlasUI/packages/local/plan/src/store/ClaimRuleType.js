/**
 * Created by S4505 on 11/8/2016.
 */

Ext.define('Atlas.plan.store.ClaimRuleType',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-claimruletype',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'PlanClaimRuleType'
        },
        url: 'shared/{0}/listitems'
    }
});
