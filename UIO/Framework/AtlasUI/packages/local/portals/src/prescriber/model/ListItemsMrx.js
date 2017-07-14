Ext.define('Atlas.portals.prescriber.model.ListItemsMrx', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'value', type: 'string' },
        { name: 'name', type: 'string' }
    ],

    proxy: {
        url: 'portal/{0}/listitemsmrx'
    }
});