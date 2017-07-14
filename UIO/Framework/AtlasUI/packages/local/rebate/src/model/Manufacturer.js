/**
 * Created by T4317 on 8/4/2016.
 */
Ext.define('Atlas.rebate.model.Manufacturer', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'Name', type: 'string' },
        { name: 'manufacturerId', type: 'string' },
        { name: 'manufacturerName', type: 'string' },
        { name: 'addressOne', type: 'string' },
        { name: 'addresstwo', type: 'string' },
        { name: 'address1', type: 'string' },
        { name: 'address2', type: 'string' },
        { name: 'city', type: 'string' },
        { name: 'state', type: 'string' },
        { name: 'zip', type: 'string' }],

    proxy: {
        url: 'finance/{0}/manufacturerext',
        extraParams:{
            pBatchSize:0,
            pWhere:''
        }
    }
});