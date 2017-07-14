/**
 * Created by s6393 on 9/22/2016.
 */
Ext.define('Atlas.benefitplan.model.DaySupply', {
    extend: 'Atlas.benefitplan.model.Base',
    proxy: {
     type: 'memory'
     },
    fields: [
        {name: 'BnftPlanPharmTypeDaySuplSK', type: 'number'},
        {name: 'DaySuplTypeCode', type: 'string'},
        {name: 'DaySuplTypeDesc', type: 'string'},
        {name: 'DaySuplTypeSK', type: 'number'}
    ],

    proxy: {
        url: '/DaySupplyType'
    }


});

