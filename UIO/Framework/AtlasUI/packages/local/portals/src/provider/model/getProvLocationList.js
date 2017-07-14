Ext.define('Atlas.portals.provider.model.GetProvLocationList', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'pLocationList', type: 'string'}
    ],

    proxy: {
        url: 'provider/hp/provlocationlist'
    }
});