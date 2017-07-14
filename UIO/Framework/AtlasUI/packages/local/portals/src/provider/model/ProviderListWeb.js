Ext.define('Atlas.portals.provider.model.ProviderListWeb', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'firstName', type: 'string'},
        {name: 'lastName',type: 'string'},
        {name: 'npinNum',type: 'string'},
        {name: 'provID',type: 'string'},
        {name: 'providerType',type: 'string'},
        {name: 'displayName',type: 'string',calculate: function(obj) {
            return obj.lastName + ', ' + obj.firstName;
        }},
        {
            name: 'name',
            type: 'string',
            convert: function (v, rec) {
                return rec.get('lastName') + ', ' + rec.get('firstName');
            }
        }
    ],

    proxy: {
        url: 'provider/hp/providerlistweb'
    }
});