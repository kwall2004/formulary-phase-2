Ext.define('Atlas.reports.model.DynamicCMSMultiModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'rptdynamiccmsmulti',
    fields: [
        {name: 'CMSCntrId', type: 'string'}

    ],
    proxy: {
        url: 'plan/{0}/plangroups'
    }
});