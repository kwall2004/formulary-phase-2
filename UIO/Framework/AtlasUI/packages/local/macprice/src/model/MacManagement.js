

Ext.define('Atlas.macprice.model.MacManagement', {
    extend: 'Atlas.common.model.Base',
    idProperty: 'systemID',
    fields: [
        { name: 'MACListID', type: 'number'},
        { name: 'MACListVersion', type: 'number'},
        { name: 'MACListName', type: 'string'},
        { name: 'Stat', type: 'string'},
        { name: 'EffectiveDate', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'TerminationDate', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'MarkUpPct', type: 'string'},
        { name: 'AWPDiscountPct', type: 'string'},
        { name: 'WACDiscountPct', type: 'string'},
        { name: 'DataSource', type: 'string'},
        { name: 'LastUpdatedDate', type: 'date', dateFormat: 'Y-m-d'},
        { name: 'LastUpdateBy', type: 'string'},
        { name: 'systemID', type: 'number'}
    ],
    proxy: {
        extraParams: {
            pagination: true
        },
        url: 'formulary/{0}/maclists'
    }
});