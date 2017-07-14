/**
 * Created by s6393 on 10/3/2016.
 */
Ext.define('Atlas.benefitplan.store.PopulationGroupPlanBenefitPackageSummary', {
    alias: 'store.populationGroupPBP-store',
    extend: 'Ext.data.Store',
    model: 'Atlas.benefitplan.model.PopulationGroupPlanBenefitPackageSummary',
    sorters: 'populationGroupPlanBenefitPackageSummary',
    autoLoad: false
});