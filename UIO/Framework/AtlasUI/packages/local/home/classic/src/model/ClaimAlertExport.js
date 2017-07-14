Ext.define('Atlas.home.model.ClaimAlertExport', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'claims/{0}/claimalert',
        extraParams: {
            pagination: true
        },
        timeout: 120000
    }
});