/**
 * Created by j2560 on 11/2/2016.
 */
Ext.define('Atlas.benefitplan.model.servicearea.ServiceAreas', {
    extend: 'Atlas.benefitplan.model.Base',
    hasOne: {name: 'CountryLookup', model: 'CountryLookup', associationKey: 'CountryLookup'},
    hasMany: [
        {name: 'ServiceAreaHierarchy', model: 'ServiceAreaHierarchy', associationKey: 'ServiceAreaHierarchy'},
        {name: 'Transactions', model: 'Transactions', associationKey: 'Transactions'}
    ],
    fields: [
        {name: 'PBPSK', type: 'int'},
        {name: 'SvcAreaSK', type: 'int'},
        {name: 'SvcAreaName', type: 'string'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'CountryLookup'},
        {name: 'ServiceAreaHierarchy'},
        {name: 'Transactions'}
    ],
    proxy: {
        url: '/ServiceAreaConfiguration',
        reader: {
            rootProperty: function(data) {
                if (data.hasOwnProperty('Rows'))
                {
                    return data.Rows[0].ServiceAreas;
                }
            }
        },
        actionMethods: {
            
            destroy: 'PUT'
        }
    }
});