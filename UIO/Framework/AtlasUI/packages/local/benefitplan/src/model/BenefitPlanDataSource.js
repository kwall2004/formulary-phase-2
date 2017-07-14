/**
 * Created by s6393 on 9/20/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitPlanDataSource', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.benefitplandatasources',
    fields: [
        {name: 'DrugRefDbSK', type: 'number'},
        {name: 'DrugRefDbName', type: 'string'}
    ],
    proxy: {
        url: '/DrugReferenceDatabase'
    }
});