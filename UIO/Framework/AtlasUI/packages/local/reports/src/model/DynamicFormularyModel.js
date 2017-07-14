Ext.define('Atlas.reports.model.DynamicFormularyModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'rptdynamicformulary',
    fields: [
        {name: 'FormularyName', type: 'string'},
        {name: 'systemID', type: 'float'}
    ],
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'formulary/{0}/formularies'
    }
});