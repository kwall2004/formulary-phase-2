// k3279 - Kevin Tabasan - 11/16/2016

Ext.define('Atlas.portals.provider.model.ProviderList', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'provID',type: 'string'},
        {name: 'lastName',type: 'string'},
        {name: 'firstName',type: 'string'},
        {name: 'providerType',type: 'string'},
        {name: 'npinNum',type: 'string'},
        {
            name: 'displayNameLastFirst',
            calculate: function (data) {
                return data.lastName + (data.firstName ? ', ' + data.firstName : '');
            }
        }
    ],

    proxy: {
        url: 'provider/hp/providerlistweb'
    }
});