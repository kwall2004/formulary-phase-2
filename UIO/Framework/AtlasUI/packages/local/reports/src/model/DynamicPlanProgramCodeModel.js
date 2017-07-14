Ext.define('Atlas.reports.model.DynamicPlanProgramCodeModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'rptdynamicplanprogramcode',
    fields: [
        {name: 'progDescription', type: 'string'},
        {name: 'systemID', type: 'string'}

    ],
    proxy: {
        url: 'plan/{0}/planprogramcodes'
    }
});