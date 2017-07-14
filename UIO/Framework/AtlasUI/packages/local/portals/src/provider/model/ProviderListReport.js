// k3279 - Kevin Tabasan - 12/07/2016

Ext.define('Atlas.portals.provider.model.ProviderListReport', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'Zip',type: 'string'},
        {name: 'lastName',type: 'string'},
        {name: 'firstName',type: 'string'},
        {name: 'npi',type: 'string'},
        {name: 'State',type: 'string'},
        {name: 'degree',type: 'string'},
        {name: 'Address2',type: 'string'},
        {name: 'Address1',type: 'string'},
        {name: 'City',type: 'string'},
        {name: 'provID',type: 'string'},
        {name: 'County',type: 'string'},
        {name: 'providerType',type: 'string'}
    ],

    proxy: {
        url: 'provider/hp/providerlistsreport'
    }
});