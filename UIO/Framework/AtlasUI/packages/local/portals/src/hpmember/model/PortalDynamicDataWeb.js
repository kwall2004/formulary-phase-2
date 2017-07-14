Ext.define('Atlas.portals.hpmember.model.PortalDynamicDataWeb', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'dataValue', type: 'string' },
        { name: 'dataName', type: 'string' }
    ],

    proxy: {
        url: 'system/hp/portaldynamicdataweb'
    }
});