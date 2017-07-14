Ext.define('Atlas.reports.model.DynamicCMSPBPModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'rptdynamiccmspbp',
    fields: [
        {name: 'cmsPBPid', type: 'string'}

    ],
    proxy: {
        url: 'plan/{0}/plangroups'
    }
});