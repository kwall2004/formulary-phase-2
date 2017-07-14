Ext.define('Atlas.portals.provider.model.ProviderListTemp', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'lastName', type: 'string'},
        {name: 'firstName', type: 'string'},
        {
            name: 'name',
            type: 'string',
            convert: function (v, rec) {
                return rec.get('lastName') + ', ' + rec.get('firstName');
            }
        },
        {name: 'npinNum', type: 'string'},
        {name: 'provID', type: 'int'},
        {name: 'providerType', type: 'string'}
    ]
});