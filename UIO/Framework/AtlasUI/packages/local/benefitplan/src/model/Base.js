Ext.define('Atlas.benefitplan.model.Base', {
    extend: 'Ext.data.Model',
    require: ['Atlas.benefitplan.data.proxy.BenefitPlanProxy'],

    schema: {
        id: 'atlasbenefitplan',
        namespace: 'Atlas.benefitplan.model',
        proxy: {
            type: 'benefitplan'
        }
    }
});