Ext.define('Atlas.common.model.shared.QueryDb', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'pList', type: 'string' }
    ],

    proxy: {
        reader: {
            metaProperty: 'metadata',
            rootProperty: function(payload) {
                return payload.data;
            }
        },
        extraParams: {
            pOrderBy: '',
            pAscDesc: ''
        },
        url: 'shared/{0}/querydb'
    }
});