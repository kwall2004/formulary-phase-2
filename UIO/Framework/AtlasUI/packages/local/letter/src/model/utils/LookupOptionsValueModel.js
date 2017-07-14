Ext.define('Atlas.letter.model.utils.LookupOptionsValueModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.lookupoptionsvaluemdl',
    fields: [
        {name: 'ListName', type: 'string', mapping: 'ListName' },
        {name: 'ListValue', type: 'string', mapping: 'ListValue' }
    ],
    pageSize: 50,
    proxy: {
        url: 'system/{0}/optionsvalue'
    }
});