/**
 * Created by c4539 on 2/10/2017.
 */
Ext.define('Atlas.portals.provider.model.PortalAuthPrint', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        reader: {
            metaProperty: 'metadata',
            rootProperty: function(payload) {
                return payload.data;
            }
        },
        url: 'caremanagement/hp/portalauthprint'
    }
});