/**
 * Created by s6393 on 9/22/2016.
 */
Ext.define('Atlas.benefitplan.model.DaySupplyType', {
    extend: 'Atlas.benefitplan.model.Base',
    alias: 'viewmodel.daysupplytypes',
    fields: [
        {name: 'DaySuplTypeSK', type: 'number'},
        {name: 'DaySuplTypeDesc', type: 'string'}
],
    proxy: {
        url: '/DaySupplyType'
    }
});

