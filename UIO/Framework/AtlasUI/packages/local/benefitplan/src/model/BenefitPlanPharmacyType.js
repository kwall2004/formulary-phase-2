/**
 * Created by n6570 on 10/6/2016.
 */
Ext.define('Atlas.benefitplan.model.BenefitPlanPharmacyType', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.planbenefit_pharmacytypes_PharmacyTypes',
    fields: [
        {name: 'BnftPlanPharmTypeSK',type:'number'},
        {name:'BnftPlanSK', type:'number'},
        {name:'PharmTypeSK', type: 'number'},
        {name: 'PharmTypeCode', type: 'string'},
        {name: 'PharmTypeDesc', type: 'string'}
    ],
    proxy: {
        url: '/PharmacyTypes'
    }
});
