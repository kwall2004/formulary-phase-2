/**
 * Created by S4505 on 11/15/2016.
 */


Ext.define('Atlas.plan.store.RuleTypes',{
    extend: 'Atlas.common.store.CloneStore',
    alias: 'store.plan-ruletypes',
    model: 'Atlas.common.model.shared.ListModel',
    autoLoad: true,
    proxy: {
        extraParams: {
            pListName: 'PlanRuleType'
        },
        url: 'shared/{0}/listitems'
    }
});
