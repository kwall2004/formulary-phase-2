Ext.define('Atlas.portals.prescriber.model.ClaimMasterCountP', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'batchRange', type: 'number'}
    ],

    proxy: {
        extraParams: {
            pKeyType: 'Prescriber',
            pBatchSize: 2000
        },
        reader: {
            metaProperty: 'metadata',
            rootProperty: function (payload) {
                return payload.data;
            }

        },
        url: 'portal/{0}/claimmastercountp'
    }
});