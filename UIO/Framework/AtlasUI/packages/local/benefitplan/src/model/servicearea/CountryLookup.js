/**
 * Created by j2560 on 10/27/2016.
 */
Ext.define('Atlas.benefitplan.model.servicearea.CountryLookup', {
    extend: 'Atlas.benefitplan.model.Base',
    hasOne: {model: 'ServiceAreaBreadCrumb', name: 'ServiceAreaBreadCrumb', associationKey: 'ServiceAreaBreadCrumb'},
    hasMany: {model: 'LookupDetails', name: 'LookupDetails', associationKey: 'LookupDetails'},
    fields: [
        {name: 'LookupDetails'},
        {name: 'LookupType', type: 'int'},
        {name: 'ServiceAreaBreadCrumb'},
        {name: 'SvcAreaSK', type: 'int'}
    ],
    proxy: {
        url: '/ServiceAreaConfiguration'
    }
});