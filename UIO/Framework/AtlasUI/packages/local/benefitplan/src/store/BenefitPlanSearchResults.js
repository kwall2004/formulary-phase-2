/**
 * Created by s6393 on 9/28/2016.
 */
Ext.define('Atlas.benefitplan.store.BenefitPlanSearchResults', {
    extend: 'Ext.data.Store',
    alias: 'store.benefitplan-searchresults-store',
    extend: 'Ext.data.Store',
    model: 'Atlas.benefitplan.model.BenefitPlanSearchResults',
    sorters: 'benefitplansearchResults',
    autoLoad: false
});