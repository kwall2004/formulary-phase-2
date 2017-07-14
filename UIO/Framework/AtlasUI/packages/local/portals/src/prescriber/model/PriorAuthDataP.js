/**
 * Created by c4539 on 10/14/2016.
 */
Ext.define('Atlas.portals.prescriber.model.PriorAuthDataP', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        reader: {
            metaProperty: 'metadata',
            rootProperty: function(payload) {
                return payload.data;
            }
        },
        url: 'portal/{0}/priorauthdatap'
    }
});