Ext.define('Atlas.portals.prescriber.model.PaHistoryP', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'carrierName', type: 'string' },
        { name: 'AuthID', type: 'string' },
        { name: 'GCN_SEQNO', type: 'string' },
        { name: 'medication', type: 'string' },
        { name: 'authStatus', type: 'string' },
        { name: 'PAtype', type: 'string' },
        { name: 'urgentConcurrent', type: 'string' },
        { name: 'Concurrent', type: 'string' },
        { name: 'preServiceUrgent', type: 'string' },
        { name: 'preServiceNotUrgent', type: 'string' },
        { name: 'medicareUrgent', type: 'string' },
        { name: 'medicareStandard', type: 'string' },
        { name: 'createDate', type: 'string' },
        { name: 'lastModified', type: 'string' },
        { name: 'filledDate', type: 'string' },
        { name: 'effDate', type: 'string' },
        { name: 'termDate', type: 'string' },
        { name: 'rowNum', type: 'int' },
        { name: 'PlanGroupID', type: 'string' },
        { name: 'PlanGroupName', type: 'string' },
        { name: 'AccountName', type: 'string' },
        { name: 'LOBName', type: 'string' },
        { name: 'recipientid', type: 'string' },
        { name: 'memberid', type: 'string' },
        { name: 'memberName', type: 'string' },
        { name: 'authmemberID', type: 'string' },
        { name: 'HedisAlert', type: 'string' }
    ],

    proxy: {
        extraParams: {
            pKeyType: 'Prescriber',
            pcSort: '',
            pagination: true
        },

        url: 'portal/{0}/pahistoryp'
    }
});