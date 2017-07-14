/**
 * Created by s6393 on 9/21/2016.
 */
Ext.define('Atlas.benefitplan.store.PlanBenefitPackageSearchResults', {
    extend: 'Ext.data.Store',
    model: 'Atlas.benefitplan.model.PlanBenefitPackageSearchResults',
    alias: 'store.benefitplan-packagesearchresults-store',
    sorters: 'benefitpackagesearchResults',
    autoLoad: false
});