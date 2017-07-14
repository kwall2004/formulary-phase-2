/**
 * Created by s6393 on 10/28/2016.
 */
Ext.define('Atlas.benefitplan.model.DispenseAsWrittenCopay', {
    extend: 'Atlas.benefitplan.model.Base',
    fields: [
        {name: 'BnftPlanSK', type: 'int'},
        {name: 'DAWCopaySK', type: 'int'},
        {name: 'DAWTypeSK', type: 'int'},
        {name: 'BrandGenrcDifferenceInd', type: 'string'},
        {name: 'PctofDrugCost', type: 'string'},
        {name: 'ApplyCopayInd', type: 'bool'},
        {name: 'ApplyDifferencetoOOPInd', type: 'bool'},
        {name: 'isDeleted', type: 'bool'},
        {name: 'CurrentUser', type: 'string'}
    ],

    proxy: {
        url: '/DispenseAsWrittenCopay'
    }
});
