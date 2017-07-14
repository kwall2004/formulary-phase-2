Ext.define('Atlas.portals.hpmember.model.County', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'name' },
        { name: 'id' }
    ],

    proxy: {
        url: 'portal/hp/countylist'
    }
});