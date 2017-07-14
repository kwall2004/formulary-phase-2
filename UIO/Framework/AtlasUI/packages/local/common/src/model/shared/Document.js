/**
 * Created by c4539 on 10/6/2016.
 */
Ext.define('Atlas.common.model.shared.Document', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'pData', type: 'string' },
        { name: 'pDocumentType', type: 'string' }
    ],

    proxy: {
        reader: {
            metaProperty: 'metadata',
            rootProperty: function(payload) {
                return payload.data;
            }
        },
        url: 'shared/{0}/document'
    }
});