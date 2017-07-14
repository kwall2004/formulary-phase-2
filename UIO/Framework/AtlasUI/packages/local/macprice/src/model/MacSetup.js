
Ext.define('Atlas.macprice.model.MacSetup', {
    extend: 'Atlas.common.model.Base',
    idProperty: 'systemID',
    fields: [
        {name: 'systemID', type: 'number'},
        {name: 'baseMACListID', type: 'number'},
        {name: 'MACListID', type: 'number'},
        {name: 'MACListName', type: 'string'},
        {name: 'MACListVersion', type: 'string'},
        {name: 'Stat', type: 'string'},
        {name: 'MarkUpPct', type: 'number'},
        {name: 'AWPDiscountPct', type: 'number'},
        {name: 'WACDiscountPct', type: 'number'},
        {name: 'EffectiveDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'TerminationDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'LastUpdatedDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'LastUpdateBy', type: 'string'},
        {name: 'CreatedDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'CreatedBy', type: 'string'},
        {name: 'DataSource', type: 'string'},
        {name: 'AWPAboveAlert', type: 'number'},
        {name: 'AWPBelowAlert', type: 'number'},
        {name: 'InactiveDrugAlertDelay', type: 'number'},
        {name: 'IncDrugTypes', type: 'string'},
        {name: 'MACGPILevel', type: 'string'},
        {name: 'MRxAlertFreq', type: 'number'},
        {name: 'NewDrugAlertDelay', type: 'number'},
        {name: 'WACAboveAlert', type: 'number'},
        {name: 'DrugAlertDuration', type: 'number'}
    ],
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'formulary/{0}/maclists'
    }
});