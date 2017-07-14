Ext.define('Atlas.reports.model.DynamicPlanCarriersModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'rptdynamicplancarriers',
    fields: [
        {name: 'carrierName', type: 'string'},
        {name: 'carrierId', type: 'string'}

    ],
    proxy: {
        url: 'plan/{0}/carriers'
    }
});