Ext.define('Atlas.plan.model.PlanCarrierExt', {
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
        {name: 'zip', type: 'zipcode'},  //validator is on this type
        {name: 'SystemID', type: 'number'}

    ],
    proxy: {
        url: 'plan/{0}/plancarrierext',
        extraParams:{
            pBatchSize: 0,
            pWhere: '1=1'
        }
    },
    validators: {
        carrierName: {type: 'length', min: 3}
    }
});