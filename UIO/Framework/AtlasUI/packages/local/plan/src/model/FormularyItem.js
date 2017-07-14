Ext.define('Atlas.plan.model.FormularyItem',{
    extend: 'Atlas.common.model.Base',
    idProperty: 'FormularyID',
    fields: [
        {name: 'FormularyID',  type: 'number'},
        {name: 'FormularyName',  type: 'string'},
        {name: 'FormularyVersion',  type: 'number'},
        {name: 'Stat',  type: 'string'},
        {name: 'EffectiveDate',  type: 'date'},
        {name: 'TerminationDate',  type: 'date'},

        {name: 'CreateDateTime',  type: 'date'},
        {name: 'CreatedBy',  type: 'date'},
        {name: 'LastUpdateDateTime',  type: 'date'},
        {name: 'LastUpdateBy',  type: 'date'},
        {name: 'systemID',  type: 'date'},
        {name: 'recordVersion',  type: 'date'},
        {name: 'lastModified',  type: 'date'},
        {name: 'PDApprovedBy',  type: 'date'},
        {name: 'PDApprovedDate',  type: 'date'},
        {name: 'MDApprovedBy',  type: 'date'},
        {name: 'MDApprovedDate',  type: 'date'},
        {name: 'formularyType',  type: 'string'},
        {name: 'dataSource',  type: 'string'},
        {name: 'incExcOTC',  type: 'boolean'},
        {name: 'incExcPresc',  type: 'boolean'},
        {name: 'genMandatory',  type: 'boolean'},
        {name: 'StatDesc',  type: 'string'}

    ],
    proxy: {
        url: 'formulary/{0}/formularies'
    }
});