/**
 * Created by s6393 on 9/22/2016.
 */
Ext.define('Atlas.benefitplan.model.DrugBrandType', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.drugbrandtypes',
    fields: [
        {name: 'DrugBrandTypeSK', type: 'number'},
        {name: 'DrugBrandTypeCode', type: 'string'},
        {name: 'DrugBrandTypeDesc', type: 'string'}
],
    proxy: {
        url: '/PharmacyPricingDetail'
    }
});

