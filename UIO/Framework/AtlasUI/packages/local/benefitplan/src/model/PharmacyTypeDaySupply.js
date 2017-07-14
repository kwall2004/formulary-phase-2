/**
 * Created by s6393 on 9/22/2016.
 */
Ext.define('Atlas.benefitplan.model.PharmacyTypeDaySupply', {
    extend: 'Atlas.benefitplan.model.Base',
    hasMany: {model: 'DaySupply', name: 'DaySupply', associationKey: 'DaySupply'},
    fields: [
        {name:'DaySupply'}
],
    proxy: {
        url: '/PharmacyTypeDaySupply'
    }
});

