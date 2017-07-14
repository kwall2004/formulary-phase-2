Ext.define('Atlas.portals.hpmember.model.PortalMemberFuncs', {
    extend: 'Atlas.common.model.Base',

    fields: [
    ],
    proxy: {
        url : 'portal/hp/portalmemberfuncs',
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