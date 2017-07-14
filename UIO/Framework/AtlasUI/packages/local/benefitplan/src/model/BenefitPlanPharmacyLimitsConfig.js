/**
 * Created by s6393 on 11/2/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitPlanPharmacyLimitsConfig', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'BnftPlanSK', type: 'number'},
        {name: 'BnftPlanPharmTypeSK', type: 'number'},
        {name: 'PharmTypeSK', type: 'number'},
        {name: 'PharmTypeCode', type: 'string'},
        {name: 'EarlyRefillPct', type: 'number'},
        {name: 'MaxDaySuplMntncMedications', type: 'number'},
        {name: 'MaxDaySuplNonMntncMedications', type: 'number'},
        {name: 'MaxCostPerRx', type: 'number'},
        {name: 'CurrentUser', type: 'string'},

        'DaySupplyTypeList'
    ], // Nested Data
    proxy: {
        actionMethods: {
            create: 'PUT',
            read: 'GET',
            update: 'PUT',
            destroy: 'PUT'
        },
        url: '/benefitPlanPharmacyType'
    }
});
