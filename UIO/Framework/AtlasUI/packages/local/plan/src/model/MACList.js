Ext.define('Atlas.plan.model.MACList',{
    extend: 'Atlas.common.model.Base',
    idProperty: 'MACListID',
    fields: [
        {name: 'MACListID',  type: 'string'},
        {name: 'MacListName',  type: 'string'},
        {name: 'MACListVersion',  type: 'number'},

        {name: 'EffectiveDate',  type: 'string'},
        {name: 'TerminationDate',  type: 'string'},
        {name: 'MarkUpPct',  type: 'string'},
        {name: 'AWPDiscountPct',  type: 'string'},
        {name: 'WACDiscountPct',  type: 'string'},
        {name: 'DataSource',  type: 'string'},
        {name: 'AWPBelowAlert',  type: 'string'},
        {name: 'AWPAboveAlert',  type: 'string'},
        {name: 'WACBelowAlert',  type: 'string'},
        {name: 'WACAboveAlert',  type: 'string'},
        {name: 'MRxAlertFreq',  type: 'string'},
        {name: 'NewDrugAlertDelay',  type: 'string'},
        {name: 'InactiveDrugAlertDelay',  type: 'string'},
        {name: 'IncDrugTypes',  type: 'string'},
        {name: 'CreatedDate',  type: 'string'},
        {name: 'CreatedBy',  type: 'string'},
        {name: 'LastUpdatedDate',  type: 'string'},
        {name: 'LastUpdateBy',  type: 'string'},
        {name: 'systemID',  type: 'string'},
        {name: 'recordVersion',  type: 'string'},
        {name: 'lastModified',  type: 'string'},
        {name: 'MACGPILevel',  type: 'string'},
        {name: 'DrugAlertDuration',  type: 'string'},
        {name: 'dataTypeSource',  type: 'string'},
        {name: 'baseMACListID',  type: 'string'},
        {name: 'state',  type: 'string'},
        {name: 'isV5',  type: 'string'}
    ],
    proxy: {
        url: 'formulary/{0}/maclists'
    }
});