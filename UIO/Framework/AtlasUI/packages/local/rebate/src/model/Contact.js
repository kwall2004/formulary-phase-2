/**
 * Created by T4317 on 8/11/2016.
 */
Ext.define('Atlas.rebate.model.Contact', {
    extend: 'Atlas.common.model.Base',
    fields: [
        { name: 'FirstName', type: 'string' },
        { name: 'LastName', type: 'string' },
        { name: 'Phone', type: 'string' },
        { name: 'Fax', type: 'string' },
        { name: 'Email', type: 'string' },
        { name: 'Attn', type: 'string' },
        { name: 'Address', type: 'string' },
        { name: 'City', type: 'string' },
        { name: 'State', type: 'string' },
        { name: 'Zip', type: 'string' }

    ],
    proxy: {
        url: 'system/{0}/contactinfo'
    }
});