Ext.define('Atlas.home.model.OutreachAlert', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'AlertDescription', type: 'string'},
        {name: 'AlertName', type: 'string'},
        {name: 'AlertCount', type: 'int'}
    ],

    proxy: {
        url: 'claims/{0}/coverageoutreachalert',
        timeout: 120000
    }
});