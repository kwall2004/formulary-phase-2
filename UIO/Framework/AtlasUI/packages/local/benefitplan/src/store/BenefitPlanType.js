/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.store.BenefitPlanType', {
    alias: 'store.benefitplan-type-store',
    extend: 'Ext.data.Store',
    model: 'Atlas.benefitplan.model.BenefitPlanType',
    sorters: 'benefitplanType',
    autoLoad: true
});