/**
 * Created by s6393 on 10/12/2016.
 */

Ext.define('Atlas.benefitplan.model.AccountIndustryIdentifierTypes', {
    extend: 'Atlas.benefitplan.model.Base',
    idProperty: 'IndustryIdentifier',
    fields: [
        {name: 'IndustryIdentifier', type: 'number'},
        {name: 'TenantTypeKey', type: 'number'},
        {name: 'ValueID', type: 'number'},
        {name: 'Type', type: 'string'},
        {name: 'Value', type: 'string'},
        {name: 'Description', type: 'string'},
        {name: 'EfctvStartDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'EfctvEndDt', type: 'date', dateFormat: 'Y-m-d\\TH:i:s'},
        {name: 'CurrentUser', type: 'string'}
    ],
    proxy: {

        url: '/TenantIndustryIdentifier'
    }
});

