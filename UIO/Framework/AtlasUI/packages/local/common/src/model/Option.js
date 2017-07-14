Ext.define('Atlas.common.model.Option',{
    extend: 'Atlas.common.model.Base', //change to base when layer7 URL is ready
    idProperty: 'systemID',
    fields: [
        {name: 'systemID',  type: 'number'},
        {name: 'keyName',  type: 'string'},
        {name: 'keyValue',  type: 'string'},
        {name: 'keyDescription',  type: 'string'}
    ],
    proxy: {
        url: 'system/{0}/optionsvalue'
    }
});