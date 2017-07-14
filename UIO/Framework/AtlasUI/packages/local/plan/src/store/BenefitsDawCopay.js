/**
 * Created by a6686 on 11/14/2016.
 */
Ext.define('Atlas.plan.store.BenefitsDawCopay',{
    alias: 'store.plan-dawcopay',
    extend: 'Ext.data.Store',
    model: 'Atlas.plan.model.PlanDAWCopay',
    sorters: 'benefitName',
    autoLoad: true
});
