Ext.define('Atlas.portals.rxmember.model.CarriersPortal', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'pListItems', type: 'string'}
    ],

    proxy: {
        url: 'portal/rx/carriersportal',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                return payload.data;
            }
        }
    }
});