Ext.define('Atlas.plan.model.Carrier', {
    extend: 'Atlas.common.model.Base',
    idProperty: 'carrierId',
    fields: [
        {name: 'carrierId', type: 'number'},
        {name: 'carrierName', type: 'string'},
        {name: 'serviceLocation', type: 'string'},
        {name: 'address1', type: 'string'},
        {name: 'address2', type: 'string'},
        {name: 'city', type: 'string'},
        {name: 'state', type: 'string'},
        {name: 'zip', type: 'zipcode'}  //validator is on this type
    ],
    proxy: {
        url: 'plan/{0}/carriers'
    },
    validators: {
        carrierName: {type: 'length', min: 3}
    }
});