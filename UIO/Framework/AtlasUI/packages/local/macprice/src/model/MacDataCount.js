
Ext.define('Atlas.macprice.model.MacDataCount', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'wrange', type: 'string'}
    ],
    proxy: {
        extraParams: {

        },
        url: 'formulary/{0}/macdatacount'
    }
});