Ext.define('Atlas.common.model.portals.MedicationMasterExtP', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'LN', type: 'string' },
        { name: 'recipientID', type: 'string' },
        { name: 'LBLRID', type: 'string' },
        { name: 'NDC', type: 'string' },
        { name: 'GCN_SEQNO', type: 'string' },
        { name: 'BN', type: 'string' },
        { name: 'GNN60', type: 'string' },
        { name: 'HICL_SEQNO', type: 'string' },
        { name: 'Strength', type: 'string' },
        { name: 'RouteOfAdmin', type: 'string' }
    ],

    proxy: {
        extraParams: {
            pPlanID: 'HPM'
        },

        url: 'portal/{0}/medicationmasterextp'
    }
});