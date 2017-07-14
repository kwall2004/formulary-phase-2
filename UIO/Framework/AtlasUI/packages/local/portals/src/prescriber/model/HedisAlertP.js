Ext.define('Atlas.portals.prescriber.model.HedisAlertP', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'subMeasure', type: 'string' },
        { name: 'lastSeen', type: 'string' },
        { name: 'measure', type: 'int' },
        { name: 'rowNum', type: 'int' },
        { name: 'recipientid', type: 'int' },
        { name: 'memberName', type: 'string' },
        { name: 'dueBy', type: 'string' },
        { name: 'complete', type: 'bool' },
        { name: 'memberid', type: 'string' },
        { name: 'measureDesc', type: 'string' }
    ],

    proxy: {
        extraParams: {
            pKeyType: 'Prescriber',
            pagination: true
        },

        url: 'portal/{0}/hedisalertp'
    }
});